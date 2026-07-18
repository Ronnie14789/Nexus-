export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Evidence {
  id: string;
  label: string;
  weight: number;
}

export interface Cause {
  id: string;
  title: string;
  mechanism: string;
  baseScore: number;
  supports: string[];
  contradicts?: string[];
  tests: string[];
  verification: string[];
  knowledgeRefs: string[];
}

export interface DiagnosticModel {
  id: string;
  domain: string;
  title: string;
  summary: string;
  symptoms: string[];
  evidence: Evidence[];
  causes: Cause[];
}

export const diagnosticModels: DiagnosticModel[] = [
  {
    id: 'engine-knock',
    domain: 'Engine',
    title: 'Abnormal engine knock',
    summary: 'Separates localized bearing distress, combustion knock and external mechanical noise.',
    symptoms: ['engine knock', 'crankcase noise', 'noise under load'],
    evidence: [
      { id: 'load', label: 'Noise increases under load', weight: 16 },
      { id: 'heat', label: 'Localized journal heat marks', weight: 24 },
      { id: 'rotation', label: 'Bearing shell rotation or seizure', weight: 28 },
      { id: 'mains-ok', label: 'Main bearings not damaged', weight: 12 },
      { id: 'external-ok', label: 'External accessories checked', weight: 8 },
    ],
    causes: [
      {
        id: 'rod-bearing',
        title: 'Localized connecting-rod bearing failure',
        mechanism: 'Loss of oil-film integrity causes metal contact, heat and journal scoring.',
        baseScore: 34,
        supports: ['load', 'heat', 'rotation', 'mains-ok'],
        tests: ['Measure affected journal', 'Inspect oil feed passage', 'Check connecting-rod big-end distortion', 'Compare all other journals'],
        verification: ['Oil pressure meets specification', 'No abnormal noise after repair', 'Clearances recorded'],
        knowledgeRefs: ['NKV-AUT-001'],
      },
      {
        id: 'combustion',
        title: 'Combustion-related knock',
        mechanism: 'Injector, timing or combustion imbalance creates a cylinder-related knock.',
        baseScore: 18,
        supports: ['load'],
        contradicts: ['heat', 'rotation'],
        tests: ['Run cylinder cut-out test', 'Review injector correction values', 'Check rail-pressure stability'],
        verification: ['Cylinder contribution is balanced', 'Noise absent across load range'],
        knowledgeRefs: ['NKV-AUT-004'],
      },
      {
        id: 'external',
        title: 'External rotating-component noise',
        mechanism: 'Loose or damaged accessories transfer noise into the engine structure.',
        baseScore: 14,
        supports: [],
        contradicts: ['external-ok', 'rotation'],
        tests: ['Inspect accessory drive', 'Check mounts and pulleys'],
        verification: ['Noise source physically isolated'],
        knowledgeRefs: ['NKV-AUT-006'],
      },
    ],
  },
  {
    id: 'rail-pressure',
    domain: 'Fuel and injection',
    title: 'Low common-rail pressure',
    summary: 'Ranks supply restriction, air ingress, injector leak-off and pressure-control faults.',
    symptoms: ['hard starting', 'low pulling power', 'low rail pressure', '0559'],
    evidence: [
      { id: 'gap', label: 'Commanded pressure high, measured pressure low', weight: 28 },
      { id: 'air', label: 'Air bubbles or loss of priming', weight: 22 },
      { id: 'filter', label: 'Filter or separator restriction', weight: 16 },
      { id: 'return', label: 'Injector return flow excessive', weight: 24 },
      { id: 'control', label: 'IMV or regulator signal abnormal', weight: 20 },
    ],
    causes: [
      {
        id: 'supply',
        title: 'Low-pressure restriction or air ingress',
        mechanism: 'The high-pressure pump cannot receive stable, bubble-free fuel.',
        baseScore: 30,
        supports: ['air', 'filter', 'gap'],
        tests: ['Observe fuel for bubbles', 'Measure low-side restriction', 'Inspect priming-pump seals'],
        verification: ['Fuel remains bubble-free', 'Rail pressure builds within starting time'],
        knowledgeRefs: ['NKV-AUT-005'],
      },
      {
        id: 'leakoff',
        title: 'Excessive injector return leakage',
        mechanism: 'Internal injector leakage prevents rail pressure from reaching command.',
        baseScore: 24,
        supports: ['return', 'gap'],
        tests: ['Perform injector return-flow comparison', 'Inspect contamination'],
        verification: ['Return flow within specification', 'Measured pressure tracks command'],
        knowledgeRefs: ['NKV-AUT-004'],
      },
      {
        id: 'control-fault',
        title: 'IMV or rail-pressure regulator fault',
        mechanism: 'Fuel metering or pressure control cannot regulate the rail correctly.',
        baseScore: 22,
        supports: ['control', 'gap'],
        tests: ['Check IMV supply, ground and command', 'Inspect regulator', 'Run actuator test'],
        verification: ['Control response stable', 'No pressure-control fault returns'],
        knowledgeRefs: ['NKV-AUT-004'],
      },
    ],
  },
  {
    id: 'range-shift',
    domain: 'Transmission',
    title: 'High/low range engagement failure',
    summary: 'Maps synchronization, actuation and shaft-support faults.',
    symptoms: ['high range', 'low range', 'gear grinding'],
    evidence: [
      { id: 'both', label: 'Both high and low range affected', weight: 16 },
      { id: 'synchro', label: 'Synchro cone, ring or sleeve damaged', weight: 28 },
      { id: 'bearing', label: 'Bearing fit or shaft support loose', weight: 24 },
      { id: 'debris', label: 'Metal particles in oil', weight: 18 },
      { id: 'actuator', label: 'External actuator operates correctly', weight: 14 },
    ],
    causes: [
      {
        id: 'sync',
        title: 'Range synchronizer failure',
        mechanism: 'Damaged friction and engagement surfaces cannot synchronize speed.',
        baseScore: 34,
        supports: ['synchro', 'both', 'actuator'],
        tests: ['Inspect cone contact', 'Measure sleeve and ring wear', 'Check engagement teeth'],
        verification: ['Range changes smoothly', 'No grinding or delayed engagement'],
        knowledgeRefs: ['NKV-AUT-002'],
      },
      {
        id: 'support',
        title: 'Shaft or bearing-support misalignment',
        mechanism: 'Loss of support displaces the gear train and causes secondary damage.',
        baseScore: 28,
        supports: ['bearing', 'debris'],
        tests: ['Check shaft tip and bearing fit', 'Inspect housing bore', 'Measure end float'],
        verification: ['Bearing retention and alignment meet specification'],
        knowledgeRefs: ['NKV-AUT-002'],
      },
      {
        id: 'actuation',
        title: 'Range actuation fault',
        mechanism: 'Incomplete selector travel prevents full engagement.',
        baseScore: 18,
        supports: ['both'],
        contradicts: ['actuator'],
        tests: ['Measure actuator travel', 'Check control command', 'Inspect selector fork'],
        verification: ['Full travel and positive engagement confirmed'],
        knowledgeRefs: ['NKV-AUT-002'],
      },
    ],
  },
  {
    id: 'battery',
    domain: 'Electrical',
    title: 'Battery not charging or retaining voltage',
    summary: 'Separates alternator output, charging-circuit resistance, battery failure and key-off draw.',
    symptoms: ['battery not charging', 'low voltage', 'battery drains'],
    evidence: [
      { id: 'alt-ok', label: 'Alternator output normal', weight: 28 },
      { id: 'load-fail', label: 'Battery fails load or conductance test', weight: 30 },
      { id: 'drop', label: 'High cable or ground voltage drop', weight: 26 },
      { id: 'lamp', label: 'Charge warning remains on', weight: 14 },
      { id: 'draw', label: 'Abnormal key-off current draw', weight: 24 },
    ],
    causes: [
      {
        id: 'battery-fail',
        title: 'Battery internal failure',
        mechanism: 'The battery cannot accept or retain charge despite normal alternator output.',
        baseScore: 34,
        supports: ['alt-ok', 'load-fail'],
        tests: ['Fully charge and retest', 'Perform load or conductance test', 'Inspect case and terminals'],
        verification: ['Battery retains voltage and passes load test'],
        knowledgeRefs: ['NKV-ELC-002'],
      },
      {
        id: 'circuit',
        title: 'Charging-circuit resistance',
        mechanism: 'Cable or ground resistance prevents charging current from reaching the battery.',
        baseScore: 28,
        supports: ['drop', 'lamp'],
        tests: ['Positive and negative voltage-drop tests', 'Inspect terminals and links'],
        verification: ['Voltage drop remains within specification'],
        knowledgeRefs: ['NKV-ELC-001'],
      },
      {
        id: 'draw',
        title: 'Excessive key-off electrical draw',
        mechanism: 'A load remains active and discharges a serviceable battery.',
        baseScore: 22,
        supports: ['draw', 'alt-ok'],
        tests: ['Measure stabilized key-off current', 'Isolate circuits by fuse'],
        verification: ['Key-off current returns to an acceptable level'],
        knowledgeRefs: ['NKV-ELC-003'],
      },
    ],
  },
];
