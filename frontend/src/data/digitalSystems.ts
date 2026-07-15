export type DigitalArchitectureId =
  | 'experience'
  | 'application'
  | 'services'
  | 'data'
  | 'identity'
  | 'observability'
  | 'infrastructure'
  | 'delivery';

export type DigitalFaultCategory =
  | 'frontend'
  | 'backend'
  | 'data'
  | 'integration'
  | 'security'
  | 'infrastructure'
  | 'delivery';

export interface DigitalArchitectureNode {
  id: DigitalArchitectureId;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  interfaces: string[];
  failureModes: string[];
  evidence: string[];
}

export interface DigitalPrinciple {
  code: string;
  title: string;
  statement: string;
  detail: string;
  proof: string;
}

export interface PlatformModel {
  id: string;
  code: string;
  title: string;
  bestFor: string;
  architecture: string[];
  strengths: string[];
  controls: string[];
  caution: string;
}

export interface WorkflowStage {
  code: string;
  title: string;
  objective: string;
  evidence: string[];
  exitCondition: string;
}

export interface DiagnosticScenario {
  id: string;
  signal: string;
  title: string;
  complaint: string;
  firstChecks: string[];
  decisionPath: string[];
  proof: string;
}

export interface DigitalTool {
  code: string;
  title: string;
  class: string;
  purpose: string;
  evidence: string[];
  misuse: string;
}

export interface DigitalFault {
  id: string;
  category: DigitalFaultCategory;
  title: string;
  symptom: string;
  likelyCauses: string[];
  tests: string[];
  expected: string;
  correctiveAction: string;
  verification: string;
}

export interface DigitalCaseFile {
  code: string;
  title: string;
  context: string;
  complaint: string;
  evidence: string[];
  rootCause: string;
  decision: string;
  verification: string;
}

export interface SecurityLayer {
  code: string;
  title: string;
  threat: string;
  controls: string[];
  verification: string;
}

export const architectureNodes: DigitalArchitectureNode[] = [
  {
    id: 'experience',
    code: 'UX-01',
    title: 'Experience layer',
    subtitle: 'Human interaction and system clarity',
    description:
      'The experience layer translates system capability into interfaces that people can understand, operate and trust across desktop, mobile and assistive technologies.',
    responsibilities: [
      'Information architecture and navigation',
      'Responsive interface behaviour',
      'Accessibility and keyboard operation',
      'Form validation and user feedback',
      'Performance perception and loading states',
    ],
    interfaces: ['Browser DOM', 'Design system', 'Client state', 'API contracts'],
    failureModes: ['Broken navigation', 'Layout shift', 'Stale state', 'Unclear errors', 'Inaccessible controls'],
    evidence: ['Lighthouse results', 'User-flow tests', 'Console output', 'Network traces', 'Accessibility checks'],
  },
  {
    id: 'application',
    code: 'APP-02',
    title: 'Application layer',
    subtitle: 'Business rules and controlled behaviour',
    description:
      'The application layer coordinates use cases, state transitions and domain rules so the platform behaves consistently regardless of interface or delivery channel.',
    responsibilities: [
      'Use-case orchestration',
      'Business validation',
      'State transitions',
      'Error handling and recovery',
      'Boundary enforcement',
    ],
    interfaces: ['UI actions', 'Service interfaces', 'Domain models', 'Event handlers'],
    failureModes: ['Invalid transitions', 'Duplicated rules', 'Race conditions', 'Silent failure', 'Inconsistent results'],
    evidence: ['Unit tests', 'Application logs', 'State traces', 'Contract tests', 'Reproduction steps'],
  },
  {
    id: 'services',
    code: 'API-03',
    title: 'Service and API layer',
    subtitle: 'Stable contracts between capabilities',
    description:
      'Services expose controlled operations through explicit contracts, authentication, validation, rate limits and predictable response behaviour.',
    responsibilities: [
      'Request routing',
      'Schema validation',
      'Authentication and authorization',
      'Rate limiting and idempotency',
      'Response and error contracts',
    ],
    interfaces: ['REST', 'Webhooks', 'Queues', 'Internal modules', 'Third-party APIs'],
    failureModes: ['Timeouts', 'Contract drift', 'Duplicate writes', 'Unauthorized access', 'Dependency failure'],
    evidence: ['HTTP traces', 'Request IDs', 'API tests', 'Latency percentiles', 'Dependency status'],
  },
  {
    id: 'data',
    code: 'DAT-04',
    title: 'Data layer',
    subtitle: 'Persistent state, integrity and retrieval',
    description:
      'The data layer protects the accuracy, availability, lifecycle and recoverability of information from initial validation through storage, query and archival.',
    responsibilities: [
      'Schema and index design',
      'Transactions and consistency',
      'Backups and recovery',
      'Retention and deletion',
      'Query performance',
    ],
    interfaces: ['Database driver', 'Repository layer', 'Cache', 'Object storage', 'Migration system'],
    failureModes: ['Connection exhaustion', 'Slow queries', 'Data loss', 'Schema mismatch', 'Replication lag'],
    evidence: ['Query plans', 'Migration history', 'Backup tests', 'Database metrics', 'Integrity constraints'],
  },
  {
    id: 'identity',
    code: 'IAM-05',
    title: 'Identity and trust',
    subtitle: 'Who may do what, under which conditions',
    description:
      'Identity services establish users, sessions, roles and permissions while reducing the amount of trust assigned to every request and integration.',
    responsibilities: [
      'Credential verification',
      'Session lifecycle',
      'Role and permission checks',
      'Secret handling',
      'Audit attribution',
    ],
    interfaces: ['Login', 'Tokens', 'Cookies', 'Role policy', 'Secret store'],
    failureModes: ['Token leakage', 'Privilege escalation', 'Weak session control', 'Credential reuse', 'Missing audit trail'],
    evidence: ['Authentication logs', 'Policy tests', 'Session inspection', 'Secret scans', 'Access reviews'],
  },
  {
    id: 'observability',
    code: 'OBS-06',
    title: 'Observability layer',
    subtitle: 'Evidence of behaviour in real operation',
    description:
      'Observability connects logs, metrics, traces and alerts so system condition can be understood before, during and after an incident.',
    responsibilities: [
      'Structured logging',
      'Service metrics and SLOs',
      'Distributed tracing',
      'Alert routing',
      'Incident evidence retention',
    ],
    interfaces: ['Logs', 'Metrics', 'Traces', 'Dashboards', 'Alert channels'],
    failureModes: ['Missing context', 'Alert fatigue', 'Untraceable requests', 'Blind spots', 'Excessive telemetry cost'],
    evidence: ['Correlation IDs', 'Error rates', 'Latency trends', 'Saturation signals', 'Alert history'],
  },
  {
    id: 'infrastructure',
    code: 'INF-07',
    title: 'Infrastructure layer',
    subtitle: 'Compute, network and runtime conditions',
    description:
      'Infrastructure supplies the controlled runtime where applications execute, communicate, scale and recover across local, cloud and edge environments.',
    responsibilities: [
      'Compute and memory capacity',
      'Network and DNS',
      'TLS and certificate management',
      'Storage and runtime isolation',
      'Scaling and failover',
    ],
    interfaces: ['Containers', 'Runtime', 'Reverse proxy', 'DNS', 'Cloud services'],
    failureModes: ['Resource exhaustion', 'DNS failure', 'Certificate expiry', 'Unhealthy instance', 'Region outage'],
    evidence: ['CPU and memory metrics', 'Health checks', 'DNS records', 'TLS inspection', 'Container logs'],
  },
  {
    id: 'delivery',
    code: 'CD-08',
    title: 'Delivery and governance',
    subtitle: 'Safe change from source to production',
    description:
      'The delivery layer turns reviewed source code into repeatable releases with automated checks, controlled configuration, rollback and traceability.',
    responsibilities: [
      'Version control and review',
      'Automated build and test',
      'Security and dependency checks',
      'Environment configuration',
      'Deployment and rollback',
    ],
    interfaces: ['Git', 'CI pipeline', 'Artifact registry', 'Environment variables', 'Deployment platform'],
    failureModes: ['Build drift', 'Missing secret', 'Unsafe migration', 'Broken artifact', 'Unrecoverable release'],
    evidence: ['Commit SHA', 'CI results', 'Artifact checksum', 'Deployment logs', 'Rollback record'],
  },
];

export const digitalPrinciples: DigitalPrinciple[] = [
  {
    code: 'P-01',
    title: 'Explicit contracts',
    statement: 'Every boundary should state what enters, what leaves and what failure looks like.',
    detail: 'Typed interfaces, schemas, status codes and versioned expectations reduce ambiguity between people, modules and services.',
    proof: 'Contract tests and validated payloads demonstrate that both sides interpret the boundary the same way.',
  },
  {
    code: 'P-02',
    title: 'Controlled state',
    statement: 'State must have an owner, lifecycle and source of truth.',
    detail: 'Unclear ownership creates duplication, stale interfaces and conflicting writes. State transitions should be observable and reversible where practical.',
    proof: 'A state diagram, transaction history or event trail can explain how the current value was reached.',
  },
  {
    code: 'P-03',
    title: 'Least necessary trust',
    statement: 'Every user, service and secret receives only the access required for its function.',
    detail: 'Authentication identifies the actor; authorization limits the action. Trust boundaries are enforced on the server, not only hidden in the interface.',
    proof: 'Role tests, denied-request logs and access reviews confirm the policy is operating.',
  },
  {
    code: 'P-04',
    title: 'Observable behaviour',
    statement: 'A production system must explain what it is doing without exposing sensitive data.',
    detail: 'Structured logs, metrics, traces and correlation identifiers turn incidents into evidence instead of guesswork.',
    proof: 'A single request can be followed from entry through dependencies to final response.',
  },
  {
    code: 'P-05',
    title: 'Graceful failure',
    statement: 'Failure is designed as a controlled operating state, not treated as an impossible event.',
    detail: 'Timeouts, retries, circuit breakers, fallback storage and clear user messages prevent one dependency from causing uncontrolled system collapse.',
    proof: 'Failure-injection tests show the system limits impact and recovers predictably.',
  },
  {
    code: 'P-06',
    title: 'Repeatable delivery',
    statement: 'The same source and configuration should create the same verified artifact.',
    detail: 'Automated builds, pinned dependencies, environment validation and immutable artifacts reduce deployment uncertainty.',
    proof: 'A release can be traced to a commit, checks, checksum, environment and deployment record.',
  },
  {
    code: 'P-07',
    title: 'Performance budgets',
    statement: 'Speed, capacity and resource use are engineering constraints.',
    detail: 'Latency percentiles, bundle size, query cost and saturation limits should be defined before performance becomes a user complaint.',
    proof: 'Measured budgets are enforced in tests, dashboards or release gates.',
  },
  {
    code: 'P-08',
    title: 'Recoverable data',
    statement: 'Information is not protected until restoration has been tested.',
    detail: 'Backups, migration discipline, retention rules and recovery objectives protect the system from human error, corruption and infrastructure failure.',
    proof: 'A documented restore test proves the backup is usable within the required recovery window.',
  },
];

export const platformModels: PlatformModel[] = [
  {
    id: 'modular',
    code: 'ARC-01',
    title: 'Modular application',
    bestFor: 'Professional products that need clear boundaries without premature distributed complexity.',
    architecture: ['Interface', 'Application modules', 'Shared services', 'Primary database', 'Observability'],
    strengths: ['Simple operations', 'Fast local development', 'Clear ownership', 'Straightforward transactions'],
    controls: ['Module boundaries', 'Typed contracts', 'Migration discipline', 'Dependency rules'],
    caution: 'Without enforced boundaries, a modular system can slowly become tightly coupled.',
  },
  {
    id: 'service',
    code: 'ARC-02',
    title: 'Service platform',
    bestFor: 'Independent capabilities that require separate scaling, release cycles or ownership.',
    architecture: ['Gateway', 'Identity', 'Domain services', 'Message broker', 'Service data stores'],
    strengths: ['Independent scaling', 'Fault containment', 'Technology flexibility', 'Team autonomy'],
    controls: ['API governance', 'Distributed tracing', 'Idempotency', 'Resilience patterns'],
    caution: 'Network calls, distributed data and operational overhead must be justified by real system needs.',
  },
  {
    id: 'event',
    code: 'ARC-03',
    title: 'Event-driven system',
    bestFor: 'Workflows where multiple capabilities react asynchronously to reliable state changes.',
    architecture: ['Event producer', 'Broker', 'Consumers', 'Retry queue', 'Event store'],
    strengths: ['Loose coupling', 'Asynchronous throughput', 'Auditability', 'Extensible workflows'],
    controls: ['Event schema', 'Ordering rules', 'Deduplication', 'Dead-letter handling'],
    caution: 'Eventual consistency and replay behaviour must be understood by both engineers and users.',
  },
  {
    id: 'offline',
    code: 'ARC-04',
    title: 'Offline-first field system',
    bestFor: 'Technicians and field teams operating where network access may be slow or unavailable.',
    architecture: ['Local interface', 'Device storage', 'Sync engine', 'Conflict policy', 'Cloud API'],
    strengths: ['Field continuity', 'Fast local response', 'Reduced network dependence', 'Deferred synchronization'],
    controls: ['Conflict resolution', 'Encrypted storage', 'Sync status', 'Retry policy'],
    caution: 'Data ownership and conflict rules must be explicit before disconnected changes are allowed.',
  },
  {
    id: 'edge',
    code: 'ARC-05',
    title: 'Edge and telemetry platform',
    bestFor: 'Machines, vehicles and sites that collect signals close to the physical process.',
    architecture: ['Sensors', 'Edge gateway', 'Local rules', 'Secure transport', 'Cloud analytics'],
    strengths: ['Low latency', 'Bandwidth control', 'Local autonomy', 'Operational visibility'],
    controls: ['Device identity', 'Signed updates', 'Store-and-forward', 'Time synchronization'],
    caution: 'Remote devices require lifecycle management, secure updates and evidence of configuration state.',
  },
  {
    id: 'ai',
    code: 'ARC-06',
    title: 'AI-assisted operations',
    bestFor: 'Systems that augment search, triage, summarization or decision support while retaining human control.',
    architecture: ['User intent', 'Retrieval', 'Model service', 'Policy layer', 'Evidence and review'],
    strengths: ['Faster knowledge access', 'Natural interaction', 'Pattern assistance', 'Operational automation'],
    controls: ['Grounded evidence', 'Permission checks', 'Output validation', 'Human review'],
    caution: 'AI output is probabilistic and must not silently become the source of truth for critical decisions.',
  },
];

export const deliveryWorkflow: WorkflowStage[] = [
  {
    code: '01',
    title: 'Define the operating need',
    objective: 'State the user, decision, constraint and measurable outcome before selecting technology.',
    evidence: ['Problem statement', 'User journey', 'Success metric', 'Risk assumptions'],
    exitCondition: 'The team can explain why the system should exist and how success will be measured.',
  },
  {
    code: '02',
    title: 'Map boundaries and data',
    objective: 'Identify actors, trust boundaries, system inputs, outputs, state and external dependencies.',
    evidence: ['Context diagram', 'Data classification', 'Dependency inventory', 'Trust map'],
    exitCondition: 'Every important boundary and sensitive data path has an owner.',
  },
  {
    code: '03',
    title: 'Design contracts',
    objective: 'Define interfaces, schemas, error behaviour, versioning and compatibility expectations.',
    evidence: ['Types', 'API schema', 'Error catalogue', 'Contract tests'],
    exitCondition: 'Consumers and providers agree on valid requests, responses and failures.',
  },
  {
    code: '04',
    title: 'Engineer the architecture',
    objective: 'Choose the simplest structure that meets reliability, scale, security and maintainability needs.',
    evidence: ['Architecture decision record', 'Capacity estimate', 'Failure model', 'Data design'],
    exitCondition: 'Major trade-offs and rejected alternatives are documented.',
  },
  {
    code: '05',
    title: 'Build in controlled increments',
    objective: 'Implement small, reviewable changes with consistent standards and local feedback.',
    evidence: ['Commits', 'Code review', 'Static checks', 'Local test output'],
    exitCondition: 'Each increment is understandable, testable and safe to integrate.',
  },
  {
    code: '06',
    title: 'Verify behaviour',
    objective: 'Test normal, boundary, failure, permission and recovery conditions.',
    evidence: ['Unit tests', 'Integration tests', 'Accessibility tests', 'Security tests'],
    exitCondition: 'Required behaviour is proven, including what happens when dependencies fail.',
  },
  {
    code: '07',
    title: 'Build an immutable artifact',
    objective: 'Create a versioned release output from reviewed source and controlled dependencies.',
    evidence: ['Build log', 'Artifact checksum', 'Dependency report', 'Commit SHA'],
    exitCondition: 'The release can be reproduced and traced to its exact source.',
  },
  {
    code: '08',
    title: 'Validate the environment',
    objective: 'Confirm configuration, secrets, database state, routes, certificates and external services.',
    evidence: ['Environment checklist', 'Migration plan', 'Health checks', 'Secret presence tests'],
    exitCondition: 'Production prerequisites are verified without exposing secret values.',
  },
  {
    code: '09',
    title: 'Deploy progressively',
    objective: 'Limit release impact through staged rollout, health gates and rollback readiness.',
    evidence: ['Deployment log', 'Readiness probe', 'Error baseline', 'Rollback command'],
    exitCondition: 'The new version is healthy under real traffic and can be reversed safely.',
  },
  {
    code: '10',
    title: 'Observe production',
    objective: 'Compare real behaviour against latency, availability, error and capacity expectations.',
    evidence: ['Dashboards', 'Traces', 'Logs', 'Synthetic checks'],
    exitCondition: 'The system is stable and no hidden regression remains.',
  },
  {
    code: '11',
    title: 'Respond with evidence',
    objective: 'During incidents, preserve facts, reduce impact and avoid uncontrolled changes.',
    evidence: ['Timeline', 'Request IDs', 'Metrics', 'Change record'],
    exitCondition: 'Service is restored and the failure mechanism is understood.',
  },
  {
    code: '12',
    title: 'Learn and improve',
    objective: 'Convert findings into stronger design, tests, runbooks and prevention controls.',
    evidence: ['Post-incident review', 'Action owners', 'Regression test', 'Updated documentation'],
    exitCondition: 'The same class of failure is harder to repeat and easier to diagnose.',
  },
];

export const diagnosticScenarios: DiagnosticScenario[] = [
  {
    id: 'blank-page',
    signal: 'UI-RENDER',
    title: 'Page loads but the interface is blank',
    complaint: 'The domain responds, yet the browser displays an empty or incomplete screen.',
    firstChecks: ['Browser console', 'Static asset requests', 'Runtime environment values', 'Route chunk loading'],
    decisionPath: [
      'Confirm HTML response and content type',
      'Inspect JavaScript and CSS asset status',
      'Identify first runtime exception',
      'Reproduce with production build',
      'Verify corrected asset and route behaviour',
    ],
    proof: 'The route renders without console errors and all required assets return successful responses.',
  },
  {
    id: 'api-timeout',
    signal: 'API-LATENCY',
    title: 'Requests are timing out under normal use',
    complaint: 'Users wait too long or receive gateway timeout responses from an otherwise reachable service.',
    firstChecks: ['Latency percentiles', 'Dependency timing', 'Database query duration', 'Resource saturation'],
    decisionPath: [
      'Trace one slow request end to end',
      'Separate queue time from execution time',
      'Inspect slow dependency and query evidence',
      'Apply bounded timeout or capacity correction',
      'Load-test the corrected path',
    ],
    proof: 'Latency remains within the defined budget at expected concurrency with no hidden error increase.',
  },
  {
    id: 'data-missing',
    signal: 'DATA-INTEGRITY',
    title: 'A successful request does not produce expected data',
    complaint: 'The interface confirms completion, but the record cannot be found or is incomplete.',
    firstChecks: ['Request ID', 'Write acknowledgement', 'Transaction outcome', 'Fallback storage path'],
    decisionPath: [
      'Trace the request to persistence',
      'Confirm validation and write result',
      'Check selected database and environment',
      'Inspect asynchronous follow-up failure',
      'Verify record retrieval by stable identifier',
    ],
    proof: 'The record is stored once, retrievable by reference and protected against partial writes.',
  },
  {
    id: 'auth-loop',
    signal: 'IAM-SESSION',
    title: 'Authenticated users are returned to login',
    complaint: 'Credentials are accepted, but the protected application repeatedly redirects to the sign-in page.',
    firstChecks: ['Cookie attributes', 'Token expiry', 'Clock alignment', 'Origin and proxy headers'],
    decisionPath: [
      'Confirm authentication response',
      'Inspect session storage and transport',
      'Validate token on protected request',
      'Check same-site and secure settings',
      'Prove session continuity across refresh',
    ],
    proof: 'Authorized requests remain authenticated for the intended session and invalid sessions are rejected cleanly.',
  },
  {
    id: 'deploy-regression',
    signal: 'CD-RELEASE',
    title: 'A release succeeds but production behaviour regresses',
    complaint: 'The deployment platform reports success while a route, integration or workflow fails after release.',
    firstChecks: ['Commit SHA', 'Build artifact', 'Environment diff', 'Deployment and startup logs'],
    decisionPath: [
      'Compare production artifact to tested artifact',
      'Check configuration and migration state',
      'Identify first failing health or synthetic check',
      'Rollback or correct with minimal change',
      'Add a release gate for the missed condition',
    ],
    proof: 'The corrected release passes build, startup, route, integration and production health verification.',
  },
  {
    id: 'email-delivery',
    signal: 'ASYNC-MAIL',
    title: 'Messages are stored but email notifications do not arrive',
    complaint: 'The user receives a reference number and data is retained, but outbound notification status remains failed or pending.',
    firstChecks: ['SMTP configuration presence', 'Delivery status record', 'Provider response', 'Retry history'],
    decisionPath: [
      'Confirm storage succeeded independently',
      'Inspect asynchronous job status',
      'Verify provider authentication and sender policy',
      'Retry with bounded attempts',
      'Confirm delivered status and receipt',
    ],
    proof: 'The message remains safely stored and both delivery state and final provider result are visible.',
  },
];

export const digitalTools: DigitalTool[] = [
  {
    code: 'DEV-01',
    title: 'Version control',
    class: 'Change evidence',
    purpose: 'Tracks source history, review boundaries, branches and release identity.',
    evidence: ['Commit SHA', 'Diff', 'Author and time', 'Pull request discussion'],
    misuse: 'Large unexplained commits make review, rollback and root-cause analysis difficult.',
  },
  {
    code: 'DEV-02',
    title: 'Type system and static analysis',
    class: 'Pre-runtime verification',
    purpose: 'Detects invalid contracts, unsafe assumptions and inconsistent code before execution.',
    evidence: ['Compiler output', 'Lint results', 'Dependency graph', 'Rule violations'],
    misuse: 'Passing static checks does not prove runtime behaviour, security or user experience.',
  },
  {
    code: 'TST-03',
    title: 'Automated test suite',
    class: 'Behaviour verification',
    purpose: 'Proves expected outcomes at unit, integration, contract and system boundaries.',
    evidence: ['Test results', 'Coverage', 'Failure reproduction', 'Regression protection'],
    misuse: 'Tests that only mirror implementation can pass while real user behaviour remains broken.',
  },
  {
    code: 'NET-04',
    title: 'Browser network inspector',
    class: 'Client and API tracing',
    purpose: 'Shows requests, timing, headers, payloads, caching and failed assets from the user edge.',
    evidence: ['Status code', 'Waterfall', 'Response body', 'Cache source'],
    misuse: 'Sensitive tokens and personal data must not be copied into public reports or screenshots.',
  },
  {
    code: 'API-05',
    title: 'API client and contract runner',
    class: 'Interface testing',
    purpose: 'Exercises endpoints independently of the interface using controlled requests and assertions.',
    evidence: ['Request payload', 'Response schema', 'Latency', 'Authentication result'],
    misuse: 'A successful isolated endpoint test does not prove the complete user workflow.',
  },
  {
    code: 'DAT-06',
    title: 'Database profiler',
    class: 'Data diagnostics',
    purpose: 'Inspects query plans, indexes, connection use, locks and storage behaviour.',
    evidence: ['Execution plan', 'Query duration', 'Rows examined', 'Index selection'],
    misuse: 'Production profiling must be controlled to avoid adding load or exposing sensitive records.',
  },
  {
    code: 'OBS-07',
    title: 'Structured logs',
    class: 'Event evidence',
    purpose: 'Records meaningful application events with consistent fields and correlation identifiers.',
    evidence: ['Timestamp', 'Request ID', 'Severity', 'Service and operation'],
    misuse: 'Logs should not contain passwords, tokens, raw secrets or unnecessary personal information.',
  },
  {
    code: 'OBS-08',
    title: 'Metrics and dashboards',
    class: 'Condition trends',
    purpose: 'Measures rates, errors, duration and saturation across time and system boundaries.',
    evidence: ['Error rate', 'Latency percentile', 'CPU', 'Queue depth'],
    misuse: 'Averages can hide severe tail latency and localised failure.',
  },
  {
    code: 'OBS-09',
    title: 'Distributed tracing',
    class: 'Request path analysis',
    purpose: 'Connects one operation across services, dependencies and asynchronous work.',
    evidence: ['Span duration', 'Parent-child path', 'Error location', 'Dependency timing'],
    misuse: 'Sampling and instrumentation gaps can make a trace incomplete.',
  },
  {
    code: 'SEC-10',
    title: 'Security scanner',
    class: 'Risk detection',
    purpose: 'Checks dependencies, secrets, configuration and common application weaknesses.',
    evidence: ['Advisory ID', 'Affected package', 'Severity', 'Remediation state'],
    misuse: 'Scanner output requires context; not every alert has equal exploitability or business impact.',
  },
  {
    code: 'OPS-11',
    title: 'Container and runtime inspection',
    class: 'Infrastructure evidence',
    purpose: 'Shows process state, resource limits, environment presence, network bindings and startup output.',
    evidence: ['Process health', 'Memory use', 'Port mapping', 'Runtime logs'],
    misuse: 'Environment inspection must never print secret values into shared terminals or logs.',
  },
  {
    code: 'CD-12',
    title: 'CI and deployment logs',
    class: 'Release verification',
    purpose: 'Links source, automated checks, artifacts and production rollout into one traceable record.',
    evidence: ['Workflow result', 'Artifact', 'Deployment ID', 'Health gate'],
    misuse: 'A green deployment status is not enough without application-level route and workflow checks.',
  },
];

export const faultCategories: Array<{ id: 'all' | DigitalFaultCategory; label: string }> = [
  { id: 'all', label: 'All systems' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data' },
  { id: 'integration', label: 'Integration' },
  { id: 'security', label: 'Security' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'delivery', label: 'Delivery' },
];

export const digitalFaults: DigitalFault[] = [
  {
    id: 'route-refresh-404',
    category: 'frontend',
    title: 'SPA route fails on browser refresh',
    symptom: 'Navigation works inside the application, but directly opening or refreshing a nested route returns 404.',
    likelyCauses: ['Server does not fall back to index.html', 'Reverse proxy route rule missing', 'Static output path mismatch'],
    tests: ['Request the route directly', 'Inspect server routing configuration', 'Verify index fallback after static-file lookup'],
    expected: 'All valid client routes return the application shell while API and asset routes remain distinct.',
    correctiveAction: 'Configure controlled SPA fallback without intercepting API, file or health endpoints.',
    verification: 'Open and refresh every public route directly and confirm HTTP 200 with correct rendered content.',
  },
  {
    id: 'asset-path-failure',
    category: 'frontend',
    title: 'Styles or scripts missing after deployment',
    symptom: 'HTML loads, but the interface is unstyled or non-interactive because hashed assets return errors.',
    likelyCauses: ['Incorrect build base path', 'Wrong deployment directory', 'Stale HTML referencing removed chunks'],
    tests: ['Inspect asset URLs', 'Compare dist contents to served path', 'Check cache headers and deployment artifact'],
    expected: 'Every asset referenced by index.html exists in the deployed artifact and returns the correct content type.',
    correctiveAction: 'Align build output, server static directory and deployment artifact; invalidate stale HTML where required.',
    verification: 'Hard refresh from a clean browser and confirm all CSS, JavaScript and images load successfully.',
  },
  {
    id: 'client-state-stale',
    category: 'frontend',
    title: 'Interface displays stale data after update',
    symptom: 'The server accepts a change but the visible interface continues showing an earlier state.',
    likelyCauses: ['Cache not invalidated', 'Local state duplicated', 'Mutation response ignored', 'Race between requests'],
    tests: ['Inspect mutation response', 'Trace state ownership', 'Disable cache', 'Reproduce rapid repeated actions'],
    expected: 'The interface reconciles to the confirmed server state using one defined source of truth.',
    correctiveAction: 'Remove duplicate state, update or invalidate the correct cache key and guard competing requests.',
    verification: 'Repeat update, refresh and multi-tab checks without stale or conflicting values.',
  },
  {
    id: 'unhandled-server-error',
    category: 'backend',
    title: 'Unhandled server exception',
    symptom: 'A request returns a generic 500 response and the operation cannot be traced clearly.',
    likelyCauses: ['Missing error boundary', 'Unexpected input', 'Dependency exception', 'Rejected promise not handled'],
    tests: ['Use request ID to inspect logs', 'Reproduce with controlled payload', 'Trace dependency call', 'Check error middleware'],
    expected: 'The server records structured context and returns a safe, consistent error contract.',
    correctiveAction: 'Handle the failure at the correct boundary, validate input and preserve the original cause for internal evidence.',
    verification: 'The same condition produces a controlled response, complete log context and no process instability.',
  },
  {
    id: 'request-duplication',
    category: 'backend',
    title: 'Duplicate operation from retries or repeated clicks',
    symptom: 'One intended action creates multiple records, messages or charges.',
    likelyCauses: ['No idempotency control', 'Client retries after timeout', 'Button remains active', 'Queue redelivery'],
    tests: ['Compare timestamps and request IDs', 'Repeat request with same key', 'Inspect retry and queue policy'],
    expected: 'Repeated delivery of the same logical request results in one committed operation.',
    correctiveAction: 'Introduce idempotency keys, unique constraints or deduplication at the authoritative write boundary.',
    verification: 'Simulate retries and repeated submissions and confirm a single durable result.',
  },
  {
    id: 'memory-growth',
    category: 'backend',
    title: 'Application memory grows until restart',
    symptom: 'Response time worsens over time and the process is eventually restarted or terminated.',
    likelyCauses: ['Unbounded cache', 'Listener leak', 'Large retained objects', 'Connections not released'],
    tests: ['Track heap over time', 'Compare request volume to memory', 'Inspect listeners and cache size', 'Profile allocations'],
    expected: 'Memory reaches a stable operating range under sustained representative load.',
    correctiveAction: 'Bound caches, release resources, remove retained references and add saturation alerts.',
    verification: 'Run a sustained load test and confirm stable memory with no throughput degradation.',
  },
  {
    id: 'database-unavailable',
    category: 'data',
    title: 'Database connection unavailable',
    symptom: 'Data operations fail or the service falls back because the application cannot establish a database connection.',
    likelyCauses: ['Missing connection URI', 'Network allow-list', 'Credential rotation', 'Connection pool exhaustion'],
    tests: ['Check configuration presence without printing value', 'Inspect driver error', 'Test DNS and network path', 'Review pool metrics'],
    expected: 'The application reaches the intended database with bounded connection use and clear health state.',
    correctiveAction: 'Correct environment configuration, network policy or pool management while preserving safe fallback where designed.',
    verification: 'Health reports connected state and representative create/read operations succeed.',
  },
  {
    id: 'slow-query',
    category: 'data',
    title: 'Query latency increases with dataset size',
    symptom: 'A previously fast page or API becomes slow as records accumulate.',
    likelyCauses: ['Missing index', 'Unbounded result set', 'N+1 access pattern', 'Non-selective filter'],
    tests: ['Capture execution plan', 'Measure rows examined', 'Test realistic dataset', 'Inspect pagination'],
    expected: 'Query cost remains bounded and uses the intended index at production-scale data volume.',
    correctiveAction: 'Add or adjust indexes, constrain fields and results, remove repeated queries and introduce pagination.',
    verification: 'Measure latency percentiles before and after using representative data and concurrency.',
  },
  {
    id: 'migration-drift',
    category: 'data',
    title: 'Application and database schema are out of sync',
    symptom: 'A release starts, but data operations fail because expected fields, indexes or constraints are missing.',
    likelyCauses: ['Migration not executed', 'Environment skipped a version', 'Manual schema change', 'Unsafe backward incompatibility'],
    tests: ['Compare migration history', 'Inspect schema version', 'Test old and new application compatibility'],
    expected: 'The database version matches the release plan and supports safe rollout and rollback conditions.',
    correctiveAction: 'Apply a reviewed migration sequence with backup, compatibility and rollback controls.',
    verification: 'Run migration checks and complete representative reads and writes using the deployed application version.',
  },
  {
    id: 'third-party-timeout',
    category: 'integration',
    title: 'External service delay blocks user request',
    symptom: 'A dependency becomes slow and causes the entire user operation to hang or fail.',
    likelyCauses: ['No timeout', 'Synchronous coupling', 'Unlimited retries', 'Provider degradation'],
    tests: ['Measure dependency span', 'Simulate delay', 'Inspect timeout and retry policy', 'Review fallback path'],
    expected: 'Dependency delay is bounded and the user receives a controlled result or queued continuation.',
    correctiveAction: 'Add strict timeouts, bounded retries, asynchronous processing or a circuit breaker as appropriate.',
    verification: 'Inject provider delay and confirm system latency and resource use remain controlled.',
  },
  {
    id: 'webhook-replay',
    category: 'integration',
    title: 'Webhook delivered more than once',
    symptom: 'Repeated provider events create duplicate downstream actions.',
    likelyCauses: ['No signature verification', 'No event ID storage', 'Retry acknowledgement delayed', 'Non-idempotent handler'],
    tests: ['Replay same event', 'Inspect provider event ID', 'Verify signature process', 'Measure acknowledgement timing'],
    expected: 'Authentic repeated events are acknowledged but processed exactly once logically.',
    correctiveAction: 'Verify signatures, store processed event IDs and make the handler idempotent.',
    verification: 'Replay valid and invalid events and confirm one state change with correct audit evidence.',
  },
  {
    id: 'cors-origin',
    category: 'integration',
    title: 'Browser blocks API request by origin policy',
    symptom: 'The API works from direct tools but browser requests fail with an origin or preflight error.',
    likelyCauses: ['Allowed origin missing', 'Credentials and wildcard conflict', 'Preflight method or header denied'],
    tests: ['Inspect browser preflight', 'Compare request origin', 'Review CORS configuration', 'Test credential mode'],
    expected: 'Only approved origins receive the required CORS headers and credentials are handled consistently.',
    correctiveAction: 'Define exact production origins, methods, headers and credential policy.',
    verification: 'Test approved and unapproved origins from a browser and confirm correct allow and deny behaviour.',
  },
  {
    id: 'authorization-gap',
    category: 'security',
    title: 'Protected operation lacks server authorization',
    symptom: 'A user can call an administrative or owner-only endpoint despite the interface hiding the control.',
    likelyCauses: ['Client-only permission check', 'Missing middleware', 'Object ownership not validated', 'Role mapping error'],
    tests: ['Call endpoint with lower privilege', 'Modify object identifier', 'Review route middleware', 'Run policy tests'],
    expected: 'Every protected request is denied unless identity, role and object access all satisfy policy.',
    correctiveAction: 'Enforce authorization at the server boundary and add negative tests for each role.',
    verification: 'Unauthorized users receive controlled denial while authorized users retain required access.',
  },
  {
    id: 'secret-exposure',
    category: 'security',
    title: 'Secret appears in source, log or screenshot',
    symptom: 'A credential, token or connection string is visible outside the protected secret store.',
    likelyCauses: ['Committed environment file', 'Verbose logging', 'Shared screenshot', 'Client-side environment variable'],
    tests: ['Search repository history', 'Inspect build output', 'Run secret scan', 'Review logs and support records'],
    expected: 'Secret values exist only in approved secret storage and are never delivered to the browser.',
    correctiveAction: 'Revoke and rotate the exposed secret, remove it from active history and prevent recurrence with scanning and redaction.',
    verification: 'Old credential is invalid, new credential works and scans show no remaining exposed value.',
  },
  {
    id: 'dns-tls',
    category: 'infrastructure',
    title: 'Domain or TLS prevents site access',
    symptom: 'Users cannot reach the site or receive certificate, DNS or connection errors.',
    likelyCauses: ['Incorrect DNS record', 'Certificate not issued', 'Domain not attached', 'Proxy target unhealthy'],
    tests: ['Resolve DNS', 'Inspect certificate chain and dates', 'Test platform URL', 'Review domain status'],
    expected: 'The domain resolves to the intended service and presents a valid certificate for every public hostname.',
    correctiveAction: 'Correct domain attachment, DNS and certificate configuration without changing unrelated records.',
    verification: 'Test apex and www hostnames over HTTPS from multiple networks and verify redirect policy.',
  },
  {
    id: 'resource-saturation',
    category: 'infrastructure',
    title: 'Runtime resources are saturated',
    symptom: 'The service becomes slow, restarts or rejects requests when CPU, memory, connections or storage reach limits.',
    likelyCauses: ['Insufficient capacity', 'Traffic spike', 'Leak', 'Unbounded work queue'],
    tests: ['Inspect saturation metrics', 'Correlate restarts with limits', 'Measure queue and connection depth', 'Run controlled load'],
    expected: 'The service remains inside defined capacity with backpressure and scaling before hard failure.',
    correctiveAction: 'Remove the demand source, bound queues, optimize the workload and adjust capacity based on measured need.',
    verification: 'Representative peak load completes within latency and error budgets without restart.',
  },
  {
    id: 'missing-env',
    category: 'delivery',
    title: 'Production environment variable missing',
    symptom: 'The build succeeds, but runtime health reports an unconfigured integration or startup failure.',
    likelyCauses: ['Variable not created', 'Wrong environment scope', 'Name mismatch', 'Secret removed during rotation'],
    tests: ['Check required-key presence', 'Inspect startup diagnostics', 'Compare environment checklist', 'Avoid printing values'],
    expected: 'Every required variable is present in the correct environment and validated at startup.',
    correctiveAction: 'Add the correctly named protected value and improve startup validation for future releases.',
    verification: 'Restart the deployment and confirm healthy integration state without exposing secret content.',
  },
  {
    id: 'ci-local-drift',
    category: 'delivery',
    title: 'Code works locally but fails in CI or production build',
    symptom: 'Development server runs, yet the clean automated build reports type, dependency or path errors.',
    likelyCauses: ['Uncommitted file', 'Case-sensitive path', 'Implicit local dependency', 'Different install mode'],
    tests: ['Run clean install and production build', 'Inspect git status', 'Check path casing', 'Compare runtime versions'],
    expected: 'A clean environment reproduces the same successful build from committed source.',
    correctiveAction: 'Commit required files, correct path and dependency declarations, and align supported tool versions.',
    verification: 'CI and a fresh local environment both produce the same verified artifact.',
  },
];

export const fieldCaseFiles: DigitalCaseFile[] = [
  {
    code: 'DS-CASE-01',
    title: 'Full-stack static asset deployment',
    context: 'A professional portfolio used a React frontend and Node production server on a managed web-app platform.',
    complaint: 'The page HTML loaded in production, but styles and interactive assets were missing.',
    evidence: ['Build generated assets successfully', 'Server served a different static directory', 'HTML referenced hashed files absent from that directory'],
    rootCause: 'The frontend build output and production server static path were not aligned.',
    decision: 'Create one deployment output contract and make build preparation and runtime serve the same directory.',
    verification: 'Homepage and nested routes loaded all hashed assets with correct content types after a clean deployment.',
  },
  {
    code: 'DS-CASE-02',
    title: 'Persistent contact communications pipeline',
    context: 'A public contact form required reliable storage, reference numbers and professional email status tracking.',
    complaint: 'A successful form response did not prove whether the message was stored or email delivery completed.',
    evidence: ['Storage and email were coupled', 'No durable delivery status existed', 'Provider failure could obscure message state'],
    rootCause: 'The workflow treated persistence and notification as one operation instead of separate controlled stages.',
    decision: 'Store first, return a stable reference, process email asynchronously and record delivery attempts and outcomes.',
    verification: 'Messages remained retrievable even when email failed, and delivery could be inspected and retried from the private console.',
  },
  {
    code: 'DS-CASE-03',
    title: 'Database fallback during local development',
    context: 'The production environment used managed MongoDB, while a fresh Codespace intentionally had no protected environment file.',
    complaint: 'Local health reported database disconnected and email unconfigured although the website route worked.',
    evidence: ['backend/.env absent', 'MONGODB_URI not set', 'Fallback storage enabled', 'Production secrets remained outside Git'],
    rootCause: 'The local environment did not contain production-only credentials by design.',
    decision: 'Keep safe local fallback and explicit diagnostics instead of copying production secrets into source control.',
    verification: 'Local routes and file storage worked; production health independently confirmed managed database and email configuration.',
  },
  {
    code: 'DS-CASE-04',
    title: 'Direct nested route returned 404',
    context: 'A single-page application supported public system pages through client routing.',
    complaint: 'Navigation from the homepage worked, but directly opening a nested page failed at the server.',
    evidence: ['Client route existed', 'Static index was healthy', 'Direct HTTP request reached server route resolution'],
    rootCause: 'The production server lacked a controlled fallback from unknown public routes to the SPA entry document.',
    decision: 'Serve known APIs and assets first, then return index.html for valid client-side page routes.',
    verification: 'Direct requests and browser refresh returned HTTP 200 for every public system page without intercepting API endpoints.',
  },
  {
    code: 'DS-CASE-05',
    title: 'SMTP configured but notification failed',
    context: 'A stored contact message triggered an asynchronous email notification through a managed provider.',
    complaint: 'The user received a reference, but the administrative email did not arrive.',
    evidence: ['Message existed in storage', 'Email status recorded failure', 'Provider authentication response available', 'Retry count remained bounded'],
    rootCause: 'The SMTP credential or sender configuration was invalid while the primary storage operation remained healthy.',
    decision: 'Rotate the protected credential, verify transport at startup and retain explicit delivery status with manual retry.',
    verification: 'A new message produced stored, sending and delivered states and arrived at the intended mailbox.',
  },
  {
    code: 'DS-CASE-06',
    title: 'Clean build exposed path error',
    context: 'Development behaviour appeared correct on one machine, but CI used a fresh case-sensitive environment.',
    complaint: 'The production TypeScript build could not resolve a component that existed locally.',
    evidence: ['File name casing differed from import', 'Local filesystem tolerated mismatch', 'CI started from committed files only'],
    rootCause: 'The source path contract depended on local filesystem behaviour.',
    decision: 'Correct exact casing and add clean production build verification before pull-request merge.',
    verification: 'Fresh install, TypeScript validation and Vite production build passed in CI and Codespaces.',
  },
  {
    code: 'DS-CASE-07',
    title: 'Deployment succeeded but domain was temporarily unreachable',
    context: 'A managed deployment completed while the custom domain and public TLS path were changing state.',
    complaint: 'The indexed site appeared in search, but the browser temporarily reported that it could not be reached.',
    evidence: ['Repository main was correct', 'Platform deployment state required confirmation', 'Search index retained previous page information'],
    rootCause: 'Public reachability depended on domain, DNS, TLS and platform attachment, not only source code.',
    decision: 'Separate application verification from domain verification using platform URL, deployment logs, DNS state and HTTPS tests.',
    verification: 'The custom domain loaded securely and live contact messages reached the configured mailbox.',
  },
  {
    code: 'DS-CASE-08',
    title: 'Feature delivery through controlled pull request',
    context: 'A major system page introduced new data, styles, interactions, routing, SEO and navigation.',
    complaint: 'Direct changes to main would increase deployment risk and make review difficult.',
    evidence: ['Multiple integration files changed', 'Production build required', 'Hostinger auto-deployed main', 'Rollback needed a clear release boundary'],
    rootCause: 'The change size required an isolated and traceable delivery path.',
    decision: 'Use a dedicated feature branch, local production test, commit, CI checks, squash merge and branch cleanup.',
    verification: 'The merged commit was visible on main, the feature branch was removed and production deployed the new route.',
  },
];

export const securityLayers: SecurityLayer[] = [
  {
    code: 'SEC-01',
    title: 'Identity and session control',
    threat: 'Account takeover, session theft and unauthenticated access.',
    controls: ['Strong credential policy', 'Secure cookies or bounded tokens', 'Session expiry', 'Authentication event logging'],
    verification: 'Test valid, expired, revoked and tampered sessions across protected routes.',
  },
  {
    code: 'SEC-02',
    title: 'Authorization',
    threat: 'Users acting outside their role or accessing another owner’s object.',
    controls: ['Server-side role checks', 'Object ownership validation', 'Least privilege', 'Negative permission tests'],
    verification: 'Prove denied access for every lower role and modified object identifier.',
  },
  {
    code: 'SEC-03',
    title: 'Input and output boundaries',
    threat: 'Injection, malformed data, unsafe rendering and unexpected resource use.',
    controls: ['Schema validation', 'Parameterized queries', 'Output encoding', 'Size and rate limits'],
    verification: 'Exercise malformed, oversized and adversarial inputs without unsafe execution or leakage.',
  },
  {
    code: 'SEC-04',
    title: 'Secrets and configuration',
    threat: 'Credential exposure through source, client bundles, logs or support material.',
    controls: ['Protected environment storage', 'Rotation', 'Secret scanning', 'Redacted diagnostics'],
    verification: 'Scan repository and build output, then confirm revoked values no longer authenticate.',
  },
  {
    code: 'SEC-05',
    title: 'Transport and browser policy',
    threat: 'Interception, downgrade, clickjacking, unsafe origins and content injection.',
    controls: ['HTTPS', 'HSTS', 'CSP', 'CORS allow-list', 'Frame restrictions'],
    verification: 'Inspect response headers, certificate chain and approved versus unapproved browser origins.',
  },
  {
    code: 'SEC-06',
    title: 'Data protection and recovery',
    threat: 'Loss, unauthorized disclosure, corruption and excessive retention.',
    controls: ['Data minimization', 'Encryption', 'Backups', 'Retention policy', 'Restore testing'],
    verification: 'Demonstrate access controls, deletion behaviour and successful restoration from backup.',
  },
  {
    code: 'SEC-07',
    title: 'Dependency and supply chain',
    threat: 'Vulnerable, compromised or untraceable packages and build inputs.',
    controls: ['Lockfiles', 'Automated advisories', 'Review of updates', 'Artifact checksums'],
    verification: 'Produce dependency audit, provenance and checksum evidence for the release artifact.',
  },
  {
    code: 'SEC-08',
    title: 'Monitoring and response',
    threat: 'Attack or failure continues unnoticed or cannot be reconstructed.',
    controls: ['Security event logs', 'Alert thresholds', 'Incident runbook', 'Evidence preservation'],
    verification: 'Simulate a controlled event and confirm detection, routing, response and audit trail.',
  },
];

export const engineeringStandards = [
  'Prefer the simplest architecture that satisfies the actual operating requirement.',
  'Define typed, validated and versioned contracts at every important boundary.',
  'Keep secrets outside source control, client bundles, logs and screenshots.',
  'Design failure states, timeouts, retries and recovery before production incidents occur.',
  'Treat logs, metrics, traces and health checks as part of the product architecture.',
  'Use automated builds, tests, security checks and immutable release artifacts.',
  'Measure latency, error rate, saturation, accessibility and user outcome—not only uptime.',
  'Protect data with least privilege, tested backups, migration discipline and retention rules.',
  'Make every production change traceable to a reviewed commit and reversible release decision.',
  'Document enough context that another engineer can operate, diagnose and improve the system safely.',
];

export const dataLifecycle = [
  { code: '01', title: 'Capture', detail: 'Accept only required data through validated and rate-limited interfaces.' },
  { code: '02', title: 'Classify', detail: 'Identify sensitivity, ownership, retention and access policy.' },
  { code: '03', title: 'Process', detail: 'Apply explicit business rules with traceable state transitions.' },
  { code: '04', title: 'Persist', detail: 'Store with integrity constraints, indexes and controlled transactions.' },
  { code: '05', title: 'Serve', detail: 'Retrieve through authorized, bounded and observable queries.' },
  { code: '06', title: 'Protect', detail: 'Encrypt, back up, monitor and test restoration.' },
  { code: '07', title: 'Retain', detail: 'Keep information only for a justified period and purpose.' },
  { code: '08', title: 'Delete', detail: 'Remove safely, consistently and with required audit evidence.' },
];

export const apiContract = [
  { method: 'GET', purpose: 'Read a resource without changing authoritative state.', control: 'Authorization, pagination, caching and stable response schema.' },
  { method: 'POST', purpose: 'Create a resource or start a controlled operation.', control: 'Validation, idempotency, rate limits and explicit result reference.' },
  { method: 'PATCH', purpose: 'Apply a partial change to an existing resource.', control: 'Ownership, allowed fields, version conflict and audit trail.' },
  { method: 'DELETE', purpose: 'Remove or retire a resource according to policy.', control: 'Authorization, dependency checks, retention and recoverability.' },
  { method: 'EVENT', purpose: 'Publish a state change for asynchronous consumers.', control: 'Schema version, signature, deduplication, retry and dead-letter handling.' },
];
