export type AutomotiveNodeId =
  | 'energy'
  | 'air'
  | 'combustion'
  | 'thermal'
  | 'driveline'
  | 'chassis'
  | 'control'
  | 'aftertreatment';

export interface AutomotiveArchitectureNode {
  id: AutomotiveNodeId;
  code: string;
  title: string;
  role: string;
  purpose: string;
  operatingPrinciple: string;
  examples: string[];
  commonFaults: string[];
  diagnosticChecks: string[];
  interaction: string;
  safety: string;
}

export const vehicleArchitecture: AutomotiveArchitectureNode[] = [
  {
    id: 'energy',
    code: 'AUT-01',
    title: 'Energy & fuel delivery',
    role: 'Stores, conditions and delivers the energy required to produce motion.',
    purpose:
      'Maintains the correct fuel quality, supply pressure, filtration, electrical energy and delivery capacity for every operating condition.',
    operatingPrinciple:
      'Energy moves from storage through filtration, pumping, regulation and metering before it can be converted into combustion pressure or electrical work.',
    examples: ['Fuel tank', 'Primary filter', 'Lift pump', 'High-pressure pump', 'Fuel rail', 'Battery', 'Alternator'],
    commonFaults: ['Air ingress', 'Restricted filter', 'Low rail pressure', 'Contaminated fuel', 'Battery voltage collapse', 'Charging fault'],
    diagnosticChecks: ['Fuel restriction', 'Low-side pressure', 'Commanded versus measured rail pressure', 'Leak-off', 'Loaded battery voltage', 'Charging ripple'],
    interaction:
      'Fuel delivery, cranking speed, sensor references and control-module power must agree before combustion can be assessed correctly.',
    safety:
      'Depressurise high-pressure fuel systems, isolate electrical energy and control ignition sources before opening the system.',
  },
  {
    id: 'air',
    code: 'AUT-02',
    title: 'Air management & boost',
    role: 'Supplies clean, measured and pressurised air for efficient combustion.',
    purpose:
      'Controls airflow, boost pressure, charge temperature and exhaust-gas recirculation so the engine receives the required oxygen mass.',
    operatingPrinciple:
      'The intake path filters air, the turbocharger raises pressure, the charge-air cooler reduces temperature and sensors report the resulting air mass and pressure.',
    examples: ['Air cleaner', 'Intake ducting', 'Turbocharger', 'Intercooler', 'MAP sensor', 'MAF sensor', 'EGR valve'],
    commonFaults: ['Boost leak', 'Restricted air filter', 'Turbo shaft damage', 'Stuck EGR valve', 'Sensor drift', 'Charge-air contamination'],
    diagnosticChecks: ['Air restriction', 'Boost command versus actual', 'Smoke behaviour', 'Turbo shaft condition', 'Charge-air leakage', 'Sensor plausibility'],
    interaction:
      'Airflow affects combustion temperature, torque, smoke, fuel command and aftertreatment performance.',
    safety:
      'Allow hot components to cool, prevent foreign-object entry and never run exposed rotating turbocharger parts.',
  },
  {
    id: 'combustion',
    code: 'AUT-03',
    title: 'Combustion & engine mechanics',
    role: 'Converts chemical energy into controlled cylinder pressure and crankshaft torque.',
    purpose:
      'Coordinates compression, injection, ignition delay, valve timing and mechanical sealing to produce stable torque without destructive loading.',
    operatingPrinciple:
      'Air is compressed, fuel is metered and atomised, combustion pressure acts on the piston, and the connecting rod converts linear force into crankshaft rotation.',
    examples: ['Cylinder block', 'Piston', 'Connecting rod', 'Crankshaft', 'Camshaft', 'Valves', 'Injector'],
    commonFaults: ['Low compression', 'Bearing seizure', 'Piston damage', 'Valve leakage', 'Incorrect timing', 'Injector imbalance'],
    diagnosticChecks: ['Compression balance', 'Cylinder cut-out', 'Crankcase pressure', 'Oil pressure', 'Valve clearance', 'Combustion correction values'],
    interaction:
      'Mechanical condition, lubrication, fuel quantity, air mass and thermal control determine the real combustion result.',
    safety:
      'Prevent unintended cranking, support removed assemblies correctly and use approved lifting and torque procedures.',
  },
  {
    id: 'thermal',
    code: 'AUT-04',
    title: 'Lubrication & thermal control',
    role: 'Controls friction, heat transfer, cleanliness and component life.',
    purpose:
      'Maintains oil pressure, coolant circulation and temperature stability while removing contaminants and protecting loaded surfaces.',
    operatingPrinciple:
      'Pumps circulate oil and coolant through designed galleries; heat exchangers reject energy and control devices regulate flow according to operating temperature.',
    examples: ['Oil pump', 'Oil filter', 'Oil cooler', 'Water pump', 'Thermostat', 'Radiator', 'Cooling fan'],
    commonFaults: ['Low oil pressure', 'Coolant loss', 'Thermostat restriction', 'Pump failure', 'Blocked cooler', 'Combustion-gas leakage'],
    diagnosticChecks: ['Mechanical oil pressure', 'Coolant pressure test', 'Temperature gradient', 'Fan command', 'Oil contamination', 'Combustion-gas test'],
    interaction:
      'Thermal failure can damage bearings, pistons, turbochargers, seals, wiring and aftertreatment components.',
    safety:
      'Never open a pressurised hot cooling system and control oil or coolant spills before testing.',
  },
  {
    id: 'driveline',
    code: 'AUT-05',
    title: 'Clutch, transmission & driveline',
    role: 'Transfers, multiplies and controls torque between engine and road wheels.',
    purpose:
      'Provides launch control, ratio selection, directional change, speed reduction and final torque delivery with acceptable noise and loss.',
    operatingPrinciple:
      'The clutch couples engine torque, selected gear pairs establish ratio, shafts carry torque, and the final drive distributes it to the wheels.',
    examples: ['Clutch', 'Input shaft', 'Main shaft', 'Synchroniser', 'Propeller shaft', 'Differential', 'Drive axle'],
    commonFaults: ['Clutch slip', 'Gear-tooth damage', 'Bearing looseness', 'Synchroniser wear', 'Shaft misalignment', 'Differential noise'],
    diagnosticChecks: ['Road-test pattern', 'Oil condition', 'End float', 'Bearing fit', 'Gear-contact pattern', 'Propeller-shaft runout'],
    interaction:
      'Engine torque, clutch condition, mounting alignment, lubrication and vehicle load all influence driveline life.',
    safety:
      'Secure the vehicle, support heavy assemblies and prevent rotation before inspecting shafts or gears.',
  },
  {
    id: 'chassis',
    code: 'AUT-06',
    title: 'Braking, steering & chassis',
    role: 'Controls speed, direction, stability, load transfer and road contact.',
    purpose:
      'Converts driver input into predictable deceleration and directional control while keeping tyres aligned with the road.',
    operatingPrinciple:
      'Hydraulic, pneumatic or electronic systems multiply command force; steering geometry and suspension manage wheel position, load and motion.',
    examples: ['Air compressor', 'Air dryer', 'Brake chamber', 'ABS modulator', 'Steering gear', 'Power-steering pump', 'Suspension'],
    commonFaults: ['Air leakage', 'Low system pressure', 'Brake imbalance', 'Hard steering', 'Wheel misalignment', 'Worn joints'],
    diagnosticChecks: ['Pressure build-up', 'Leak-down test', 'Brake-force balance', 'Steering pressure', 'Free play', 'Tyre wear pattern'],
    interaction:
      'Tyres, brakes, steering, suspension, wheel bearings and chassis alignment must be evaluated as one road-control system.',
    safety:
      'Chock and support the vehicle, release stored air safely and never work beneath an unsupported cab or chassis.',
  },
  {
    id: 'control',
    code: 'AUT-07',
    title: 'Electrical & electronic control',
    role: 'Measures conditions, coordinates commands and protects system operation.',
    purpose:
      'Supplies electrical power, interprets sensors, communicates between modules and commands actuators across the vehicle.',
    operatingPrinciple:
      'Control modules compare driver demand and measured conditions with calibrated logic, then regulate outputs and record diagnostic evidence.',
    examples: ['ECM', 'ABS ECU', 'Body controller', 'Sensors', 'Actuators', 'CAN network', 'Instrument cluster'],
    commonFaults: ['Low supply voltage', 'Poor ground', 'Open signal circuit', 'CAN communication loss', 'Sensor bias', 'Actuator failure'],
    diagnosticChecks: ['Power and ground voltage drop', 'Network resistance', 'Live-data plausibility', 'Actuator test', 'Reference voltage', 'Waveform'],
    interaction:
      'Electronic data is only trustworthy when power supply, grounds, wiring, mechanical condition and sensor context are verified.',
    safety:
      'Use correct test methods at control-module terminals and protect circuits from accidental shorting or reverse polarity.',
  },
  {
    id: 'aftertreatment',
    code: 'AUT-08',
    title: 'Exhaust & aftertreatment',
    role: 'Controls exhaust flow, emissions conversion and system regeneration.',
    purpose:
      'Reduces particulate matter and regulated gases while maintaining acceptable exhaust restriction and thermal conditions.',
    operatingPrinciple:
      'Sensors report temperature, pressure and gas composition; control logic manages EGR, oxidation, filtration, dosing and selective catalytic reduction.',
    examples: ['DOC', 'DPF', 'SCR catalyst', 'DEF dosing unit', 'NOx sensor', 'Temperature sensor', 'Differential-pressure sensor'],
    commonFaults: ['High restriction', 'Failed regeneration', 'DEF quality fault', 'Doser blockage', 'Sensor plausibility fault', 'Catalyst inefficiency'],
    diagnosticChecks: ['Differential pressure', 'Temperature response', 'DEF quality', 'Doser quantity', 'NOx conversion', 'Regeneration history'],
    interaction:
      'Engine combustion quality, oil consumption, exhaust leaks, sensor accuracy and vehicle duty cycle determine aftertreatment performance.',
    safety:
      'Aftertreatment components can remain extremely hot. Control regeneration, chemical exposure and exhaust ventilation.',
  },
];

export const operatingCycles = [
  {
    id: 'intake',
    code: '01',
    title: 'Intake',
    event: 'The piston moves downward while the intake path supplies the required air mass.',
    valveState: 'Intake open · exhaust closed',
    pressureState: 'Cylinder pressure below intake-manifold pressure',
    purpose: 'Fill the cylinder efficiently with clean, correctly measured air.',
    failureSignatures: ['Restricted airflow', 'Boost leakage', 'Incorrect valve timing', 'EGR flow error'],
    evidence: ['Air restriction', 'MAP / MAF trend', 'Boost response', 'Valve timing confirmation'],
  },
  {
    id: 'compression',
    code: '02',
    title: 'Compression',
    event: 'The piston rises with both valves closed and raises air temperature and pressure.',
    valveState: 'Intake closed · exhaust closed',
    pressureState: 'Rapid pressure and temperature rise',
    purpose: 'Create the conditions needed for controlled fuel ignition.',
    failureSignatures: ['Low compression', 'Valve leakage', 'Ring or liner wear', 'Head-gasket leakage'],
    evidence: ['Compression balance', 'Leak-down path', 'Cranking speed', 'Crankcase pressure'],
  },
  {
    id: 'power',
    code: '03',
    title: 'Combustion & power',
    event: 'Fuel injection and combustion raise cylinder pressure and drive the piston downward.',
    valveState: 'Intake closed · exhaust closed',
    pressureState: 'Peak cylinder pressure converted into crankshaft torque',
    purpose: 'Produce useful torque with controlled pressure rise, temperature and emissions.',
    failureSignatures: ['Knock', 'Misfire', 'Smoke', 'Injector imbalance', 'Abnormal cylinder loading'],
    evidence: ['Cylinder contribution', 'Injection correction', 'Smoke colour', 'Combustion noise', 'Exhaust temperature'],
  },
  {
    id: 'exhaust',
    code: '04',
    title: 'Exhaust',
    event: 'The piston rises and discharges combustion products through the exhaust path.',
    valveState: 'Intake closed · exhaust open',
    pressureState: 'Cylinder pressure drives exhaust flow toward the turbine and aftertreatment',
    purpose: 'Clear the cylinder and deliver usable exhaust energy without excessive restriction.',
    failureSignatures: ['High backpressure', 'Burnt valve', 'Turbo restriction', 'Exhaust leak', 'DPF loading'],
    evidence: ['Exhaust pressure', 'Valve sealing', 'Turbo response', 'DPF differential pressure', 'Temperature profile'],
  },
] as const;

export const automotiveDomains = [
  {
    id: 'powertrain',
    code: '01',
    title: 'Engine & powertrain',
    summary: 'Combustion, lubrication, cooling, torque generation and mechanical integrity.',
    systems: ['Cylinder sealing', 'Fuel injection', 'Air and boost', 'Lubrication', 'Cooling', 'Engine timing'],
    engineeringQuestion: 'Is the engine receiving the correct inputs and converting them into balanced torque without destructive loading?',
  },
  {
    id: 'driveline',
    code: '02',
    title: 'Transmission & driveline',
    summary: 'Clutch control, ratio selection, shaft alignment and torque delivery.',
    systems: ['Clutch', 'Gearbox', 'Propeller shaft', 'Differential', 'Drive axle', 'Mounting alignment'],
    engineeringQuestion: 'Where is torque being lost, interrupted, multiplied incorrectly or transferred through a damaged interface?',
  },
  {
    id: 'roadcontrol',
    code: '03',
    title: 'Braking, steering & suspension',
    summary: 'Road control, stability, pressure generation and wheel behaviour.',
    systems: ['Air brake', 'ABS', 'Steering assistance', 'Wheel alignment', 'Suspension', 'Tyres and hubs'],
    engineeringQuestion: 'Can the vehicle stop and steer predictably under load while maintaining stable tyre contact?',
  },
  {
    id: 'electronics',
    code: '04',
    title: 'Vehicle electronics & networks',
    summary: 'Power supply, modules, sensors, actuators, diagnostics and communication.',
    systems: ['Starting and charging', 'ECM control', 'CAN network', 'Instrumentation', 'Body electronics', 'Diagnostic software'],
    engineeringQuestion: 'Does the data represent the real vehicle condition, and can each commanded output be verified physically?',
  },
  {
    id: 'emissions',
    code: '05',
    title: 'Emissions & aftertreatment',
    summary: 'Combustion quality, exhaust thermal management, filtration and chemical conversion.',
    systems: ['EGR', 'DOC', 'DPF', 'SCR', 'DEF dosing', 'NOx and temperature sensing'],
    engineeringQuestion: 'Is the aftertreatment fault the cause, or the downstream result of an engine, fuel, oil or duty-cycle problem?',
  },
  {
    id: 'operations',
    code: '06',
    title: 'Maintenance & fleet reliability',
    summary: 'Inspection, service control, evidence capture and repeat-failure prevention.',
    systems: ['Periodic maintenance', 'Fluid control', 'Fastener verification', 'Driver reports', 'Trend monitoring', 'Technical documentation'],
    engineeringQuestion: 'What evidence proves the root cause was removed and the vehicle is reliable for its real operating duty?',
  },
] as const;

export const diagnosticWorkflow = [
  {
    code: '01',
    title: 'Define the complaint precisely',
    detail: 'Record the symptom, load, speed, temperature, road condition, warning lamps, recent work and when the behaviour began.',
    evidence: 'A repeatable operating condition and a clear distinction between symptom and interpretation.',
  },
  {
    code: '02',
    title: 'Control safety and stored energy',
    detail: 'Secure the vehicle, identify hot, rotating, pressurised, electrical and suspended hazards before testing.',
    evidence: 'Safe work boundary, isolation method and controlled vehicle condition.',
  },
  {
    code: '03',
    title: 'Review system history',
    detail: 'Check service records, previous repairs, fault recurrence, fluid usage, driver reports and operating duty.',
    evidence: 'Timeline linking the current complaint with maintenance and operating conditions.',
  },
  {
    code: '04',
    title: 'Confirm the complaint',
    detail: 'Reproduce the symptom through a controlled static test, road test or load condition without creating additional damage.',
    evidence: 'Observed behaviour, exact trigger and baseline measurements.',
  },
  {
    code: '05',
    title: 'Perform a complete visual inspection',
    detail: 'Inspect fluid levels, leaks, connectors, hoses, mountings, fasteners, heat evidence, contamination and unauthorised alterations.',
    evidence: 'Photographs and observations recorded before parts are disturbed.',
  },
  {
    code: '06',
    title: 'Read diagnostic data in context',
    detail: 'Capture active and stored faults, freeze-frame data, live parameters, counters and module communication status.',
    evidence: 'Data set tied to the operating condition, not only a list of fault codes.',
  },
  {
    code: '07',
    title: 'Map the system boundary',
    detail: 'Separate source, control, mechanical conversion, load and feedback so each test has a defined purpose.',
    evidence: 'Expected flow path and identified test points.',
  },
  {
    code: '08',
    title: 'Compare command with reality',
    detail: 'Compare commanded and measured pressure, speed, temperature, position, voltage or current under the same condition.',
    evidence: 'Deviation that identifies the section unable to follow command.',
  },
  {
    code: '09',
    title: 'Isolate the failed section',
    detail: 'Use targeted mechanical, hydraulic, pneumatic, electrical or electronic tests to narrow the fault without random replacement.',
    evidence: 'A result that excludes healthy sections and proves the failed boundary.',
  },
  {
    code: '10',
    title: 'Identify the root cause and secondary damage',
    detail: 'Determine why the component failed, what additional parts were affected and what operating condition accelerated the event.',
    evidence: 'Failure mechanism supported by physical marks, measurements, data and system interaction.',
  },
  {
    code: '11',
    title: 'Repair to system standard',
    detail: 'Correct the root cause, restore cleanliness, alignment, torque, calibration, fluid specification and protection.',
    evidence: 'Documented repair method, replaced parts and controlled assembly conditions.',
  },
  {
    code: '12',
    title: 'Verify under real duty',
    detail: 'Clear faults, perform adaptations where required, repeat the original test and confirm no leakage, noise, warning or performance loss.',
    evidence: 'Final values, road-test result and customer complaint no longer present.',
  },
] as const;

export const diagnosticScenarios = [
  {
    id: 'no-start',
    title: 'Cranks but will not start',
    priority: 'Confirm cranking speed, synchronisation, fuel pressure and enable conditions before opening the engine.',
    sequence: [
      'Verify battery voltage and cranking speed',
      'Confirm ECM communication and immobiliser status',
      'Check engine-speed and synchronisation signals',
      'Compare commanded and measured rail pressure',
      'Check low-pressure fuel supply and air ingress',
      'Confirm injector command and mechanical compression',
    ],
    stopRule:
      'Do not replace injectors or the high-pressure pump until supply, leakage, command and mechanical compression have been separated.',
  },
  {
    id: 'low-power',
    title: 'Low pulling power',
    priority: 'Reproduce the loss under load and compare air, fuel, exhaust and torque data at the same moment.',
    sequence: [
      'Confirm driver complaint and vehicle load',
      'Check intake restriction and charge-air leakage',
      'Compare boost command with measured boost',
      'Compare rail-pressure command with actual pressure',
      'Review injector correction and smoke behaviour',
      'Check exhaust restriction and aftertreatment status',
    ],
    stopRule:
      'A single low parameter is not enough; prove whether it is the cause, the control response or a downstream effect.',
  },
  {
    id: 'overheating',
    title: 'Overheating',
    priority: 'Stop operation before thermal damage spreads and determine whether heat generation or heat rejection has failed.',
    sequence: [
      'Confirm actual coolant temperature independently',
      'Check coolant level, pressure and leakage',
      'Verify thermostat and coolant circulation',
      'Confirm fan command and fan performance',
      'Measure radiator temperature distribution',
      'Check combustion-gas entry and engine loading',
    ],
    stopRule:
      'Do not continue a loaded road test when coolant loss, combustion-gas pressurisation or oil-pressure risk is present.',
  },
  {
    id: 'knock',
    title: 'Abnormal engine knock',
    priority: 'Separate combustion noise, valvetrain noise and crankcase mechanical knock before further operation.',
    sequence: [
      'Identify speed, load and temperature dependence',
      'Check oil level and mechanical oil pressure',
      'Perform cylinder cut-out or contribution test',
      'Localise the sound by engine zone',
      'Inspect filter and oil for metallic debris',
      'Stop and dismantle when bearing or piston damage is indicated',
    ],
    stopRule:
      'Do not repeatedly run an engine with suspected bearing knock; each run can convert local damage into total failure.',
  },
  {
    id: 'gearbox',
    title: 'Gear noise or disengagement',
    priority: 'Link the noise to a selected ratio, torque direction and shaft condition before dismantling.',
    sequence: [
      'Confirm the affected gear and load condition',
      'Check clutch release and mounting condition',
      'Inspect lubricant level, type and debris',
      'Assess shaft end float and bearing support',
      'Inspect engagement teeth, cones and synchronisers',
      'Verify housing alignment and gear-contact pattern',
    ],
    stopRule:
      'Replacing damaged gears without correcting bearing fit, shaft movement or alignment invites repeat failure.',
  },
  {
    id: 'air-brake',
    title: 'Low air pressure',
    priority: 'Determine whether the system cannot generate, retain, regulate or distribute pressure.',
    sequence: [
      'Measure compressor build-up time',
      'Check intake, drive and compressor discharge',
      'Inspect dryer and unloader operation',
      'Perform system leak-down test',
      'Separate service, parking and auxiliary circuits',
      'Confirm warning and governor cut-in / cut-out behaviour',
    ],
    stopRule:
      'The vehicle must not return to service until pressure build-up, retention, warning and brake application meet safe operating requirements.',
  },
] as const;

export const diagnosticTools = [
  {
    code: 'SCAN',
    name: 'OEM diagnostic platform',
    measures: 'Fault codes, freeze frame, live data, counters, calibrations and actuator commands.',
    bestUse: 'Relating control decisions to the exact operating condition and confirming module communication.',
    caution: 'A fault code identifies a monitored condition, not automatically the failed component.',
  },
  {
    code: 'DMM',
    name: 'Digital multimeter',
    measures: 'Voltage, resistance, continuity, frequency and selected current ranges.',
    bestUse: 'Power, ground, reference, signal and voltage-drop checks in vehicle circuits.',
    caution: 'Resistance testing on an energised circuit can damage equipment or give invalid results.',
  },
  {
    code: 'SCOPE',
    name: 'Automotive oscilloscope',
    measures: 'Waveform shape, timing, amplitude, noise, dropout and communication activity.',
    bestUse: 'Crank / cam correlation, injector command, sensor integrity and network diagnosis.',
    caution: 'Use correct attenuation, grounding and test leads to avoid circuit damage.',
  },
  {
    code: 'PRESS',
    name: 'Pressure and vacuum instruments',
    measures: 'Fuel pressure, oil pressure, boost, exhaust pressure, coolant pressure and vacuum.',
    bestUse: 'Comparing commanded system behaviour with a direct mechanical measurement.',
    caution: 'Use the correct pressure range, hose rating and contamination control.',
  },
  {
    code: 'COMP',
    name: 'Compression and leak-down equipment',
    measures: 'Cylinder pressure balance and leakage path.',
    bestUse: 'Separating valve, piston-ring, liner and head-sealing faults.',
    caution: 'Disable fuel and ignition correctly and interpret results with cranking speed and temperature.',
  },
  {
    code: 'AIR',
    name: 'Air-system test kit',
    measures: 'Build-up pressure, cut-in, cut-out, leakage and circuit delivery pressure.',
    bestUse: 'Commercial-vehicle brake, suspension and auxiliary pneumatic diagnosis.',
    caution: 'Stored air can move actuators suddenly; exhaust pressure in a controlled manner.',
  },
  {
    code: 'TEMP',
    name: 'Thermal camera and contact probes',
    measures: 'Temperature distribution, local heat rise and cooling performance.',
    bestUse: 'Radiator flow, bearing heat, brake imbalance, electrical joints and aftertreatment temperature.',
    caution: 'Surface emissivity and airflow can distort apparent temperature.',
  },
  {
    code: 'BORE',
    name: 'Borescope',
    measures: 'Internal visual condition without complete dismantling.',
    bestUse: 'Cylinder crowns, liners, valves, intake paths and inaccessible damage.',
    caution: 'Secure the probe and prevent contact with moving components.',
  },
  {
    code: 'FLOW',
    name: 'Fuel return and flow test equipment',
    measures: 'Injector leak-off, supply volume and restriction.',
    bestUse: 'Low rail-pressure diagnosis, hard starting and cylinder fuel imbalance.',
    caution: 'Maintain absolute cleanliness and control high-pressure hazards.',
  },
  {
    code: 'MECH',
    name: 'Mechanical measurement set',
    measures: 'Clearance, runout, end float, bore, journal diameter, gear backlash and torque.',
    bestUse: 'Proving wear, alignment, bearing fit and assembly condition during dismantling.',
    caution: 'Record calibration, temperature and measurement location for repeatable evidence.',
  },
  {
    code: 'SMOKE',
    name: 'Smoke and pressure leak tester',
    measures: 'Sealed-system leakage and visible escape path.',
    bestUse: 'Charge-air, intake, evaporative and selected enclosure leak diagnosis.',
    caution: 'Use only approved pressure and medium for the system being tested.',
  },
  {
    code: 'DOC',
    name: 'Technical documentation system',
    measures: 'Specifications, wiring, torque, tolerances, procedures and service information.',
    bestUse: 'Converting observations into a controlled diagnosis and repair plan.',
    caution: 'Confirm model, variant, engine, axle and software applicability before using a value.',
  },
] as const;

export type FaultCategory =
  | 'engine'
  | 'fuel-air'
  | 'thermal'
  | 'driveline'
  | 'braking'
  | 'steering'
  | 'electrical-control'
  | 'aftertreatment';

export const faultCategories: Array<{ id: 'all' | FaultCategory; label: string }> = [
  { id: 'all', label: 'All systems' },
  { id: 'engine', label: 'Engine' },
  { id: 'fuel-air', label: 'Fuel & air' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'driveline', label: 'Driveline' },
  { id: 'braking', label: 'Braking' },
  { id: 'steering', label: 'Steering' },
  { id: 'electrical-control', label: 'Electrical / control' },
  { id: 'aftertreatment', label: 'Aftertreatment' },
];

export const automotiveFaults = [
  {
    id: 'bearing-knock',
    category: 'engine' as FaultCategory,
    title: 'Connecting-rod bearing distress',
    symptom: 'Deep knock from the crankcase area that increases with load, often with metallic debris or local heat marks.',
    likelyCauses: ['Lubrication loss', 'Bearing rotation', 'Incorrect clearance', 'Oil contamination', 'Journal damage', 'Fastener or housing distortion'],
    tests: ['Mechanical oil-pressure test', 'Cylinder cut-out comparison', 'Oil and filter inspection', 'Crankshaft end-play check', 'Journal and bearing measurement'],
    expected: 'Noise localises to the affected cylinder or journal and dismantling confirms abnormal clearance, scoring, heat or bearing movement.',
    correctiveAction: 'Correct the lubrication or assembly cause and replace or machine every component outside specification.',
    verification: 'Prime lubrication, confirm oil pressure, monitor noise and temperature, then perform controlled load verification.',
  },
  {
    id: 'low-compression',
    category: 'engine' as FaultCategory,
    title: 'Low cylinder compression',
    symptom: 'Hard starting, uneven idle, misfire, crankcase fumes or reduced power with cylinder imbalance.',
    likelyCauses: ['Valve leakage', 'Ring or liner wear', 'Piston damage', 'Head-gasket leakage', 'Incorrect valve clearance', 'Valve timing error'],
    tests: ['Compression comparison', 'Leak-down test', 'Valve-clearance check', 'Borescope inspection', 'Crankcase-pressure measurement'],
    expected: 'One or more cylinders show reduced pressure and the leakage path identifies valve, piston, liner or head sealing.',
    correctiveAction: 'Repair the confirmed sealing fault and restore timing, clearances and surface condition.',
    verification: 'Compression balance, stable idle, normal crankcase pressure and restored loaded performance.',
  },
  {
    id: 'low-rail-pressure',
    category: 'fuel-air' as FaultCategory,
    title: 'Rail pressure below command',
    symptom: 'Hard starting, low pulling power, engine derate or fault codes showing measured pressure unable to follow command.',
    likelyCauses: ['Restricted filter', 'Air ingress', 'Weak supply pump', 'Excess injector leak-off', 'Pressure-control fault', 'High-pressure pump wear'],
    tests: ['Low-side pressure and restriction', 'Commanded versus measured rail pressure', 'Injector return test', 'Air-bubble inspection', 'Control-valve command'],
    expected: 'The pressure shortfall appears under a defined demand and the test identifies supply loss, excessive return or regulation failure.',
    correctiveAction: 'Restore clean, sealed fuel supply and repair the proven leaking, regulating or pumping component.',
    verification: 'Fast start, stable rail-pressure tracking, no air entry and full torque without fuel-pressure faults.',
  },
  {
    id: 'boost-loss',
    category: 'fuel-air' as FaultCategory,
    title: 'Charge-air or boost loss',
    symptom: 'Low power, smoke, slow acceleration, abnormal turbo sound or boost pressure below command.',
    likelyCauses: ['Split hose', 'Loose clamp', 'Intercooler leak', 'Restricted air filter', 'Turbo damage', 'EGR flow error'],
    tests: ['Charge-air pressure test', 'Air-filter restriction', 'Turbo shaft inspection', 'Boost command versus actual', 'Exhaust restriction check'],
    expected: 'A controlled test reveals pressure escape, restriction or turbo inability at the condition where torque is lost.',
    correctiveAction: 'Repair the leak or restriction and correct the root cause of turbo or contamination damage.',
    verification: 'Boost tracks command, smoke is controlled, charge piping remains sealed and loaded power is restored.',
  },
  {
    id: 'turbo-failure',
    category: 'fuel-air' as FaultCategory,
    title: 'Turbocharger shaft or wheel failure',
    symptom: 'Sudden power loss, abnormal noise, oil in charge pipes, smoke or broken turbine / compressor components.',
    likelyCauses: ['Oil starvation', 'Contaminated oil', 'Foreign-object damage', 'Overspeed', 'Exhaust restriction', 'Improper shutdown after severe heat'],
    tests: ['Shaft movement and rotation', 'Oil supply and drain inspection', 'Charge-air debris inspection', 'Exhaust restriction', 'Engine oil-pressure history'],
    expected: 'Physical turbo damage is linked to a proven oil, contamination, overspeed or foreign-object mechanism.',
    correctiveAction: 'Replace the turbocharger and eliminate the upstream and downstream cause, including debris and oil contamination.',
    verification: 'Prime oil supply, verify boost and oil control, inspect charge piping and confirm no smoke or abnormal sound.',
  },
  {
    id: 'overheat',
    category: 'thermal' as FaultCategory,
    title: 'Engine overheating',
    symptom: 'High coolant temperature, coolant expulsion, pressure rise, loss of performance or repeated warning activation.',
    likelyCauses: ['Coolant loss', 'Thermostat fault', 'Water-pump failure', 'Radiator restriction', 'Fan-control fault', 'Combustion-gas leakage'],
    tests: ['Cooling-system pressure test', 'Temperature distribution', 'Fan command and speed', 'Coolant circulation', 'Combustion-gas test', 'Cap test'],
    expected: 'The system shows either insufficient coolant flow / heat rejection or abnormal heat and pressure entry.',
    correctiveAction: 'Repair the confirmed leakage, circulation, airflow, control or sealing fault and clean contaminated circuits.',
    verification: 'Stable temperature under load, normal pressure, correct fan operation and no coolant loss after cool-down.',
  },
  {
    id: 'low-oil-pressure',
    category: 'thermal' as FaultCategory,
    title: 'Low lubrication pressure',
    symptom: 'Oil warning, engine noise, bearing heat or pressure below specification at idle or load.',
    likelyCauses: ['Low oil level', 'Incorrect viscosity', 'Pump wear', 'Pickup restriction', 'Bearing clearance', 'Pressure-regulator fault'],
    tests: ['Mechanical oil-pressure measurement', 'Oil level and grade', 'Filter inspection', 'Pickup and pump inspection', 'Bearing-clearance measurement'],
    expected: 'Direct pressure testing confirms the loss and inspection identifies supply restriction, pump inability or internal leakage.',
    correctiveAction: 'Restore oil supply and repair every damaged surface created by the pressure loss.',
    verification: 'Pressure meets specification across temperature and speed with no noise, warning or abnormal heat.',
  },
  {
    id: 'gearbox-bearing',
    category: 'driveline' as FaultCategory,
    title: 'Gearbox shaft support failure',
    symptom: 'Gear noise, damaged engagement teeth, shaft movement, jumping out of gear or metal particles in oil.',
    likelyCauses: ['Loose bearing fit', 'Tapered shaft journal', 'Incorrect preload', 'Housing damage', 'Low lubrication', 'Shaft misalignment'],
    tests: ['Shaft end float', 'Bearing-seat measurement', 'Housing-bore inspection', 'Gear-contact pattern', 'Oil-debris inspection', 'Runout'],
    expected: 'Measurement proves loss of shaft control and the damaged gear pattern agrees with the direction of movement.',
    correctiveAction: 'Replace damaged shaft, bearing, gear and housing parts and restore correct fit, alignment and lubrication.',
    verification: 'Correct preload and end float, smooth selection, quiet road test and clean lubricant after controlled operation.',
  },
  {
    id: 'clutch-slip',
    category: 'driveline' as FaultCategory,
    title: 'Clutch slip or incomplete engagement',
    symptom: 'Engine speed rises without proportional vehicle acceleration, heat smell or poor pulling ability under load.',
    likelyCauses: ['Worn friction plate', 'Weak pressure plate', 'Oil contamination', 'Incorrect free play', 'Release mechanism holding load', 'Flywheel damage'],
    tests: ['Loaded road test', 'Pedal and release travel', 'Inspection for contamination', 'Friction and flywheel measurement', 'Release-bearing condition'],
    expected: 'Torque demand produces measurable slip and inspection confirms insufficient friction or incomplete clamping.',
    correctiveAction: 'Repair the leakage or release cause and replace the affected clutch components as a matched system.',
    verification: 'No slip under controlled load, correct free play, smooth engagement and no abnormal heat.',
  },
  {
    id: 'air-pressure',
    category: 'braking' as FaultCategory,
    title: 'Low pneumatic brake pressure',
    symptom: 'Slow pressure build-up, warning remains active, brakes or auxiliaries respond poorly, or pressure drops rapidly.',
    likelyCauses: ['Air leak', 'Compressor wear', 'Unloader fault', 'Dryer restriction', 'Governor fault', 'Circuit valve leakage'],
    tests: ['Build-up time', 'Leak-down rate', 'Compressor discharge', 'Unloader operation', 'Circuit isolation', 'Cut-in and cut-out pressure'],
    expected: 'Testing proves whether pressure generation, regulation, retention or distribution is below requirement.',
    correctiveAction: 'Repair the identified compressor, valve, pipe, chamber or connection fault and restore correct regulation.',
    verification: 'Normal build-up, stable retention, correct warning operation and balanced brake application.',
  },
  {
    id: 'brake-pull',
    category: 'braking' as FaultCategory,
    title: 'Brake imbalance or vehicle pull',
    symptom: 'Vehicle pulls during braking, one wheel overheats, stopping distance increases or tyre marks differ.',
    likelyCauses: ['Unequal adjustment', 'Sticking mechanism', 'Contamination', 'Air or hydraulic imbalance', 'Tyre condition', 'Suspension or alignment fault'],
    tests: ['Brake-force comparison', 'Temperature comparison', 'Actuator stroke', 'Lining and drum / disc inspection', 'Tyre and alignment check'],
    expected: 'One wheel or axle shows a repeatable force, travel or temperature difference linked to a mechanical or pressure fault.',
    correctiveAction: 'Correct the imbalance across the axle and repair any tyre, suspension or control issue influencing road response.',
    verification: 'Straight controlled stops, balanced temperatures and brake force within service limits.',
  },
  {
    id: 'hard-steering',
    category: 'steering' as FaultCategory,
    title: 'Hard steering',
    symptom: 'High steering effort at idle or through the operating range, with or without noise or fluid aeration.',
    likelyCauses: ['Low fluid', 'Air in system', 'Pump wear', 'Drive-belt slip', 'Restricted hose', 'Steering-gear binding', 'Axle joint stiffness'],
    tests: ['Fluid condition', 'Belt condition', 'Steering pressure and flow', 'Return restriction', 'Front axle free-movement check', 'Wheel alignment'],
    expected: 'Pressure / flow or mechanical isolation identifies whether assistance or the steering linkage is resisting movement.',
    correctiveAction: 'Repair the proven hydraulic, drive or mechanical cause and flush contaminated fluid where required.',
    verification: 'Normal effort in both directions, stable fluid, no leakage or noise and correct road return.',
  },
  {
    id: 'starting-voltage',
    category: 'electrical-control' as FaultCategory,
    title: 'Cranking voltage or starter control loss',
    symptom: 'No crank, slow crank, solenoid click, intermittent starting or control-module reset during cranking.',
    likelyCauses: ['Weak battery', 'High-resistance cable', 'Poor ground', 'Starter motor fault', 'Solenoid fault', 'Start-enable circuit fault'],
    tests: ['Battery load test', 'Positive and ground voltage drop', 'Starter current', 'Solenoid command', 'Cranking speed', 'Start-enable data'],
    expected: 'The voltage, current and command sequence identify whether energy supply, switching or starter conversion has failed.',
    correctiveAction: 'Restore cable integrity and repair the proven battery, solenoid, starter or control fault.',
    verification: 'Consistent cranking speed, stable module voltage and repeated successful starts.',
  },
  {
    id: 'can-loss',
    category: 'electrical-control' as FaultCategory,
    title: 'Vehicle network communication loss',
    symptom: 'Multiple warning lamps, missing module data, no communication or several unrelated fault codes.',
    likelyCauses: ['Low system voltage', 'Open CAN line', 'Shorted network', 'Failed terminating resistance', 'Module power loss', 'Connector contamination'],
    tests: ['Battery and charging state', 'Network resistance', 'CAN waveform', 'Module power and ground', 'Connector isolation', 'Topology review'],
    expected: 'The network returns when the failed branch, power supply or module is isolated, and waveform / resistance normalises.',
    correctiveAction: 'Repair the wiring, connector, supply or proven module fault without disturbing healthy network sections.',
    verification: 'All modules communicate, faults remain cleared and network waveform is stable under vibration and load.',
  },
  {
    id: 'dpf-restriction',
    category: 'aftertreatment' as FaultCategory,
    title: 'DPF restriction or failed regeneration',
    symptom: 'Derate, high differential pressure, frequent regeneration, warning lamps or excessive exhaust temperature.',
    likelyCauses: ['High soot loading', 'Ash accumulation', 'Failed temperature sensor', 'Differential-pressure fault', 'Low exhaust temperature', 'Engine smoke or oil consumption'],
    tests: ['Differential pressure by speed', 'Temperature-sensor plausibility', 'Regeneration history', 'Engine smoke and oil use', 'Exhaust leak inspection'],
    expected: 'Restriction and thermal data distinguish true loading from sensor error and identify the upstream reason for repeated loading.',
    correctiveAction: 'Correct the engine or sensor cause, then regenerate, clean or replace the filter according to condition.',
    verification: 'Normal pressure trend, successful monitored regeneration and no rapid soot reaccumulation.',
  },
  {
    id: 'scr-efficiency',
    category: 'aftertreatment' as FaultCategory,
    title: 'SCR conversion or DEF dosing fault',
    symptom: 'NOx efficiency fault, derate countdown, DEF warning or commanded dosing without expected conversion.',
    likelyCauses: ['Poor DEF quality', 'Blocked doser', 'Supply-pressure fault', 'Exhaust leak', 'NOx sensor error', 'Catalyst temperature or damage'],
    tests: ['DEF concentration and contamination', 'Doser quantity / spray test', 'Supply pressure', 'Upstream and downstream NOx response', 'Temperature profile'],
    expected: 'Testing separates fluid, dosing, sensing, exhaust integrity and catalyst conversion.',
    correctiveAction: 'Restore correct DEF quality and dosing, repair leaks or sensor faults, and replace catalyst only when conversion failure is proven.',
    verification: 'Completed system test, correct NOx reduction, no leakage or deposit formation and no returning derate.',
  },
] as const;

export const fieldCaseFiles = [
  {
    code: 'CASE 01',
    title: 'Crankcase knock under load',
    complaint: 'Abnormal engine noise increased during loaded operation.',
    evidence: ['Noise localised to crankcase', 'Heat and seizure marks at one connecting-rod journal', 'Other bearings showed lower secondary heat marking'],
    rootCause: 'Local bearing rotation and journal distress created abnormal clearance, friction and thermal loading.',
    decision: 'Replace or machine damaged rotating components and confirm lubrication-system integrity before assembly.',
    verification: 'Oil pressure, rotation, noise and loaded performance verified after controlled run-in.',
  },
  {
    code: 'CASE 02',
    title: 'Low power with turbocharger failure',
    complaint: 'Low pulling power, smoke / oil contamination and abnormal turbo behaviour.',
    evidence: ['Turbo shaft or wheel damage', 'Oil present in charge-air path', 'Boost unable to follow demand'],
    rootCause: 'Turbocharger could no longer compress air; oil-control and debris risk affected the complete intake path.',
    decision: 'Replace turbocharger, clean the charge-air system and prove oil supply, drain and exhaust condition.',
    verification: 'Boost response, smoke, oil control and road-load performance restored.',
  },
  {
    code: 'CASE 03',
    title: 'Gearbox shaft movement and gear damage',
    complaint: 'Gear noise and damaged engagement components.',
    evidence: ['Main-shaft bearing fit no longer controlled the shaft', 'Gear teeth and synchronising components showed secondary impact damage', 'Housing / shaft interface required measurement'],
    rootCause: 'Loss of shaft support altered gear mesh and transferred abnormal load into engagement parts.',
    decision: 'Restore shaft, bearing, housing and damaged gear geometry as one system.',
    verification: 'End float, selection quality, oil cleanliness and road noise confirmed.',
  },
  {
    code: 'CASE 04',
    title: 'Low pneumatic system pressure',
    complaint: 'Air pressure built slowly or could not remain at operating level.',
    evidence: ['Leak or unloader behaviour isolated', 'Compressor and circuit delivery compared', 'Warning and retention performance measured'],
    rootCause: 'Pressure generation or retention failed within a defined pneumatic section.',
    decision: 'Repair the failed valve, connection, actuator or compressor condition rather than replacing unrelated brake parts.',
    verification: 'Build-up, cut-in / cut-out, leak-down and brake application passed.',
  },
  {
    code: 'CASE 05',
    title: 'Hard steering despite bleeding',
    complaint: 'Steering remained very heavy after air removal.',
    evidence: ['Fluid path inspected', 'Pump pressure / flow considered separately from linkage resistance', 'No assumption that bleeding alone proved pump health'],
    rootCause: 'Hydraulic assistance or mechanical steering resistance required direct isolation.',
    decision: 'Measure pressure and flow, then inspect steering gear and axle joints before component replacement.',
    verification: 'Normal effort, return, noise and fluid stability confirmed.',
  },
  {
    code: 'CASE 06',
    title: 'Cranks but fuel pressure remains low',
    complaint: 'Hard starting or no start with low measured rail pressure.',
    evidence: ['Commanded pressure substantially exceeded measured pressure', 'Supply, leakage and control paths assessed', 'Cranking condition recorded'],
    rootCause: 'Fuel system could not retain or generate the pressure required for injection enable.',
    decision: 'Identify restriction, air entry, excessive return or pump / regulator inability through staged testing.',
    verification: 'Fast start and stable commanded-to-measured pressure tracking.',
  },
  {
    code: 'CASE 07',
    title: 'Cab structure cracks during lifting',
    complaint: 'Cracks developed at the cab front structure whenever the cab was raised.',
    evidence: ['Lifting cylinder remained operational', 'Cracking repeated around the structural load path', 'Material / joint area showed inadequate load resistance'],
    rootCause: 'The cab structure, not the hydraulic cylinder, was unable to distribute repeated lifting load safely.',
    decision: 'Repair and reinforce according to approved structural requirements while checking hinge and alignment loads.',
    verification: 'Controlled lift cycles completed without crack growth or distortion.',
  },
  {
    code: 'CASE 08',
    title: 'Aftertreatment system cannot complete test',
    complaint: 'SCR or regeneration test would not start or complete.',
    evidence: ['Enable conditions, temperatures and stored faults reviewed', 'Dosing and sensor readiness checked', 'Engine-state requirements confirmed'],
    rootCause: 'A missing enable condition or upstream fault prevented the control module from safely executing the test.',
    decision: 'Correct the blocking condition before replacing the doser or catalyst.',
    verification: 'System test completes and live conversion data responds correctly.',
  },
] as const;

export const maintenanceLayers = [
  {
    code: 'DAILY',
    title: 'Pre-operation control',
    items: ['Fluid levels and visible leaks', 'Tyres and wheel security', 'Warning lamps and gauges', 'Air-pressure build-up', 'Lights and safety equipment'],
  },
  {
    code: 'SERVICE',
    title: 'Periodic maintenance',
    items: ['Correct filters and fluids', 'Fastener and belt inspection', 'Brake and steering condition', 'Diagnostic scan and trends', 'Drain and contamination control'],
  },
  {
    code: 'TREND',
    title: 'Condition monitoring',
    items: ['Oil and coolant usage', 'Fuel economy', 'Regeneration frequency', 'Battery and charging history', 'Repeat fault and downtime pattern'],
  },
  {
    code: 'VERIFY',
    title: 'Post-repair assurance',
    items: ['Original complaint repeated', 'Leak and temperature check', 'Live data and fault status', 'Torque / fluid confirmation', 'Documented road test'],
  },
] as const;

export const safetyPrinciples = [
  {
    code: 'S-01',
    title: 'Secure the vehicle',
    detail: 'Use level ground, parking control, wheel chocks and rated supports before working around or beneath the vehicle.',
  },
  {
    code: 'S-02',
    title: 'Control stored energy',
    detail: 'Account for batteries, fuel pressure, compressed air, hydraulic pressure, springs, rotating inertia and suspended cabs.',
  },
  {
    code: 'S-03',
    title: 'Control heat and exhaust',
    detail: 'Treat cooling, turbocharger and aftertreatment components as hot until proven safe and provide exhaust ventilation.',
  },
  {
    code: 'S-04',
    title: 'Protect rotating systems',
    detail: 'Keep clothing, tools, test leads and body parts clear of belts, fans, shafts and wheels during live tests.',
  },
  {
    code: 'S-05',
    title: 'Maintain cleanliness',
    detail: 'Protect fuel, lubrication, hydraulic, air and electronic systems from contamination during diagnosis and repair.',
  },
  {
    code: 'S-06',
    title: 'Use controlled lifting',
    detail: 'Use approved lifting points, rated equipment and mechanical locking devices; hydraulic pressure alone is not a support.',
  },
  {
    code: 'S-07',
    title: 'Respect road-test boundaries',
    detail: 'Plan the route, load, communication and stop conditions before reproducing a fault on the road.',
  },
  {
    code: 'S-08',
    title: 'Document before disturbance',
    detail: 'Record evidence before dismantling so the failure mechanism, customer complaint and repair decision remain traceable.',
  },
] as const;

export const engineeringStandards = [
  'Diagnose the complete system before condemning an individual component.',
  'Use manufacturer specifications for torque, clearance, fluid, pressure, calibration and software applicability.',
  'Separate primary failure, secondary damage and contributing operating conditions.',
  'Compare commanded data with independent physical evidence whenever practical.',
  'Preserve cleanliness in fuel, lubrication, hydraulic, pneumatic and aftertreatment systems.',
  'Replace disturbed single-use fasteners, seals and locking devices where required.',
  'Verify alignment, bearing fit, end float, backlash and runout during mechanical assembly.',
  'Complete adaptations, coding, bleeding, priming or regeneration only under the correct enable conditions.',
  'Repeat the original complaint under controlled duty before releasing the vehicle.',
  'Produce a technical record that another professional can understand, verify and continue.',
] as const;
