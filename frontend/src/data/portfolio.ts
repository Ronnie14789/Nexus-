export const siteConfig = {
  name: 'Ecatu Ronald',
  initials: 'ER',
  role: 'Electrical & Automotive Systems Engineer',
  employer: 'Tata Uganda Ltd',
  location: 'Kampala, Uganda',
  nationality: 'Ugandan',
  email: 'ronaldecatu@gmail.com',
  emailHref: 'mailto:ronaldecatu@gmail.com',
  whatsapp: '+256 780 697 149',
  whatsappHref:
    'https://wa.me/256780697149?text=Hello%20Ronald%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.',
  mobile: '+256 757 106 218',
  mobileHref: 'tel:+256757106218',
  languages: ['English', 'Ateso', 'Luganda'],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/ronald-ecatu-0349673b8/',
    github: 'https://github.com/Ronnie14789',
    x: '',
  },
};

export const heroSignals = [
  { value: '2022 → present', label: 'Hands-on technical experience' },
  { value: '6 months', label: 'SkillPro training in India' },
  { value: '3 disciplines', label: 'Electrical · Automotive · Digital' },
  { value: '3 languages', label: 'English · Ateso · Luganda' },
];

export const engineeringPrinciples = [
  {
    number: '01',
    title: 'Evidence before assumptions',
    description:
      'I verify the complaint, test the system, document the findings, and only then recommend repair action.',
  },
  {
    number: '02',
    title: 'Systems thinking',
    description:
      'Electrical, mechanical, electronic, and software systems influence one another. Strong diagnosis connects them.',
  },
  {
    number: '03',
    title: 'Integrity in delivery',
    description:
      'Good technical work should be safe, traceable, understandable, and honest from inspection to customer handover.',
  },
];

export const disciplines = [
  {
    icon: 'electrical',
    code: 'ELECTRICAL SYSTEMS',
    title: 'Power, control & distribution',
    description:
      'Practical experience with AC and DC circuits, electrical connections, industrial distribution, fault tracing, and safe service procedures.',
    skills: ['AC / DC circuits', '1 kV & 415 V distribution', 'Wiring diagnosis', 'Starting & charging', 'Sensors & actuators'],
    accent: 'electric',
  },
  {
    icon: 'engine',
    code: 'AUTOMOTIVE SYSTEMS',
    title: 'Diagnostics, repair & reliability',
    description:
      'Commercial-vehicle diagnosis and repair across diesel engines, driveline, braking, steering, emissions, and electronic controls.',
    skills: ['Cummins INSITE', 'Tata diagnostics', 'Diesel engines', 'BS6 systems', 'CAN fundamentals'],
    accent: 'automotive',
  },
  {
    icon: 'code',
    code: 'DIGITAL SYSTEMS',
    title: 'Tools that improve technical work',
    description:
      'Building web and software skills that make information clearer, workflows faster, and technical service easier to manage.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React & TypeScript', 'Python learning'],
    accent: 'digital',
  },
] as const;

export const capabilities = [
  {
    icon: 'diagnostics',
    title: 'Vehicle diagnostics',
    description:
      'Complaint verification, scan-tool checks, live-data interpretation, electrical testing, mechanical inspection, and root-cause confirmation.',
  },
  {
    icon: 'engine',
    title: 'Diesel engine systems',
    description:
      'Fuel, lubrication, cooling, air management, turbocharging, combustion, and aftertreatment inspection and repair support.',
  },
  {
    icon: 'electrical',
    title: 'Electrical fault tracing',
    description:
      'Structured checks for circuits, connectors, sensors, actuators, grounds, power supply, starting, charging, and control systems.',
  },
  {
    icon: 'report',
    title: 'Warranty & technical reporting',
    description:
      'Clear reports that link the complaint, inspection evidence, probable cause, secondary damage, and corrective action.',
  },
  {
    icon: 'workshop',
    title: 'Workshop operations',
    description:
      'Preventive maintenance, PDI support, job planning, safety awareness, parts coordination, and professional communication.',
  },
  {
    icon: 'code',
    title: 'Digital workflow improvement',
    description:
      'Web interfaces, structured records, automation concepts, and software tools designed around real workshop needs.',
  },
] as const;

export const experience = [
  {
    period: '2024 — Present',
    company: 'Tata Uganda Ltd',
    location: 'Kampala, Uganda',
    role: 'Technician',
    description:
      'Supporting commercial-vehicle diagnosis, repairs, maintenance, workshop operations, and warranty-processing workflows.',
    responsibilities: [
      'Vehicle fault diagnosis and repair support',
      'Technical inspection and failure reporting',
      'Warranty documentation and follow-up',
      'Preventive maintenance and service communication',
    ],
    current: true,
  },
  {
    period: '2023 — 2024',
    company: 'China Machines',
    location: 'Luzira Industrial Area, Uganda',
    role: 'Electrician',
    description:
      'Worked on electrical connections and practical maintenance across alternating-current and direct-current circuits.',
    responsibilities: ['AC and DC circuit connections', 'Electrical inspection', 'Fault tracing', 'Safe installation practice'],
    current: false,
  },
  {
    period: '2022 — 2023',
    company: 'Tetra Technical Services under Sinohydro',
    location: 'Kiryandongo District, Uganda',
    role: 'Electrician & Assistant Linesman',
    description:
      'Supported electrical-distribution work and field activities involving 1 kV and 415 V systems.',
    responsibilities: ['Electrical distribution support', '1 kV and 415 V systems', 'Field installation assistance', 'Linesman support'],
    current: false,
  },
] as const;

export const education = [
  {
    period: 'Current',
    institution: 'Kyambogo University',
    location: 'Kampala, Uganda',
    qualification: 'Further studies in progress',
    detail:
      'Continuing formal education while developing professional experience across electrical and automotive systems.',
    kind: 'current',
  },
  {
    period: '2025 · 6 months',
    institution: 'Tata Motors Service Training Centre',
    location: 'Jamshedpur, India',
    qualification: 'Tata Motors SkillPro — International Business Commercial Vehicles',
    detail:
      'Professional development in BS6 systems, driveline, diagnostics, workshop practice, Cummins INSITE, and Tata Diagnostic Software.',
    kind: 'international',
  },
  {
    period: '2 years',
    institution: 'Uganda Technical College Elgon',
    location: 'Uganda',
    qualification: 'National Diploma in Electrical Engineering',
    detail: 'Second Class Upper. Built a strong foundation in electrical theory, systems, installation, and practical engineering.',
    kind: 'technical',
  },
  {
    period: 'Academic foundation',
    institution: 'St. James Bbiina Hall Luzira & Bishop Cipriano Kihangire SSS Bbiina',
    location: 'Kampala, Uganda',
    qualification: 'UACE and UCE',
    detail:
      'UACE: Physics, Economics and Mathematics with subsidiary IT. UCE completed in First Grade.',
    kind: 'foundation',
  },
] as const;

export const journey = [
  {
    marker: 'UG',
    phase: 'Foundation',
    title: 'Electrical training and field work',
    place: 'Uganda · 2022 onward',
    description:
      'Built practical discipline through electrical-distribution work, industrial electrical connections, and field service responsibilities.',
    image: '/images/ecatu-casual.webp',
  },
  {
    marker: 'IN',
    phase: 'International development',
    title: 'SkillPro training in Jamshedpur',
    place: 'India · 2025',
    description:
      'Completed six months of focused technical learning, workshop practice, e-learning, industry exposure, and cross-cultural collaboration.',
    image: '/images/ecatu-blue-portrait.webp',
  },
  {
    marker: 'UG',
    phase: 'Applied expertise',
    title: 'Knowledge returned to real workshop problems',
    place: 'Kampala · Present',
    description:
      'Applying deeper diagnostic thinking, clearer reporting, modern tools, and continuous learning in commercial-vehicle service.',
    image: '/images/skillpro-campus.webp',
  },
] as const;

export const projects = [
  {
    number: '01',
    category: 'Automotive operations',
    title: 'Diagnostic case analysis & warranty reporting',
    summary:
      'A repeatable method for turning customer complaints and inspection evidence into clear technical decisions.',
    problem:
      'Vehicle failures often involve several connected systems, incomplete initial symptoms, and secondary component damage.',
    approach:
      'Structure every case around complaint verification, diagnostic checks, dismantling findings, probable cause, damage chain, and corrective action.',
    outcome:
      'More consistent technical communication, better traceability, and clearer repair recommendations for customers and warranty teams.',
    tags: ['Root-cause analysis', 'Warranty process', 'Technical writing', 'Inspection evidence'],
    status: 'Professional practice',
  },
  {
    number: '02',
    category: 'Software engineering',
    title: 'Peter modular AI assistant',
    summary:
      'A modular learning project combining speech, language understanding, memory, dialogue, and software tools.',
    problem:
      'Assistant systems become difficult to maintain when speech, intelligence, memory, and skills are tightly connected.',
    approach:
      'Separate the system into focused Python modules for ASR, NLU, dialogue, LLM integration, memory, TTS, skills, and tests.',
    outcome:
      'A clearer architecture for learning, testing, debugging, and gradually expanding assistant capabilities.',
    tags: ['Python', 'ASR', 'LLM workflows', 'Modular architecture'],
    status: 'In development',
  },
  {
    number: '03',
    category: 'Full-stack web',
    title: 'Personal engineering platform',
    summary:
      'This portfolio combines a premium public experience with a private backend for contact messages and administration.',
    problem:
      'A generic portfolio could not represent the connection between electrical engineering, automotive systems, and digital development.',
    approach:
      'Create a custom information architecture, responsive visual system, accessible interactions, Express API, database storage, and email workflow.',
    outcome:
      'One professional platform that communicates experience, training, technical identity, and future direction without depending on Formspree.',
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'Responsive design'],
    status: 'Production-ready foundation',
  },
  {
    number: '04',
    category: 'Process improvement',
    title: 'Workshop data & communication systems',
    summary:
      'Improving how workshop information is captured, organised, reviewed, and shared.',
    problem:
      'Operational information can become inconsistent when attendance, service findings, parts needs, and customer updates use different formats.',
    approach:
      'Create clearer templates, structured tables, consistent technical language, and workflows that improve traceability.',
    outcome:
      'Faster review, better readability, and more professional communication across workshop and administrative tasks.',
    tags: ['Excel', 'Documentation', 'Workflow design', 'Communication'],
    status: 'Ongoing practice',
  },
] as const;

export const trainingFocus = [
  {
    title: 'BS6 & aftertreatment',
    detail: 'DOC, DPF, SCR, DEF dosing, sensors, actuators, thermal management, and emissions diagnosis.',
  },
  {
    title: 'Electronic diagnostics',
    detail: 'Fault-code interpretation, live data, guided checks, electronic engine controls, and service procedures.',
  },
  {
    title: 'Commercial-vehicle systems',
    detail: 'Diesel engines, driveline, braking, steering, electrical systems, workshop safety, and maintenance practice.',
  },
  {
    title: 'Professional development',
    detail: 'Teamwork, technical communication, e-learning, industry visits, research, and international exposure.',
  },
] as const;

export const gallery = [
  {
    src: '/images/ecatu-hero.webp',
    alt: 'Ecatu Ronald in the blue Tata Motors SkillPro training shirt',
    title: 'SkillPro professional portrait',
    caption: 'International Business Commercial Vehicles Skill Development Program.',
    orientation: 'wide',
  },
  {
    src: '/images/skillpro-campus.webp',
    alt: 'Ecatu Ronald standing on the SkillPro training campus in India',
    title: 'SkillPro campus',
    caption: 'Professional development in Jamshedpur, India.',
    orientation: 'portrait',
  },
  {
    src: '/images/tata-steel-visit.webp',
    alt: 'SkillPro participants during a Tata Steel technical exposure visit',
    title: 'Industry exposure',
    caption: 'Learning beyond the classroom through observation and technical visits.',
    orientation: 'portrait',
  },
  {
    src: '/images/cummins-isb-5-6.webp',
    alt: 'Cummins ISB 5.6 BS VI engine specifications learning display',
    title: 'Cummins ISB 5.6',
    caption: 'Study of common-rail fuel systems, controls, thermal management, and aftertreatment.',
    orientation: 'portrait',
  },
  {
    src: '/images/cummins-isb-6-7.webp',
    alt: 'Cummins ISB 6.7 BS VI engine specifications learning display',
    title: 'Cummins ISB 6.7',
    caption: 'Technical learning across engine control, fuel systems, emissions, and service applications.',
    orientation: 'portrait',
  },
  {
    src: '/images/dimna-reservoir-visit.webp',
    alt: 'SkillPro colleagues during a team visit near Dimna Reservoir',
    title: 'Team experience',
    caption: 'Collaboration, cultural exchange, and shared learning in India.',
    orientation: 'landscape',
  },
  {
    src: '/images/skillpro-team.webp',
    alt: 'SkillPro training group beside a reservoir in India',
    title: 'The wider journey',
    caption: 'Technical growth strengthened through teamwork and international experience.',
    orientation: 'wide',
  },
  {
    src: '/images/skillpro-heritage.webp',
    alt: 'Ecatu Ronald during a heritage visit in India',
    title: 'Culture & perspective',
    caption: 'A broader experience shaped by technical learning and cultural discovery.',
    orientation: 'portrait',
  },
] as const;

export const values = [
  {
    title: 'Research-led curiosity',
    description: 'I enjoy investigating how systems work, why they fail, and how they can be improved.',
  },
  {
    title: 'Service with integrity',
    description: 'My long-term goal is to lead with integrity and grow into a trusted technical consultant.',
  },
  {
    title: 'Family-grounded ambition',
    description: 'Family, responsibility, and continuous learning keep my professional growth connected to purpose.',
  },
] as const;
