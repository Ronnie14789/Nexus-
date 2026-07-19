import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import ContentDisclosure from '@/components/ContentDisclosure';
import Icon from '@/components/ui/Icon';
import {
  CommandButton,
  CommandPanel,
  MetricTile,
  ProgressRing,
  SectionHeading,
  SignalBars,
  Sparkline,
  StatusBeacon,
} from '@/components/nexus-command/NexusCommandUI';
import {
  commandHelp,
  executiveActions,
  executiveDomains,
  intelligenceQueue,
  roadmapModules,
  type ExecutiveDomain,
  type ExecutiveDomainId,
} from '@/data/executiveIntelligence';
import '@/styles/nexus-command-system.css';
import '@/executive-intelligence.css';

interface HealthResponse {
  success?: boolean;
  status?: string;
  version?: string;
  environment?: string;
  uptime?: number;
  contactStorage?: string;
  database?: {
    state?: string;
    configured?: boolean;
    usingFallbackStorage?: boolean;
  };
  email?: {
    configured?: boolean;
  };
}

interface PlatformPulse {
  state: 'checking' | 'online' | 'degraded' | 'offline';
  version: string;
  environment: string;
  uptime: number;
  storage: string;
  database: string;
  email: string;
  routesReady: number;
  routesTotal: number;
  checkedAt: Date | null;
  message: string;
}

interface TerminalLine {
  id: number;
  source: 'user' | 'system' | 'error';
  text: string;
}

const publicRoutes = [
  '/',
  '/about',
  '/electrical-systems',
  '/automotive-systems',
  '/digital-systems',
  '/executive-intelligence',
  '/knowledge-vault',
  '/automotive-systems/intelligence',
  '/automotive-systems/diagnostics',
];

const toneValues: Record<ExecutiveDomain['tone'], string> = {
  cyan: 'var(--nc-cyan)',
  blue: 'var(--nc-blue)',
  lime: 'var(--nc-lime)',
  amber: 'var(--nc-amber)',
  red: 'var(--nc-red)',
  neutral: 'var(--nc-neutral)',
};

const initialTerminal: TerminalLine[] = [
  {
    id: 1,
    source: 'system',
    text: 'NEXUS EXECUTIVE INTELLIGENCE / command interface initialized.',
  },
  {
    id: 2,
    source: 'system',
    text: 'Type “help” to inspect available commands or “status” to read the live platform pulse.',
  },
];

function formatUptime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return 'Not reported';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function createExecutiveBrief(domain: ExecutiveDomain, pulse: PlatformPulse) {
  const routeState = pulse.routesReady === pulse.routesTotal && pulse.routesTotal > 0
    ? 'all monitored public routes responding'
    : `${pulse.routesReady} of ${pulse.routesTotal} monitored routes responding`;
  const backendState = pulse.state === 'online'
    ? `the Nexus API online on version ${pulse.version}`
    : 'the live API status awaiting confirmation';

  return {
    title: `${domain.name} executive brief`,
    summary:
      `${domain.name} is positioned as the ${domain.role.toLowerCase()} domain within Nexus. ` +
      `The current platform reading shows ${backendState}, with ${routeState}. ` +
      `${domain.description}`,
    points: [
      `Operating principle: ${domain.principle}`,
      `Signal path: ${domain.signalPath.join(' → ')}`,
      `Current readiness model: ${domain.health.toFixed(1)}% and ${domain.state}.`,
      `Priority capabilities: ${domain.capabilities.join(', ')}.`,
      domain.route
        ? `The public domain is available at ${domain.route}.`
        : 'The module remains in the strategic roadmap and is not presented as a live production capability.',
    ],
  };
}

export default function ExecutiveIntelligence() {
  const reduceMotion = useReducedMotion();
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [activeDomainId, setActiveDomainId] = useState<ExecutiveDomainId>('automotive');
  const [briefDomainId, setBriefDomainId] = useState<ExecutiveDomainId>('digital');
  const [actionQuery, setActionQuery] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>(initialTerminal);
  const [copyStatus, setCopyStatus] = useState('');
  const [now, setNow] = useState(() => new Date());
  const [pulse, setPulse] = useState<PlatformPulse>({
    state: 'checking',
    version: '—',
    environment: 'Checking',
    uptime: 0,
    storage: 'Checking',
    database: 'Checking',
    email: 'Checking',
    routesReady: 0,
    routesTotal: publicRoutes.length,
    checkedAt: null,
    message: 'Reading the live Nexus API and public route surface.',
  });

  const activeDomain = useMemo(
    () => executiveDomains.find((domain) => domain.id === activeDomainId) ?? executiveDomains[0],
    [activeDomainId],
  );
  const briefDomain = useMemo(
    () => executiveDomains.find((domain) => domain.id === briefDomainId) ?? executiveDomains[0],
    [briefDomainId],
  );
  const brief = useMemo(() => createExecutiveBrief(briefDomain, pulse), [briefDomain, pulse]);

  const filteredActions = useMemo(() => {
    const clean = actionQuery.trim().toLowerCase();
    if (!clean) return executiveActions;
    return executiveActions.filter((action) =>
      `${action.label} ${action.detail} ${action.command}`.toLowerCase().includes(clean),
    );
  }, [actionQuery]);

  const readyDomains = executiveDomains.filter((domain) => domain.state === 'ready').length;
  const averageReadyHealth = executiveDomains
    .filter((domain) => domain.state === 'ready')
    .reduce((total, domain, _, list) => total + domain.health / list.length, 0);

  const checkPlatform = useCallback(async () => {
    setPulse((current) => ({ ...current, state: 'checking', message: 'Running live platform checks.' }));

    try {
      const [healthResponse, routeResults] = await Promise.all([
        fetch('/api/health', { signal: AbortSignal.timeout(10_000) }),
        Promise.all(
          publicRoutes.map(async (route) => {
            try {
              const response = await fetch(route, {
                method: 'HEAD',
                cache: 'no-store',
                signal: AbortSignal.timeout(10_000),
              });
              return response.ok;
            } catch {
              return false;
            }
          }),
        ),
      ]);

      const health = (await healthResponse.json()) as HealthResponse;
      const routesReady = routeResults.filter(Boolean).length;
      const online = healthResponse.ok && health.success === true && health.status === 'healthy';
      const degraded = healthResponse.ok && routesReady > 0;

      setPulse({
        state: online ? 'online' : degraded ? 'degraded' : 'offline',
        version: health.version ?? 'Unknown',
        environment: health.environment ?? 'Unknown',
        uptime: health.uptime ?? 0,
        storage: health.contactStorage ?? 'Unknown',
        database: health.database?.configured
          ? health.database.state ?? 'Configured'
          : health.database?.usingFallbackStorage
            ? 'Fallback storage'
            : 'Not configured',
        email: health.email?.configured ? 'Configured' : 'Not configured',
        routesReady,
        routesTotal: publicRoutes.length,
        checkedAt: new Date(),
        message: online
          ? 'The live Nexus API is healthy. Route checks completed successfully.'
          : 'The platform responded, but one or more services require attention.',
      });
    } catch (error) {
      setPulse((current) => ({
        ...current,
        state: 'offline',
        checkedAt: new Date(),
        message: error instanceof Error ? error.message : 'The live platform check failed.',
      }));
    }
  }, []);

  useEffect(() => {
    void checkPlatform();
    const interval = window.setInterval(() => void checkPlatform(), 60_000);
    return () => window.clearInterval(interval);
  }, [checkPlatform]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion, terminalHistory]);

  const addTerminalLine = useCallback((source: TerminalLine['source'], text: string) => {
    setTerminalHistory((current) => [
      ...current,
      { id: Date.now() + current.length, source, text },
    ]);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const executeCommand = async (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    addTerminalLine('user', rawCommand.trim());
    setTerminalInput('');

    if (command === 'clear') {
      setTerminalHistory(initialTerminal);
      return;
    }

    if (command === 'help') {
      addTerminalLine('system', commandHelp.join('\n'));
      return;
    }

    if (command === 'status') {
      addTerminalLine('system', 'Running live API and public-route checks…');
      await checkPlatform();
      addTerminalLine(
        'system',
        `Status check requested. Current view: ${pulse.routesReady}/${pulse.routesTotal} routes, API ${pulse.state}.`,
      );
      return;
    }

    if (command === 'brief') {
      scrollToSection('executive-brief');
      addTerminalLine('system', 'Executive brief opened. Select a domain and copy the generated briefing.');
      return;
    }

    if (command === 'roadmap') {
      scrollToSection('strategic-roadmap');
      addTerminalLine('system', 'Strategic roadmap opened. Six delivery phases are mapped.');
      return;
    }

    const routeCommands: Record<string, string> = {
      'open electrical': '/electrical-systems',
      electrical: '/electrical-systems',
      'open automotive': '/automotive-systems',
      automotive: '/automotive-systems',
      'open digital': '/digital-systems',
      digital: '/digital-systems',
      'open knowledge': '/knowledge-vault',
      knowledge: '/knowledge-vault',
      vault: '/knowledge-vault',
      'open diagnostics': '/automotive-systems/diagnostics',
      diagnostics: '/automotive-systems/diagnostics',
      diagnose: '/automotive-systems/diagnostics',
      'open automotive intelligence': '/automotive-systems/intelligence',
      home: '/',
    };

    if (routeCommands[command]) {
      addTerminalLine('system', `Opening ${routeCommands[command]}…`);
      window.setTimeout(() => window.location.assign(routeCommands[command]), 240);
      return;
    }

    if (command.includes('operations')) {
      addTerminalLine(
        'system',
        'That module is mapped in the roadmap but is not presented as a live production capability yet.',
      );
      return;
    }

    addTerminalLine('error', `Command not recognized: “${rawCommand.trim()}”. Type “help” for available commands.`);
  };

  const submitTerminal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void executeCommand(terminalInput);
  };

  const runAction = (command: string) => {
    void executeCommand(command);
  };

  const copyBrief = async () => {
    const text = [
      brief.title.toUpperCase(),
      '',
      brief.summary,
      '',
      ...brief.points.map((point, index) => `${index + 1}. ${point}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Brief copied');
    } catch {
      setCopyStatus('Copy unavailable');
    }

    window.setTimeout(() => setCopyStatus(''), 2400);
  };

  const platformStatus = pulse.state === 'online'
    ? 'online'
    : pulse.state === 'checking'
      ? 'watch'
      : pulse.state === 'degraded'
        ? 'watch'
        : 'offline';

  const formattedClock = new Intl.DateTimeFormat('en-UG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Kampala',
  }).format(now);
  const formattedDate = new Intl.DateTimeFormat('en-UG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Kampala',
  }).format(now);

  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Nexus Executive Intelligence',
        applicationCategory: 'EngineeringApplication',
        operatingSystem: 'Web',
        url: 'https://ecaturonald.tech/executive-intelligence',
        description:
          'A professional engineering command center connecting electrical, automotive and digital systems with platform status, executive search, roadmap intelligence and future diagnostic operations.',
        dateModified: '2026-07-19',
        creator: {
          '@type': 'Person',
          name: 'Ecatu Ronald',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ecaturonald.tech/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Executive Intelligence',
            item: 'https://ecaturonald.tech/executive-intelligence',
          },
        ],
      },
    ],
    [],
  );

  return (
    <>
      <Seo
        title="Nexus Executive Intelligence | Ecatu Ronald"
        description="Nexus Executive Intelligence is Ecatu Ronald's engineering command center for platform status, electrical, automotive and digital systems, strategic roadmap intelligence and future diagnostic operations."
        canonicalPath="/executive-intelligence"
        jsonLd={jsonLd}
        ogType="website"
      />

      <a className="ei-skip-link" href="#executive-main">Skip to Executive Intelligence</a>

      <main id="executive-main" className="ei-page">
        <section className="ei-hero" aria-labelledby="ei-title">
          <div className="ei-grid-overlay" aria-hidden="true" />
          <div className="ei-noise" aria-hidden="true" />
          <div className="ei-scanline" aria-hidden="true" />

          <div className="ei-shell">
            <div className="ei-hero-layout">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .7 }}
              >
                <nav className="ei-breadcrumb" aria-label="Breadcrumb">
                  <Link to="/">Nexus</Link><i /><span>Executive Intelligence</span>
                </nav>

                <p className="ei-hero-kicker">Nexus command layer / Kampala</p>
                <h1 id="ei-title"><span>Executive</span><em>Intelligence.</em></h1>
                <p className="ei-hero-summary">
                  A unified engineering command center connecting <strong>power, motion and intelligence</strong> with live platform checks, global command, decision priorities and a roadmap for AI diagnostics, knowledge and operations.
                </p>

                <div className="ei-hero-actions">
                  <CommandButton onClick={() => scrollToSection('mission-control')}>
                    Enter mission control <Icon name="arrow" />
                  </CommandButton>
                  <CommandButton
                    variant="outline"
                    tone="blue"
                    onClick={() => scrollToSection('strategic-roadmap')}
                  >
                    Inspect the roadmap
                  </CommandButton>
                </div>

                <div className="ei-mode-note">
                  <i aria-hidden="true" />
                  Live API and route checks are real. Strategic module readiness is an architecture model, not fabricated production telemetry.
                </div>
              </motion.div>

              <motion.div
                className="ei-terminal"
                initial={reduceMotion ? false : { opacity: 0, x: 34, scale: .98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: .72, delay: .1 }}
                aria-label="Nexus command terminal"
              >
                <div className="ei-terminal-top">
                  <div className="ei-terminal-lights" aria-hidden="true"><i /><i /><i /></div>
                  <strong>NX-EXEC / secure command surface</strong>
                  <StatusBeacon status={platformStatus} label={pulse.state} compact />
                </div>

                <div className="ei-terminal-screen" aria-live="polite">
                  {terminalHistory.map((line) => (
                    <div
                      key={line.id}
                      className={`ei-terminal-line ${line.source === 'system' ? 'is-system' : ''} ${line.source === 'error' ? 'is-error' : ''}`}
                    >
                      <span>{line.source === 'user' ? 'RONALD' : line.source === 'error' ? 'FAULT' : 'NEXUS'}</span>
                      <p>{line.text}</p>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <form className="ei-terminal-form" onSubmit={submitTerminal}>
                  <span aria-hidden="true">›</span>
                  <input
                    value={terminalInput}
                    onChange={(event) => setTerminalInput(event.target.value)}
                    placeholder="Type status, help, brief, roadmap…"
                    aria-label="Nexus command"
                    autoComplete="off"
                  />
                  <button type="submit">EXECUTE</button>
                </form>

                <div className="ei-terminal-hints" aria-label="Suggested commands">
                  {['status', 'open automotive', 'brief', 'roadmap', 'help'].map((command) => (
                    <button key={command} type="button" onClick={() => void executeCommand(command)}>
                      {command}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="ei-metric-rail" aria-label="Executive platform metrics">
              <MetricTile
                label="Live API"
                value={pulse.state === 'online' ? 'HEALTHY' : pulse.state.toUpperCase()}
                detail={pulse.message}
                tone={pulse.state === 'online' ? 'lime' : 'amber'}
              />
              <MetricTile
                label="Public route surface"
                value={`${pulse.routesReady}/${pulse.routesTotal}`}
                detail="Same-origin route checks, refreshed every 60 seconds."
                tone="cyan"
              >
                <SignalBars values={publicRoutes.map((_, index) => index < pulse.routesReady ? 94 : 18)} label={`${pulse.routesReady} public routes responding`} />
              </MetricTile>
              <MetricTile
                label="Core domains"
                value={readyDomains}
                unit="READY"
                detail="Electrical, Automotive and Digital Systems are active public domains."
                tone="blue"
              >
                <Sparkline values={[30, 52, 74, 88, 96, 99]} label="Core domain delivery model" tone="blue" />
              </MetricTile>
              <MetricTile
                label="Readiness model"
                value={averageReadyHealth.toFixed(1)}
                unit="%"
                detail="Architecture readiness across the three delivered engineering domains."
                tone="lime"
              >
                <Sparkline values={[62, 69, 77, 84, 91, averageReadyHealth]} label="Readiness model trend" tone="lime" />
              </MetricTile>
            </div>
          </div>
        </section>

        <ContentDisclosure page="executive" />

        <section id="mission-control" className="ei-section ei-command-deck" aria-labelledby="mission-control-title">
          <div className="ei-shell">
            <SectionHeading
              index="01 / COMMAND DECK"
              eyebrow="Mission control"
              title="One operating picture across every Nexus domain."
              description="Select a domain to inspect its role, evidence path, capabilities and delivery state. The center distinguishes live platform readings from planned strategic modules."
            />

            <div className="ei-deck-grid">
              <CommandPanel eyebrow="DOMAIN INDEX" title="System constellation" ariaLabel="Nexus domain selector">
                <div className="ei-domain-list" role="tablist" aria-label="Nexus executive domains">
                  {executiveDomains.map((domain) => (
                    <button
                      key={domain.id}
                      type="button"
                      role="tab"
                      aria-selected={activeDomainId === domain.id}
                      className={`ei-domain-button ${activeDomainId === domain.id ? 'active' : ''}`}
                      style={{ '--ei-domain-tone': toneValues[domain.tone] } as CSSProperties}
                      onClick={() => setActiveDomainId(domain.id)}
                    >
                      <span className="ei-domain-code">{domain.code}</span>
                      <div><strong>{domain.name}</strong><small>{domain.role}</small></div>
                      <StatusBeacon status={domain.state} compact />
                    </button>
                  ))}
                </div>
              </CommandPanel>

              <CommandPanel className="ei-domain-stage" ariaLabel={`${activeDomain.name} executive view`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDomain.id}
                    className="ei-domain-stage-inner"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: .3 }}
                    style={{ '--ei-domain-tone': toneValues[activeDomain.tone] } as CSSProperties}
                  >
                    <div className="ei-domain-stage-top">
                      <div>
                        <span className="ei-domain-stage-index">DOMAIN {activeDomain.index} / {activeDomain.code}</span>
                        <h3>{activeDomain.name}</h3>
                        <p className="ei-domain-role">{activeDomain.role}</p>
                      </div>
                      <ProgressRing value={activeDomain.health} label="readiness" tone={activeDomain.tone} />
                    </div>

                    <p className="ei-domain-description">{activeDomain.description}</p>
                    <blockquote className="ei-domain-principle">“{activeDomain.principle}”</blockquote>

                    <div className="ei-signal-path" aria-label={`${activeDomain.name} signal path`}>
                      {activeDomain.signalPath.map((step, index) => (
                        <div className="ei-signal-step" key={step}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <strong>{step}</strong>
                          {index < activeDomain.signalPath.length - 1 ? <i aria-hidden="true" /> : null}
                        </div>
                      ))}
                    </div>

                    <div className="ei-domain-bottom">
                      <div className="ei-capability-grid">
                        {activeDomain.capabilities.map((capability) => (
                          <span key={capability}><i aria-hidden="true" />{capability}</span>
                        ))}
                      </div>
                      <div className="ei-domain-chart">
                        <span>Delivery signal</span>
                        <Sparkline
                          values={activeDomain.telemetry}
                          label={`${activeDomain.name} delivery signal`}
                          tone={activeDomain.tone}
                        />
                      </div>
                    </div>

                    <div className="ei-domain-cta">
                      {activeDomain.route ? (
                        <CommandButton href={activeDomain.route} tone={activeDomain.tone}>
                          Enter {activeDomain.name} <Icon name="arrow" />
                        </CommandButton>
                      ) : (
                        <CommandButton disabled tone={activeDomain.tone} variant="outline">
                          Strategic module / planned
                        </CommandButton>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CommandPanel>

              <CommandPanel
                eyebrow="LIVE PLATFORM PULSE"
                title="Operational status"
                action={<StatusBeacon status={platformStatus} label={pulse.state} compact />}
              >
                <div className="ei-pulse-stack">
                  <div className="ei-pulse-overview">
                    <ProgressRing
                      value={pulse.routesTotal ? (pulse.routesReady / pulse.routesTotal) * 100 : 0}
                      label="routes"
                      tone={pulse.state === 'online' ? 'lime' : 'amber'}
                    />
                    <div className="ei-pulse-copy">
                      <strong>{pulse.routesReady} of {pulse.routesTotal} routes responding</strong>
                      <span>Checked {pulse.checkedAt ? pulse.checkedAt.toLocaleTimeString('en-UG') : 'on page load'}</span>
                    </div>
                  </div>

                  <div className="ei-pulse-list">
                    <div className="ei-pulse-row"><span>Application version</span><strong>{pulse.version}</strong></div>
                    <div className="ei-pulse-row"><span>Environment</span><strong>{pulse.environment}</strong></div>
                    <div className="ei-pulse-row"><span>Process uptime</span><strong>{formatUptime(pulse.uptime)}</strong></div>
                    <div className="ei-pulse-row"><span>Contact storage</span><strong>{pulse.storage}</strong></div>
                    <div className="ei-pulse-row"><span>Database</span><strong>{pulse.database}</strong></div>
                    <div className="ei-pulse-row"><span>Email</span><strong>{pulse.email}</strong></div>
                  </div>

                  <div className="ei-pulse-log">
                    <span>Platform note</span>
                    <code>{pulse.message}</code>
                  </div>

                  <button className="ei-refresh-button" type="button" onClick={() => void checkPlatform()}>
                    Refresh live platform checks
                  </button>
                </div>
              </CommandPanel>
            </div>
          </div>
        </section>

        <section className="ei-section" aria-labelledby="global-command-title">
          <div className="ei-shell">
            <SectionHeading
              index="02 / GLOBAL COMMAND"
              eyebrow="Search and action"
              title="Find the next useful action, not another menu."
              description="The command surface searches delivered systems, platform checks, briefing tools and planned modules from one place."
            />

            <CommandPanel>
              <div className="ei-command-search">
                <Icon name="search" />
                <input
                  value={actionQuery}
                  onChange={(event) => setActionQuery(event.target.value)}
                  placeholder="Search systems, diagnostics, reports, knowledge or operations…"
                  aria-label="Search Nexus executive actions"
                />
                <kbd>{filteredActions.length} RESULTS</kbd>
              </div>

              <div className="ei-action-results">
                {filteredActions.map((action, index) => {
                  const domain = executiveDomains.find((item) => item.id === action.domain) ?? executiveDomains[0];
                  const style = { '--ei-action-tone': toneValues[domain.tone] } as CSSProperties;

                  if (action.route && action.status === 'available') {
                    return (
                      <Link className="ei-action-card" style={style} key={action.id} to={action.route}>
                        <span className="ei-action-index">{String(index + 1).padStart(2, '0')}</span>
                        <div><strong>{action.label}</strong><small>{action.detail}</small></div>
                        <span className="ei-action-command">{action.command}</span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      className="ei-action-card"
                      style={style}
                      key={action.id}
                      type="button"
                      disabled={action.status === 'planned'}
                      onClick={() => runAction(action.command)}
                    >
                      <span className="ei-action-index">{String(index + 1).padStart(2, '0')}</span>
                      <div><strong>{action.label}</strong><small>{action.detail}</small></div>
                      <span className="ei-action-command">{action.status === 'planned' ? 'PLANNED' : action.command}</span>
                    </button>
                  );
                })}
                {!filteredActions.length ? (
                  <p className="ei-no-results">No command matched. Try “electrical”, “status”, “brief”, “diagnostic” or “knowledge”.</p>
                ) : null}
              </div>
            </CommandPanel>
          </div>
        </section>

        <section className="ei-section" aria-labelledby="intelligence-queue-title">
          <div className="ei-shell">
            <SectionHeading
              index="03 / DECISION LAYER"
              eyebrow="Operational intelligence"
              title="Priorities are visible before work begins."
              description="The queue separates platform hardening, diagnostic modelling, knowledge architecture and operations design into explicit next decisions."
            />

            <div className="ei-intelligence-grid">
              <CommandPanel eyebrow="INTELLIGENCE QUEUE" title="Current strategic priorities">
                <div className="ei-queue">
                  {intelligenceQueue.map((item) => (
                    <article className="ei-queue-item" key={item.id}>
                      <span className={`ei-priority ei-priority-${item.priority}`}>{item.priority}</span>
                      <div className="ei-queue-copy">
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                      <div className="ei-queue-meta"><strong>{item.state}</strong><small>{item.owner}</small></div>
                    </article>
                  ))}
                </div>
              </CommandPanel>

              <CommandPanel eyebrow="RISK POSTURE" title="Control boundaries">
                <div className="ei-risk-map">
                  <article className="ei-risk-cell is-good"><span>Secrets</span><strong>Host environment</strong><small>Credentials remain outside the public repository.</small></article>
                  <article className="ei-risk-cell is-good"><span>Quality</span><strong>Automated gate</strong><small>Build, routes, API and headers are verified before merge.</small></article>
                  <article className="ei-risk-cell is-watch"><span>Data</span><strong>Runtime dependent</strong><small>Database condition must be confirmed from production health.</small></article>
                  <article className="ei-risk-cell is-watch"><span>Roadmap</span><strong>Scope controlled</strong><small>Planned modules are labelled and never represented as live.</small></article>
                </div>
                <div className="ei-pulse-log" style={{ marginTop: 14 }}>
                  <span>Current command time</span>
                  <code>{formattedDate} / {formattedClock} EAT</code>
                </div>
              </CommandPanel>
            </div>
          </div>
        </section>

        <section id="executive-brief" className="ei-section" aria-labelledby="executive-brief-title">
          <div className="ei-shell">
            <SectionHeading
              index="04 / EXECUTIVE BRIEF"
              eyebrow="Decision communication"
              title="Convert the operating picture into a clear briefing."
              description="Choose a domain to generate a concise, honest summary that combines its purpose, evidence path, readiness and current live platform state."
            />

            <CommandPanel>
              <div className="ei-brief-grid">
                <div className="ei-brief-controls" role="tablist" aria-label="Executive brief domain">
                  {executiveDomains.map((domain) => (
                    <button
                      key={domain.id}
                      type="button"
                      role="tab"
                      aria-selected={briefDomainId === domain.id}
                      className={briefDomainId === domain.id ? 'active' : ''}
                      onClick={() => setBriefDomainId(domain.id)}
                    >
                      {domain.name}<span>{domain.code}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.article
                    key={briefDomain.id}
                    className="ei-brief-paper"
                    initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: .28 }}
                  >
                    <div className="ei-brief-paper-head"><span>NX / EXECUTIVE BRIEF</span><time>{formattedDate}</time></div>
                    <h3>{brief.title}</h3>
                    <p>{brief.summary}</p>
                    <div className="ei-brief-points">
                      {brief.points.map((point, index) => (
                        <div className="ei-brief-point" key={point}><span>{String(index + 1).padStart(2, '0')}</span><div>{point}</div></div>
                      ))}
                    </div>
                    <div className="ei-brief-actions">
                      <CommandButton onClick={() => void copyBrief()}><Icon name="copy" /> Copy briefing</CommandButton>
                      {briefDomain.route ? (
                        <CommandButton href={briefDomain.route} variant="outline" tone={briefDomain.tone}>
                          Open domain <Icon name="arrow" />
                        </CommandButton>
                      ) : null}
                      {copyStatus ? <span className="ei-copy-status">{copyStatus}</span> : null}
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </CommandPanel>
          </div>
        </section>

        <section id="strategic-roadmap" className="ei-section" aria-labelledby="strategic-roadmap-title">
          <div className="ei-shell">
            <SectionHeading
              index="05 / DELIVERY ROADMAP"
              eyebrow="Platform evolution"
              title="Build the operating system in disciplined layers."
              description="Each phase creates reusable capability for the next. Executive Intelligence becomes the command layer rather than another isolated page."
            />

            <div className="ei-roadmap">
              {roadmapModules.map((module) => (
                <article className={`ei-roadmap-item is-${module.status}`} key={module.phase}>
                  <div className="ei-roadmap-node"><i /></div>
                  <div className="ei-roadmap-copy"><span>{module.phase} / {module.status}</span><h3>{module.title}</h3><p>{module.outcome}</p></div>
                  <div className="ei-roadmap-capabilities">{module.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ei-section ei-closing" aria-labelledby="executive-closing-title">
          <div className="ei-shell">
            <div className="ei-closing-panel">
              <div>
                <span>NEXUS / POWER · MOTION · INTELLIGENCE</span>
                <h2 id="executive-closing-title">The portfolio becomes a platform.</h2>
                <p>
                  Executive Intelligence provides the architecture, command language and reusable design system for every future Nexus product—from knowledge and diagnostics to workshop, fleet and digital-twin operations.
                </p>
              </div>
              <div className="ei-closing-links">
                <Link to="/electrical-systems">Electrical Systems <Icon name="arrow" /></Link>
                <Link to="/automotive-systems">Automotive Systems <Icon name="arrow" /></Link>
                <Link to="/digital-systems">Digital Systems <Icon name="arrow" /></Link>
                <a href="/#contact">Discuss an engineering project <Icon name="arrow" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
