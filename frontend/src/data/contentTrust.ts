export type PublicContentPage =
  | 'home'
  | 'about'
  | 'electrical'
  | 'automotive'
  | 'digital'
  | 'executive'
  | 'knowledge'
  | 'research'
  | 'diagnostics'
  | 'automotive-intelligence';

export interface ContentReference {
  label: string;
  authority: string;
  href?: string;
}

export interface ContentTrustProfile {
  title: string;
  summary: string;
  evidenceBasis: string;
  scopeBoundary: string;
  reviewed: string;
  reviewLabel: string;
  references: ContentReference[];
}

const reviewed = '19 July 2026';

export const contentTrustProfiles: Record<PublicContentPage, ContentTrustProfile> = {
  home: {
    title: 'A professional record with visible boundaries.',
    summary:
      'The homepage brings together Ronald’s self-reported work history, training record, technical practice and public project activity in one professional overview.',
    evidenceBasis:
      'Personal career record, portfolio source history, supplied training photographs and linked public profiles.',
    scopeBoundary:
      'The page is a professional portfolio, not an academic transcript, trade licence, employer statement or manufacturer authorization.',
    reviewed,
    reviewLabel: 'Profile and route review',
    references: [
      {
        label: 'LinkedIn professional profile',
        authority: 'Public profile',
        href: 'https://www.linkedin.com/in/ronald-ecatu-0349673b8/',
      },
      {
        label: 'Nexus source repository',
        authority: 'GitHub / Ronnie14789',
        href: 'https://github.com/Ronnie14789/Nexus-',
      },
    ],
  },
  about: {
    title: 'Identity, experience and training—not inflated claims.',
    summary:
      'This profile states the roles, institutions, tools and engineering disciplines currently represented in Ronald’s professional record.',
    evidenceBasis:
      'Self-reported employment and education history, SkillPro training record, supplied photographs and public professional profiles.',
    scopeBoundary:
      'Descriptions communicate professional experience and continuing development. They do not replace certificates, transcripts, references or employer verification.',
    reviewed,
    reviewLabel: 'Identity record review',
    references: [
      {
        label: 'LinkedIn professional profile',
        authority: 'Public profile',
        href: 'https://www.linkedin.com/in/ronald-ecatu-0349673b8/',
      },
      {
        label: 'Public engineering projects',
        authority: 'GitHub / Ronnie14789',
        href: 'https://github.com/Ronnie14789',
      },
    ],
  },
  electrical: {
    title: 'Engineering reference, not a universal specification.',
    summary:
      'The electrical centre explains system architecture, quantities, diagnostic logic, instruments and safety principles using interactive reference models.',
    evidenceBasis:
      'Established electrical principles, Ronald’s field experience and published IEC installation and verification frameworks.',
    scopeBoundary:
      'Calculated examples are ideal reference values. Real work requires local regulations, site risk assessment, competent supervision and the exact equipment specification.',
    reviewed,
    reviewLabel: 'Reference and safety review',
    references: [
      {
        label: 'IEC 60364-1:2025 — fundamental principles',
        authority: 'International Electrotechnical Commission',
        href: 'https://webstore.iec.ch/en/publication/63699',
      },
      {
        label: 'IEC 60364-6:2016 — verification',
        authority: 'International Electrotechnical Commission',
        href: 'https://webstore.iec.ch/en/publication/24656',
      },
    ],
  },
  automotive: {
    title: 'System knowledge with application-specific limits.',
    summary:
      'The automotive centre connects vehicle architecture, complaints, diagnostic workflows, tools, case logic and repair verification.',
    evidenceBasis:
      'Anonymized field cases, commercial-vehicle service practice, SkillPro development and official diagnostic-tool information.',
    scopeBoundary:
      'No generic value overrides the service information for the exact vehicle, engine, transmission, ECU calibration or operating condition.',
    reviewed,
    reviewLabel: 'Field logic and scope review',
    references: [
      {
        label: 'INSITE electronic engine diagnostics',
        authority: 'Cummins',
        href: 'https://www.cummins.com/en-na/parts-and-service/digital-products-and-services/insite',
      },
      {
        label: 'Exact manufacturer workshop information',
        authority: 'Required for the vehicle under test',
      },
    ],
  },
  digital: {
    title: 'Architecture guidance tied to testable evidence.',
    summary:
      'The digital centre explains software boundaries, delivery, security, data and operations while separating design guidance from demonstrated Nexus behaviour.',
    evidenceBasis:
      'Repository implementation, clean-build results, runtime checks and recognized web accessibility and application-security references.',
    scopeBoundary:
      'Architecture models are guidance. A capability is treated as operational only when code, configuration and runtime evidence demonstrate it.',
    reviewed,
    reviewLabel: 'Architecture and delivery review',
    references: [
      {
        label: 'Application Security Verification Standard',
        authority: 'OWASP',
        href: 'https://owasp.org/www-project-application-security-verification-standard/',
      },
      {
        label: 'Web Content Accessibility Guidelines',
        authority: 'W3C Web Accessibility Initiative',
        href: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
      },
      {
        label: 'Nexus source and release history',
        authority: 'GitHub / Ronnie14789',
        href: 'https://github.com/Ronnie14789/Nexus-',
      },
    ],
  },
  executive: {
    title: 'Live readings and roadmap models are kept separate.',
    summary:
      'Executive Intelligence combines real public-route and API checks with a descriptive view of delivered domains, risks and planned platform modules.',
    evidenceBasis:
      'Live /api/health responses, public route checks, repository state and explicitly labelled planning data.',
    scopeBoundary:
      'Only API and route checks are live telemetry. Readiness charts, delivery signals, priorities and roadmap phases are planning models.',
    reviewed,
    reviewLabel: 'Operational-claim review',
    references: [
      {
        label: 'Live Nexus API health',
        authority: 'Nexus runtime',
        href: '/api/health',
      },
      {
        label: 'Nexus source repository',
        authority: 'GitHub / Ronnie14789',
        href: 'https://github.com/Ronnie14789/Nexus-',
      },
    ],
  },
  knowledge: {
    title: 'Evidence classes replace false numerical certainty.',
    summary:
      'Every knowledge record identifies its domain, record type, evidence class, revision date, source class and verification requirements.',
    evidenceBasis:
      'Anonymized observations, recorded test results, service-history context, engineering principles and automated software verification.',
    scopeBoundary:
      'Field-proven means supported by the recorded case—not universally proven for every application. Reference content must be checked against current manufacturer or standards information.',
    reviewed,
    reviewLabel: 'Provenance model 1.0',
    references: [
      {
        label: 'Automotive Service Intelligence records',
        authority: 'Nexus anonymized field library',
        href: '/automotive-systems/intelligence',
      },
      {
        label: 'IEC low-voltage verification framework',
        authority: 'International Electrotechnical Commission',
        href: 'https://webstore.iec.ch/en/publication/24656',
      },
      {
        label: 'Nexus production verification source',
        authority: 'GitHub / Ronnie14789',
        href: 'https://github.com/Ronnie14789/Nexus-',
      },
    ],
  },
  research: {
    title: 'Learning guidance with visible sources and safety limits.',
    summary:
      'The Research Studio combines a curated concept library, safe educational projects, simplified diagrams and an optional web-research assistant across electrical, automotive and digital systems.',
    evidenceBasis:
      'Established engineering principles and authority links from IEC, PhET, Cummins, NHTSA, MDN, OWASP and W3C, supported by an explicitly labelled response source mode.',
    scopeBoundary:
      'It is a learning and research starting point—not a universal textbook, certified course, repair manual or substitute for competent supervision. Exact standards, manufacturer procedures and local rules remain decisive.',
    reviewed: '21 July 2026',
    reviewLabel: 'Learning, source and safety review',
    references: [
      {
        label: 'Circuit Construction Kit: DC',
        authority: 'PhET / University of Colorado Boulder',
        href: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html',
      },
      {
        label: 'Learn web development',
        authority: 'MDN Web Docs',
        href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development',
      },
      {
        label: 'Vehicle safety information',
        authority: 'NHTSA',
        href: 'https://www.nhtsa.gov/vehicle-safety',
      },
    ],
  },
  diagnostics: {
    title: 'Explainable decision support—not automatic diagnosis.',
    summary:
      'The diagnostic workbench ranks hypotheses from the observations selected by the user and returns the next useful test and verification path.',
    evidenceBasis:
      'Deterministic diagnostic rules connected to anonymized field themes and explicit supporting or contradictory observations.',
    scopeBoundary:
      'Rank order is not a statistical probability, confirmed root cause or instruction to replace parts. The exact vehicle procedure and measured evidence remain decisive.',
    reviewed,
    reviewLabel: 'Reasoning-boundary review',
    references: [
      {
        label: 'Automotive Service Intelligence records',
        authority: 'Nexus anonymized field library',
        href: '/automotive-systems/intelligence',
      },
      {
        label: 'INSITE electronic engine diagnostics',
        authority: 'Cummins',
        href: 'https://www.cummins.com/en-na/parts-and-service/digital-products-and-services/insite',
      },
    ],
  },
  'automotive-intelligence': {
    title: 'Field observations are separated from specifications.',
    summary:
      'Records preserve the complaint, operating context, observed evidence, measurements, assessment, test order and repair-verification requirements.',
    evidenceBasis:
      'Anonymized technical-report discussions and field information supplied by Ecatu Ronald; measured values retain their units and stated context.',
    scopeBoundary:
      'Customer names, VINs and confidential warranty references are excluded. Missing model-specific specifications are identified instead of invented.',
    reviewed,
    reviewLabel: 'Field-library review',
    references: [
      {
        label: 'Knowledge Vault cross-reference',
        authority: 'Nexus evidence index',
        href: '/knowledge-vault',
      },
      {
        label: 'Exact manufacturer service information',
        authority: 'Required for every application-specific decision',
      },
    ],
  },
};
