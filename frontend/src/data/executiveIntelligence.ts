export type ExecutiveDomainId =
  | 'electrical'
  | 'automotive'
  | 'digital'
  | 'diagnostics'
  | 'knowledge'
  | 'operations';

export type ExecutiveState = 'ready' | 'watch' | 'planned';

export interface ExecutiveDomain {
  id: ExecutiveDomainId;
  index: string;
  code: string;
  name: string;
  role: string;
  state: ExecutiveState;
  route?: string;
  health: number;
  description: string;
  principle: string;
  signalPath: string[];
  capabilities: string[];
  telemetry: number[];
  tone: 'cyan' | 'blue' | 'lime' | 'amber' | 'red' | 'neutral';
}

export interface ExecutiveAction {
  id: string;
  label: string;
  detail: string;
  command: string;
  route?: string;
  domain: ExecutiveDomainId;
  status: 'available' | 'planned';
}

export interface IntelligenceItem {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  detail: string;
  owner: string;
  state: string;
  domain: ExecutiveDomainId;
}

export interface RoadmapModule {
  phase: string;
  title: string;
  status: 'active' | 'next' | 'planned';
  outcome: string;
  capabilities: string[];
}

export const executiveDomains: ExecutiveDomain[] = [
  {
    id: 'electrical',
    index: '01',
    code: 'PWR',
    name: 'Electrical Systems',
    role: 'Power generation, protection, distribution and control',
    state: 'ready',
    route: '/electrical-systems',
    health: 99.1,
    description:
      'A complete field model for supply, protection, distribution, control, load behaviour and measurement-led diagnostics.',
    principle: 'Measure before replacement.',
    signalPath: ['Source', 'Protection', 'Distribution', 'Control', 'Load', 'Feedback'],
    capabilities: [
      'AC and DC architecture',
      'Protection coordination',
      'Control and instrumentation',
      'Evidence-based fault isolation',
    ],
    telemetry: [72, 79, 77, 86, 84, 91, 90, 95, 94, 99],
    tone: 'cyan',
  },
  {
    id: 'automotive',
    index: '02',
    code: 'MOT',
    name: 'Automotive Systems',
    role: 'Powertrain, chassis, diagnostics and field reliability',
    state: 'ready',
    route: '/automotive-systems',
    health: 98.4,
    description:
      'A commercial-vehicle intelligence field connecting engine, driveline, braking, steering, chassis, electronics and aftertreatment.',
    principle: 'Find the root cause, not only the failed part.',
    signalPath: ['Complaint', 'Evidence', 'Inspection', 'Isolation', 'Repair', 'Verification'],
    capabilities: [
      'Powertrain diagnostics',
      'Driveline and chassis systems',
      'Vehicle electronics and CAN',
      'Warranty-quality technical reasoning',
    ],
    telemetry: [68, 74, 80, 78, 86, 83, 92, 90, 95, 98],
    tone: 'blue',
  },
  {
    id: 'digital',
    index: '03',
    code: 'INT',
    name: 'Digital Systems',
    role: 'Applications, data, APIs, security and operations',
    state: 'ready',
    route: '/digital-systems',
    health: 99.3,
    description:
      'A digital engineering architecture spanning experience, application, API, data, identity, observability, infrastructure and delivery.',
    principle: 'Build systems that can be understood, tested and operated.',
    signalPath: ['Need', 'Model', 'Interface', 'Validation', 'Delivery', 'Observation'],
    capabilities: [
      'Application architecture',
      'API and data systems',
      'Security and trust boundaries',
      'Production diagnostics and observability',
    ],
    telemetry: [70, 76, 81, 85, 84, 89, 94, 93, 97, 99],
    tone: 'lime',
  },
  {
    id: 'diagnostics',
    index: '04',
    code: 'DGN',
    name: 'Automotive Diagnostics',
    role: 'Automotive symptom, evidence and test-plan intelligence',
    state: 'ready',
    route: '/automotive-systems/diagnostics',
    health: 94.8,
    description:
      'A live explainable reasoning layer that transforms complaints and confirmed evidence into ranked causes, test plans, verification steps and report-ready conclusions.',
    principle: 'Reason from evidence, expose uncertainty and verify the result.',
    signalPath: ['Symptom', 'Context', 'Evidence', 'Hypothesis', 'Test', 'Conclusion'],
    capabilities: [
      'Guided symptom capture',
      'Probable-cause ranking',
      'Test-plan generation',
      'Technical report generation',
    ],
    telemetry: [12, 16, 18, 24, 27, 31, 34, 37, 40, 42],
    tone: 'amber',
  },
  {
    id: 'knowledge',
    index: '05',
    code: 'KNO',
    name: 'Knowledge Vault',
    role: 'Engineering procedures, cases and cross-reference',
    state: 'ready',
    route: '/knowledge-vault',
    health: 96.4,
    description:
      'A live, searchable engineering knowledge layer for procedures, field cases, diagnostics, standards, evidence sources and verification rules.',
    principle: 'Knowledge becomes valuable when it is searchable, traceable and reusable.',
    signalPath: ['Capture', 'Classify', 'Verify', 'Link', 'Retrieve', 'Improve'],
    capabilities: [
      'Technical knowledge graph',
      'Search and filtering',
      'Cross-domain references',
      'Field evidence archive',
    ],
    telemetry: [8, 11, 15, 18, 20, 24, 27, 29, 33, 35],
    tone: 'amber',
  },
  {
    id: 'operations',
    index: '06',
    code: 'OPS',
    name: 'Workshop & Fleet',
    role: 'Jobs, assets, maintenance and reliability operations',
    state: 'planned',
    health: 28,
    description:
      'The operations layer for workshop flow, fleet health, maintenance planning, downtime analysis and reliability decisions.',
    principle: 'Turn operational data into decisions before it becomes downtime.',
    signalPath: ['Asset', 'Condition', 'Work', 'Parts', 'Verification', 'Learning'],
    capabilities: [
      'Workshop command flow',
      'Fleet asset register',
      'Maintenance planning',
      'Reliability and downtime analysis',
    ],
    telemetry: [6, 9, 12, 14, 17, 19, 21, 23, 26, 28],
    tone: 'neutral',
  },
];

export const executiveActions: ExecutiveAction[] = [
  {
    id: 'open-electrical',
    label: 'Open Electrical Systems',
    detail: 'Explore power, protection, control and diagnostics.',
    command: 'open electrical',
    route: '/electrical-systems',
    domain: 'electrical',
    status: 'available',
  },
  {
    id: 'open-automotive',
    label: 'Open Automotive Systems',
    detail: 'Explore powertrain, chassis, electronics and field cases.',
    command: 'open automotive',
    route: '/automotive-systems',
    domain: 'automotive',
    status: 'available',
  },
  {
    id: 'open-digital',
    label: 'Open Digital Systems',
    detail: 'Explore architecture, data, cloud, security and operations.',
    command: 'open digital',
    route: '/digital-systems',
    domain: 'digital',
    status: 'available',
  },
  {
    id: 'system-status',
    label: 'Run Platform Status',
    detail: 'Read the live Nexus API and public-route status.',
    command: 'status',
    domain: 'digital',
    status: 'available',
  },
  {
    id: 'executive-brief',
    label: 'Generate Executive Brief',
    detail: 'Create a concise platform and roadmap briefing.',
    command: 'brief',
    domain: 'knowledge',
    status: 'available',
  },
  {
    id: 'diagnostic-session',
    label: 'Start Automotive Diagnostic Session',
    detail: 'Capture complaints and confirmed automotive evidence for explainable guided diagnosis.',
    command: 'open diagnostics',
    route: '/automotive-systems/diagnostics',
    domain: 'diagnostics',
    status: 'available',
  },
  {
    id: 'knowledge-search',
    label: 'Search Knowledge Vault',
    detail: 'Find procedures, cases, diagnostics, standards and field lessons.',
    command: 'open knowledge',
    route: '/knowledge-vault',
    domain: 'knowledge',
    status: 'available',
  },
  {
    id: 'operations-overview',
    label: 'Open Workshop & Fleet',
    detail: 'Inspect work, assets, maintenance and reliability.',
    command: 'open operations',
    domain: 'operations',
    status: 'planned',
  },
];

export const intelligenceQueue: IntelligenceItem[] = [
  {
    id: 'queue-architecture',
    priority: 'high',
    title: 'Unify the platform experience',
    detail: 'Introduce reusable command-center components and shared interaction standards across future Nexus modules.',
    owner: 'Design system',
    state: 'In progress',
    domain: 'digital',
  },
  {
    id: 'queue-diagnostics',
    priority: 'high',
    title: 'Model the diagnostic reasoning engine',
    detail: 'Define symptom, evidence, hypothesis, test and conclusion objects before adding AI inference.',
    owner: 'AI diagnostics',
    state: 'Next',
    domain: 'diagnostics',
  },
  {
    id: 'queue-knowledge',
    priority: 'medium',
    title: 'Operate the engineering knowledge schema',
    detail: 'Maintain procedures, field cases, diagnostics, evidence labels and cross-domain relationships as a trusted public knowledge system.',
    owner: 'Knowledge vault',
    state: 'Operational',
    domain: 'knowledge',
  },
  {
    id: 'queue-operations',
    priority: 'medium',
    title: 'Define workshop and fleet operating models',
    detail: 'Map jobs, vehicles, maintenance, parts, technicians, downtime and verification data.',
    owner: 'Operations',
    state: 'Planned',
    domain: 'operations',
  },
];

export const roadmapModules: RoadmapModule[] = [
  {
    phase: 'PHASE 01',
    title: 'Executive Intelligence',
    status: 'active',
    outcome: 'A single command surface for platform status, navigation, priorities and future modules.',
    capabilities: ['Mission control', 'Live platform pulse', 'Global command', 'Executive brief'],
  },
  {
    phase: 'PHASE 02',
    title: 'Engineering Knowledge Vault',
    status: 'active',
    outcome: 'A searchable and traceable knowledge system for procedures, cases and engineering evidence.',
    capabilities: ['Knowledge graph', 'Search', 'Cross-reference', 'Evidence archive'],
  },
  {
    phase: 'PHASE 03',
    title: 'AI Diagnostics',
    status: 'active',
    outcome: 'Guided fault analysis that ranks causes, recommends tests and generates technical reports.',
    capabilities: ['Symptom capture', 'Reasoning model', 'Test plans', 'Report generation'],
  },
  {
    phase: 'PHASE 04',
    title: 'Workshop Intelligence',
    status: 'next',
    outcome: 'A professional command center for jobs, technicians, parts, warranty and repair flow.',
    capabilities: ['Job control', 'Productivity', 'Parts status', 'Warranty workflow'],
  },
  {
    phase: 'PHASE 05',
    title: 'Fleet Intelligence',
    status: 'planned',
    outcome: 'A reliability platform for vehicle condition, maintenance, downtime and risk prediction.',
    capabilities: ['Asset register', 'Maintenance', 'Downtime', 'Reliability analytics'],
  },
  {
    phase: 'PHASE 06',
    title: 'Digital Twin',
    status: 'planned',
    outcome: 'An interactive vehicle model connecting components, signals, procedures and diagnostic evidence.',
    capabilities: ['3D system map', 'Component intelligence', 'Signal paths', 'Evidence overlay'],
  },
];

export const commandHelp = [
  'status — check the live Nexus platform pulse',
  'open electrical — enter Electrical Systems',
  'open automotive — enter Automotive Systems',
  'open digital — enter Digital Systems',
  'open knowledge — enter the Engineering Knowledge Vault',
  'open diagnostics — start Nexus AI Diagnostics',
  'brief — generate the executive platform brief',
  'roadmap — move to the strategic roadmap',
  'clear — clear terminal history',
  'help — show available commands',
];
