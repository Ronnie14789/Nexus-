import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import ContentDisclosure from '@/components/ContentDisclosure';
import NexusFooter from '@/components/nexus/NexusFooter';
import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/data/portfolio';
import {
  architectureNodes,
  diagnosticScenarios,
  diagnosticTools,
  diagnosticWorkflow,
  electricalDomains,
  electricalFaults,
  electricalPrinciples,
  engineeringStandards,
  faultCategories,
  powerForms,
  safetyPrinciples,
  type ElectricalNodeId,
  type FaultCategory,
} from '@/data/electricalSystems';
import '@/electrical-systems.css';

const description =
  'A professional electrical-systems knowledge centre by Ecatu Ronald covering power generation, distribution, protection, control, measurement, diagnostics, safety and evidence-based fault isolation.';

const electricalSystemsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://ecaturonald.tech/electrical-systems#webpage',
    url: 'https://ecaturonald.tech/electrical-systems',
    name: 'Electrical Systems | Nexus by Ecatu Ronald',
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://ecaturonald.tech/#website',
      name: 'Ecatu Ronald — Nexus Field Systems',
      url: 'https://ecaturonald.tech/',
    },
    about: [
      'Electrical engineering',
      'Power distribution',
      'Electrical protection',
      'Control systems',
      'Electrical diagnostics',
      'Electrical safety',
    ],
    author: {
      '@type': 'Person',
      '@id': 'https://ecaturonald.tech/#person',
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: 'https://ecaturonald.tech/about',
    },
    dateModified: '2026-07-19',
    citation: [
      'https://webstore.iec.ch/en/publication/63699',
      'https://webstore.iec.ch/en/publication/24656',
    ],
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
        name: 'Electrical Systems',
        item: 'https://ecaturonald.tech/electrical-systems',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Nexus Electrical Systems Knowledge Centre',
    description,
    educationalLevel: 'Technical and professional',
    learningResourceType: 'Interactive engineering reference',
    teaches: [
      'Electrical system architecture',
      'Voltage, current, resistance and power',
      'AC and DC systems',
      'Electrical protection and isolation',
      'Evidence-based electrical diagnostics',
      'Electrical safety principles',
    ],
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  },
];

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

function FlowDiagram({ activeNode }: { activeNode: ElectricalNodeId }) {
  const stages = architectureNodes;

  return (
    <div className="es-flow" aria-label="Electrical system energy and information flow">
      <div className="es-flow-line" aria-hidden="true" />
      {stages.map((stage, index) => (
        <div
          key={stage.id}
          className={`es-flow-stage ${activeNode === stage.id ? 'active' : ''}`}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{stage.title}</strong>
          <small>{stage.code}</small>
        </div>
      ))}
    </div>
  );
}

function SignalScope() {
  return (
    <svg className="es-scope" viewBox="0 0 760 260" role="img" aria-label="Illustrative electrical waveform and system signal">
      <defs>
        <linearGradient id="esScopeFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2868ff" />
          <stop offset="48%" stopColor="#6be6ff" />
          <stop offset="100%" stopColor="#c8ff55" />
        </linearGradient>
        <filter id="esScopeGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="es-scope-grid">
        {Array.from({ length: 13 }).map((_, index) => (
          <line key={`v-${index}`} x1={index * 63.3} y1="0" x2={index * 63.3} y2="260" />
        ))}
        {Array.from({ length: 7 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={index * 43.3} x2="760" y2={index * 43.3} />
        ))}
      </g>
      <path
        className="es-wave es-wave-a"
        d="M0 130 C25 130 28 55 60 55 S95 205 128 205 160 55 194 55 228 205 260 205 292 55 326 55 360 205 394 205 426 55 460 55 494 205 526 205 558 55 592 55 626 205 658 205 692 55 726 55 748 130 760 130"
      />
      <path
        className="es-wave es-wave-b"
        d="M0 173 L70 173 70 86 154 86 154 173 238 173 238 86 322 86 322 173 406 173 406 86 490 86 490 173 574 173 574 86 658 86 658 173 760 173"
      />
      <path
        className="es-scope-trace"
        filter="url(#esScopeGlow)"
        stroke="url(#esScopeFill)"
        d="M0 132 C24 132 32 95 54 95 79 95 83 168 110 168 137 168 142 72 172 72 202 72 209 185 238 185 266 185 275 110 303 110 330 110 338 148 365 148 392 148 404 88 432 88 460 88 470 177 498 177 527 177 536 115 565 115 595 115 604 151 633 151 664 151 674 78 703 78 732 78 741 132 760 132"
      />
      <circle className="es-scope-cursor" cx="565" cy="115" r="6" />
    </svg>
  );
}

export default function ElectricalSystems() {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<ElectricalNodeId>('source');
  const [activeDomain, setActiveDomain] = useState<(typeof electricalDomains)[number]['id']>(electricalDomains[0].id);
  const [voltage, setVoltage] = useState(24);
  const [resistance, setResistance] = useState(12);
  const [faultCategory, setFaultCategory] = useState<'all' | FaultCategory>('all');
  const [faultQuery, setFaultQuery] = useState('');
  const [activeFault, setActiveFault] = useState(electricalFaults[0].id);
  const [activeScenario, setActiveScenario] = useState<(typeof diagnosticScenarios)[number]['id']>(diagnosticScenarios[0].id);
  const [openWorkflow, setOpenWorkflow] = useState('01');

  const selectedNode =
    architectureNodes.find((node) => node.id === activeNode) ?? architectureNodes[0];
  const selectedDomain =
    electricalDomains.find((domain) => domain.id === activeDomain) ?? electricalDomains[0];
  const selectedScenario =
    diagnosticScenarios.find((scenario) => scenario.id === activeScenario) ?? diagnosticScenarios[0];

  const current = resistance > 0 ? voltage / resistance : 0;
  const power = voltage * current;
  const energyPerHour = power / 1000;

  const filteredFaults = useMemo(() => {
    const clean = faultQuery.trim().toLowerCase();
    return electricalFaults.filter((fault) => {
      const matchesCategory = faultCategory === 'all' || fault.category === faultCategory;
      const searchable = [
        fault.title,
        fault.symptom,
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

  const selectCategory = (category: 'all' | FaultCategory) => {
    setFaultCategory(category);
    const next = electricalFaults.find((fault) => category === 'all' || fault.category === category);
    if (next) setActiveFault(next.id);
  };

  return (
    <>
      <Seo
        title="Electrical Systems | Power, Protection, Control & Diagnostics"
        description={description}
        canonicalPath="/electrical-systems"
        image="/images/og-portfolio.jpg"
        ogType="website"
        jsonLd={electricalSystemsSchema}
      />

      <a className="skip-link" href="#electrical-main">
        Skip to electrical systems
      </a>

      <main id="electrical-main" className="es-page">
        <section className="es-hero" aria-labelledby="es-hero-title">
          <div className="es-hero-grid" aria-hidden="true" />
          <div className="es-hero-energy es-hero-energy-a" aria-hidden="true" />
          <div className="es-hero-energy es-hero-energy-b" aria-hidden="true" />

          <div className="nx-shell es-hero-shell">
            <nav className="es-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Nexus</Link>
              <span>/</span>
              <strong>Electrical systems</strong>
            </nav>

            <div className="es-hero-layout">
              <div className="es-hero-copy">
                <p className="es-system-line">
                  <span className="es-live-dot" /> NEXUS POWER DOMAIN · REFERENCE READY
                </p>
                <p className="es-overline">POWER / PROTECTION / CONTROL / EVIDENCE</p>
                <h1 id="es-hero-title">
                  Electrical
                  <em> systems.</em>
                </h1>
                <p className="es-hero-lead">
                  A complete engineering view of how electrical energy is created,
                  distributed, protected, controlled, measured and converted into
                  useful work.
                </p>
                <p className="es-hero-intro">
                  Nexus treats an electrical system as one connected operating chain.
                  Every source, conductor, protective device, control decision, load
                  and feedback signal must work together—and every technical decision
                  must be supported by evidence.
                </p>

                <div className="es-hero-actions">
                  <a className="es-btn es-btn-primary" href="#architecture">
                    Explore system architecture <Icon name="arrow" />
                  </a>
                  <a className="es-btn es-btn-ghost" href="#diagnostics">
                    Open diagnostic workflow <Icon name="diagnostics" />
                  </a>
                </div>

                <dl className="es-hero-metrics" aria-label="Electrical systems coverage">
                  <div><dt>06</dt><dd>system layers</dd></div>
                  <div><dt>10</dt><dd>diagnostic stages</dd></div>
                  <div><dt>12</dt><dd>fault models</dd></div>
                  <div><dt>01</dt><dd>evidence standard</dd></div>
                </dl>
              </div>

              <div className="es-hero-console" aria-label="Illustrative electrical systems command console">
                <div className="es-console-head">
                  <div><span>ER / NEXUS</span><strong>Electrical command field</strong></div>
                  <small><i /> interactive reference model</small>
                </div>
                <SignalScope />
                <div className="es-console-readings">
                  <div><small>Potential</small><strong>415.0 <span>V</span></strong><i /></div>
                  <div><small>Frequency</small><strong>50.00 <span>Hz</span></strong><i /></div>
                  <div><small>Protection</small><strong>READY</strong><i /></div>
                </div>
                <div className="es-console-path">
                  {architectureNodes.map((node, index) => (
                    <button
                      key={node.id}
                      type="button"
                      className={activeNode === node.id ? 'active' : ''}
                      onClick={() => setActiveNode(node.id)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{node.title}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContentDisclosure page="electrical" />

        <section id="architecture" className="es-section es-architecture" aria-labelledby="architecture-title">
          <div className="nx-shell">
            <header className="es-section-head">
              <div>
                <p className="nx-eyebrow"><span>01</span> System architecture</p>
                <h2 id="architecture-title">Six layers. One electrical decision chain.</h2>
              </div>
              <p>
                Reliable diagnosis begins by understanding where energy originates,
                how it is protected, where it travels, what controls it, which load
                consumes it and how the real result is measured.
              </p>
            </header>

            <FlowDiagram activeNode={activeNode} />

            <div className="es-architecture-grid">
              <div className="es-node-selector" role="tablist" aria-label="Electrical architecture layers">
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
                    <div><small>{node.code}</small><strong>{node.title}</strong></div>
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedNode.id}
                  className="es-node-detail"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="es-node-detail-head">
                    <div className="es-node-symbol"><Icon name="electrical" /></div>
                    <div><small>ACTIVE LAYER / {selectedNode.code}</small><h3>{selectedNode.title}</h3></div>
                    <span><i /> mapped</span>
                  </div>
                  <p className="es-node-role">{selectedNode.role}</p>
                  <div className="es-node-summary">
                    <div><small>Purpose</small><p>{selectedNode.purpose}</p></div>
                    <div><small>Operating principle</small><p>{selectedNode.operatingPrinciple}</p></div>
                  </div>
                  <div className="es-node-columns">
                    <div><small>Typical equipment</small><ul>{selectedNode.examples.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><small>Common faults</small><ul>{selectedNode.commonFaults.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><small>Diagnostic evidence</small><ul>{selectedNode.diagnosticChecks.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  </div>
                  <div className="es-node-safety"><Icon name="check" /><div><small>Safety control</small><p>{selectedNode.safety}</p></div></div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="fundamentals" className="es-section es-fundamentals" aria-labelledby="fundamentals-title">
          <div className="nx-shell">
            <header className="es-section-head es-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>02</span> Electrical fundamentals</p>
                <h2 id="fundamentals-title">The quantities behind every system behaviour.</h2>
              </div>
              <p>
                Voltage alone does not prove that a circuit can work. Professional
                testing connects voltage, current, resistance, power, time and the
                actual operating load.
              </p>
            </header>

            <div className="es-principles-grid">
              {electricalPrinciples.map((principle) => (
                <article key={principle.code}>
                  <span>{principle.code}</span>
                  <small>{principle.unit}</small>
                  <h3>{principle.title}</h3>
                  <p>{principle.definition}</p>
                  <div><strong>Field meaning</strong><p>{principle.fieldMeaning}</p></div>
                </article>
              ))}
            </div>

            <div className="es-calculator-grid">
              <div className="es-calculator-copy">
                <p className="es-mini-label">INTERACTIVE REFERENCE / OHM'S LAW</p>
                <h3>Translate measurements into system demand.</h3>
                <p>
                  Set a voltage and resistance to calculate ideal current, power and
                  hourly energy. Real systems also include temperature, source
                  impedance, waveform, efficiency and changing load.
                </p>
                <div className="es-equation-bank">
                  <span>V = I × R</span>
                  <span>I = V ÷ R</span>
                  <span>P = V × I</span>
                  <span>E = P × t</span>
                </div>
              </div>

              <div className="es-calculator" aria-label="Ohm's law and power calculator">
                <div className="es-calculator-inputs">
                  <label>
                    <span>Voltage</span>
                    <div><input type="number" min="0" max="100000" step="0.1" value={voltage} onChange={(event: ChangeEvent<HTMLInputElement>) => setVoltage(clampNumber(Number(event.target.value), 0, 100000))} /><small>V</small></div>
                  </label>
                  <label>
                    <span>Resistance</span>
                    <div><input type="number" min="0.001" max="1000000" step="0.1" value={resistance} onChange={(event: ChangeEvent<HTMLInputElement>) => setResistance(clampNumber(Number(event.target.value), 0.001, 1000000))} /><small>Ω</small></div>
                  </label>
                </div>
                <div className="es-calculator-results">
                  <div><small>Calculated current</small><strong>{current.toFixed(current < 10 ? 3 : 2)} <span>A</span></strong></div>
                  <div><small>Calculated power</small><strong>{power.toFixed(power < 100 ? 2 : 1)} <span>W</span></strong></div>
                  <div><small>Energy in one hour</small><strong>{energyPerHour.toFixed(3)} <span>kWh</span></strong></div>
                </div>
                <p className="es-calculator-note"><Icon name="report" /> Reference calculation only. Engineering selection must include duty, tolerances, inrush, environment and applicable requirements.</p>
              </div>
            </div>

            <div className="es-power-forms">
              {powerForms.map((form) => (
                <article key={form.code}>
                  <div><span>{form.code}</span><small>{form.signature}</small></div>
                  <h3>{form.title}</h3>
                  <p>{form.explanation}</p>
                  <ul>{form.checkpoints.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="domains" className="es-section es-domains" aria-labelledby="domains-title">
          <div className="nx-shell">
            <header className="es-section-head">
              <div>
                <p className="nx-eyebrow"><span>03</span> Electrical disciplines</p>
                <h2 id="domains-title">From energy source to verified performance.</h2>
              </div>
              <p>
                Electrical engineering spans multiple specialities, but the system
                remains connected. Design, installation, protection, control and
                measurement must agree with the same operating reality.
              </p>
            </header>

            <div className="es-domain-workspace">
              <div className="es-domain-tabs" role="tablist" aria-label="Electrical system disciplines">
                {electricalDomains.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    role="tab"
                    aria-selected={activeDomain === domain.id}
                    className={activeDomain === domain.id ? 'active' : ''}
                    onClick={() => setActiveDomain(domain.id)}
                  >
                    <span>{domain.code}</span>
                    <div><strong>{domain.title}</strong><small>{domain.summary}</small></div>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedDomain.id}
                  className="es-domain-stage"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="es-domain-orbit" aria-hidden="true"><span /><span /><span /><i /></div>
                  <small>DISCIPLINE / {selectedDomain.code}</small>
                  <h3>{selectedDomain.title}</h3>
                  <p>{selectedDomain.summary}</p>
                  <ul>{selectedDomain.systems.map((system) => <li key={system}><span />{system}</li>)}</ul>
                  <blockquote><small>Engineering question</small>{selectedDomain.engineeringQuestion}</blockquote>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="diagnostics" className="es-section es-diagnostics" aria-labelledby="diagnostics-title">
          <div className="nx-shell">
            <header className="es-section-head es-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>04</span> Diagnostic intelligence</p>
                <h2 id="diagnostics-title">Diagnosis is a controlled evidence process.</h2>
              </div>
              <p>
                Replacing a part is not diagnosis. Diagnosis proves where expected
                electrical behaviour ends, explains why it ended and verifies that
                the completed correction restores the entire operating chain.
              </p>
            </header>

            <div className="es-workflow">
              {diagnosticWorkflow.map((step) => {
                const isOpen = openWorkflow === step.code;
                return (
                  <article key={step.code} className={isOpen ? 'active' : ''}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpenWorkflow(isOpen ? '' : step.code)}>
                      <span>{step.code}</span>
                      <strong>{step.title}</strong>
                      <i>{isOpen ? '−' : '+'}</i>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          className="es-workflow-detail"
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        >
                          <p>{step.detail}</p>
                          <div><small>Required evidence</small><strong>{step.evidence}</strong></div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>

            <div className="es-scenario-lab">
              <div className="es-scenario-copy">
                <p className="es-mini-label">FAULT ISOLATION LAB</p>
                <h3>Start from the symptom. Move by verified boundaries.</h3>
                <p>Select a fault condition to see the first-priority decision path.</p>
                <div className="es-scenario-tabs">
                  {diagnosticScenarios.map((scenario) => (
                    <button key={scenario.id} type="button" className={activeScenario === scenario.id ? 'active' : ''} onClick={() => setActiveScenario(scenario.id)}>
                      {scenario.title}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScenario.id}
                  className="es-scenario-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  <div className="es-scenario-priority"><small>Priority</small><strong>{selectedScenario.priority}</strong></div>
                  <ol>{selectedScenario.sequence.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
                  <div className="es-stop-rule"><Icon name="electrical" /><div><small>Stop rule</small><p>{selectedScenario.stopRule}</p></div></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="tools" className="es-section es-tools" aria-labelledby="tools-title">
          <div className="nx-shell">
            <header className="es-section-head">
              <div>
                <p className="nx-eyebrow"><span>05</span> Measurement instruments</p>
                <h2 id="tools-title">The right instrument must answer the right question.</h2>
              </div>
              <p>
                Instrument choice, connection method, category rating and test
                condition determine whether a reading is useful, misleading or unsafe.
              </p>
            </header>

            <div className="es-tools-grid">
              {diagnosticTools.map((tool, index) => (
                <article key={tool.code}>
                  <div className="es-tool-head"><span>{String(index + 1).padStart(2, '0')}</span><small>{tool.code}</small></div>
                  <div className="es-tool-icon"><Icon name={index % 3 === 0 ? 'diagnostics' : index % 3 === 1 ? 'electrical' : 'workshop'} /></div>
                  <h3>{tool.name}</h3>
                  <dl>
                    <div><dt>Measures</dt><dd>{tool.measures}</dd></div>
                    <div><dt>Best use</dt><dd>{tool.bestUse}</dd></div>
                    <div><dt>Control</dt><dd>{tool.caution}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fault-library" className="es-section es-faults" aria-labelledby="faults-title">
          <div className="nx-shell">
            <header className="es-section-head es-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>06</span> Fault intelligence library</p>
                <h2 id="faults-title">Search symptoms. Follow evidence. Prove the correction.</h2>
              </div>
              <p>
                The library organises common electrical failures by the section of
                the system they affect. It is a reasoning reference—not a substitute
                for safe inspection, drawings and equipment-specific requirements.
              </p>
            </header>

            <div className="es-fault-controls">
              <label className="es-fault-search">
                <Icon name="search" />
                <input value={faultQuery} onChange={(event: ChangeEvent<HTMLInputElement>) => setFaultQuery(event.target.value)} placeholder="Search a symptom, cause or test…" aria-label="Search electrical faults" />
              </label>
              <div className="es-fault-filters" role="group" aria-label="Filter fault categories">
                {faultCategories.map((category) => (
                  <button key={category.id} type="button" className={faultCategory === category.id ? 'active' : ''} onClick={() => selectCategory(category.id)}>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="es-fault-workspace">
              <div className="es-fault-list" aria-label={`${filteredFaults.length} matching electrical faults`}>
                {filteredFaults.map((fault, index) => (
                  <button key={fault.id} type="button" className={selectedFault?.id === fault.id ? 'active' : ''} onClick={() => setActiveFault(fault.id)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><small>{fault.category}</small><strong>{fault.title}</strong><p>{fault.symptom}</p></div>
                    <Icon name="arrow" />
                  </button>
                ))}
                {!filteredFaults.length ? <p className="es-no-faults">No matching fault model. Try another technical term.</p> : null}
              </div>

              <AnimatePresence mode="wait">
                {selectedFault ? (
                  <motion.article
                    key={selectedFault.id}
                    className="es-fault-detail"
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  >
                    <div className="es-fault-detail-head"><div><small>{selectedFault.category} fault model</small><h3>{selectedFault.title}</h3></div><span><i /> reference active</span></div>
                    <div className="es-fault-block es-fault-symptom"><small>Symptom</small><p>{selectedFault.symptom}</p></div>
                    <div className="es-fault-two-column">
                      <div className="es-fault-block"><small>Likely causes</small><ul>{selectedFault.likelyCauses.map((cause) => <li key={cause}>{cause}</li>)}</ul></div>
                      <div className="es-fault-block"><small>Test method</small><ul>{selectedFault.tests.map((test) => <li key={test}>{test}</li>)}</ul></div>
                    </div>
                    <div className="es-fault-verification">
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

        <section id="safety" className="es-section es-safety" aria-labelledby="safety-title">
          <div className="nx-shell">
            <header className="es-section-head">
              <div>
                <p className="nx-eyebrow"><span>07</span> Safety engineering</p>
                <h2 id="safety-title">Electrical knowledge begins with energy control.</h2>
              </div>
              <p>
                Safety is part of system architecture, test planning, protection,
                documentation and final verification. It cannot be added after the
                technical work is complete.
              </p>
            </header>

            <div className="es-safety-grid">
              {safetyPrinciples.map((principle) => (
                <article key={principle.code}>
                  <span>{principle.code}</span>
                  <Icon name="check" />
                  <h3>{principle.title}</h3>
                  <p>{principle.detail}</p>
                </article>
              ))}
            </div>

            <div className="es-standards">
              <div className="es-standards-copy">
                <p className="es-mini-label">NEXUS ENGINEERING STANDARD</p>
                <h3>Build systems that can be isolated, understood, tested and maintained.</h3>
                <p>
                  Professional quality is visible in conductor selection, protection
                  coordination, identification, access, documentation and the ability
                  to prove system behaviour after work is completed.
                </p>
              </div>
              <ol>{engineeringStandards.map((standard, index) => <li key={standard}><span>{String(index + 1).padStart(2, '0')}</span><p>{standard}</p></li>)}</ol>
            </div>
          </div>
        </section>

        <section className="es-closing" aria-labelledby="es-closing-title">
          <div className="es-closing-grid" aria-hidden="true" />
          <div className="nx-shell es-closing-layout">
            <div>
              <p className="nx-eyebrow"><span>08</span> Power. Protection. Control.</p>
              <h2 id="es-closing-title">Electrical reliability is engineered as a complete system.</h2>
            </div>
            <div>
              <p>
                Nexus connects system architecture, measurement, safety and technical
                reporting so an electrical decision can be explained, tested and trusted.
              </p>
              <div className="es-closing-actions">
                <a className="es-btn es-btn-primary" href="/#contact">Discuss an electrical system <Icon name="arrow" /></a>
                <Link className="es-btn es-btn-ghost" to="/automotive-systems">Automotive Systems <Icon name="engine" /></Link>
                <Link className="es-btn es-btn-ghost" to="/digital-systems">Digital Systems <Icon name="code" /></Link>
                <Link className="es-btn es-btn-ghost" to="/about">Professional profile <Icon name="external" /></Link>
              </div>
              <small>Electrical Systems · Nexus Field Systems · Ecatu Ronald</small>
            </div>
          </div>
        </section>
      </main>

      <NexusFooter />
    </>
  );
}
