import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import NexusFooter from '@/components/nexus/NexusFooter';
import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/data/portfolio';
import {
  apiContract,
  architectureNodes,
  dataLifecycle,
  deliveryWorkflow,
  diagnosticScenarios,
  digitalFaults,
  digitalPrinciples,
  digitalTools,
  engineeringStandards,
  faultCategories,
  fieldCaseFiles,
  platformModels,
  securityLayers,
  type DigitalArchitectureId,
  type DigitalFaultCategory,
} from '@/data/digitalSystems';
import '@/digital-systems.css';

const description =
  'A professional digital-systems engineering centre by Ecatu Ronald covering architecture, interfaces, APIs, data, identity, cloud delivery, observability, cybersecurity, diagnostics and reliable software operations.';

const digitalSystemsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://ecaturonald.tech/digital-systems#webpage',
    url: 'https://ecaturonald.tech/digital-systems',
    name: 'Digital Systems | Nexus by Ecatu Ronald',
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://ecaturonald.tech/#website',
      name: 'Ecatu Ronald — Nexus Field Systems',
      url: 'https://ecaturonald.tech/',
    },
    about: [
      'Software architecture',
      'Web applications',
      'APIs and integrations',
      'Data systems',
      'Cloud infrastructure',
      'DevOps and delivery',
      'Observability',
      'Cybersecurity',
    ],
    author: {
      '@type': 'Person',
      '@id': 'https://ecaturonald.tech/#person',
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: 'https://ecaturonald.tech/about',
    },
    dateModified: '2026-07-15',
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
        name: 'Digital Systems',
        item: 'https://ecaturonald.tech/digital-systems',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Nexus Digital Systems Engineering Centre',
    description,
    educationalLevel: 'Technical and professional',
    learningResourceType: 'Interactive systems engineering reference',
    teaches: [
      'Digital system architecture',
      'Frontend and backend engineering',
      'API and data design',
      'Identity and security',
      'Cloud infrastructure and deployment',
      'Observability and incident diagnosis',
      'Reliable software delivery',
    ],
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  },
];

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

function DigitalMesh({ activeNode }: { activeNode: DigitalArchitectureId }) {
  const coordinates: Record<DigitalArchitectureId, { x: number; y: number }> = {
    experience: { x: 110, y: 90 },
    application: { x: 290, y: 65 },
    services: { x: 485, y: 92 },
    data: { x: 640, y: 175 },
    identity: { x: 490, y: 280 },
    observability: { x: 290, y: 305 },
    infrastructure: { x: 110, y: 270 },
    delivery: { x: 55, y: 178 },
  };

  const links: Array<[DigitalArchitectureId, DigitalArchitectureId]> = [
    ['experience', 'application'],
    ['application', 'services'],
    ['services', 'data'],
    ['data', 'identity'],
    ['identity', 'observability'],
    ['observability', 'infrastructure'],
    ['infrastructure', 'delivery'],
    ['delivery', 'experience'],
    ['application', 'identity'],
    ['services', 'observability'],
    ['data', 'infrastructure'],
    ['delivery', 'services'],
  ];

  return (
    <svg
      className="ds-mesh"
      viewBox="0 0 700 370"
      role="img"
      aria-label="Digital system architecture mesh"
    >
      <defs>
        <linearGradient id="dsMeshLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6be6ff" />
          <stop offset="52%" stopColor="#7d72ff" />
          <stop offset="100%" stopColor="#8dffbd" />
        </linearGradient>
        <radialGradient id="dsNodeFill">
          <stop offset="0%" stopColor="#203c66" />
          <stop offset="100%" stopColor="#07111f" />
        </radialGradient>
        <filter id="dsGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="ds-mesh-grid" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, index) => (
          <line key={`v-${index}`} x1={index * 50} y1="0" x2={index * 50} y2="370" />
        ))}
        {Array.from({ length: 9 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={index * 46.25} x2="700" y2={index * 46.25} />
        ))}
      </g>

      <g className="ds-mesh-links">
        {links.map(([from, to]) => {
          const a = coordinates[from];
          const b = coordinates[to];
          const active = from === activeNode || to === activeNode;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={active ? 'active' : ''}
            />
          );
        })}
      </g>

      <circle className="ds-mesh-core-ring ds-mesh-core-ring-a" cx="350" cy="185" r="62" />
      <circle className="ds-mesh-core-ring ds-mesh-core-ring-b" cx="350" cy="185" r="40" />
      <circle className="ds-mesh-core" cx="350" cy="185" r="15" filter="url(#dsGlow)" />
      <text className="ds-mesh-core-label" x="350" y="190" textAnchor="middle">NX</text>

      {architectureNodes.map((node) => {
        const point = coordinates[node.id];
        const active = activeNode === node.id;
        return (
          <g key={node.id} className={`ds-mesh-node ${active ? 'active' : ''}`}>
            <circle cx={point.x} cy={point.y} r={active ? 24 : 18} fill="url(#dsNodeFill)" />
            <circle cx={point.x} cy={point.y} r={active ? 23 : 17} />
            <text x={point.x} y={point.y + 3} textAnchor="middle">{node.code.split('-')[0]}</text>
            <text className="ds-mesh-node-label" x={point.x} y={point.y + 40} textAnchor="middle">
              {node.title.replace(' layer', '')}
            </text>
          </g>
        );
      })}

      <path className="ds-packet ds-packet-a" d="M55 178 L110 90 L290 65 L485 92 L640 175" />
      <path className="ds-packet ds-packet-b" d="M640 175 L490 280 L290 305 L110 270 L55 178" />
    </svg>
  );
}

function ArchitectureRail({ activeNode }: { activeNode: DigitalArchitectureId }) {
  return (
    <div className="ds-architecture-rail" aria-label="Digital architecture operating path">
      {architectureNodes.map((node, index) => (
        <div key={node.id} className={activeNode === node.id ? 'active' : ''}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{node.title.replace(' layer', '')}</strong>
          {index < architectureNodes.length - 1 ? <i /> : null}
        </div>
      ))}
    </div>
  );
}

export default function DigitalSystems() {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<DigitalArchitectureId>('services');
  const [activePrinciple, setActivePrinciple] = useState(digitalPrinciples[0].code);
  const [requestsPerSecond, setRequestsPerSecond] = useState(75);
  const [payloadKb, setPayloadKb] = useState(18);
  const [availabilityTarget, setAvailabilityTarget] = useState(99.9);
  const [activePlatform, setActivePlatform] = useState(platformModels[0].id);
  const [openWorkflow, setOpenWorkflow] = useState(deliveryWorkflow[0].code);
  const [activeScenario, setActiveScenario] = useState(diagnosticScenarios[0].id);
  const [faultCategory, setFaultCategory] = useState<'all' | DigitalFaultCategory>('all');
  const [faultQuery, setFaultQuery] = useState('');
  const [activeFault, setActiveFault] = useState(digitalFaults[0].id);
  const [activeCase, setActiveCase] = useState(fieldCaseFiles[0].code);
  const [activeSecurity, setActiveSecurity] = useState(securityLayers[0].code);

  const selectedNode =
    architectureNodes.find((node) => node.id === activeNode) ?? architectureNodes[0];
  const selectedPrinciple =
    digitalPrinciples.find((principle) => principle.code === activePrinciple) ?? digitalPrinciples[0];
  const selectedPlatform =
    platformModels.find((platform) => platform.id === activePlatform) ?? platformModels[0];
  const selectedScenario =
    diagnosticScenarios.find((scenario) => scenario.id === activeScenario) ?? diagnosticScenarios[0];
  const selectedCase =
    fieldCaseFiles.find((caseFile) => caseFile.code === activeCase) ?? fieldCaseFiles[0];
  const selectedSecurity =
    securityLayers.find((layer) => layer.code === activeSecurity) ?? securityLayers[0];

  const dailyRequests = requestsPerSecond * 86_400;
  const dailyTransferGb = (dailyRequests * payloadKb) / 1_048_576;
  const monthlyDowntimeMinutes = ((100 - availabilityTarget) / 100) * 43_200;
  const monthlyRequests = dailyRequests * 30;

  const filteredFaults = useMemo(() => {
    const clean = faultQuery.trim().toLowerCase();
    return digitalFaults.filter((fault) => {
      const matchesCategory = faultCategory === 'all' || fault.category === faultCategory;
      const searchable = [
        fault.title,
        fault.symptom,
        fault.category,
        ...fault.likelyCauses,
        ...fault.tests,
      ]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!clean || searchable.includes(clean));
    });
  }, [faultCategory, faultQuery]);

  const selectedFault =
    filteredFaults.find((fault) => fault.id === activeFault) ?? filteredFaults[0] ?? null;

  const selectCategory = (category: 'all' | DigitalFaultCategory) => {
    setFaultCategory(category);
    const next = digitalFaults.find((fault) => category === 'all' || fault.category === category);
    if (next) setActiveFault(next.id);
  };

  return (
    <>
      <Seo
        title="Digital Systems | Architecture, Data, Cloud, Security & Operations"
        description={description}
        canonicalPath="/digital-systems"
        image="/images/og-portfolio.jpg"
        ogType="website"
        jsonLd={digitalSystemsSchema}
      />

      <a className="skip-link" href="#digital-main">
        Skip to digital systems
      </a>

      <main id="digital-main" className="ds-page">
        <section className="ds-hero" aria-labelledby="ds-hero-title">
          <div className="ds-hero-grid" aria-hidden="true" />
          <div className="ds-hero-glow ds-hero-glow-a" aria-hidden="true" />
          <div className="ds-hero-glow ds-hero-glow-b" aria-hidden="true" />
          <div className="ds-hero-code" aria-hidden="true">
            01100110 01101001 01100101 01101100 01100100
          </div>

          <div className="nx-shell ds-hero-shell">
            <nav className="ds-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Nexus</Link>
              <span>/</span>
              <strong>Digital systems</strong>
            </nav>

            <div className="ds-hero-layout">
              <div className="ds-hero-copy">
                <p className="ds-system-line">
                  <span className="ds-live-dot" /> NEXUS INTELLIGENCE DOMAIN · OPERATING
                </p>
                <p className="ds-overline">ARCHITECTURE / DATA / TRUST / DELIVERY / EVIDENCE</p>
                <h1 id="ds-hero-title">
                  Digital
                  <em> systems.</em>
                </h1>
                <p className="ds-hero-lead">
                  A complete engineering view of how software, data, interfaces,
                  infrastructure and people combine into reliable digital operations.
                </p>
                <p className="ds-hero-intro">
                  Nexus treats a digital product as a living system—not a collection of
                  screens and code files. Every request crosses boundaries, every state
                  change carries risk, and every production decision must be traceable to
                  evidence.
                </p>

                <div className="ds-hero-actions">
                  <a className="ds-btn ds-btn-primary" href="#architecture">
                    Enter system architecture <Icon name="arrow" />
                  </a>
                  <a className="ds-btn ds-btn-ghost" href="#diagnostics">
                    Open operations diagnostics <Icon name="diagnostics" />
                  </a>
                </div>

                <dl className="ds-hero-metrics" aria-label="Digital systems coverage">
                  <div><dt>08</dt><dd>architecture layers</dd></div>
                  <div><dt>12</dt><dd>delivery stages</dd></div>
                  <div><dt>18</dt><dd>fault models</dd></div>
                  <div><dt>01</dt><dd>source of truth</dd></div>
                </dl>
              </div>

              <div className="ds-hero-console" aria-label="Nexus digital systems command console">
                <div className="ds-console-head">
                  <div><span>ER / NEXUS</span><strong>Digital operations field</strong></div>
                  <small><i /> telemetry live</small>
                </div>
                <DigitalMesh activeNode={activeNode} />
                <div className="ds-console-readings">
                  <div><small>Requests</small><strong>2.48K <span>/ min</span></strong><i /></div>
                  <div><small>P95 latency</small><strong>184 <span>ms</span></strong><i /></div>
                  <div><small>Error budget</small><strong>HEALTHY</strong><i /></div>
                </div>
                <div className="ds-console-path">
                  {architectureNodes.map((node, index) => (
                    <button
                      key={node.id}
                      type="button"
                      className={activeNode === node.id ? 'active' : ''}
                      onClick={() => setActiveNode(node.id)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{node.title.replace(' layer', '')}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="ds-section ds-architecture" aria-labelledby="architecture-title">
          <div className="nx-shell">
            <header className="ds-section-head ds-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>01</span> System architecture</p>
                <h2 id="architecture-title">Eight layers. One controlled operating model.</h2>
              </div>
              <p>
                A digital system becomes dependable when interface, application logic,
                services, data, identity, observability, infrastructure and delivery are
                designed as connected responsibilities.
              </p>
            </header>

            <ArchitectureRail activeNode={activeNode} />

            <div className="ds-architecture-workspace">
              <div className="ds-architecture-index" role="tablist" aria-label="Digital architecture layers">
                {architectureNodes.map((node, index) => (
                  <button
                    key={node.id}
                    type="button"
                    role="tab"
                    aria-selected={activeNode === node.id}
                    className={activeNode === node.id ? 'active' : ''}
                    onClick={() => setActiveNode(node.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><small>{node.code}</small><strong>{node.title}</strong><p>{node.subtitle}</p></div>
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedNode.id}
                  className="ds-architecture-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                >
                  <div className="ds-stage-head">
                    <div><small>{selectedNode.code} / ACTIVE LAYER</small><h3>{selectedNode.title}</h3></div>
                    <span><i /> contract mapped</span>
                  </div>
                  <p className="ds-stage-description">{selectedNode.description}</p>
                  <div className="ds-stage-grid">
                    <div><small>Responsibilities</small><ul>{selectedNode.responsibilities.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
                    <div><small>Interfaces</small><ul>{selectedNode.interfaces.map((item) => <li key={item}><Icon name="code" />{item}</li>)}</ul></div>
                    <div><small>Failure modes</small><ul>{selectedNode.failureModes.map((item) => <li key={item}><Icon name="diagnostics" />{item}</li>)}</ul></div>
                    <div><small>Evidence</small><ul>{selectedNode.evidence.map((item) => <li key={item}><Icon name="report" />{item}</li>)}</ul></div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="principles" className="ds-section ds-principles" aria-labelledby="principles-title">
          <div className="nx-shell">
            <header className="ds-section-head">
              <div>
                <p className="nx-eyebrow"><span>02</span> Engineering principles</p>
                <h2 id="principles-title">Software quality is an operating discipline.</h2>
              </div>
              <p>
                Strong digital engineering is visible in contracts, state ownership,
                evidence, recovery, security and repeatability—not in technology names alone.
              </p>
            </header>

            <div className="ds-principle-workspace">
              <div className="ds-principle-list" role="tablist" aria-label="Digital engineering principles">
                {digitalPrinciples.map((principle) => (
                  <button
                    key={principle.code}
                    type="button"
                    role="tab"
                    aria-selected={activePrinciple === principle.code}
                    className={activePrinciple === principle.code ? 'active' : ''}
                    onClick={() => setActivePrinciple(principle.code)}
                  >
                    <span>{principle.code}</span><strong>{principle.title}</strong>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedPrinciple.code}
                  className="ds-principle-stage"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                >
                  <small>{selectedPrinciple.code} / OPERATING PRINCIPLE</small>
                  <h3>{selectedPrinciple.title}</h3>
                  <blockquote>{selectedPrinciple.statement}</blockquote>
                  <p>{selectedPrinciple.detail}</p>
                  <div><Icon name="check" /><span><small>Proof standard</small><strong>{selectedPrinciple.proof}</strong></span></div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="ds-capacity-lab" aria-labelledby="capacity-title">
              <div className="ds-capacity-copy">
                <p className="ds-mini-label">CAPACITY + RELIABILITY MODEL</p>
                <h3 id="capacity-title">Translate traffic and availability into engineering consequences.</h3>
                <p>
                  These values are planning estimates. Production capacity must be verified
                  with representative load, dependency behaviour and measured percentiles.
                </p>
                <div className="ds-capacity-inputs">
                  <label>
                    <span>Requests per second</span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={requestsPerSecond}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setRequestsPerSecond(clampNumber(Number(event.target.value), 1, 10000))
                      }
                    />
                  </label>
                  <label>
                    <span>Average payload (KB)</span>
                    <input
                      type="number"
                      min="1"
                      max="5000"
                      value={payloadKb}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPayloadKb(clampNumber(Number(event.target.value), 1, 5000))
                      }
                    />
                  </label>
                  <label>
                    <span>Availability target (%)</span>
                    <input
                      type="number"
                      min="90"
                      max="99.999"
                      step="0.001"
                      value={availabilityTarget}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setAvailabilityTarget(clampNumber(Number(event.target.value), 90, 99.999))
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="ds-capacity-results" aria-live="polite">
                <div><small>Daily requests</small><strong>{dailyRequests.toLocaleString()}</strong><span>operations / day</span></div>
                <div><small>Monthly requests</small><strong>{(monthlyRequests / 1_000_000).toFixed(2)}M</strong><span>operations / 30 days</span></div>
                <div><small>Daily transfer</small><strong>{dailyTransferGb.toFixed(2)}</strong><span>GB before protocol overhead</span></div>
                <div><small>Downtime budget</small><strong>{monthlyDowntimeMinutes.toFixed(2)}</strong><span>minutes / 30 days</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="platforms" className="ds-section ds-platforms" aria-labelledby="platforms-title">
          <div className="nx-shell">
            <header className="ds-section-head ds-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>03</span> Platform patterns</p>
                <h2 id="platforms-title">Architecture follows the operating need.</h2>
              </div>
              <p>
                The correct pattern is the one whose complexity, failure modes and operating
                cost are justified by real requirements—not by fashion.
              </p>
            </header>

            <div className="ds-platform-workspace">
              <div className="ds-platform-tabs" role="tablist" aria-label="Digital platform models">
                {platformModels.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    role="tab"
                    aria-selected={activePlatform === platform.id}
                    className={activePlatform === platform.id ? 'active' : ''}
                    onClick={() => setActivePlatform(platform.id)}
                  >
                    <span>{platform.code}</span><strong>{platform.title}</strong>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedPlatform.id}
                  className="ds-platform-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  <div className="ds-platform-head">
                    <div><small>{selectedPlatform.code} / REFERENCE ARCHITECTURE</small><h3>{selectedPlatform.title}</h3></div>
                    <span><i /> model active</span>
                  </div>
                  <p className="ds-platform-best"><strong>Best suited for:</strong> {selectedPlatform.bestFor}</p>
                  <div className="ds-platform-flow">
                    {selectedPlatform.architecture.map((stage, index) => (
                      <div key={stage}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage}</strong>{index < selectedPlatform.architecture.length - 1 ? <i /> : null}</div>
                    ))}
                  </div>
                  <div className="ds-platform-detail-grid">
                    <div><small>Strengths</small><ul>{selectedPlatform.strengths.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
                    <div><small>Required controls</small><ul>{selectedPlatform.controls.map((item) => <li key={item}><Icon name="diagnostics" />{item}</li>)}</ul></div>
                  </div>
                  <div className="ds-platform-caution"><span>DESIGN CAUTION</span><p>{selectedPlatform.caution}</p></div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="data-api" className="ds-section ds-data-api" aria-labelledby="data-api-title">
          <div className="nx-shell">
            <header className="ds-section-head">
              <div>
                <p className="nx-eyebrow"><span>04</span> Data + interfaces</p>
                <h2 id="data-api-title">Information must remain valid across every boundary.</h2>
              </div>
              <p>
                Data engineering begins before storage and continues through authorization,
                query, retention, recovery and deletion. API design makes those rules explicit.
              </p>
            </header>

            <div className="ds-data-lifecycle">
              {dataLifecycle.map((stage, index) => (
                <article key={stage.code}>
                  <div><span>{stage.code}</span><i>{index < dataLifecycle.length - 1 ? '→' : '✓'}</i></div>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </article>
              ))}
            </div>

            <div className="ds-api-console">
              <div className="ds-api-console-head">
                <div><span>CONTRACT FIELD</span><strong>Request semantics and controls</strong></div>
                <small><i /> schema governed</small>
              </div>
              <div className="ds-api-table" role="table" aria-label="API operation contract reference">
                <div className="ds-api-row ds-api-header" role="row">
                  <span role="columnheader">Method</span><span role="columnheader">Intent</span><span role="columnheader">Engineering controls</span>
                </div>
                {apiContract.map((item) => (
                  <div className="ds-api-row" role="row" key={item.method}>
                    <strong role="cell">{item.method}</strong><p role="cell">{item.purpose}</p><p role="cell">{item.control}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="ds-section ds-delivery" aria-labelledby="delivery-title">
          <div className="nx-shell">
            <header className="ds-section-head ds-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>05</span> Delivery engineering</p>
                <h2 id="delivery-title">From operating need to verified production.</h2>
              </div>
              <p>
                Delivery is a controlled evidence chain. Requirements, contracts, source,
                tests, artifacts, configuration, deployment and production behaviour must
                remain traceable to one another.
              </p>
            </header>

            <div className="ds-delivery-timeline">
              {deliveryWorkflow.map((stage) => {
                const open = openWorkflow === stage.code;
                return (
                  <article key={stage.code} className={open ? 'open' : ''}>
                    <button type="button" onClick={() => setOpenWorkflow(open ? '' : stage.code)} aria-expanded={open}>
                      <span>{stage.code}</span><div><small>DELIVERY STAGE</small><strong>{stage.title}</strong></div><i>{open ? '−' : '+'}</i>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          className="ds-delivery-detail"
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        >
                          <p>{stage.objective}</p>
                          <div><small>Evidence</small><ul>{stage.evidence.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
                          <blockquote><span>Exit condition</span>{stage.exitCondition}</blockquote>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diagnostics" className="ds-section ds-diagnostics" aria-labelledby="diagnostics-title">
          <div className="nx-shell">
            <header className="ds-section-head">
              <div>
                <p className="nx-eyebrow"><span>06</span> Operations diagnostics</p>
                <h2 id="diagnostics-title">Diagnose the failed boundary, not the loudest symptom.</h2>
              </div>
              <p>
                Digital troubleshooting becomes reliable when one complaint is traced through
                request, state, dependency, infrastructure and release evidence.
              </p>
            </header>

            <div className="ds-scenario-workspace">
              <div className="ds-scenario-index" role="tablist" aria-label="Digital diagnostic scenarios">
                {diagnosticScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    role="tab"
                    aria-selected={activeScenario === scenario.id}
                    className={activeScenario === scenario.id ? 'active' : ''}
                    onClick={() => setActiveScenario(scenario.id)}
                  >
                    <span>{scenario.signal}</span><strong>{scenario.title}</strong><Icon name="arrow" />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedScenario.id}
                  className="ds-scenario-stage"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                >
                  <div className="ds-scenario-head">
                    <div><small>{selectedScenario.signal} / ACTIVE DIAGNOSTIC</small><h3>{selectedScenario.title}</h3></div>
                    <span><i /> evidence path ready</span>
                  </div>
                  <div className="ds-scenario-complaint"><small>Reported condition</small><p>{selectedScenario.complaint}</p></div>
                  <div className="ds-scenario-grid">
                    <div><small>First checks</small><ul>{selectedScenario.firstChecks.map((item) => <li key={item}><Icon name="search" />{item}</li>)}</ul></div>
                    <div><small>Decision path</small><ol>{selectedScenario.decisionPath.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol></div>
                  </div>
                  <blockquote><span>Proof of restoration</span>{selectedScenario.proof}</blockquote>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="tools" className="ds-section ds-tools" aria-labelledby="tools-title">
          <div className="nx-shell">
            <header className="ds-section-head ds-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>07</span> Evidence toolkit</p>
                <h2 id="tools-title">Tools are valuable when they preserve the right evidence.</h2>
              </div>
              <p>
                Professional diagnosis combines code, requests, data, runtime condition,
                release history and user impact. No single dashboard can replace the full path.
              </p>
            </header>

            <div className="ds-tool-grid">
              {digitalTools.map((tool) => (
                <article key={tool.code}>
                  <div className="ds-tool-head"><span>{tool.code}</span><Icon name="code" /></div>
                  <small>{tool.class}</small>
                  <h3>{tool.title}</h3>
                  <p>{tool.purpose}</p>
                  <ul>{tool.evidence.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
                  <div><span>Misuse to avoid</span><p>{tool.misuse}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fault-intelligence" className="ds-section ds-faults" aria-labelledby="faults-title">
          <div className="nx-shell">
            <header className="ds-section-head">
              <div>
                <p className="nx-eyebrow"><span>08</span> Fault intelligence</p>
                <h2 id="faults-title">Search the system by symptom, cause or evidence.</h2>
              </div>
              <p>
                Every model connects the visible condition to likely mechanisms, controlled
                tests, corrective action and a final proof standard.
              </p>
            </header>

            <div className="ds-fault-controls">
              <label className="ds-fault-search">
                <Icon name="search" />
                <input
                  value={faultQuery}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setFaultQuery(event.target.value)}
                  placeholder="Search a route, timeout, database, secret, deployment or symptom…"
                  aria-label="Search digital faults"
                />
              </label>
              <div className="ds-fault-filters" role="group" aria-label="Filter digital fault categories">
                {faultCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={faultCategory === category.id ? 'active' : ''}
                    onClick={() => selectCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ds-fault-workspace">
              <div className="ds-fault-list" aria-label={`${filteredFaults.length} matching digital faults`}>
                {filteredFaults.map((fault, index) => (
                  <button
                    key={fault.id}
                    type="button"
                    className={selectedFault?.id === fault.id ? 'active' : ''}
                    onClick={() => setActiveFault(fault.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><small>{fault.category}</small><strong>{fault.title}</strong><p>{fault.symptom}</p></div>
                    <Icon name="arrow" />
                  </button>
                ))}
                {!filteredFaults.length ? (
                  <p className="ds-no-faults">No matching digital fault model. Try another technical term.</p>
                ) : null}
              </div>

              <AnimatePresence mode="wait">
                {selectedFault ? (
                  <motion.article
                    key={selectedFault.id}
                    className="ds-fault-detail"
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  >
                    <div className="ds-fault-detail-head"><div><small>{selectedFault.category} fault model</small><h3>{selectedFault.title}</h3></div><span><i /> reference active</span></div>
                    <div className="ds-fault-block ds-fault-symptom"><small>Symptom</small><p>{selectedFault.symptom}</p></div>
                    <div className="ds-fault-two-column">
                      <div className="ds-fault-block"><small>Likely causes</small><ul>{selectedFault.likelyCauses.map((cause) => <li key={cause}>{cause}</li>)}</ul></div>
                      <div className="ds-fault-block"><small>Test method</small><ul>{selectedFault.tests.map((test) => <li key={test}>{test}</li>)}</ul></div>
                    </div>
                    <div className="ds-fault-verification">
                      <div><small>Expected evidence</small><p>{selectedFault.expected}</p></div>
                      <div><small>Corrective action</small><p>{selectedFault.correctiveAction}</p></div>
                      <div><small>Final verification</small><p>{selectedFault.verification}</p></div>
                    </div>
                  </motion.article>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="case-files" className="ds-section ds-case-files" aria-labelledby="case-files-title">
          <div className="nx-shell">
            <header className="ds-section-head ds-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>09</span> Digital field cases</p>
                <h2 id="case-files-title">Real delivery and operations logic, structured for learning.</h2>
              </div>
              <p>
                These anonymised cases show how application, data, infrastructure and release
                evidence lead to a controlled technical decision.
              </p>
            </header>

            <div className="ds-case-workspace">
              <div className="ds-case-index" role="tablist" aria-label="Digital systems case files">
                {fieldCaseFiles.map((caseFile) => (
                  <button
                    key={caseFile.code}
                    type="button"
                    role="tab"
                    aria-selected={activeCase === caseFile.code}
                    className={activeCase === caseFile.code ? 'active' : ''}
                    onClick={() => setActiveCase(caseFile.code)}
                  >
                    <span>{caseFile.code}</span><strong>{caseFile.title}</strong><Icon name="arrow" />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedCase.code}
                  className="ds-case-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                >
                  <div className="ds-case-head"><div><small>{selectedCase.code} / OPERATIONS RECORD</small><h3>{selectedCase.title}</h3></div><span><i /> evidence controlled</span></div>
                  <p className="ds-case-context">{selectedCase.context}</p>
                  <div className="ds-case-complaint"><small>Reported condition</small><p>{selectedCase.complaint}</p></div>
                  <div className="ds-case-evidence"><small>Evidence captured</small><ul>{selectedCase.evidence.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
                  <div className="ds-case-decision-grid">
                    <div><small>Root cause logic</small><p>{selectedCase.rootCause}</p></div>
                    <div><small>Technical decision</small><p>{selectedCase.decision}</p></div>
                    <div><small>Verification</small><p>{selectedCase.verification}</p></div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="security" className="ds-section ds-security" aria-labelledby="security-title">
          <div className="nx-shell">
            <header className="ds-section-head">
              <div>
                <p className="nx-eyebrow"><span>10</span> Trust + security</p>
                <h2 id="security-title">Security is an architecture condition, not a final plugin.</h2>
              </div>
              <p>
                Identity, authorization, validation, secrets, transport, data protection,
                dependencies and response evidence must operate together across the full system.
              </p>
            </header>

            <div className="ds-security-workspace">
              <div className="ds-security-index" role="tablist" aria-label="Digital security layers">
                {securityLayers.map((layer) => (
                  <button
                    key={layer.code}
                    type="button"
                    role="tab"
                    aria-selected={activeSecurity === layer.code}
                    className={activeSecurity === layer.code ? 'active' : ''}
                    onClick={() => setActiveSecurity(layer.code)}
                  >
                    <span>{layer.code}</span><strong>{layer.title}</strong>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedSecurity.code}
                  className="ds-security-stage"
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                >
                  <small>{selectedSecurity.code} / TRUST BOUNDARY</small>
                  <h3>{selectedSecurity.title}</h3>
                  <div className="ds-security-threat"><span>Threat condition</span><p>{selectedSecurity.threat}</p></div>
                  <div><small>Engineering controls</small><ul>{selectedSecurity.controls.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
                  <blockquote><span>Verification</span>{selectedSecurity.verification}</blockquote>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="ds-standards">
              <div className="ds-standards-copy">
                <p className="ds-mini-label">NEXUS DIGITAL STANDARD</p>
                <h3>Build systems that can be understood, protected, observed, changed and recovered.</h3>
                <p>
                  Professional digital engineering connects system design with operational
                  evidence. A reliable platform can explain what changed, who acted, what
                  failed, what was protected and how normal service was proven.
                </p>
              </div>
              <ol>
                {engineeringStandards.map((standard, index) => (
                  <li key={standard}><span>{String(index + 1).padStart(2, '0')}</span><p>{standard}</p></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="ds-closing" aria-labelledby="ds-closing-title">
          <div className="ds-closing-grid" aria-hidden="true" />
          <div className="nx-shell ds-closing-layout">
            <div>
              <p className="nx-eyebrow"><span>11</span> Logic. Trust. Evidence.</p>
              <h2 id="ds-closing-title">Digital reliability is engineered across the complete system.</h2>
            </div>
            <div>
              <p>
                Nexus connects human experience, software architecture, data integrity,
                secure delivery and production evidence so digital decisions can be explained,
                tested and trusted.
              </p>
              <div className="ds-closing-actions">
                <a className="ds-btn ds-btn-primary" href="/#contact">
                  Discuss a digital system <Icon name="arrow" />
                </a>
                <Link className="ds-btn ds-btn-ghost" to="/electrical-systems">
                  Electrical Systems <Icon name="electrical" />
                </Link>
                <Link className="ds-btn ds-btn-ghost" to="/automotive-systems">
                  Automotive Systems <Icon name="engine" />
                </Link>
                <Link className="ds-btn ds-btn-ghost" to="/about">
                  Professional profile <Icon name="external" />
                </Link>
              </div>
              <small>Digital Systems · Nexus Field Systems · Ecatu Ronald</small>
            </div>
          </div>
        </section>
      </main>

      <NexusFooter />
    </>
  );
}
