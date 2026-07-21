export type ResearchDomain = 'all' | 'electrical' | 'automotive' | 'digital';

export interface ResearchDocument {
  id: string;
  domain: Exclude<ResearchDomain, 'all'>;
  title: string;
  summary: string;
  points: string[];
  keywords: string[];
  source: { title: string; url: string };
}

export const researchKnowledge: ResearchDocument[] = [
  {
    id: 'electrical-quantities',
    domain: 'electrical',
    title: 'Voltage, current, resistance and power',
    summary: 'Voltage is electrical potential difference, current is charge flow, resistance opposes that flow, and power describes the rate of energy transfer.',
    points: [
      'Ohm’s law connects voltage, current and resistance through V = I × R.',
      'Electrical power can be calculated with P = V × I for a simple DC load.',
      'A measurement is meaningful only when its unit, test points and operating condition are recorded.',
    ],
    keywords: ['voltage', 'current', 'resistance', 'ohm', 'power', 'watt', 'ampere', 'circuit'],
    source: { title: 'PhET — Circuit Construction Kit: DC', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html' },
  },
  {
    id: 'electrical-series-parallel',
    domain: 'electrical',
    title: 'Series and parallel circuit behaviour',
    summary: 'Series paths share current while parallel branches share voltage. The arrangement changes total resistance, current distribution and fault behaviour.',
    points: [
      'Opening any component in a single series path stops current through the whole path.',
      'A parallel branch can stop conducting while other healthy branches remain energized.',
      'Use only isolated extra-low-voltage supplies for beginner physical experiments.',
    ],
    keywords: ['series', 'parallel', 'branch', 'circuit', 'led', 'resistor', 'continuity'],
    source: { title: 'PhET — Circuit Construction Kit: DC', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html' },
  },
  {
    id: 'electrical-protection',
    domain: 'electrical',
    title: 'Protection, isolation and verification',
    summary: 'Electrical protection limits the consequences of faults, while safe isolation controls energy before inspection or work begins.',
    points: [
      'Protective-device selection depends on the source, conductors, load, fault level and disconnection requirements.',
      'Test-before-touch requires a suitable instrument and a controlled isolation process.',
      'Mains and three-phase work belongs to competent, authorized persons using the applicable local rules.',
    ],
    keywords: ['fuse', 'breaker', 'protection', 'isolation', 'earth', 'ground', 'safety', 'rcd'],
    source: { title: 'IEC 60364-1 — Low-voltage installation principles', url: 'https://webstore.iec.ch/en/publication/63699' },
  },
  {
    id: 'electrical-measurement',
    domain: 'electrical',
    title: 'Measurement-led electrical diagnosis',
    summary: 'Good diagnosis compares expected and measured behaviour at controlled test points instead of replacing components by guesswork.',
    points: [
      'Begin with the complaint, operating state, circuit boundary and a safe test plan.',
      'Voltage-drop testing reveals resistance that an unloaded continuity check may miss.',
      'Verification repeats the relevant test after repair and records the result.',
    ],
    keywords: ['multimeter', 'measurement', 'diagnosis', 'voltage drop', 'continuity', 'insulation', 'verification'],
    source: { title: 'IEC 60364-6 — Verification', url: 'https://webstore.iec.ch/en/publication/24656' },
  },
  {
    id: 'automotive-four-stroke',
    domain: 'automotive',
    title: 'Four-stroke diesel operating cycle',
    summary: 'A four-stroke engine completes intake, compression, power and exhaust events across two crankshaft revolutions.',
    points: [
      'Valve timing and piston position coordinate gas exchange and compression.',
      'Diesel combustion begins when correctly metered fuel is injected into sufficiently hot compressed air.',
      'Diagnosis connects mechanical condition, fuel delivery, air handling and electronic control.',
    ],
    keywords: ['engine', 'diesel', 'four stroke', 'intake', 'compression', 'power', 'exhaust', 'combustion'],
    source: { title: 'Cummins — Engine and service information', url: 'https://www.cummins.com/engines' },
  },
  {
    id: 'automotive-fuel-pressure',
    domain: 'automotive',
    title: 'Common-rail fuel-pressure diagnosis',
    summary: 'Common-rail diagnosis separates low-pressure supply, high-pressure generation, leakage, sensing and electronic control before a repair decision is made.',
    points: [
      'Commanded and measured rail pressure must be compared under the same operating condition.',
      'Low measured pressure can result from restriction, air ingress, excessive return flow, pump condition or pressure-control faults.',
      'High-pressure fuel systems must not be opened or tested without manufacturer procedures, suitable equipment and competent supervision.',
    ],
    keywords: ['rail pressure', 'fuel', 'injector', 'imv', 'regulator', 'hard start', 'diesel', '0559'],
    source: { title: 'Cummins INSITE diagnostics', url: 'https://www.cummins.com/en-na/parts-and-service/digital-products-and-services/insite' },
  },
  {
    id: 'automotive-braking',
    domain: 'automotive',
    title: 'Brake-system evidence and verification',
    summary: 'Brake diagnosis must connect driver complaint, stored or hydraulic energy, actuation, friction components, balance and controlled verification.',
    points: [
      'Pressure loss, delayed actuation and imbalance can be related but require separate tests.',
      'A repair is not closed until leakage, pressure build-up, balance and controlled brake response meet the exact vehicle requirements.',
      'Work on real braking systems and work beneath a vehicle require trained supervision, isolation and rated supports.',
    ],
    keywords: ['brake', 'air pressure', 'actuator', 'spring brake', 'hydraulic', 'balance', 'leak'],
    source: { title: 'NHTSA — Vehicle safety', url: 'https://www.nhtsa.gov/vehicle-safety' },
  },
  {
    id: 'automotive-network',
    domain: 'automotive',
    title: 'Vehicle electronics and CAN diagnosis',
    summary: 'Electronic diagnosis connects power, ground, network communication, sensor plausibility, actuator response and module logic.',
    points: [
      'A communication code does not prove that a control module has failed.',
      'Battery condition, module supply, ground voltage drop, connectors and network topology should be checked first.',
      'Live data must be evaluated against operating conditions and an independent measurement where possible.',
    ],
    keywords: ['can', 'network', 'ecu', 'ecm', 'sensor', 'actuator', 'fault code', 'live data'],
    source: { title: 'Cummins INSITE diagnostics', url: 'https://www.cummins.com/en-na/parts-and-service/digital-products-and-services/insite' },
  },
  {
    id: 'digital-web-foundations',
    domain: 'digital',
    title: 'Web application foundations',
    summary: 'A web application combines accessible interface structure, presentation, browser behaviour, network requests and server-side services.',
    points: [
      'HTML communicates structure, CSS presentation, and JavaScript behaviour.',
      'Browser APIs expose capabilities such as networking, storage, graphics and device interaction.',
      'Progressive enhancement and accessibility keep core information usable across devices and conditions.',
    ],
    keywords: ['html', 'css', 'javascript', 'browser', 'web', 'frontend', 'api'],
    source: { title: 'MDN — Learn web development', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
  },
  {
    id: 'digital-api',
    domain: 'digital',
    title: 'APIs, validation and error boundaries',
    summary: 'An API defines a controlled contract between systems. Reliable APIs validate input, authorize actions and return observable results.',
    points: [
      'A successful network response does not prove that the complete user workflow succeeded.',
      'Inputs need type, length and meaning checks at the server boundary.',
      'Correlation identifiers, structured errors and health checks improve diagnosis.',
    ],
    keywords: ['api', 'http', 'request', 'response', 'validation', 'error', 'health', 'json'],
    source: { title: 'MDN — Introduction to web APIs', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction' },
  },
  {
    id: 'digital-security',
    domain: 'digital',
    title: 'Application security fundamentals',
    summary: 'Secure systems minimize exposed data, validate trust boundaries, protect credentials and verify important controls throughout delivery.',
    points: [
      'Secrets belong in protected server-side configuration, never client bundles or public source.',
      'Authentication identifies a principal; authorization decides what that principal may do.',
      'Rate limits, safe errors, dependency review and security testing reduce common abuse paths.',
    ],
    keywords: ['security', 'secret', 'authentication', 'authorization', 'owasp', 'rate limit', 'credential'],
    source: { title: 'OWASP Application Security Verification Standard', url: 'https://owasp.org/www-project-application-security-verification-standard/' },
  },
  {
    id: 'digital-observability',
    domain: 'digital',
    title: 'Observability and production verification',
    summary: 'Logs, metrics, traces, route checks and user-flow tests reveal different parts of system behaviour and should be interpreted together.',
    points: [
      'A green deployment indicator is not the same as a healthy application.',
      'Health endpoints should reveal operational status without exposing secrets.',
      'Verification includes direct-route checks, API behaviour, security headers and the important end-to-end workflow.',
    ],
    keywords: ['observability', 'logs', 'metrics', 'traces', 'deployment', 'production', 'health', 'monitoring'],
    source: { title: 'MDN — HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview' },
  },
];

const tokenize = (value: string): string[] =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);

export const findResearchContext = (
  question: string,
  domain: ResearchDomain = 'all',
  limit = 4,
): ResearchDocument[] => {
  const tokens = new Set(tokenize(question));

  return researchKnowledge
    .filter((document) => domain === 'all' || document.domain === domain)
    .map((document) => {
      const searchable = tokenize([
        document.domain,
        document.title,
        document.summary,
        ...document.points,
        ...document.keywords,
      ].join(' '));
      const score = searchable.reduce(
        (total, token) => total + (tokens.has(token) ? 1 : 0),
        document.keywords.some((keyword) => question.toLowerCase().includes(keyword)) ? 4 : 0,
      );
      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ document }) => document);
};
