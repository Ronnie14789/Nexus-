export type ElectricalNodeId =
  | 'source'
  | 'protection'
  | 'distribution'
  | 'control'
  | 'load'
  | 'feedback';

export interface ElectricalArchitectureNode {
  id: ElectricalNodeId;
  code: string;
  title: string;
  role: string;
  purpose: string;
  operatingPrinciple: string;
  examples: string[];
  commonFaults: string[];
  diagnosticChecks: string[];
  safety: string;
}

export const architectureNodes: ElectricalArchitectureNode[] = [
  {
    id: 'source',
    code: 'PWR-01',
    title: 'Source & conversion',
    role: 'Creates or converts usable electrical energy.',
    purpose:
      'Establishes the voltage, current capacity, frequency and source impedance available to the rest of the system.',
    operatingPrinciple:
      'Chemical, electromagnetic, photovoltaic or electronic conversion establishes an electrical potential difference that can drive current through a closed circuit.',
    examples: ['Utility supply', 'Generator', 'Battery bank', 'Solar array', 'Rectifier', 'Inverter', 'DC power supply'],
    commonFaults: ['Low source voltage', 'Loss of phase', 'Frequency instability', 'Excessive internal resistance', 'Incorrect polarity'],
    diagnosticChecks: ['Open-circuit voltage', 'Loaded voltage', 'Frequency', 'Phase sequence', 'Source current capability', 'Ripple'],
    safety:
      'Confirm isolation points, available fault current and stored-energy hazards before making contact with conductors or terminals.',
  },
  {
    id: 'protection',
    code: 'PWR-02',
    title: 'Protection & isolation',
    role: 'Limits damage and enables safe disconnection.',
    purpose:
      'Detects abnormal current, leakage, temperature or operating conditions and disconnects the affected part before damage spreads.',
    operatingPrinciple:
      'Protective devices compare electrical or thermal behaviour with a designed threshold and open the circuit when the threshold is exceeded.',
    examples: ['Fuse', 'MCB', 'MCCB', 'RCD / RCCB', 'Overload relay', 'Surge protection', 'Isolator'],
    commonFaults: ['Nuisance tripping', 'Wrong rating', 'Welded contacts', 'Bypassed protection', 'Poor discrimination'],
    diagnosticChecks: ['Device rating', 'Trip history', 'Insulation resistance', 'Leakage current', 'Prospective fault current', 'Contact condition'],
    safety:
      'Never bypass a protective device to keep equipment running. Identify the fault and restore protection to the correct design rating.',
  },
  {
    id: 'distribution',
    code: 'PWR-03',
    title: 'Distribution & connection',
    role: 'Transfers power with controlled loss.',
    purpose:
      'Carries energy from source and protection stages to control devices and loads while maintaining acceptable voltage drop and temperature rise.',
    operatingPrinciple:
      'Conductor size, length, material, connection quality and installation method determine resistance, voltage drop, heat and fault withstand capability.',
    examples: ['Cables', 'Busbars', 'Terminals', 'Junction boxes', 'Connectors', 'Distribution boards', 'Earthing conductors'],
    commonFaults: ['Loose terminal', 'Undersized conductor', 'Corrosion', 'Open circuit', 'High-resistance joint', 'Damaged insulation'],
    diagnosticChecks: ['Continuity', 'Voltage drop', 'Thermal inspection', 'Torque verification', 'Insulation resistance', 'Visual condition'],
    safety:
      'A circuit can appear healthy without load but fail under current. Test voltage drop and temperature under controlled operating conditions.',
  },
  {
    id: 'control',
    code: 'CTL-04',
    title: 'Control & decision',
    role: 'Determines when and how power is applied.',
    purpose:
      'Interprets commands, conditions and feedback, then switches or regulates energy to produce the required system behaviour.',
    operatingPrinciple:
      'Manual, relay, PLC or electronic logic evaluates inputs and energises outputs according to interlocks, sequences, thresholds and control laws.',
    examples: ['Switch', 'Relay', 'Contactor', 'PLC', 'Timer', 'Variable-frequency drive', 'Control module'],
    commonFaults: ['Missing control supply', 'Failed coil', 'Incorrect logic', 'Stuck output', 'Interlock open', 'Signal noise'],
    diagnosticChecks: ['Control voltage', 'Input state', 'Output command', 'Coil resistance', 'Logic sequence', 'Signal integrity'],
    safety:
      'Control circuits can energise equipment remotely or automatically. Secure the energy source and confirm the operating state before intervention.',
  },
  {
    id: 'load',
    code: 'OUT-05',
    title: 'Load & energy conversion',
    role: 'Turns electrical energy into useful work.',
    purpose:
      'Converts supplied electrical power into motion, heat, light, sound, pressure, computation or another controlled output.',
    operatingPrinciple:
      'The load draws current according to its impedance and operating condition; its electrical signature changes with mechanical or thermal demand.',
    examples: ['Motor', 'Heater', 'Lighting', 'Solenoid', 'Transformer', 'Electronics', 'Pump'],
    commonFaults: ['Overload', 'Open winding', 'Shorted winding', 'Mechanical seizure', 'Insulation breakdown', 'Phase imbalance'],
    diagnosticChecks: ['Running current', 'Inrush current', 'Winding resistance', 'Insulation resistance', 'Temperature', 'Mechanical load'],
    safety:
      'Separate electrical failure from mechanical overload. A healthy supply can still feed a damaged or obstructed load.',
  },
  {
    id: 'feedback',
    code: 'FBK-06',
    title: 'Measurement & feedback',
    role: 'Reports the real condition of the system.',
    purpose:
      'Measures electrical and physical variables so operators or automatic controllers can compare actual behaviour with the required state.',
    operatingPrinciple:
      'Sensors and measuring devices convert voltage, current, temperature, position, pressure or speed into readable signals and diagnostic evidence.',
    examples: ['Current transformer', 'Voltage sensor', 'Temperature sensor', 'Transducer', 'Meter', 'Protection relay', 'Data logger'],
    commonFaults: ['Drift', 'Loss of reference', 'Open signal wire', 'Incorrect scaling', 'Poor shielding', 'Calibration error'],
    diagnosticChecks: ['Reference supply', 'Signal range', 'Ground integrity', 'Calibration', 'Waveform quality', 'Cross-check with independent instrument'],
    safety:
      'A displayed value is not automatically true. Confirm critical readings with a known-good instrument and a safe test method.',
  },
];

export const electricalPrinciples = [
  {
    code: 'V',
    title: 'Voltage',
    unit: 'volt (V)',
    definition: 'Electrical potential difference that provides the force capable of driving current.',
    fieldMeaning: 'Measure both source voltage and voltage at the load. The difference reveals loss in the path.',
  },
  {
    code: 'I',
    title: 'Current',
    unit: 'ampere (A)',
    definition: 'Rate of charge flow through a conductor or component.',
    fieldMeaning: 'Current reveals what the system is actually demanding, not only what voltage is available.',
  },
  {
    code: 'R',
    title: 'Resistance',
    unit: 'ohm (Ω)',
    definition: 'Opposition to current flow that causes voltage drop and heat.',
    fieldMeaning: 'Very small unwanted resistance can become critical in high-current circuits.',
  },
  {
    code: 'P',
    title: 'Power',
    unit: 'watt (W)',
    definition: 'Rate at which electrical energy is transferred or converted.',
    fieldMeaning: 'Power connects electrical measurements with the work or heat being produced.',
  },
  {
    code: 'f',
    title: 'Frequency',
    unit: 'hertz (Hz)',
    definition: 'Number of alternating cycles completed each second.',
    fieldMeaning: 'Frequency affects speed, timing, magnetic behaviour and the performance of AC equipment.',
  },
  {
    code: 'PF',
    title: 'Power factor',
    unit: 'ratio',
    definition: 'Relationship between real power and apparent power in an AC system.',
    fieldMeaning: 'A low power factor increases current and losses without producing equivalent useful work.',
  },
] as const;

export const powerForms = [
  {
    code: 'DC',
    title: 'Direct current',
    signature: 'Fixed polarity · stored energy · electronic control',
    explanation:
      'Current flows in one direction. DC is central to batteries, control circuits, electronics, telecommunications and energy storage.',
    checkpoints: ['Polarity', 'Voltage stability', 'Ripple', 'State of charge', 'Cable voltage drop'],
  },
  {
    code: '1Φ',
    title: 'Single-phase AC',
    signature: 'Alternating waveform · line and neutral · general loads',
    explanation:
      'A single alternating supply commonly feeds lighting, sockets, small motors and low-to-medium power equipment.',
    checkpoints: ['Voltage', 'Frequency', 'Earthing', 'Neutral integrity', 'Leakage protection'],
  },
  {
    code: '3Φ',
    title: 'Three-phase AC',
    signature: 'Balanced phases · rotating field · efficient power transfer',
    explanation:
      'Three phase-shifted waveforms deliver smoother power and efficient motor operation for industrial and high-demand systems.',
    checkpoints: ['Phase balance', 'Phase sequence', 'Line voltage', 'Current imbalance', 'Protection coordination'],
  },
  {
    code: 'CONV',
    title: 'Power conversion',
    signature: 'Rectification · inversion · transformation · regulation',
    explanation:
      'Converters adapt voltage, current, frequency or waveform so sources and loads can operate together safely and efficiently.',
    checkpoints: ['Input quality', 'Output regulation', 'Harmonics', 'Temperature', 'Efficiency'],
  },
] as const;

export const electricalDomains = [
  {
    id: 'power',
    code: '01',
    title: 'Power generation & conversion',
    summary: 'How energy is produced, transformed, stored and made usable.',
    systems: ['Utility and generator supply', 'Transformers', 'Rectifiers and inverters', 'Battery and DC systems', 'Solar and backup power'],
    engineeringQuestion: 'Is the source capable of delivering the required quality and quantity of power under load?',
  },
  {
    id: 'distribution',
    code: '02',
    title: 'Distribution & installation',
    summary: 'How power moves through conductors, panels, terminals and earthing networks.',
    systems: ['Cable and busbar systems', 'Distribution boards', 'Connection systems', 'Earthing and bonding', 'Voltage-drop control'],
    engineeringQuestion: 'Can the path carry normal and fault current without unsafe loss, heat or touch voltage?',
  },
  {
    id: 'protection',
    code: '03',
    title: 'Protection & safety',
    summary: 'How faults are detected, contained and disconnected selectively.',
    systems: ['Overcurrent protection', 'Earth-leakage protection', 'Surge protection', 'Isolation', 'Protection coordination'],
    engineeringQuestion: 'Will the correct device disconnect the correct section within a safe time?',
  },
  {
    id: 'control',
    code: '04',
    title: 'Control & automation',
    summary: 'How switches, relays, contactors, PLCs and drives sequence equipment.',
    systems: ['Relay logic', 'Motor control', 'PLC systems', 'Variable-frequency drives', 'Interlocks and emergency stops'],
    engineeringQuestion: 'Does the logic produce the intended output only when every required condition is satisfied?',
  },
  {
    id: 'measurement',
    code: '05',
    title: 'Measurement & diagnostics',
    summary: 'How evidence is captured, compared and converted into a reliable fault decision.',
    systems: ['Voltage and current measurement', 'Waveform analysis', 'Insulation testing', 'Thermal inspection', 'Power-quality analysis'],
    engineeringQuestion: 'Does the test reproduce the fault and prove the failed section without unsafe assumptions?',
  },
] as const;

export const diagnosticWorkflow = [
  {
    code: '01',
    title: 'Define the operating complaint',
    detail: 'Record what fails, when it fails, under what load and what changed before the event.',
    evidence: 'Clear symptom, operating condition and repeatability.',
  },
  {
    code: '02',
    title: 'Make the system safe',
    detail: 'Identify all energy sources, isolate where required and verify the condition with an approved instrument.',
    evidence: 'Isolation point, test-before-touch result and controlled work boundary.',
  },
  {
    code: '03',
    title: 'Read the architecture',
    detail: 'Trace source, protection, distribution, control, load and feedback before testing individual parts.',
    evidence: 'Expected power path, control path and return path.',
  },
  {
    code: '04',
    title: 'Inspect before measuring',
    detail: 'Look for heat, damage, contamination, loose connections, altered wiring and protection mismatch.',
    evidence: 'Photographs, terminal condition, device ratings and visible anomalies.',
  },
  {
    code: '05',
    title: 'Prove supply and return',
    detail: 'Measure power and ground at the point of use under the operating condition that causes the fault.',
    evidence: 'Loaded voltage, voltage drop, phase balance and return-path integrity.',
  },
  {
    code: '06',
    title: 'Test the command and response',
    detail: 'Confirm the input request, control decision, switching action and actual load response.',
    evidence: 'Input state, output command, coil or gate action, current and physical output.',
  },
  {
    code: '07',
    title: 'Isolate the failed section',
    detail: 'Divide the system at logical test points until the fault is contained between two verified boundaries.',
    evidence: 'Known-good upstream point and confirmed failed downstream point.',
  },
  {
    code: '08',
    title: 'Correct the root cause',
    detail: 'Repair the damaged component and the condition that caused it, using the correct rating and method.',
    evidence: 'Repair record, replaced rating, terminal treatment and restored protection.',
  },
  {
    code: '09',
    title: 'Verify under real load',
    detail: 'Repeat the original operating condition and confirm performance, temperature and protection behaviour.',
    evidence: 'Stable measurements, successful functional test and no recurring fault.',
  },
  {
    code: '10',
    title: 'Document the engineering decision',
    detail: 'Record complaint, tests, readings, cause, action and final verification so the decision can be reviewed.',
    evidence: 'Traceable report with measurements and conclusion.',
  },
] as const;

export const diagnosticTools = [
  {
    name: 'Digital multimeter',
    code: 'DMM',
    measures: 'Voltage, resistance, continuity, frequency and low current.',
    bestUse: 'Point-to-point circuit verification and reference measurements.',
    caution: 'Select the correct function and category rating before contact with a live circuit.',
  },
  {
    name: 'Clamp meter',
    code: 'AMP',
    measures: 'Current without opening the conductor.',
    bestUse: 'Running current, inrush current, imbalance and leakage checks.',
    caution: 'Clamp one conductor, not the complete cable containing outgoing and return paths.',
  },
  {
    name: 'Oscilloscope',
    code: 'SCOPE',
    measures: 'Voltage behaviour over time.',
    bestUse: 'Waveforms, switching, ripple, noise, transients and intermittent signals.',
    caution: 'Use isolated or differential methods where earth-referenced probes would create a short circuit.',
  },
  {
    name: 'Insulation resistance tester',
    code: 'IR',
    measures: 'Resistance of insulation at an elevated test voltage.',
    bestUse: 'Cables, motors, windings and leakage investigation.',
    caution: 'Disconnect sensitive electronics and discharge the tested circuit after measurement.',
  },
  {
    name: 'Phase and sequence tester',
    code: '3Φ',
    measures: 'Presence and rotation order of three-phase supply.',
    bestUse: 'Motor direction, commissioning and loss-of-phase checks.',
    caution: 'Confirm the instrument voltage range and use approved leads and PPE.',
  },
  {
    name: 'Thermal camera',
    code: 'THERM',
    measures: 'Surface temperature patterns.',
    bestUse: 'Loose joints, overload, imbalance and abnormal heating under load.',
    caution: 'Thermal evidence identifies heat, not automatically its electrical cause.',
  },
  {
    name: 'Power-quality analyser',
    code: 'PQA',
    measures: 'Voltage, current, power, harmonics, frequency, events and power factor.',
    bestUse: 'Supply-quality, demand, disturbance and efficiency investigations.',
    caution: 'Configure wiring arrangement, ratios and phase references correctly before trusting results.',
  },
  {
    name: 'Proving unit and voltage detector',
    code: 'SAFE',
    measures: 'Presence or absence of dangerous voltage.',
    bestUse: 'Prove–test–prove verification during isolation.',
    caution: 'A non-contact indicator alone is not sufficient proof of isolation.',
  },
] as const;

export type FaultCategory = 'supply' | 'connection' | 'protection' | 'control' | 'load' | 'quality';

export interface ElectricalFault {
  id: string;
  category: FaultCategory;
  title: string;
  symptom: string;
  likelyCauses: string[];
  tests: string[];
  expected: string;
  correctiveAction: string;
  verification: string;
}

export const electricalFaults: ElectricalFault[] = [
  {
    id: 'dead-circuit',
    category: 'supply',
    title: 'Dead circuit',
    symptom: 'No voltage and no operation at the load.',
    likelyCauses: ['Source unavailable', 'Open protective device', 'Open conductor', 'Isolation left open', 'Missing neutral or return'],
    tests: ['Confirm source voltage', 'Test both sides of protection', 'Trace loaded voltage to the load', 'Verify neutral or return continuity'],
    expected: 'Rated voltage should remain available from source to the load input under the required operating condition.',
    correctiveAction: 'Restore the failed source, protection, conductor or return path using the correct design rating.',
    verification: 'Operate the load repeatedly and confirm stable voltage and normal current.',
  },
  {
    id: 'low-voltage-under-load',
    category: 'supply',
    title: 'Low voltage under load',
    symptom: 'Equipment starts slowly, resets, chatters or loses torque when demand increases.',
    likelyCauses: ['Weak source', 'Undersized conductor', 'High-resistance joint', 'Excessive load', 'Long cable run'],
    tests: ['Compare open and loaded voltage', 'Measure section-by-section voltage drop', 'Measure current', 'Inspect heat at connections'],
    expected: 'Loaded voltage and total voltage drop should remain within the equipment and installation limits.',
    correctiveAction: 'Repair the high-resistance path, correct conductor size or restore source capacity.',
    verification: 'Repeat the highest normal load and confirm stable voltage, current and temperature.',
  },
  {
    id: 'intermittent-open',
    category: 'connection',
    title: 'Intermittent open circuit',
    symptom: 'Operation stops or flickers with vibration, temperature or movement.',
    likelyCauses: ['Loose terminal', 'Broken conductor strands', 'Cracked solder joint', 'Contaminated connector', 'Thermal expansion'],
    tests: ['Monitor voltage while reproducing movement', 'Perform loaded voltage-drop test', 'Inspect terminals under magnification', 'Use event recording'],
    expected: 'The circuit should maintain continuous voltage and signal integrity during movement and temperature change.',
    correctiveAction: 'Replace or correctly terminate the damaged connection and provide strain relief.',
    verification: 'Reproduce vibration or movement while monitoring the circuit under load.',
  },
  {
    id: 'hot-terminal',
    category: 'connection',
    title: 'Overheating terminal',
    symptom: 'Discolouration, insulation damage, smell or a thermal hotspot at a joint.',
    likelyCauses: ['Loose connection', 'Corrosion', 'Incorrect lug', 'Insufficient contact area', 'Overcurrent'],
    tests: ['Measure voltage drop across the joint', 'Compare temperature with similar phases', 'Verify torque and current', 'Inspect contact surfaces'],
    expected: 'A sound joint should have very low voltage drop and no abnormal temperature rise relative to equivalent connections.',
    correctiveAction: 'Replace heat-damaged parts, prepare contact surfaces, use the correct terminal and tighten to specification.',
    verification: 'Thermally inspect the repaired joint at normal and peak load.',
  },
  {
    id: 'repeated-tripping',
    category: 'protection',
    title: 'Repeated protective-device tripping',
    symptom: 'Fuse, breaker, RCD or overload trips during start-up or operation.',
    likelyCauses: ['Short circuit', 'Earth leakage', 'Overload', 'Incorrect rating', 'High inrush', 'Protection coordination issue'],
    tests: ['Identify trip characteristic', 'Measure insulation and leakage', 'Record inrush and running current', 'Compare device curve with load'],
    expected: 'Normal operating and inrush current should remain within the protective-device time-current characteristic.',
    correctiveAction: 'Remove the fault or correct protection design—never increase the rating without verifying conductor and equipment limits.',
    verification: 'Run repeated duty cycles and confirm correct protection remains installed and stable.',
  },
  {
    id: 'earth-leakage',
    category: 'protection',
    title: 'Earth leakage',
    symptom: 'RCD trips, touch sensation occurs or leakage current increases in damp conditions.',
    likelyCauses: ['Insulation deterioration', 'Moisture', 'Damaged heater', 'Contaminated terminal box', 'Shared or incorrect neutral'],
    tests: ['Insulation resistance test', 'Leakage clamp measurement', 'Separate branch circuits', 'Inspect neutral-earth arrangement'],
    expected: 'Insulation and leakage values must satisfy the equipment, protective device and applicable installation requirements.',
    correctiveAction: 'Repair insulation, remove contamination and correct wiring or neutral arrangement.',
    verification: 'Test insulation and leakage after repair, then confirm normal RCD operation.',
  },
  {
    id: 'contactor-chatter',
    category: 'control',
    title: 'Contactor or relay chatter',
    symptom: 'Rapid clicking, unstable output or contact burning.',
    likelyCauses: ['Low coil voltage', 'Loose control connection', 'Incorrect coil rating', 'Mechanical obstruction', 'Unstable interlock'],
    tests: ['Measure coil voltage during pull-in', 'Monitor control waveform', 'Check interlock contacts', 'Inspect armature and shading ring'],
    expected: 'Coil voltage must remain within the device operating range throughout pull-in and hold.',
    correctiveAction: 'Restore the control supply, connection or mechanical condition and replace heat-damaged contacts.',
    verification: 'Cycle the control repeatedly at minimum expected supply voltage and operating load.',
  },
  {
    id: 'command-no-output',
    category: 'control',
    title: 'Command present, no output',
    symptom: 'Input or control indication is present but the controlled device does not energise.',
    likelyCauses: ['Open interlock', 'Failed output device', 'No output supply', 'Broken coil', 'Logic inhibit'],
    tests: ['Trace input status', 'Check permissives and interlocks', 'Measure output command and supply', 'Test coil or gate continuity'],
    expected: 'All permissives should be true and the output stage should deliver the specified voltage or switching state.',
    correctiveAction: 'Correct the failed permissive, output stage, supply or controlled device.',
    verification: 'Confirm the complete sequence from command to physical response.',
  },
  {
    id: 'motor-overcurrent',
    category: 'load',
    title: 'Motor overcurrent',
    symptom: 'High running current, heat, slow acceleration or overload trip.',
    likelyCauses: ['Mechanical overload', 'Low voltage', 'Phase imbalance', 'Winding fault', 'Incorrect connection', 'Bearing damage'],
    tests: ['Measure all phase currents and voltages', 'Check mechanical load', 'Test winding resistance and insulation', 'Review connection and nameplate'],
    expected: 'Phase currents should be balanced and within rated current at the actual mechanical load.',
    correctiveAction: 'Remove mechanical or supply cause, correct connection, or repair the motor.',
    verification: 'Run to normal operating temperature while logging current, voltage and load.',
  },
  {
    id: 'open-winding',
    category: 'load',
    title: 'Open winding or element',
    symptom: 'No output despite correct supply at the component terminals.',
    likelyCauses: ['Burned winding', 'Broken internal lead', 'Thermal cut-out open', 'Mechanical damage'],
    tests: ['Isolate and measure resistance', 'Compare phases or identical elements', 'Check thermal protection', 'Inspect current draw'],
    expected: 'Resistance and phase values should match manufacturer data or equivalent healthy sections.',
    correctiveAction: 'Replace or professionally repair the failed winding, element or internal connection.',
    verification: 'Confirm rated current, output and temperature after replacement.',
  },
  {
    id: 'voltage-imbalance',
    category: 'quality',
    title: 'Three-phase voltage or current imbalance',
    symptom: 'Motor heating, vibration, reduced torque or unequal phase current.',
    likelyCauses: ['Unequal supply voltage', 'Loose phase connection', 'Single-phasing', 'Unbalanced loading', 'Winding difference'],
    tests: ['Measure all line voltages', 'Measure all phase currents', 'Inspect connections', 'Compare winding resistance'],
    expected: 'Phase values should remain closely balanced and within equipment and supply tolerances.',
    correctiveAction: 'Correct supply, connection, loading or winding condition.',
    verification: 'Log phase voltage and current under stable normal load.',
  },
  {
    id: 'harmonic-distortion',
    category: 'quality',
    title: 'Harmonic distortion',
    symptom: 'Neutral heating, transformer noise, nuisance trips or unexplained current.',
    likelyCauses: ['Non-linear loads', 'Drive or rectifier front ends', 'Poor filtering', 'Resonance', 'Overloaded neutral'],
    tests: ['Measure THD and harmonic spectrum', 'Compare neutral current', 'Review load composition', 'Check capacitor and filter condition'],
    expected: 'Voltage and current distortion should remain within the limits required by the installation and connected equipment.',
    correctiveAction: 'Balance or separate loads, correct neutral capacity, add suitable filtering or address resonance.',
    verification: 'Repeat power-quality recording during representative operating periods.',
  },
];

export const faultCategories: Array<{ id: 'all' | FaultCategory; label: string }> = [
  { id: 'all', label: 'All faults' },
  { id: 'supply', label: 'Supply' },
  { id: 'connection', label: 'Connections' },
  { id: 'protection', label: 'Protection' },
  { id: 'control', label: 'Control' },
  { id: 'load', label: 'Loads' },
  { id: 'quality', label: 'Power quality' },
];

export const diagnosticScenarios = [
  {
    id: 'no-power',
    title: 'No power at the load',
    priority: 'Establish the last verified point of rated voltage.',
    sequence: ['Confirm source', 'Check isolation and protection', 'Measure loaded voltage along the path', 'Verify neutral or return', 'Test the load'],
    stopRule: 'Stop energising if a conductor, terminal or protective device shows heat damage or an unsafe rating.',
  },
  {
    id: 'tripping',
    title: 'Protection keeps tripping',
    priority: 'Determine whether the device is responding to overcurrent, leakage, temperature or an incorrect application.',
    sequence: ['Identify device and trip curve', 'Measure current or leakage', 'Separate branches', 'Inspect insulation and load', 'Verify coordination'],
    stopRule: 'Never uprate or bypass the device until cable, load and fault-current requirements are proven.',
  },
  {
    id: 'overheating',
    title: 'Cable or terminal overheats',
    priority: 'Compare current, connection voltage drop and temperature with an equivalent healthy path.',
    sequence: ['Reduce risk and inspect', 'Measure load current', 'Measure joint voltage drop', 'Verify conductor and terminal rating', 'Correct and retest thermally'],
    stopRule: 'De-energise immediately when insulation is carbonised, conductor strands are damaged or arcing is present.',
  },
  {
    id: 'intermittent',
    title: 'Intermittent operation',
    priority: 'Capture the electrical state at the moment the symptom occurs.',
    sequence: ['Reproduce safely', 'Monitor supply and control simultaneously', 'Apply controlled movement or temperature', 'Record waveform or minimum/maximum', 'Isolate the changing section'],
    stopRule: 'Do not replace parts based only on a fault that cannot be linked to a measured change.',
  },
  {
    id: 'motor',
    title: 'Motor will not start',
    priority: 'Separate supply, control, protection and mechanical causes.',
    sequence: ['Check three-phase supply', 'Confirm control permissives', 'Measure coil and output', 'Measure winding and insulation', 'Check mechanical freedom and load'],
    stopRule: 'Do not repeatedly attempt starting when the motor stalls, hums, loses a phase or draws excessive current.',
  },
] as const;

export const safetyPrinciples = [
  {
    code: 'SAFE-01',
    title: 'Identify every energy source',
    detail: 'Include normal supply, generators, batteries, capacitors, backfeed, control supplies and induced voltage.',
  },
  {
    code: 'SAFE-02',
    title: 'Isolate, secure and prove',
    detail: 'Open the correct isolation point, prevent reconnection, prove the tester, test the circuit, then prove the tester again.',
  },
  {
    code: 'SAFE-03',
    title: 'Use rated instruments and PPE',
    detail: 'Match the instrument category, voltage range, leads and protective equipment to the available electrical energy.',
  },
  {
    code: 'SAFE-04',
    title: 'Preserve protection',
    detail: 'Never defeat fuses, breakers, leakage protection, interlocks or covers to force operation.',
  },
  {
    code: 'SAFE-05',
    title: 'Control stored and automatic energy',
    detail: 'Discharge capacitors, secure moving equipment and prevent remote or automatic restart.',
  },
  {
    code: 'SAFE-06',
    title: 'Verify after work',
    detail: 'Confirm earthing, polarity, phase sequence, protection, covers, labels and functional operation before release.',
  },
] as const;

export const engineeringStandards = [
  'Design from load, duty cycle and environment—not from appearance.',
  'Size conductors for current, voltage drop, temperature, installation method and fault withstand.',
  'Coordinate protection so the smallest affected section disconnects first.',
  'Separate power, control and sensitive signal paths where interference is possible.',
  'Use clear identification, terminal numbering and drawings that match the installed system.',
  'Make isolation visible, accessible and suitable for the energy being controlled.',
  'Design earthing and bonding as a protective system, not as an afterthought.',
  'Record baseline measurements so future deterioration can be recognised early.',
  'Verify the completed system under realistic load before handover.',
] as const;
