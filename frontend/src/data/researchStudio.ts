export type ResearchDomain = 'all' | 'electrical' | 'automotive' | 'digital';
export type ResearchAudience = 'student' | 'teacher' | 'researcher' | 'practitioner';
export type ResearchMode = 'explain' | 'research' | 'project' | 'compare';
export type DiagramKind =
  | 'led-circuit'
  | 'continuity-board'
  | 'four-stroke'
  | 'signal-simulator'
  | 'sensor-dashboard'
  | 'api-monitor';

export interface ResearchSource {
  id: string;
  title: string;
  authority: string;
  url: string;
  domain: Exclude<ResearchDomain, 'all'> | 'cross-domain';
}

export const researchSources: ResearchSource[] = [
  {
    id: 'iec-principles',
    title: 'IEC 60364-1 — Low-voltage installation principles',
    authority: 'International Electrotechnical Commission',
    url: 'https://webstore.iec.ch/en/publication/63699',
    domain: 'electrical',
  },
  {
    id: 'iec-verification',
    title: 'IEC 60364-6 — Verification',
    authority: 'International Electrotechnical Commission',
    url: 'https://webstore.iec.ch/en/publication/24656',
    domain: 'electrical',
  },
  {
    id: 'phet-dc',
    title: 'Circuit Construction Kit: DC',
    authority: 'PhET Interactive Simulations · University of Colorado Boulder',
    url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
    domain: 'electrical',
  },
  {
    id: 'cummins-insite',
    title: 'INSITE electronic engine diagnostics',
    authority: 'Cummins',
    url: 'https://www.cummins.com/en-na/parts-and-service/digital-products-and-services/insite',
    domain: 'automotive',
  },
  {
    id: 'nhtsa-safety',
    title: 'Vehicle safety information',
    authority: 'National Highway Traffic Safety Administration',
    url: 'https://www.nhtsa.gov/vehicle-safety',
    domain: 'automotive',
  },
  {
    id: 'mdn-learn',
    title: 'Learn web development',
    authority: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development',
    domain: 'digital',
  },
  {
    id: 'mdn-api',
    title: 'Introduction to web APIs',
    authority: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction',
    domain: 'digital',
  },
  {
    id: 'owasp-asvs',
    title: 'Application Security Verification Standard',
    authority: 'OWASP Foundation',
    url: 'https://owasp.org/www-project-application-security-verification-standard/',
    domain: 'digital',
  },
  {
    id: 'wcag',
    title: 'Web Content Accessibility Guidelines',
    authority: 'World Wide Web Consortium',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    domain: 'digital',
  },
];

export const audienceProfiles = [
  {
    id: 'student' as const,
    label: 'Student',
    promise: 'Clear foundations, worked reasoning, vocabulary, safe experiments and reflection questions.',
    answerStyle: 'Start with the idea, define terms, show the relationship, then test understanding.',
  },
  {
    id: 'teacher' as const,
    label: 'Teacher',
    promise: 'Lesson structure, learning objectives, demonstrations, misconceptions and assessment prompts.',
    answerStyle: 'Organize content for instruction and expose where learners commonly become confused.',
  },
  {
    id: 'researcher' as const,
    label: 'Researcher',
    promise: 'Scope, assumptions, variables, evidence quality, source trails and unresolved questions.',
    answerStyle: 'Separate established evidence, inference, limitations and what would falsify the claim.',
  },
  {
    id: 'practitioner' as const,
    label: 'Practitioner',
    promise: 'System context, diagnostic sequence, measurements, decision boundaries and verification.',
    answerStyle: 'Lead with the operating decision and preserve exact equipment and safety limits.',
  },
];

export const researchPaths = [
  {
    id: 'electrical' as const,
    code: 'POWER',
    title: 'Electrical systems',
    summary: 'From quantities and circuits to protection, control, measurement and safe verification.',
    stages: [
      { index: '01', title: 'Foundations', detail: 'Voltage, current, resistance, power, energy, AC and DC.' },
      { index: '02', title: 'Architecture', detail: 'Sources, protection, conductors, control, loads and earthing.' },
      { index: '03', title: 'Diagnosis', detail: 'Isolation, test points, instrument choice and evidence.' },
      { index: '04', title: 'Research', detail: 'Standards, assumptions, uncertainty and comparative measurement.' },
    ],
  },
  {
    id: 'automotive' as const,
    code: 'MOTION',
    title: 'Automotive systems',
    summary: 'From physical operating principles to vehicle architecture, diagnostics and repair verification.',
    stages: [
      { index: '01', title: 'Foundations', detail: 'Energy conversion, force, motion, pressure, heat and friction.' },
      { index: '02', title: 'Architecture', detail: 'Powertrain, chassis, braking, steering, electronics and emissions.' },
      { index: '03', title: 'Diagnosis', detail: 'Complaint, conditions, evidence, hypotheses, tests and close-out.' },
      { index: '04', title: 'Research', detail: 'Failure mechanisms, service evidence, trends and reliability.' },
    ],
  },
  {
    id: 'digital' as const,
    code: 'INTELLIGENCE',
    title: 'Digital systems',
    summary: 'From computational thinking to reliable applications, data, security and operations.',
    stages: [
      { index: '01', title: 'Foundations', detail: 'Logic, data, algorithms, interfaces and the web platform.' },
      { index: '02', title: 'Architecture', detail: 'Frontend, API, services, storage, identity and deployment.' },
      { index: '03', title: 'Diagnosis', detail: 'Logs, network traces, state, dependencies and release evidence.' },
      { index: '04', title: 'Research', detail: 'Experiments, benchmarks, threats, accessibility and reproducibility.' },
    ],
  },
];

export const researchTopics = [
  { id: 'quantities', domain: 'electrical' as const, level: 'Foundation', title: 'Electrical quantities and units', summary: 'Connect voltage, current, resistance, power and energy without losing units or operating conditions.', concepts: ['Ohm’s law', 'Power equations', 'Units', 'Measurement uncertainty'], sourceIds: ['phet-dc'] },
  { id: 'distribution', domain: 'electrical' as const, level: 'Systems', title: 'Distribution and protection', summary: 'Follow energy from a source through isolation, protection, conductors, control and loads.', concepts: ['Fault path', 'Protection', 'Earthing', 'Disconnection'], sourceIds: ['iec-principles'] },
  { id: 'control', domain: 'electrical' as const, level: 'Applied', title: 'Control and instrumentation', summary: 'Understand relays, contactors, sensors, control logic and measured signals.', concepts: ['Control circuit', 'Interlock', 'Signal', 'Actuator'], sourceIds: ['iec-verification'] },
  { id: 'verification', domain: 'electrical' as const, level: 'Research', title: 'Verification and evidence', summary: 'Plan inspections and tests that can support a defensible engineering conclusion.', concepts: ['Test method', 'Expected result', 'Traceability', 'Uncertainty'], sourceIds: ['iec-verification'] },
  { id: 'powertrain', domain: 'automotive' as const, level: 'Foundation', title: 'Powertrain energy path', summary: 'Trace energy through combustion, torque production, gearing and final drive.', concepts: ['Four-stroke cycle', 'Torque', 'Gear ratio', 'Efficiency'], sourceIds: ['cummins-insite'] },
  { id: 'chassis', domain: 'automotive' as const, level: 'Systems', title: 'Chassis, brakes and steering', summary: 'Connect driver demand, actuation, tyre force, stability and vehicle response.', concepts: ['Pressure', 'Friction', 'Balance', 'Geometry'], sourceIds: ['nhtsa-safety'] },
  { id: 'vehicle-control', domain: 'automotive' as const, level: 'Applied', title: 'Sensors, actuators and networks', summary: 'Read electronic control as a chain of supply, input, logic, command, output and feedback.', concepts: ['ECU', 'CAN', 'Plausibility', 'Actuator test'], sourceIds: ['cummins-insite'] },
  { id: 'root-cause', domain: 'automotive' as const, level: 'Research', title: 'Root-cause and failure chains', summary: 'Separate the primary mechanism, secondary damage, contributing conditions and verification evidence.', concepts: ['Mechanism', 'Hypothesis', 'Contradiction', 'Close-out'], sourceIds: ['cummins-insite'] },
  { id: 'web-platform', domain: 'digital' as const, level: 'Foundation', title: 'Web platform foundations', summary: 'Understand HTML structure, CSS presentation, JavaScript behaviour and browser APIs.', concepts: ['Semantic HTML', 'CSS', 'JavaScript', 'Browser'], sourceIds: ['mdn-learn'] },
  { id: 'application-architecture', domain: 'digital' as const, level: 'Systems', title: 'Application architecture', summary: 'Connect interfaces, APIs, business logic, data storage, identity and deployment.', concepts: ['Boundary', 'Contract', 'State', 'Dependency'], sourceIds: ['mdn-api'] },
  { id: 'secure-delivery', domain: 'digital' as const, level: 'Applied', title: 'Secure and accessible delivery', summary: 'Build security and accessibility into design, implementation and verification.', concepts: ['Authorization', 'Validation', 'WCAG', 'Security tests'], sourceIds: ['owasp-asvs', 'wcag'] },
  { id: 'operations', domain: 'digital' as const, level: 'Research', title: 'Observability and experiments', summary: 'Use logs, metrics, traces, controlled tests and reproducible reports to study production behaviour.', concepts: ['Telemetry', 'Baseline', 'Experiment', 'Reproducibility'], sourceIds: ['mdn-api', 'owasp-asvs'] },
];

export const diyProjects = [
  {
    id: 'led-ohms-law',
    domain: 'electrical' as const,
    diagram: 'led-circuit' as DiagramKind,
    level: 'Beginner',
    duration: '35–50 min',
    safety: 'Low risk · isolated 3–5 V DC only',
    title: 'LED current-limiting laboratory',
    summary: 'Build one extra-low-voltage circuit, calculate the resistor and compare predicted and measured current.',
    objective: 'Demonstrate the relationship between source voltage, LED forward voltage, resistance and current.',
    materials: ['3–5 V battery pack or power bank module', 'LED', '330 Ω and 680 Ω resistors', 'Breadboard and jumper leads', 'Digital multimeter'],
    steps: [
      'Keep the supply disconnected while arranging the circuit shown.',
      'Calculate R = (Vs − Vf) ÷ I. For 5 V, 2 V and 0.01 A, the result is 300 Ω; select 330 Ω.',
      'Check LED polarity and resistor placement before connecting the isolated supply.',
      'Measure voltage across the source, resistor and LED, recording every unit.',
      'Measure current using the correct meter terminal and series connection.',
      'Replace 330 Ω with 680 Ω and explain the change in current and brightness.',
    ],
    explanation: 'The resistor uses part of the source voltage and limits current. The larger resistor produces less current, so the LED normally emits less light.',
    record: ['Source voltage', 'LED voltage', 'Resistor voltage', 'Measured current', 'Calculated current', 'Difference'],
    questions: ['Why must the ammeter be connected in series?', 'Where did the source voltage appear?', 'Which assumptions explain any difference?'],
    sourceIds: ['phet-dc'],
  },
  {
    id: 'continuity-board',
    domain: 'electrical' as const,
    diagram: 'continuity-board' as DiagramKind,
    level: 'Beginner',
    duration: '30–45 min',
    safety: 'Low risk · de-energized training board only',
    title: 'Continuity and fault-map trainer',
    summary: 'Create an isolated training circuit with known open and closed paths, then diagnose it from a schematic.',
    objective: 'Learn why continuity proves a path only when the circuit is safely isolated and interpreted correctly.',
    materials: ['Cardboard or breadboard', 'Jumper wires', 'Two switches', 'Three resistors', 'Digital multimeter', 'Printed node labels'],
    steps: [
      'Build the training board without any power source connected.',
      'Label nodes A to F and draw the expected connections before measuring.',
      'Check meter operation by joining the probes and observing the reading.',
      'Measure planned node pairs with each switch open and closed.',
      'Introduce one removable open link and locate it using the fewest tests.',
      'Write the evidence path that proves the location of the open circuit.',
    ],
    explanation: 'A continuity result says that a low-resistance path exists between two test points. It does not prove that a powered circuit will carry its required load.',
    record: ['Switch state', 'Test points', 'Expected reading', 'Measured reading', 'Conclusion'],
    questions: ['Why must the board remain de-energized?', 'How can one test divide the search area?', 'Why may continuity miss a high-resistance fault?'],
    sourceIds: ['iec-verification'],
  },
  {
    id: 'four-stroke-wheel',
    domain: 'automotive' as const,
    diagram: 'four-stroke' as DiagramKind,
    level: 'Beginner',
    duration: '45–70 min',
    safety: 'Low risk · paper model, no running engine',
    title: 'Four-stroke timing wheel',
    summary: 'Build a rotating paper model that connects crank angle, piston travel, valves and the four engine events.',
    objective: 'Explain why a complete four-stroke cycle needs two crankshaft revolutions.',
    materials: ['Cardboard', 'Printed or hand-drawn circles', 'Split pin', 'Ruler', 'Marker pens', 'String or paper linkage'],
    steps: [
      'Mark a 720-degree outer cycle ring and four 180-degree event sectors.',
      'Create a smaller crank wheel and connect it to a sliding paper piston.',
      'Add intake and exhaust valve indicators above the cylinder.',
      'Rotate the crank through intake, compression, power and exhaust.',
      'Record piston direction, valve state and energy transfer for each sector.',
      'Use the model to explain one symptom caused by incorrect valve timing.',
    ],
    explanation: 'The crankshaft turns twice while each camshaft-driven valve cycle occurs once. The model shows timing relationships, not exact valve overlap for a specific engine.',
    record: ['Crank sector', 'Piston direction', 'Intake state', 'Exhaust state', 'Main energy change'],
    questions: ['Why does the camshaft turn at half crankshaft speed?', 'When is cylinder pressure highest?', 'What exact information would an engine manual add?'],
    sourceIds: ['cummins-insite'],
  },
  {
    id: 'signal-simulator',
    domain: 'automotive' as const,
    diagram: 'signal-simulator' as DiagramKind,
    level: 'Intermediate',
    duration: '50–80 min',
    safety: 'Low risk · isolated 5 V model, never connect to a vehicle',
    title: 'Five-volt sensor-signal simulator',
    summary: 'Use a potentiometer as an educational sensor to study supply, ground and a changing analogue signal.',
    objective: 'Visualize how a three-wire sensor can produce a signal between its reference and ground boundaries.',
    materials: ['Isolated regulated 5 V module', '10 kΩ potentiometer', 'Breadboard', 'Jumper wires', 'Digital multimeter'],
    steps: [
      'Identify the potentiometer’s two end terminals and centre wiper.',
      'With power disconnected, wire the end terminals across isolated 5 V and ground.',
      'Connect the meter between signal wiper and ground before applying power.',
      'Rotate the control slowly and record signal voltage at five positions.',
      'Repeat the readings with supply and ground also recorded.',
      'Graph physical position against signal voltage and discuss linearity.',
    ],
    explanation: 'The wiper divides the reference voltage and creates a variable signal. Real sensors may use different ranges, diagnostics and protection, so this model must never be attached to an ECU.',
    record: ['Position', 'Supply voltage', 'Ground voltage', 'Signal voltage', 'Expected relationship'],
    questions: ['Why must signal remain within supply and ground?', 'What would an open ground do?', 'How would you independently verify the physical input?'],
    sourceIds: ['cummins-insite'],
  },
  {
    id: 'sensor-dashboard',
    domain: 'digital' as const,
    diagram: 'sensor-dashboard' as DiagramKind,
    level: 'Beginner',
    duration: '60–100 min',
    safety: 'Software-only · runs in the browser',
    title: 'Browser sensor-dashboard simulator',
    summary: 'Build a small page that validates a simulated sensor input and turns it into a readable status and trend.',
    objective: 'Connect interface input, validation, state, calculation and accessible output.',
    materials: ['Text editor', 'Modern browser', 'HTML, CSS and JavaScript files', 'Browser developer tools'],
    steps: [
      'Create a labelled range input from 0 to 100 and a visible numeric output.',
      'Store the current reading in JavaScript and reject values outside the defined range.',
      'Map the reading to normal, caution and review states using documented thresholds.',
      'Update text as well as colour so status is not communicated by colour alone.',
      'Record ten readings in an array and draw a simple SVG trend line.',
      'Test keyboard operation, small-screen layout and invalid input handling.',
    ],
    explanation: 'The project is a complete data path: input becomes validated state, state becomes interpretation, and interpretation becomes an accessible display.',
    record: ['Input', 'Validation result', 'Calculated state', 'Displayed text', 'Accessibility check'],
    questions: ['Where should validation occur?', 'Why is colour alone insufficient?', 'What changes when data comes from a real API?'],
    sourceIds: ['mdn-learn', 'wcag'],
  },
  {
    id: 'api-monitor',
    domain: 'digital' as const,
    diagram: 'api-monitor' as DiagramKind,
    level: 'Intermediate',
    duration: '75–120 min',
    safety: 'Software-only · local or approved test API',
    title: 'API health and evidence monitor',
    summary: 'Create a small monitor that separates network reachability, HTTP status, response shape and user-facing workflow health.',
    objective: 'Demonstrate why “deployment successful” does not prove that an application works.',
    materials: ['Local development server', 'Browser or Node.js', 'Approved health endpoint', 'Developer tools', 'Test checklist'],
    steps: [
      'Define expected status, response fields and maximum response time.',
      'Request the approved health endpoint with a timeout and handle network failure.',
      'Check HTTP status separately from JSON parsing and schema checks.',
      'Record timestamp, duration, outcome and a correlation identifier if available.',
      'Add one direct-page request and one important workflow test.',
      'Present failures by boundary: network, server, contract, page or workflow.',
    ],
    explanation: 'Each check proves a different boundary. Combining them creates a more defensible operational picture than one green status indicator.',
    record: ['Timestamp', 'Target', 'Duration', 'HTTP status', 'Contract result', 'Workflow result'],
    questions: ['Which check detects a routing failure?', 'What must never appear in logs?', 'How would you reduce false alarms?'],
    sourceIds: ['mdn-api', 'owasp-asvs'],
  },
];

export const assistantSuggestions = [
  'Explain voltage, current and resistance for a beginner.',
  'Compare hydraulic and pneumatic braking principles.',
  'Create a safe classroom lesson about vehicle sensor signals.',
  'How should a researcher verify an API reliability claim?',
  'Why can measured rail pressure remain below commanded pressure?',
  'Design a browser-only project that teaches data validation.',
];

export const getResearchSource = (id: string) => researchSources.find((source) => source.id === id);
