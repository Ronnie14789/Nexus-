import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import NexusFooter from '@/components/nexus/NexusFooter';
import AutomotiveHubNav from '@/components/automotive/AutomotiveHubNav';
import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/data/portfolio';
import {
  automotiveDomains,
  automotiveFaults,
  diagnosticScenarios,
  diagnosticTools,
  diagnosticWorkflow,
  engineeringStandards,
  faultCategories,
  fieldCaseFiles,
  maintenanceLayers,
  operatingCycles,
  safetyPrinciples,
  vehicleArchitecture,
  type AutomotiveNodeId,
  type FaultCategory,
} from '@/data/automotiveSystems';
import '@/automotive-systems.css';

const description =
  'A professional automotive-systems knowledge and diagnostics environment by Ecatu Ronald covering powertrain, driveline, braking, steering, vehicle electronics, aftertreatment, maintenance and evidence-based root-cause analysis.';

const automotiveSystemsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://ecaturonald.tech/automotive-systems#webpage',
    url: 'https://ecaturonald.tech/automotive-systems',
    name: 'Automotive Systems | Nexus by Ecatu Ronald',
    description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://ecaturonald.tech/#website',
      name: 'Ecatu Ronald — Nexus Field Systems',
      url: 'https://ecaturonald.tech/',
    },
    about: [
      'Automotive engineering',
      'Commercial vehicle diagnostics',
      'Diesel engine systems',
      'Driveline systems',
      'Braking and steering systems',
      'Vehicle electronics',
      'Aftertreatment diagnostics',
      'Fleet maintenance',
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
        name: 'Automotive Systems',
        item: 'https://ecaturonald.tech/automotive-systems',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Nexus Automotive Systems Knowledge Centre',
    description,
    educationalLevel: 'Technical and professional',
    learningResourceType: 'Interactive automotive engineering reference',
    teaches: [
      'Complete vehicle-system architecture',
      'Four-stroke diesel operating cycle',
      'Commercial-vehicle diagnostics',
      'Powertrain and driveline fault isolation',
      'Braking, steering and chassis systems',
      'Vehicle electronics and aftertreatment',
      'Maintenance and technical verification',
    ],
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  },
];

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

function VehicleTopology({ activeNode }: { activeNode: AutomotiveNodeId }) {
  return (
    <svg
      className="as-topology"
      viewBox="0 0 920 430"
      role="img"
      aria-label="Illustrative commercial vehicle system topology"
    >
      <defs>
        <linearGradient id="asSignalGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2868ff" />
          <stop offset="48%" stopColor="#ffb35c" />
          <stop offset="100%" stopColor="#ff6b4a" />
        </linearGradient>
        <filter id="asGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="as-topology-grid" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <line key={`v-${index}`} x1={index * 61.3} y1="0" x2={index * 61.3} y2="430" />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={index * 61.4} x2="920" y2={index * 61.4} />
        ))}
      </g>

      <g className="as-vehicle-outline">
        <path d="M122 258h78l54-92h278l90 92h103l45 43v42H122z" />
        <path d="M254 166v92m278-92v92M200 258h525" />
        <circle cx="258" cy="343" r="54" />
        <circle cx="666" cy="343" r="54" />
        <circle cx="258" cy="343" r="17" />
        <circle cx="666" cy="343" r="17" />
      </g>

      <path
        className="as-power-path"
        filter="url(#asGlow)"
        stroke="url(#asSignalGradient)"
        d="M176 222h112l56 70h126l61-75h92"
      />

      <g className={`as-topology-node as-node-energy ${activeNode === 'energy' ? 'active' : ''}`}>
        <circle cx="174" cy="222" r="20" />
        <text x="174" y="226">E</text>
      </g>
      <g className={`as-topology-node as-node-air ${activeNode === 'air' ? 'active' : ''}`}>
        <circle cx="286" cy="185" r="20" />
        <text x="286" y="189">A</text>
      </g>
      <g className={`as-topology-node as-node-combustion ${activeNode === 'combustion' ? 'active' : ''}`}>
        <circle cx="345" cy="292" r="20" />
        <text x="345" y="296">C</text>
      </g>
      <g className={`as-topology-node as-node-thermal ${activeNode === 'thermal' ? 'active' : ''}`}>
        <circle cx="423" cy="214" r="20" />
        <text x="423" y="218">T</text>
      </g>
      <g className={`as-topology-node as-node-driveline ${activeNode === 'driveline' ? 'active' : ''}`}>
        <circle cx="471" cy="292" r="20" />
        <text x="471" y="296">D</text>
      </g>
      <g className={`as-topology-node as-node-chassis ${activeNode === 'chassis' ? 'active' : ''}`}>
        <circle cx="665" cy="343" r="20" />
        <text x="665" y="347">R</text>
      </g>
      <g className={`as-topology-node as-node-control ${activeNode === 'control' ? 'active' : ''}`}>
        <circle cx="500" cy="150" r="20" />
        <text x="500" y="154">N</text>
      </g>
      <g className={`as-topology-node as-node-aftertreatment ${activeNode === 'aftertreatment' ? 'active' : ''}`}>
        <circle cx="624" cy="217" r="20" />
        <text x="624" y="221">X</text>
      </g>

      <g className="as-topology-signals">
        <path d="M286 185 345 292M345 292 423 214M423 214 500 150M500 150 624 217M471 292 665 343" />
      </g>
    </svg>
  );
}

function SystemFlow({ activeNode }: { activeNode: AutomotiveNodeId }) {
  return (
    <div className="as-flow" aria-label="Automotive energy, control and motion flow">
      <div className="as-flow-line" aria-hidden="true" />
      {vehicleArchitecture.map((stage, index) => (
        <div
          key={stage.id}
          className={`as-flow-stage ${activeNode === stage.id ? 'active' : ''}`}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{stage.title}</strong>
          <small>{stage.code}</small>
        </div>
      ))}
    </div>
  );
}

export default function AutomotiveSystems() {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<AutomotiveNodeId>('combustion');
  const [activeCycle, setActiveCycle] =
    useState<(typeof operatingCycles)[number]['id']>(operatingCycles[0].id);
  const [activeDomain, setActiveDomain] =
    useState<(typeof automotiveDomains)[number]['id']>(automotiveDomains[0].id);
  const [activeScenario, setActiveScenario] =
    useState<(typeof diagnosticScenarios)[number]['id']>(diagnosticScenarios[0].id);
  const [openWorkflow, setOpenWorkflow] = useState('01');
  const [faultCategory, setFaultCategory] = useState<'all' | FaultCategory>('all');
  const [faultQuery, setFaultQuery] = useState('');
  const [activeFault, setActiveFault] =
    useState<(typeof automotiveFaults)[number]['id']>(automotiveFaults[0].id);
  const [activeCase, setActiveCase] =
    useState<(typeof fieldCaseFiles)[number]['code']>(fieldCaseFiles[0].code);
  const [engineRpm, setEngineRpm] = useState(1800);
  const [gearRatio, setGearRatio] = useState(1.42);
  const [axleRatio, setAxleRatio] = useState(4.88);
  const [tyreCircumference, setTyreCircumference] = useState(3.05);

  const selectedNode =
    vehicleArchitecture.find((node) => node.id === activeNode) ?? vehicleArchitecture[0];
  const selectedCycle =
    operatingCycles.find((cycle) => cycle.id === activeCycle) ?? operatingCycles[0];
  const selectedDomain =
    automotiveDomains.find((domain) => domain.id === activeDomain) ?? automotiveDomains[0];
  const selectedScenario =
    diagnosticScenarios.find((scenario) => scenario.id === activeScenario) ??
    diagnosticScenarios[0];
  const selectedCase =
    fieldCaseFiles.find((caseFile) => caseFile.code === activeCase) ?? fieldCaseFiles[0];

  const totalRatio = Math.max(gearRatio * axleRatio, 0.01);
  const wheelRpm = engineRpm / totalRatio;
  const roadSpeed = (wheelRpm * tyreCircumference * 60) / 1000;

  const filteredFaults = useMemo(() => {
    const clean = faultQuery.trim().toLowerCase();
    return automotiveFaults.filter((fault) => {
      const matchesCategory =
        faultCategory === 'all' || fault.category === faultCategory;
      const searchable = [
        fault.title,
        fault.symptom,
        ...fault.likelyCauses,
        ...fault.tests,
        fault.expected,
        fault.correctiveAction,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!clean || searchable.includes(clean));
    });
  }, [faultCategory, faultQuery]);

  const selectedFault =
    filteredFaults.find((fault) => fault.id === activeFault) ??
    filteredFaults[0] ??
    null;

  const selectCategory = (category: 'all' | FaultCategory) => {
    setFaultCategory(category);
    const next = automotiveFaults.find(
      (fault) => category === 'all' || fault.category === category,
    );
    if (next) setActiveFault(next.id);
  };

  return (
    <>
      <Seo
        title="Automotive Systems | Powertrain, Chassis, Control & Diagnostics"
        description={description}
        canonicalPath="/automotive-systems"
        image="/images/og-portfolio.jpg"
        ogType="website"
        jsonLd={automotiveSystemsSchema}
      />

      <a className="skip-link" href="#automotive-main">
        Skip to automotive systems
      </a>

      <main id="automotive-main" className="as-page">
        <section className="as-hero" aria-labelledby="as-hero-title">
          <div className="as-hero-grid" aria-hidden="true" />
          <div className="as-hero-energy as-hero-energy-a" aria-hidden="true" />
          <div className="as-hero-energy as-hero-energy-b" aria-hidden="true" />

          <div className="nx-shell as-hero-shell">
            <nav className="as-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Nexus</Link>
              <span>/</span>
              <strong>Automotive systems</strong>
            </nav>

            <div className="as-hero-layout">
              <div className="as-hero-copy">
                <p className="as-system-line">
                  <span className="as-live-dot" /> NEXUS MOTION DOMAIN · VEHICLE ONLINE
                </p>
                <p className="as-overline">
                  ENERGY / COMBUSTION / MOTION / CONTROL / EVIDENCE
                </p>
                <h1 id="as-hero-title">
                  Automotive
                  <em> systems.</em>
                </h1>
                <p className="as-hero-lead">
                  A complete engineering view of how a vehicle stores energy, creates
                  torque, controls motion, protects occupants, manages emissions and
                  communicates its real operating condition.
                </p>
                <p className="as-hero-intro">
                  Nexus does not treat the engine, gearbox, brakes, steering,
                  electronics or aftertreatment as isolated parts. A professional
                  diagnosis follows the interaction between systems and proves the
                  root cause before replacement.
                </p>

                <div className="as-hero-actions">
                  <a className="as-btn as-btn-primary" href="#architecture">
                    Enter vehicle architecture <Icon name="arrow" />
                  </a>
                  <Link className="as-btn as-btn-ghost" to="/automotive-systems/intelligence">
                    Open Automotive Intelligence <Icon name="diagnostics" />
                  </Link>
                </div>

                <dl className="as-hero-metrics" aria-label="Automotive systems coverage">
                  <div><dt>08</dt><dd>vehicle layers</dd></div>
                  <div><dt>12</dt><dd>diagnostic stages</dd></div>
                  <div><dt>16</dt><dd>fault models</dd></div>
                  <div><dt>01</dt><dd>root-cause standard</dd></div>
                </dl>
              </div>

              <div className="as-hero-console" aria-label="Illustrative vehicle systems command console">
                <div className="as-console-head">
                  <div><span>ER / NEXUS</span><strong>Vehicle systems command field</strong></div>
                  <small><i /> live reference model</small>
                </div>
                <VehicleTopology activeNode={activeNode} />
                <div className="as-console-readings">
                  <div><small>Engine state</small><strong>1,800 <span>rpm</span></strong><i /></div>
                  <div><small>Vehicle network</small><strong>ACTIVE</strong><i /></div>
                  <div><small>Diagnostic standard</small><strong>ROOT CAUSE</strong><i /></div>
                </div>
                <div className="as-console-path">
                  {vehicleArchitecture.map((node, index) => (
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

        <AutomotiveHubNav />

        <section
          id="architecture"
          className="as-section as-architecture"
          aria-labelledby="architecture-title"
        >
          <div className="nx-shell">
            <header className="as-section-head">
              <div>
                <p className="nx-eyebrow"><span>01</span> Vehicle architecture</p>
                <h2 id="architecture-title">Eight systems. One operating machine.</h2>
              </div>
              <p>
                A vehicle performs only when energy, air, combustion, thermal
                control, driveline, chassis, electronic control and aftertreatment
                remain aligned under the same real-world duty.
              </p>
            </header>

            <SystemFlow activeNode={activeNode} />

            <div className="as-architecture-grid">
              <div
                className="as-node-selector"
                role="tablist"
                aria-label="Automotive architecture layers"
              >
                {vehicleArchitecture.map((node, index) => (
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
                  className="as-node-detail"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="as-node-detail-head">
                    <div className="as-node-symbol"><Icon name="engine" /></div>
                    <div><small>ACTIVE LAYER / {selectedNode.code}</small><h3>{selectedNode.title}</h3></div>
                    <span><i /> mapped</span>
                  </div>
                  <p className="as-node-role">{selectedNode.role}</p>
                  <div className="as-node-summary">
                    <div><small>Purpose</small><p>{selectedNode.purpose}</p></div>
                    <div><small>Operating principle</small><p>{selectedNode.operatingPrinciple}</p></div>
                  </div>
                  <div className="as-node-columns">
                    <div><small>Typical components</small><ul>{selectedNode.examples.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><small>Common faults</small><ul>{selectedNode.commonFaults.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    <div><small>Diagnostic evidence</small><ul>{selectedNode.diagnosticChecks.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  </div>
                  <div className="as-node-interaction">
                    <Icon name="diagnostics" />
                    <div><small>System interaction</small><p>{selectedNode.interaction}</p></div>
                  </div>
                  <div className="as-node-safety">
                    <Icon name="check" />
                    <div><small>Safety control</small><p>{selectedNode.safety}</p></div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section
          id="operating-cycle"
          className="as-section as-fundamentals"
          aria-labelledby="cycle-title"
        >
          <div className="nx-shell">
            <header className="as-section-head as-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>02</span> Engine operating physics</p>
                <h2 id="cycle-title">Four strokes convert controlled pressure into torque.</h2>
              </div>
              <p>
                Combustion quality is the combined result of air mass, compression,
                fuel delivery, timing, sealing, temperature and exhaust flow. Each
                stroke creates its own diagnostic evidence.
              </p>
            </header>

            <div className="as-cycle-workspace">
              <div className="as-cycle-tabs" role="tablist" aria-label="Four-stroke engine cycle">
                {operatingCycles.map((cycle) => (
                  <button
                    key={cycle.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCycle === cycle.id}
                    className={activeCycle === cycle.id ? 'active' : ''}
                    onClick={() => setActiveCycle(cycle.id)}
                  >
                    <span>{cycle.code}</span>
                    <strong>{cycle.title}</strong>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedCycle.id}
                  className="as-cycle-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                >
                  <div className={`as-cylinder as-cylinder-${selectedCycle.id}`} aria-hidden="true">
                    <div className="as-cylinder-head"><i /><i /></div>
                    <div className="as-cylinder-bore">
                      <span className="as-cylinder-charge" />
                      <div className="as-piston"><i /></div>
                    </div>
                    <div className="as-crank"><span /><i /></div>
                  </div>
                  <div className="as-cycle-copy">
                    <small>STROKE / {selectedCycle.code}</small>
                    <h3>{selectedCycle.title}</h3>
                    <p>{selectedCycle.event}</p>
                    <dl>
                      <div><dt>Valve state</dt><dd>{selectedCycle.valveState}</dd></div>
                      <div><dt>Pressure state</dt><dd>{selectedCycle.pressureState}</dd></div>
                      <div><dt>Engineering purpose</dt><dd>{selectedCycle.purpose}</dd></div>
                    </dl>
                    <div className="as-cycle-columns">
                      <div><small>Failure signatures</small><ul>{selectedCycle.failureSignatures.map((item) => <li key={item}>{item}</li>)}</ul></div>
                      <div><small>Evidence path</small><ul>{selectedCycle.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="as-calculator-grid">
              <div className="as-calculator-copy">
                <p className="as-mini-label">INTERACTIVE REFERENCE / DRIVELINE RATIO</p>
                <h3>Translate engine speed into estimated road speed.</h3>
                <p>
                  Set engine speed, selected gear ratio, final-drive ratio and tyre
                  circumference. The estimate reveals how transmission and axle
                  multiplication connect engine rotation with wheel speed.
                </p>
                <div className="as-equation-bank">
                  <span>Total ratio = gear × axle</span>
                  <span>Wheel rpm = engine rpm ÷ total ratio</span>
                  <span>Speed = wheel rpm × tyre circumference</span>
                </div>
              </div>

              <div className="as-calculator" aria-label="Driveline road-speed estimator">
                <div className="as-calculator-inputs as-calculator-inputs-four">
                  <label>
                    <span>Engine speed</span>
                    <div><input type="number" min="0" max="6000" step="50" value={engineRpm} onChange={(event: ChangeEvent<HTMLInputElement>) => setEngineRpm(clampNumber(Number(event.target.value), 0, 6000))} /><small>rpm</small></div>
                  </label>
                  <label>
                    <span>Gear ratio</span>
                    <div><input type="number" min="0.1" max="15" step="0.01" value={gearRatio} onChange={(event: ChangeEvent<HTMLInputElement>) => setGearRatio(clampNumber(Number(event.target.value), 0.1, 15))} /><small>:1</small></div>
                  </label>
                  <label>
                    <span>Axle ratio</span>
                    <div><input type="number" min="0.1" max="15" step="0.01" value={axleRatio} onChange={(event: ChangeEvent<HTMLInputElement>) => setAxleRatio(clampNumber(Number(event.target.value), 0.1, 15))} /><small>:1</small></div>
                  </label>
                  <label>
                    <span>Tyre circumference</span>
                    <div><input type="number" min="0.5" max="6" step="0.01" value={tyreCircumference} onChange={(event: ChangeEvent<HTMLInputElement>) => setTyreCircumference(clampNumber(Number(event.target.value), 0.5, 6))} /><small>m</small></div>
                  </label>
                </div>
                <div className="as-calculator-results">
                  <div><small>Total reduction</small><strong>{totalRatio.toFixed(2)} <span>:1</span></strong></div>
                  <div><small>Estimated wheel speed</small><strong>{wheelRpm.toFixed(1)} <span>rpm</span></strong></div>
                  <div><small>Estimated road speed</small><strong>{roadSpeed.toFixed(1)} <span>km/h</span></strong></div>
                </div>
                <p className="as-calculator-note">
                  <Icon name="report" /> Reference estimate only. Actual speed changes
                  with tyre growth, slip, converter behaviour, loaded radius and
                  transmission architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="domains" className="as-section as-domains" aria-labelledby="domains-title">
          <div className="nx-shell">
            <header className="as-section-head">
              <div>
                <p className="nx-eyebrow"><span>03</span> Automotive disciplines</p>
                <h2 id="domains-title">From cylinder pressure to controlled road motion.</h2>
              </div>
              <p>
                Automotive engineering joins mechanical, pneumatic, hydraulic,
                electrical, electronic, thermal and chemical systems. Diagnosis must
                follow those boundaries without losing the complete vehicle context.
              </p>
            </header>

            <div className="as-domain-workspace">
              <div className="as-domain-tabs" role="tablist" aria-label="Automotive system disciplines">
                {automotiveDomains.map((domain) => (
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
                  className="as-domain-stage"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="as-domain-orbit" aria-hidden="true"><span /><span /><span /><i /></div>
                  <small>DISCIPLINE / {selectedDomain.code}</small>
                  <h3>{selectedDomain.title}</h3>
                  <p>{selectedDomain.summary}</p>
                  <ul>{selectedDomain.systems.map((system) => <li key={system}><Icon name="check" />{system}</li>)}</ul>
                  <blockquote>
                    <span>Engineering question</span>
                    {selectedDomain.engineeringQuestion}
                  </blockquote>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="as-domain-bridge">
              <div>
                <Icon name="electrical" />
                <small>CONNECTED NEXUS DOMAIN</small>
                <h3>Electrical systems power and coordinate the modern vehicle.</h3>
                <p>
                  Starting, charging, sensing, actuation and communication are
                  integrated here in vehicle context and explored deeply in the
                  dedicated Electrical Systems command page.
                </p>
              </div>
              <Link className="as-btn as-btn-ghost" to="/electrical-systems">
                Continue to Electrical Systems <Icon name="external" />
              </Link>
            </div>
          </div>
        </section>

        <section id="diagnostics" className="as-section as-diagnostics" aria-labelledby="diagnostics-title">
          <div className="nx-shell">
            <header className="as-section-head as-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>04</span> Diagnostic command</p>
                <h2 id="diagnostics-title">Diagnosis is a controlled journey from complaint to proof.</h2>
              </div>
              <p>
                Professional diagnosis protects the vehicle from unnecessary
                replacement and protects the decision from assumption. Each stage
                must produce evidence before the next stage begins.
              </p>
            </header>

            <div className="as-workflow">
              {diagnosticWorkflow.map((step) => (
                <article key={step.code} className={openWorkflow === step.code ? 'active' : ''}>
                  <button
                    type="button"
                    aria-expanded={openWorkflow === step.code}
                    onClick={() => setOpenWorkflow(openWorkflow === step.code ? '' : step.code)}
                  >
                    <span>{step.code}</span>
                    <strong>{step.title}</strong>
                    <i>{openWorkflow === step.code ? '−' : '+'}</i>
                  </button>
                  <AnimatePresence initial={false}>
                    {openWorkflow === step.code ? (
                      <motion.div
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
              ))}
            </div>

            <div className="as-scenario-lab">
              <div className="as-scenario-intro">
                <p className="as-mini-label">SYMPTOM-DRIVEN ISOLATION LAB</p>
                <h3>Start from the complaint. Move by verified boundaries.</h3>
                <p>Select a vehicle condition to inspect the first-priority decision path.</p>
                <div className="as-scenario-tabs">
                  {diagnosticScenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      type="button"
                      className={activeScenario === scenario.id ? 'active' : ''}
                      onClick={() => setActiveScenario(scenario.id)}
                    >
                      {scenario.title}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScenario.id}
                  className="as-scenario-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                >
                  <div className="as-scenario-priority"><small>Priority</small><strong>{selectedScenario.priority}</strong></div>
                  <ol>{selectedScenario.sequence.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
                  <div className="as-stop-rule"><Icon name="engine" /><div><small>Stop rule</small><p>{selectedScenario.stopRule}</p></div></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="tools" className="as-section as-tools" aria-labelledby="tools-title">
          <div className="nx-shell">
            <header className="as-section-head">
              <div>
                <p className="nx-eyebrow"><span>05</span> Diagnostic instruments</p>
                <h2 id="tools-title">Tools convert symptoms into measurable system evidence.</h2>
              </div>
              <p>
                The instrument must match the physical quantity, expected range,
                connection method and operating condition. A precise tool used
                without system context can still produce the wrong decision.
              </p>
            </header>

            <div className="as-tools-grid">
              {diagnosticTools.map((tool, index) => (
                <article key={tool.code}>
                  <div className="as-tool-head"><span>{String(index + 1).padStart(2, '0')}</span><small>{tool.code}</small></div>
                  <div className="as-tool-icon">
                    <Icon name={index % 4 === 0 ? 'diagnostics' : index % 4 === 1 ? 'electrical' : index % 4 === 2 ? 'engine' : 'workshop'} />
                  </div>
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

        <section id="fault-library" className="as-section as-faults" aria-labelledby="faults-title">
          <div className="nx-shell">
            <header className="as-section-head as-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>06</span> Vehicle fault intelligence</p>
                <h2 id="faults-title">Search the symptom. Prove the failed boundary.</h2>
              </div>
              <p>
                These fault models connect customer complaints with likely causes,
                test methods, expected evidence, corrective action and final
                verification across the complete vehicle.
              </p>
            </header>

            <div className="as-fault-controls">
              <label className="as-fault-search">
                <Icon name="search" />
                <input
                  value={faultQuery}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setFaultQuery(event.target.value)}
                  placeholder="Search a symptom, component, cause or test…"
                  aria-label="Search automotive faults"
                />
              </label>
              <div className="as-fault-filters" role="group" aria-label="Filter fault categories">
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

            <div className="as-fault-workspace">
              <div className="as-fault-list" aria-label={`${filteredFaults.length} matching automotive faults`}>
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
                  <p className="as-no-faults">
                    No matching vehicle fault model. Try another technical term.
                  </p>
                ) : null}
              </div>

              <AnimatePresence mode="wait">
                {selectedFault ? (
                  <motion.article
                    key={selectedFault.id}
                    className="as-fault-detail"
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                  >
                    <div className="as-fault-detail-head">
                      <div><small>{selectedFault.category} fault model</small><h3>{selectedFault.title}</h3></div>
                      <span><i /> reference active</span>
                    </div>
                    <div className="as-fault-block as-fault-symptom"><small>Symptom</small><p>{selectedFault.symptom}</p></div>
                    <div className="as-fault-two-column">
                      <div className="as-fault-block"><small>Likely causes</small><ul>{selectedFault.likelyCauses.map((cause) => <li key={cause}>{cause}</li>)}</ul></div>
                      <div className="as-fault-block"><small>Test method</small><ul>{selectedFault.tests.map((test) => <li key={test}>{test}</li>)}</ul></div>
                    </div>
                    <div className="as-fault-verification">
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

        <section id="case-files" className="as-section as-case-files" aria-labelledby="case-files-title">
          <div className="nx-shell">
            <header className="as-section-head">
              <div>
                <p className="nx-eyebrow"><span>07</span> Field case intelligence</p>
                <h2 id="case-files-title">Real fault logic, anonymised for professional learning.</h2>
              </div>
              <p>
                These case patterns are structured around complaint, evidence,
                failure mechanism, technical decision and final verification. No
                customer identity or vehicle registration information is published.
              </p>
            </header>

            <div className="as-case-workspace">
              <div className="as-case-index" role="tablist" aria-label="Automotive diagnostic case files">
                {fieldCaseFiles.map((caseFile) => (
                  <button
                    key={caseFile.code}
                    type="button"
                    role="tab"
                    aria-selected={activeCase === caseFile.code}
                    className={activeCase === caseFile.code ? 'active' : ''}
                    onClick={() => setActiveCase(caseFile.code)}
                  >
                    <span>{caseFile.code}</span>
                    <strong>{caseFile.title}</strong>
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedCase.code}
                  className="as-case-stage"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                >
                  <div className="as-case-head">
                    <div><small>{selectedCase.code} / FIELD RECORD</small><h3>{selectedCase.title}</h3></div>
                    <span><i /> evidence controlled</span>
                  </div>
                  <div className="as-case-complaint">
                    <small>Reported complaint</small>
                    <p>{selectedCase.complaint}</p>
                  </div>
                  <div className="as-case-evidence">
                    <small>Evidence captured</small>
                    <ul>{selectedCase.evidence.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
                  </div>
                  <div className="as-case-decision-grid">
                    <div><small>Root cause logic</small><p>{selectedCase.rootCause}</p></div>
                    <div><small>Technical decision</small><p>{selectedCase.decision}</p></div>
                    <div><small>Verification</small><p>{selectedCase.verification}</p></div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="maintenance" className="as-section as-maintenance" aria-labelledby="maintenance-title">
          <div className="nx-shell">
            <header className="as-section-head as-section-head-dark">
              <div>
                <p className="nx-eyebrow"><span>08</span> Reliability engineering</p>
                <h2 id="maintenance-title">Maintenance protects system condition before failure becomes downtime.</h2>
              </div>
              <p>
                Reliability is not only a service interval. It combines daily
                inspection, correct parts and fluids, condition trends, driver
                communication and proof that every repair resolved the original risk.
              </p>
            </header>

            <div className="as-maintenance-grid">
              {maintenanceLayers.map((layer, index) => (
                <article key={layer.code}>
                  <div><span>{String(index + 1).padStart(2, '0')}</span><small>{layer.code}</small></div>
                  <h3>{layer.title}</h3>
                  <ul>{layer.items.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
                </article>
              ))}
            </div>

            <div className="as-reliability-line">
              <span>Complaint</span><i />
              <span>Evidence</span><i />
              <span>Root cause</span><i />
              <span>Controlled repair</span><i />
              <span>Duty verification</span>
            </div>
          </div>
        </section>

        <section id="safety" className="as-section as-safety" aria-labelledby="safety-title">
          <div className="nx-shell">
            <header className="as-section-head">
              <div>
                <p className="nx-eyebrow"><span>09</span> Automotive safety engineering</p>
                <h2 id="safety-title">Every diagnostic plan begins by controlling vehicle energy.</h2>
              </div>
              <p>
                Vehicles combine motion, heat, electricity, pressure, chemicals,
                rotating assemblies and suspended mass. Safe diagnosis is an
                engineering condition, not an instruction added at the end.
              </p>
            </header>

            <div className="as-safety-grid">
              {safetyPrinciples.map((principle) => (
                <article key={principle.code}>
                  <span>{principle.code}</span>
                  <Icon name="check" />
                  <h3>{principle.title}</h3>
                  <p>{principle.detail}</p>
                </article>
              ))}
            </div>

            <div className="as-standards">
              <div className="as-standards-copy">
                <p className="as-mini-label">NEXUS AUTOMOTIVE STANDARD</p>
                <h3>Repair the failure mechanism, restore the system and prove the duty.</h3>
                <p>
                  Professional automotive work can be traced from the customer
                  complaint through measurements and physical evidence to a controlled
                  repair and repeatable final verification.
                </p>
              </div>
              <ol>
                {engineeringStandards.map((standard, index) => (
                  <li key={standard}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{standard}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="as-closing" aria-labelledby="as-closing-title">
          <div className="as-closing-grid" aria-hidden="true" />
          <div className="nx-shell as-closing-layout">
            <div>
              <p className="nx-eyebrow"><span>10</span> Energy. Motion. Evidence.</p>
              <h2 id="as-closing-title">Vehicle reliability is engineered as one connected system.</h2>
            </div>
            <div>
              <p>
                Nexus connects operating physics, field measurements, diagnostic
                software, mechanical inspection and technical reporting so every
                automotive decision can be explained, tested and trusted.
              </p>
              <div className="as-closing-actions">
                <a className="as-btn as-btn-primary" href="/#contact">
                  Discuss an automotive system <Icon name="arrow" />
                </a>
                <Link className="as-btn as-btn-ghost" to="/electrical-systems">
                  Electrical Systems <Icon name="electrical" />
                </Link>
                <Link className="as-btn as-btn-ghost" to="/digital-systems">
                  Digital Systems <Icon name="code" />
                </Link>
                <Link className="as-btn as-btn-ghost" to="/about">
                  Professional profile <Icon name="external" />
                </Link>
              </div>
              <small>Automotive Systems · Nexus Field Systems · Ecatu Ronald</small>
            </div>
          </div>
        </section>
      </main>

      <NexusFooter />
    </>
  );
}
