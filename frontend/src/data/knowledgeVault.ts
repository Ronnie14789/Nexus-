export type KnowledgeDomain =
  | 'automotive'
  | 'electrical'
  | 'digital'
  | 'reporting'
  | 'operations';

export type KnowledgeKind =
  | 'diagnostic'
  | 'procedure'
  | 'field-case'
  | 'checklist'
  | 'standard'
  | 'reference';

export type EvidenceLevel = 'verified' | 'field-proven' | 'reference' | 'developing';
export type Difficulty = 'foundation' | 'intermediate' | 'advanced';
export type KnowledgeStatus = 'published' | 'review' | 'developing';

export interface KnowledgeStep {
  title: string;
  detail: string;
  expected?: string;
}

export interface KnowledgeSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface KnowledgeSource {
  label: string;
  type: 'field observation' | 'engineering principle' | 'test result' | 'service record';
}

export interface KnowledgeRecord {
  id: string;
  code: string;
  title: string;
  domain: KnowledgeDomain;
  kind: KnowledgeKind;
  system: string;
  summary: string;
  status: KnowledgeStatus;
  evidence: EvidenceLevel;
  difficulty: Difficulty;
  confidence: number;
  updated: string;
  readMinutes: number;
  keywords: string[];
  symptoms: string[];
  prerequisites: string[];
  diagnosticPath: KnowledgeStep[];
  findings: KnowledgeSection[];
  verification: string[];
  safety: string[];
  sources: KnowledgeSource[];
  relatedIds: string[];
}

export const knowledgeSchemaVersion = '1.0.0';

export const knowledgeDomainLabels: Record<KnowledgeDomain, string> = {
  automotive: 'Automotive Systems',
  electrical: 'Electrical Systems',
  digital: 'Digital Systems',
  reporting: 'Technical Reporting',
  operations: 'Workshop & Fleet',
};

export const knowledgeKindLabels: Record<KnowledgeKind, string> = {
  diagnostic: 'Diagnostic guide',
  procedure: 'Procedure',
  'field-case': 'Field case',
  checklist: 'Checklist',
  standard: 'Engineering standard',
  reference: 'Reference',
};

export const knowledgeRecords: KnowledgeRecord[] = [
  {
    id: 'auto-crank-journal-02',
    code: 'NKV-AUT-001',
    title: 'No. 2 connecting-rod journal: evidence-led failure isolation',
    domain: 'automotive',
    kind: 'field-case',
    system: 'Engine lubrication and rotating assembly',
    summary:
      'A structured field-case model for separating a localized connecting-rod journal failure from a general lubrication-system or main-bearing failure.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'advanced',
    confidence: 94,
    updated: '2026-07-16',
    readMinutes: 8,
    keywords: ['engine knock', 'crankshaft', 'connecting rod', 'journal', 'bearing seizure', 'heat marks'],
    symptoms: [
      'Abnormal knocking from the crankcase area',
      'Noise increases under engine load',
      'Localized heat discoloration at one connecting-rod big end',
      'Rotational movement or seizure evidence at a single journal',
    ],
    prerequisites: [
      'Confirm engine-oil level and visible leakage condition',
      'Record service history and operating complaint before dismantling',
      'Inspect other journals and main bearings for comparative evidence',
    ],
    diagnosticPath: [
      {
        title: 'Localize the noise',
        detail: 'Confirm that the noise originates from the crankcase rather than external accessories or valve gear.',
        expected: 'Noise remains associated with engine speed and load.',
      },
      {
        title: 'Compare all journals',
        detail: 'Inspect every connecting-rod and main journal for scoring, seizure, heat discoloration and dimensional damage.',
        expected: 'A localized failure pattern is distinguishable from general lubrication distress.',
      },
      {
        title: 'Inspect bearing-shell evidence',
        detail: 'Check for rotation, wiped material, seizure marks, loss of crush and abnormal contact patterns.',
        expected: 'Bearing evidence supports the journal damage mechanism.',
      },
      {
        title: 'Separate cause from consequence',
        detail: 'Distinguish the failed journal and bearing from secondary heat loading on the rod and nearby components.',
        expected: 'The report names the primary failed interface and lists secondary damage separately.',
      },
    ],
    findings: [
      {
        heading: 'Primary finding',
        paragraphs: [
          'Severe scoring and seizure evidence at one connecting-rod journal indicates abnormal metal-to-metal contact and localized overheating.',
        ],
      },
      {
        heading: 'Comparative evidence',
        bullets: [
          'Other journals should be documented as normal, lightly marked or damaged.',
          'Main-bearing condition must be recorded separately.',
          'Oil level and external leakage observations should not be used alone to rule out a localized lubrication failure.',
        ],
      },
      {
        heading: 'Reporting rule',
        paragraphs: [
          'State what was observed, identify the most likely failure mechanism, and avoid claiming a precise origin when the available evidence cannot prove it.',
        ],
      },
    ],
    verification: [
      'Crankshaft journal measurements are compared with specification.',
      'Connecting rod big-end condition is checked for distortion and heat damage.',
      'Oil passages and supply path are inspected before final assembly.',
      'Post-repair oil pressure and abnormal-noise checks are completed.',
    ],
    safety: [
      'Use approved lifting and engine-support equipment during dismantling.',
      'Do not rotate a partially dismantled engine without confirming component clearance.',
    ],
    sources: [
      { label: 'Journal and bearing visual inspection', type: 'field observation' },
      { label: 'Comparative bearing condition', type: 'field observation' },
      { label: 'Oil level and service-history review', type: 'service record' },
    ],
    relatedIds: ['rpt-root-cause-standard', 'auto-lube-baseline', 'ops-post-repair-verification'],
  },
  {
    id: 'auto-high-low-range',
    code: 'NKV-AUT-002',
    title: 'High/low range gearbox shift failure: range-unit diagnostic map',
    domain: 'automotive',
    kind: 'diagnostic',
    system: 'Transmission and range-change unit',
    summary:
      'A diagnostic map for difficult high/low range engagement, covering synchronization, shift sleeves, cones, planetary elements, bearings and shaft alignment.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'advanced',
    confidence: 92,
    updated: '2026-07-16',
    readMinutes: 10,
    keywords: ['gearbox', 'high range', 'low range', 'synchro cone', 'shift sleeve', 'planetary gear'],
    symptoms: [
      'High or low range does not engage smoothly',
      'Grinding or delayed engagement during range change',
      'Range selector movement without complete mechanical engagement',
      'Metal particles present after dismantling',
    ],
    prerequisites: [
      'Confirm clutch release and external linkage condition',
      'Record whether the complaint affects high range, low range or both',
      'Drain and inspect transmission oil before dismantling',
    ],
    diagnosticPath: [
      {
        title: 'Verify external control',
        detail: 'Check air, electrical or mechanical actuation and selector travel before opening the gearbox.',
        expected: 'The actuator command and mechanical travel correspond correctly.',
      },
      {
        title: 'Inspect synchronization surfaces',
        detail: 'Examine synchro cones, rings and sleeves for glazing, scoring, taper loss or damaged engagement teeth.',
        expected: 'Damaged friction or engagement surfaces explain failed speed matching.',
      },
      {
        title: 'Check shaft and bearing support',
        detail: 'Inspect bearing fit, shaft tips and housing support for movement that could misalign the range train.',
        expected: 'Any loss of support is identified as a primary or contributing mechanism.',
      },
      {
        title: 'Map secondary damage',
        detail: 'Document planetary gears, shift components, sealing rings and bearings affected by debris or misalignment.',
        expected: 'Primary and secondary failures are separated in the final parts recommendation.',
      },
    ],
    findings: [
      {
        heading: 'Failure mechanism',
        paragraphs: [
          'Damaged synchronization surfaces prevent the speed matching required for clean high/low range engagement. Continued operation can transfer impact loading into sleeves, cones, planetary elements and shaft supports.',
        ],
      },
      {
        heading: 'Evidence hierarchy',
        bullets: [
          'External controls verified before dismantling',
          'Range-specific complaint reproduced or confirmed',
          'Internal contact surfaces inspected',
          'Debris path and secondary damage mapped',
        ],
      },
    ],
    verification: [
      'Range engagement is tested under stationary and road-test conditions.',
      'Transmission oil level and leakage condition are confirmed.',
      'No abnormal noise is present in either range.',
    ],
    safety: [
      'Support the gearbox with rated equipment before removing mounts.',
      'Do not road-test until all range-control and mounting fasteners are verified.',
    ],
    sources: [
      { label: 'Range engagement complaint', type: 'field observation' },
      { label: 'Internal transmission inspection', type: 'field observation' },
    ],
    relatedIds: ['auto-clutch-return', 'rpt-root-cause-standard', 'ops-post-repair-verification'],
  },
  {
    id: 'auto-clutch-return',
    code: 'NKV-AUT-003',
    title: 'Clutch pedal non-return: booster and master-cylinder isolation',
    domain: 'automotive',
    kind: 'procedure',
    system: 'Clutch hydraulic and pneumatic control',
    summary:
      'A concise isolation procedure for a clutch pedal that does not return, with separate checks for booster leakage and master-cylinder piston recovery.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'intermediate',
    confidence: 95,
    updated: '2026-07-16',
    readMinutes: 5,
    keywords: ['clutch pedal', 'booster leak', 'master cylinder', 'piston return', 'hydraulic'],
    symptoms: [
      'Pedal remains partially or fully depressed after operation',
      'Air leakage from booster side joints',
      'Master-cylinder piston fails to return freely',
      'Gear engagement becomes difficult after clutch operation',
    ],
    prerequisites: [
      'Inspect pedal pivot, return spring and linkage for mechanical binding',
      'Confirm fluid level and visible leakage condition',
      'Confirm system pressure is available where applicable',
    ],
    diagnosticPath: [
      {
        title: 'Eliminate pedal binding',
        detail: 'Disconnect or inspect the pedal linkage to confirm free mechanical movement.',
        expected: 'Pedal and pivot move without seizure or obstruction.',
      },
      {
        title: 'Inspect booster sealing',
        detail: 'Operate the pedal and listen or test for leakage at booster joints and connections.',
        expected: 'Any pressure loss is located and documented.',
      },
      {
        title: 'Check master-cylinder recovery',
        detail: 'Observe piston return and fluid compensation after pedal release.',
        expected: 'A sticking or slow-return piston is identified independently of booster leakage.',
      },
    ],
    findings: [
      {
        heading: 'Decision rule',
        paragraphs: [
          'A leaking booster and a non-returning master-cylinder piston are separate defects and should be reported separately, even when both contribute to the same pedal complaint.',
        ],
      },
    ],
    verification: [
      'Pedal returns fully after repeated operation.',
      'No air or hydraulic leakage is present.',
      'Clutch disengagement and gear engagement are normal.',
    ],
    safety: [
      'Depressurize pneumatic circuits before disconnecting components.',
      'Clean spilled hydraulic fluid immediately and protect painted surfaces.',
    ],
    sources: [
      { label: 'Booster joint leakage test', type: 'test result' },
      { label: 'Master-cylinder piston observation', type: 'field observation' },
    ],
    relatedIds: ['auto-high-low-range', 'rpt-root-cause-standard'],
  },
  {
    id: 'auto-fuel-pressure-0559',
    code: 'NKV-AUT-004',
    title: 'Low rail-pressure fault 0559: commanded-versus-measured diagnosis',
    domain: 'automotive',
    kind: 'diagnostic',
    system: 'Common-rail fuel system',
    summary:
      'A diagnostic approach that compares commanded and measured rail pressure before isolating supply restriction, air ingress, IMV control, regulator leakage or pump performance.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'advanced',
    confidence: 91,
    updated: '2026-07-16',
    readMinutes: 9,
    keywords: ['0559', 'rail pressure', 'IMV', 'fuel regulator', 'hard starting', 'low power'],
    symptoms: [
      'Hard starting or failure to start',
      'Low pulling power',
      'Measured pressure remains far below commanded pressure',
      'Rough idle or unstable fuel pressure',
    ],
    prerequisites: [
      'Use clean fuel-system test practices',
      'Confirm adequate low-pressure fuel supply',
      'Check for air ingress at priming pump, hoses and filter connections',
    ],
    diagnosticPath: [
      {
        title: 'Capture commanded and measured values',
        detail: 'Record both values during cranking, idle and load where safe.',
        expected: 'The size and operating condition of the pressure error are established.',
      },
      {
        title: 'Verify low-pressure supply',
        detail: 'Inspect restriction, air ingress and priming performance before condemning high-pressure components.',
        expected: 'Fuel reaches the high-pressure pump without aeration or excessive restriction.',
      },
      {
        title: 'Evaluate control components',
        detail: 'Check IMV command, regulator behaviour and wiring integrity using approved diagnostic methods.',
        expected: 'A control fault is distinguished from mechanical leakage or weak pump output.',
      },
      {
        title: 'Confirm return leakage',
        detail: 'Assess injector and regulator return flow where applicable.',
        expected: 'Excessive internal leakage is identified or ruled out.',
      },
    ],
    findings: [
      {
        heading: 'Interpretation',
        paragraphs: [
          'A large gap between commanded and measured rail pressure proves that the system is not achieving demand; it does not by itself identify which component is responsible.',
        ],
      },
      {
        heading: 'Do not skip',
        bullets: [
          'Low-pressure supply verification',
          'Air-ingress inspection',
          'Connector and wiring checks',
          'Return-leakage assessment',
        ],
      },
    ],
    verification: [
      'Measured rail pressure follows command within the expected operating range.',
      'Starting, idle and load performance are normal.',
      'The fault code does not return after a complete drive cycle.',
    ],
    safety: [
      'Common-rail systems operate at dangerous pressure. Never loosen high-pressure lines while the engine is running.',
      'Follow manufacturer depressurization and leak-testing procedures.',
    ],
    sources: [
      { label: 'Commanded and measured rail-pressure data', type: 'test result' },
      { label: 'Fuel-supply and air-ingress inspection', type: 'field observation' },
    ],
    relatedIds: ['auto-prime-air-ingress', 'elec-sensor-reference-ground', 'rpt-root-cause-standard'],
  },
  {
    id: 'auto-prime-air-ingress',
    code: 'NKV-AUT-005',
    title: 'Priming-pump air ingress: hard-start isolation checklist',
    domain: 'automotive',
    kind: 'checklist',
    system: 'Low-pressure fuel supply',
    summary:
      'A fast, evidence-based checklist for hard starting caused by worn priming-pump seals or upstream air entry.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'foundation',
    confidence: 93,
    updated: '2026-07-16',
    readMinutes: 4,
    keywords: ['priming pump', 'air ingress', 'hard start', 'fuel supply', 'seal'],
    symptoms: [
      'Extended cranking after the vehicle stands',
      'Manual priming temporarily restores starting',
      'Visible air bubbles in a transparent test line',
      'No external fuel leak despite loss of prime',
    ],
    prerequisites: ['Use clean containers and capped connections', 'Confirm fuel level and filter condition'],
    diagnosticPath: [
      {
        title: 'Prime and observe',
        detail: 'Operate the priming pump and note resistance, fuel movement and whether pressure is retained.',
        expected: 'Loss of resistance or rapid pressure decay indicates leakage or poor sealing.',
      },
      {
        title: 'Inspect suction-side joints',
        detail: 'Check hoses, clamps, filter seals and pump seals for a path that can admit air.',
        expected: 'The air-entry point is isolated without relying only on visible fuel leakage.',
      },
      {
        title: 'Verify after repair',
        detail: 'Allow the vehicle to stand and repeat the cold-start test.',
        expected: 'The system retains prime and starts normally.',
      },
    ],
    findings: [
      {
        heading: 'Key principle',
        paragraphs: [
          'A suction-side fuel leak may admit air without producing an obvious external fuel leak.',
        ],
      },
    ],
    verification: ['Cold start is normal after standing', 'No air bubbles are present', 'Manual priming is no longer required'],
    safety: ['Keep fuel away from ignition sources', 'Dispose of test fuel according to workshop procedure'],
    sources: [{ label: 'Prime-retention and air-bubble observation', type: 'test result' }],
    relatedIds: ['auto-fuel-pressure-0559'],
  },
  {
    id: 'auto-air-brake-unloader',
    code: 'NKV-AUT-006',
    title: 'DDU unloader leakage: low-air-pressure and braking diagnosis',
    domain: 'automotive',
    kind: 'diagnostic',
    system: 'Compressed-air generation and braking',
    summary:
      'A fault-isolation guide for unloader-valve leakage, slow pressure build-up, reservoir imbalance and reduced braking readiness.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'intermediate',
    confidence: 94,
    updated: '2026-07-16',
    readMinutes: 6,
    keywords: ['DDU', 'unloader valve', 'air leak', 'low pressure', 'brakes', 'reservoir'],
    symptoms: [
      'Air pressure builds slowly or fails to reach normal cut-out',
      'Audible leakage at the unloader assembly',
      'Pressure imbalance between reservoirs',
      'Braking performance or warning indication affected',
    ],
    prerequisites: [
      'Secure the vehicle against movement',
      'Confirm compressor drive and air-line condition',
      'Use calibrated pressure readings where possible',
    ],
    diagnosticPath: [
      {
        title: 'Measure build-up behaviour',
        detail: 'Record reservoir pressures and time required to reach the normal operating range.',
        expected: 'Slow build or imbalance is quantified.',
      },
      {
        title: 'Locate leakage',
        detail: 'Inspect the unloader, joints and connected lines using approved leak-detection methods.',
        expected: 'The leakage point is positively identified.',
      },
      {
        title: 'Check control response',
        detail: 'Confirm loading and unloading behaviour through the pressure cycle.',
        expected: 'The valve changes state correctly without continuous leakage.',
      },
    ],
    findings: [
      {
        heading: 'System impact',
        paragraphs: [
          'Continuous leakage at the unloader can reduce pressure-build rate and create reservoir imbalance, delaying full braking readiness.',
        ],
      },
    ],
    verification: ['Pressure reaches cut-out normally', 'Reservoir readings remain balanced', 'No leakage is detected after repair'],
    safety: ['Chock wheels and follow compressed-air isolation procedure', 'Do not work beneath an air-suspended vehicle without mechanical supports'],
    sources: [
      { label: 'Reservoir pressure readings', type: 'test result' },
      { label: 'Leak-location inspection', type: 'field observation' },
    ],
    relatedIds: ['ops-post-repair-verification', 'rpt-root-cause-standard'],
  },
  {
    id: 'auto-lube-baseline',
    code: 'NKV-AUT-007',
    title: 'Engine lubrication failure baseline: evidence capture before overhaul',
    domain: 'automotive',
    kind: 'checklist',
    system: 'Engine lubrication',
    summary:
      'A pre-overhaul evidence checklist covering oil level, leakage, pressure history, filter condition, debris and comparative bearing damage.',
    status: 'published',
    evidence: 'reference',
    difficulty: 'intermediate',
    confidence: 88,
    updated: '2026-07-16',
    readMinutes: 5,
    keywords: ['lubrication', 'oil pressure', 'bearing', 'debris', 'overhaul', 'inspection'],
    symptoms: ['Bearing noise', 'Seizure marks', 'Heat discoloration', 'Metal debris in oil'],
    prerequisites: ['Do not discard drained oil or filters before inspection', 'Photograph evidence before cleaning'],
    diagnosticPath: [
      { title: 'Record external condition', detail: 'Document oil level, leaks and service information.', expected: 'Baseline condition is preserved.' },
      { title: 'Inspect oil and filter', detail: 'Check contamination, metallic debris and restriction evidence.', expected: 'Lubrication evidence is captured before disposal.' },
      { title: 'Compare internal components', detail: 'Map damage across main and connecting-rod bearings.', expected: 'Localized and system-wide patterns are separated.' },
    ],
    findings: [{ heading: 'Evidence standard', bullets: ['Photographs', 'Measurements', 'Comparative condition', 'Service data', 'Post-repair verification'] }],
    verification: ['Oil pressure confirmed after repair', 'Oil circulation verified', 'No abnormal noise or warning remains'],
    safety: ['Handle hot oil with suitable PPE', 'Use spill control and approved waste disposal'],
    sources: [{ label: 'Lubrication-system engineering principles', type: 'engineering principle' }],
    relatedIds: ['auto-crank-journal-02', 'rpt-root-cause-standard'],
  },
  {
    id: 'elec-voltage-drop',
    code: 'NKV-ELC-001',
    title: 'Voltage-drop testing: loaded-circuit diagnostic standard',
    domain: 'electrical',
    kind: 'standard',
    system: 'Power distribution and grounding',
    summary:
      'A practical standard for locating unwanted resistance by measuring voltage loss while the circuit carries its normal operating load.',
    status: 'published',
    evidence: 'verified',
    difficulty: 'foundation',
    confidence: 98,
    updated: '2026-07-16',
    readMinutes: 6,
    keywords: ['voltage drop', 'ground', 'starter', 'charging', 'resistance', 'loaded circuit'],
    symptoms: ['Slow cranking', 'Dim lamps', 'Low actuator force', 'Intermittent electrical operation', 'Heat at terminals'],
    prerequisites: ['Use a correctly rated meter', 'Confirm the circuit can be operated safely under load'],
    diagnosticPath: [
      {
        title: 'Load the circuit',
        detail: 'Operate the component in the condition where the complaint occurs.',
        expected: 'The circuit carries realistic current during measurement.',
      },
      {
        title: 'Measure positive-side loss',
        detail: 'Place the meter across successive sections from source positive to load positive.',
        expected: 'The section with abnormal loss is isolated.',
      },
      {
        title: 'Measure ground-side loss',
        detail: 'Measure from the load ground to source negative while the load operates.',
        expected: 'Ground-path resistance is confirmed or ruled out.',
      },
      {
        title: 'Verify the repair',
        detail: 'Repeat the same loaded test after cleaning, tightening or replacing the faulty section.',
        expected: 'Voltage loss is reduced and component operation is normal.',
      },
    ],
    findings: [
      {
        heading: 'Why resistance mode is not enough',
        paragraphs: [
          'A circuit can show continuity with a small meter current yet fail under normal load. Voltage-drop testing reveals the real operating loss.',
        ],
      },
    ],
    verification: ['Loaded voltage drop is within the applicable circuit limit', 'The original symptom is no longer present'],
    safety: ['Avoid shorting test probes', 'Keep leads clear of rotating and hot components'],
    sources: [{ label: 'Ohm’s law and loaded-circuit testing', type: 'engineering principle' }],
    relatedIds: ['elec-charging-diagnosis', 'elec-sensor-reference-ground'],
  },
  {
    id: 'elec-charging-diagnosis',
    code: 'NKV-ELC-002',
    title: 'Battery not charging versus battery not retaining charge',
    domain: 'electrical',
    kind: 'diagnostic',
    system: 'Charging and energy storage',
    summary:
      'A decision path that prevents a healthy alternator from being replaced when the real defect is battery capacity, retention or connection loss.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'intermediate',
    confidence: 96,
    updated: '2026-07-16',
    readMinutes: 7,
    keywords: ['alternator', 'battery', 'charging voltage', 'capacity', 'retention', 'overcharge'],
    symptoms: ['Battery warning', 'Repeated flat battery', 'Normal alternator output but poor restart', 'Intermittent high voltage'],
    prerequisites: ['Inspect battery condition and terminals', 'Confirm meter accuracy', 'Record system voltage before starting'],
    diagnosticPath: [
      { title: 'Measure resting voltage', detail: 'Record stabilized battery voltage before starting.', expected: 'Initial state of charge is known.' },
      { title: 'Test charging output', detail: 'Measure voltage and current under appropriate load and speed conditions.', expected: 'Alternator output is classified as low, normal or excessive.' },
      { title: 'Test voltage drop', detail: 'Check positive and ground paths between alternator and battery.', expected: 'Cable or connection loss is ruled in or out.' },
      { title: 'Assess battery retention', detail: 'Perform an approved capacity or conductance test and observe self-discharge behaviour.', expected: 'A battery-storage defect is distinguished from a charging defect.' },
    ],
    findings: [
      {
        heading: 'Reporting distinction',
        bullets: [
          '“Vehicle not charging” requires evidence of inadequate charging-system output.',
          '“Battery not retaining voltage” requires evidence that charging output is available but stored energy is not maintained.',
          'Overcharging must be documented with measured voltage and operating condition.',
        ],
      },
    ],
    verification: ['Charging output remains stable', 'Battery passes retention or capacity check', 'Vehicle restarts after a controlled stand period'],
    safety: ['Use eye protection around batteries', 'Do not create sparks near a venting or damaged battery'],
    sources: [
      { label: 'Charging-system measurements', type: 'test result' },
      { label: 'Battery retention test', type: 'test result' },
    ],
    relatedIds: ['elec-voltage-drop', 'rpt-root-cause-standard'],
  },
  {
    id: 'elec-sensor-reference-ground',
    code: 'NKV-ELC-003',
    title: 'Sensor reference and ground integrity: five-volt circuit method',
    domain: 'electrical',
    kind: 'procedure',
    system: 'Electronic sensing and ECU inputs',
    summary:
      'A method for checking reference voltage, sensor ground, signal response and shared-circuit loading without replacing sensors by guesswork.',
    status: 'published',
    evidence: 'reference',
    difficulty: 'advanced',
    confidence: 90,
    updated: '2026-07-16',
    readMinutes: 8,
    keywords: ['5V reference', 'sensor ground', 'ECU', 'signal', 'short circuit', 'shared reference'],
    symptoms: ['Multiple sensor faults', 'Implausible readings', 'Reference voltage low', 'Fault changes when a sensor is disconnected'],
    prerequisites: ['Use back-probing methods that do not damage terminals', 'Confirm connector pin identification'],
    diagnosticPath: [
      { title: 'Check reference unloaded and loaded', detail: 'Measure reference voltage with the circuit connected, then isolate branches as required.', expected: 'A shared branch pulling the reference down can be located.' },
      { title: 'Check sensor-ground drop', detail: 'Measure ground difference under operating conditions.', expected: 'Ground integrity is proven under load.' },
      { title: 'Observe signal movement', detail: 'Compare signal response with the physical input or known condition.', expected: 'Sensor response, wiring and ECU interpretation are separated.' },
    ],
    findings: [{ heading: 'Shared-circuit warning', paragraphs: ['One shorted sensor or harness branch can disturb several sensors that share the same reference or ground.'] }],
    verification: ['Reference remains stable with all sensors connected', 'Signals respond plausibly', 'Related fault codes do not return'],
    safety: ['Never apply battery voltage to a five-volt reference circuit', 'Avoid spreading connector terminals with oversized probes'],
    sources: [{ label: 'Electronic sensor-circuit principles', type: 'engineering principle' }],
    relatedIds: ['elec-voltage-drop', 'auto-fuel-pressure-0559'],
  },
  {
    id: 'digital-production-gate',
    code: 'NKV-DIG-001',
    title: 'Production quality gate: build, route, API and security verification',
    domain: 'digital',
    kind: 'standard',
    system: 'Software delivery and operations',
    summary:
      'A release standard requiring linting, TypeScript validation, complete builds, route checks, API health, indexing controls and security-header verification.',
    status: 'published',
    evidence: 'verified',
    difficulty: 'intermediate',
    confidence: 99,
    updated: '2026-07-16',
    readMinutes: 7,
    keywords: ['CI/CD', 'quality gate', 'smoke test', 'security headers', 'sitemap', 'deployment'],
    symptoms: ['Broken route after deployment', 'Compile-time regression', 'Missing security header', 'Stale sitemap', 'API unavailable'],
    prerequisites: ['A deterministic build command', 'A production start command', 'A health endpoint'],
    diagnosticPath: [
      { title: 'Static verification', detail: 'Run backend lint, frontend type checking and full production builds.', expected: 'Compilation and static analysis complete without errors.' },
      { title: 'Start production output', detail: 'Run the same prepared output used for hosting.', expected: 'The production server becomes ready.' },
      { title: 'Verify routes and API', detail: 'Request every public route, robots.txt, sitemap.xml and the health endpoint.', expected: 'All required resources return successful responses.' },
      { title: 'Verify headers', detail: 'Confirm CSP, HSTS, referrer policy, frame protection and content-type protection.', expected: 'The deployed application exposes the required security controls.' },
    ],
    findings: [{ heading: 'Release rule', paragraphs: ['A feature is not considered production-ready until the complete quality gate passes on the merged code path.'] }],
    verification: ['Quality gate exits successfully', 'Required route is included in smoke testing', 'Required URL is included in the sitemap'],
    safety: ['Never print production secrets in build logs', 'Do not commit environment files or access tokens'],
    sources: [
      { label: 'Automated build and smoke-test output', type: 'test result' },
      { label: 'Repository quality workflow', type: 'engineering principle' },
    ],
    relatedIds: ['digital-secrets-boundary', 'ops-post-repair-verification'],
  },
  {
    id: 'digital-secrets-boundary',
    code: 'NKV-DIG-002',
    title: 'Environment-secret boundary: local, repository and hosting rules',
    domain: 'digital',
    kind: 'checklist',
    system: 'Application security and configuration',
    summary:
      'A deployment checklist that keeps passwords, database URIs, SMTP credentials and tokens outside source control while allowing safe local fallback behaviour.',
    status: 'published',
    evidence: 'verified',
    difficulty: 'foundation',
    confidence: 99,
    updated: '2026-07-16',
    readMinutes: 5,
    keywords: ['environment variables', '.env', 'MongoDB URI', 'SMTP', 'secrets', 'GitHub'],
    symptoms: ['Credential exposed in commit', 'Production works but local environment does not', 'Environment variable missing', 'Deployment integration unauthorized'],
    prerequisites: ['Identify which settings are secret', 'Confirm .gitignore coverage'],
    diagnosticPath: [
      { title: 'Classify configuration', detail: 'Separate public build-time values, private runtime values and local-only defaults.', expected: 'Every value has a defined storage boundary.' },
      { title: 'Verify repository state', detail: 'Confirm secret files are ignored and absent from Git history.', expected: 'No credential is stored in source control.' },
      { title: 'Verify hosting environment', detail: 'Confirm runtime secrets are configured in the hosting platform.', expected: 'Production services connect without exposing values to the frontend bundle.' },
    ],
    findings: [{ heading: 'Core rule', paragraphs: ['A missing local .env warning is acceptable when production secrets are intentionally supplied only by the hosting environment and the application has a safe development fallback.'] }],
    verification: ['Git status contains no secret file', 'Production health reports configured services', 'Frontend bundle contains no private credentials'],
    safety: ['Rotate any secret shown in screenshots or logs', 'Never paste credentials into public issues or pull requests'],
    sources: [{ label: 'Secure configuration management principles', type: 'engineering principle' }],
    relatedIds: ['digital-production-gate'],
  },
  {
    id: 'rpt-root-cause-standard',
    code: 'NKV-RPT-001',
    title: 'Technical report standard: findings, action and root cause',
    domain: 'reporting',
    kind: 'standard',
    system: 'Warranty and engineering communication',
    summary:
      'A concise reporting standard that separates what was observed, what was done and what the evidence supports as the failure mechanism.',
    status: 'published',
    evidence: 'field-proven',
    difficulty: 'foundation',
    confidence: 97,
    updated: '2026-07-16',
    readMinutes: 6,
    keywords: ['technical report', 'findings', 'action', 'root cause', 'warranty', 'evidence'],
    symptoms: ['Report is too wordy', 'Primary and secondary damage mixed together', 'Cause stated without evidence', 'Action not recorded'],
    prerequisites: ['Record the customer complaint', 'Preserve photos, measurements and test results'],
    diagnosticPath: [
      { title: 'Write findings', detail: 'State the observed condition and comparison evidence without speculation.', expected: 'A reader can understand what was physically found.' },
      { title: 'Write action', detail: 'State the inspection, test, dismantling or replacement performed.', expected: 'The work completed is traceable.' },
      { title: 'Write root cause', detail: 'State the most defensible mechanism supported by evidence and qualify uncertainty where necessary.', expected: 'The conclusion does not exceed the available proof.' },
    ],
    findings: [
      {
        heading: 'Writing rules',
        bullets: [
          'Use component names consistently.',
          'Separate primary failure from secondary damage.',
          'Include relevant normal findings that rule out alternatives.',
          'Avoid repeating the same point in every section.',
          'Use measured values when available.',
        ],
      },
    ],
    verification: ['Complaint, evidence and conclusion align', 'Recommended parts correspond to observed damage', 'Report can be understood without verbal explanation'],
    safety: ['Remove customer personal data from public examples', 'Do not include credentials or confidential manufacturer documents'],
    sources: [{ label: 'Field-report review practice', type: 'field observation' }],
    relatedIds: ['auto-crank-journal-02', 'auto-high-low-range', 'ops-post-repair-verification'],
  },
  {
    id: 'rpt-photo-evidence',
    code: 'NKV-RPT-002',
    title: 'Photographic evidence checklist for warranty and diagnosis',
    domain: 'reporting',
    kind: 'checklist',
    system: 'Evidence capture',
    summary:
      'A photo sequence that shows identity, overall condition, failure location, close detail, comparison and measurement context.',
    status: 'published',
    evidence: 'reference',
    difficulty: 'foundation',
    confidence: 92,
    updated: '2026-07-16',
    readMinutes: 4,
    keywords: ['photos', 'warranty', 'evidence', 'damage', 'measurement', 'report'],
    symptoms: ['Photo too close to identify component', 'No comparison view', 'Damage not in focus', 'No scale or measurement'],
    prerequisites: ['Clean only enough to reveal the condition without destroying evidence'],
    diagnosticPath: [
      { title: 'Identity view', detail: 'Capture the vehicle or component identity context.', expected: 'The evidence can be associated with the correct case.' },
      { title: 'Overall view', detail: 'Show the complete assembly and failure location.', expected: 'The viewer understands orientation.' },
      { title: 'Detail and comparison', detail: 'Capture the damaged surface and a normal comparison where possible.', expected: 'The abnormal condition is clear.' },
      { title: 'Measurement view', detail: 'Include instrument, scale or marked location when measurement is relevant.', expected: 'The evidence supports the reported value.' },
    ],
    findings: [{ heading: 'Minimum sequence', bullets: ['Identity', 'Overall assembly', 'Failure location', 'Close detail', 'Normal comparison', 'Measurement or test result'] }],
    verification: ['Images are sharp and correctly oriented', 'Every major finding has supporting evidence'],
    safety: ['Do not photograph personal documents or secret credentials', 'Keep clear of moving machinery while taking photos'],
    sources: [{ label: 'Warranty evidence practice', type: 'field observation' }],
    relatedIds: ['rpt-root-cause-standard'],
  },
  {
    id: 'ops-post-repair-verification',
    code: 'NKV-OPS-001',
    title: 'Post-repair verification: prove the complaint is resolved',
    domain: 'operations',
    kind: 'standard',
    system: 'Workshop quality control',
    summary:
      'A universal close-out standard requiring the original complaint, operating condition, leakage state, warning state and supporting measurements to be rechecked.',
    status: 'published',
    evidence: 'verified',
    difficulty: 'foundation',
    confidence: 98,
    updated: '2026-07-16',
    readMinutes: 5,
    keywords: ['verification', 'road test', 'quality control', 'repair', 'workshop', 'close-out'],
    symptoms: ['Vehicle returned with same complaint', 'Repair completed without final test', 'No measurement after replacement'],
    prerequisites: ['Define the original complaint and acceptance criteria before repair'],
    diagnosticPath: [
      { title: 'Repeat the complaint condition', detail: 'Operate the system under the same conditions that produced the fault.', expected: 'The original symptom is absent.' },
      { title: 'Check secondary effects', detail: 'Inspect leakage, noise, warning indications, temperatures and related systems.', expected: 'The repair did not create a new defect.' },
      { title: 'Record objective evidence', detail: 'Capture measurements, scan results or road-test observations.', expected: 'Closure is supported by evidence.' },
    ],
    findings: [{ heading: 'Close-out rule', paragraphs: ['Replacing a component is an action. Verification proves that the repair solved the complaint.'] }],
    verification: ['Original complaint absent', 'No new fault codes or warning indicators', 'No leakage or abnormal noise', 'Required measurement within range'],
    safety: ['Use an authorized road-test route and qualified driver', 'Stop the test immediately if a safety-critical defect remains'],
    sources: [{ label: 'Workshop quality-control principles', type: 'engineering principle' }],
    relatedIds: ['rpt-root-cause-standard', 'digital-production-gate', 'auto-air-brake-unloader'],
  },
  {
    id: 'ops-knowledge-capture',
    code: 'NKV-OPS-002',
    title: 'From completed job to reusable knowledge record',
    domain: 'operations',
    kind: 'procedure',
    system: 'Continuous learning and reliability',
    summary:
      'A capture workflow that converts a closed workshop job into a searchable, traceable and reusable engineering record.',
    status: 'review',
    evidence: 'developing',
    difficulty: 'intermediate',
    confidence: 76,
    updated: '2026-07-16',
    readMinutes: 6,
    keywords: ['knowledge capture', 'workshop', 'case record', 'taxonomy', 'lessons learned'],
    symptoms: ['Same fault repeatedly diagnosed from zero', 'Useful evidence remains only in messages', 'Cases cannot be found later'],
    prerequisites: ['Complaint, findings, action and verification are documented'],
    diagnosticPath: [
      { title: 'Normalize the case', detail: 'Remove personal data and standardize component names, symptoms and system labels.', expected: 'The record is reusable outside the original job.' },
      { title: 'Classify evidence', detail: 'Separate observation, test result, service record and engineering principle.', expected: 'Readers can see what supports the conclusion.' },
      { title: 'Link related knowledge', detail: 'Connect procedures, similar failures and verification standards.', expected: 'The record becomes part of a navigable knowledge graph.' },
      { title: 'Review and publish', detail: 'Check technical accuracy, confidentiality and completeness before release.', expected: 'Published knowledge has a clear trust state.' },
    ],
    findings: [{ heading: 'Knowledge quality', bullets: ['Searchable', 'Traceable', 'Evidence-labelled', 'Versioned', 'Linked', 'Reviewed'] }],
    verification: ['Record can be found by symptom and component', 'Evidence source is visible', 'Related content opens correctly'],
    safety: ['Remove customer identifiers and confidential data', 'Do not publish proprietary service documents without authorization'],
    sources: [{ label: 'Knowledge-management operating model', type: 'engineering principle' }],
    relatedIds: ['rpt-root-cause-standard', 'rpt-photo-evidence', 'digital-secrets-boundary'],
  },
];
