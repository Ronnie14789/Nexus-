import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import ContentDisclosure from '@/components/ContentDisclosure';
import Icon from '@/components/ui/Icon';
import {
  CommandButton,
  CommandPanel,
  MetricTile,
  ProgressRing,
  SectionHeading,
  StatusBeacon,
} from '@/components/nexus-command/NexusCommandUI';
import {
  knowledgeDomainLabels,
  knowledgeKindLabels,
  knowledgeRecords,
  knowledgeSchemaVersion,
  type EvidenceLevel,
  type KnowledgeDomain,
  type KnowledgeKind,
  type KnowledgeRecord,
} from '@/data/knowledgeVault';
import '@/styles/nexus-command-system.css';
import '@/knowledge-vault.css';

const domainOrder: KnowledgeDomain[] = [
  'automotive',
  'electrical',
  'digital',
  'reporting',
  'operations',
];

const kindOrder: KnowledgeKind[] = [
  'diagnostic',
  'procedure',
  'field-case',
  'checklist',
  'standard',
  'reference',
];

const evidenceOrder: EvidenceLevel[] = ['verified', 'field-proven', 'reference', 'developing'];

const evidenceLabel: Record<EvidenceLevel, string> = {
  verified: 'Verified',
  'field-proven': 'Field proven',
  reference: 'Reference',
  developing: 'Developing',
};

const evidenceStatus: Record<EvidenceLevel, 'ready' | 'watch' | 'planned'> = {
  verified: 'ready',
  'field-proven': 'ready',
  reference: 'watch',
  developing: 'planned',
};

const domainCode: Record<KnowledgeDomain, string> = {
  automotive: 'AUT',
  electrical: 'ELC',
  digital: 'DIG',
  reporting: 'RPT',
  operations: 'OPS',
};

const domainTone: Record<KnowledgeDomain, 'cyan' | 'blue' | 'lime' | 'amber' | 'neutral'> = {
  automotive: 'blue',
  electrical: 'cyan',
  digital: 'lime',
  reporting: 'amber',
  operations: 'neutral',
};

const savedStorageKey = 'nexus-knowledge-vault-saved';
const recentStorageKey = 'nexus-knowledge-vault-recent';

function readStorage(key: string): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

function searchableText(record: KnowledgeRecord) {
  return [
    record.code,
    record.title,
    record.system,
    record.summary,
    knowledgeDomainLabels[record.domain],
    knowledgeKindLabels[record.kind],
    ...record.keywords,
    ...record.symptoms,
    ...record.prerequisites,
    ...record.diagnosticPath.flatMap((step) => [step.title, step.detail, step.expected ?? '']),
    ...record.findings.flatMap((section) => [
      section.heading,
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
    ]),
  ].join(' ').toLowerCase();
}

function scoreRecord(record: KnowledgeRecord, query: string) {
  const clean = query.trim().toLowerCase();
  if (!clean) return 0;
  const terms = clean.split(/\s+/).filter(Boolean);
  const title = record.title.toLowerCase();
  const summary = record.summary.toLowerCase();
  const keywords = record.keywords.join(' ').toLowerCase();
  const fullText = searchableText(record);

  return terms.reduce((score, term) => {
    let next = score;
    if (record.code.toLowerCase().includes(term)) next += 20;
    if (title.includes(term)) next += 12;
    if (keywords.includes(term)) next += 8;
    if (summary.includes(term)) next += 5;
    if (fullText.includes(term)) next += 2;
    return next;
  }, 0);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-UG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function sourceTypeLabel(type: KnowledgeRecord['sources'][number]['type']) {
  return type.replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function KnowledgeVault() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<KnowledgeDomain | 'all'>('all');
  const [selectedKind, setSelectedKind] = useState<KnowledgeKind | 'all'>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceLevel | 'all'>('all');
  const [sortMode, setSortMode] = useState<'relevance' | 'evidence' | 'updated' | 'title'>('relevance');
  const [activeRecordId, setActiveRecordId] = useState(knowledgeRecords[0]?.id ?? '');
  const [savedIds, setSavedIds] = useState<string[]>(() => readStorage(savedStorageKey));
  const [recentIds, setRecentIds] = useState<string[]>(() => readStorage(recentStorageKey));
  const [savedOnly, setSavedOnly] = useState(false);
  const [copyState, setCopyState] = useState('');
  const [mobileReaderOpen, setMobileReaderOpen] = useState(false);

  const domainCounts = useMemo(() => {
    return domainOrder.reduce<Record<KnowledgeDomain, number>>((counts, domain) => {
      counts[domain] = knowledgeRecords.filter((record) => record.domain === domain).length;
      return counts;
    }, {
      automotive: 0,
      electrical: 0,
      digital: 0,
      reporting: 0,
      operations: 0,
    });
  }, []);

  const filteredRecords = useMemo(() => {
    const scored = knowledgeRecords
      .map((record) => ({ record, score: scoreRecord(record, query) }))
      .filter(({ record, score }) => {
        if (query.trim() && score === 0) return false;
        if (selectedDomain !== 'all' && record.domain !== selectedDomain) return false;
        if (selectedKind !== 'all' && record.kind !== selectedKind) return false;
        if (selectedEvidence !== 'all' && record.evidence !== selectedEvidence) return false;
        if (savedOnly && !savedIds.includes(record.id)) return false;
        return true;
      });

    return scored
      .sort((left, right) => {
        if (sortMode === 'relevance' && query.trim()) return right.score - left.score;
        if (sortMode === 'evidence') {
          return evidenceOrder.indexOf(left.record.evidence) - evidenceOrder.indexOf(right.record.evidence);
        }
        if (sortMode === 'updated') return right.record.updated.localeCompare(left.record.updated);
        if (sortMode === 'title') return left.record.title.localeCompare(right.record.title);
        const evidenceDifference = evidenceOrder.indexOf(left.record.evidence) - evidenceOrder.indexOf(right.record.evidence);
        return evidenceDifference || right.record.updated.localeCompare(left.record.updated);
      })
      .map(({ record }) => record);
  }, [query, savedIds, savedOnly, selectedDomain, selectedEvidence, selectedKind, sortMode]);

  const activeRecord = useMemo(
    () => knowledgeRecords.find((record) => record.id === activeRecordId) ?? filteredRecords[0] ?? knowledgeRecords[0],
    [activeRecordId, filteredRecords],
  );

  const relatedRecords = useMemo(() => {
    if (!activeRecord) return [];
    return activeRecord.relatedIds
      .map((id) => knowledgeRecords.find((record) => record.id === id))
      .filter((record): record is KnowledgeRecord => Boolean(record));
  }, [activeRecord]);

  const recentRecords = useMemo(
    () => recentIds
      .map((id) => knowledgeRecords.find((record) => record.id === id))
      .filter((record): record is KnowledgeRecord => Boolean(record))
      .slice(0, 5),
    [recentIds],
  );

  const verifiedCount = knowledgeRecords.filter(
    (record) => record.evidence === 'verified' || record.evidence === 'field-proven',
  ).length;
  const traceableCount = knowledgeRecords.filter(
    (record) => record.sources.length > 0 && record.verification.length > 0,
  ).length;
  const traceabilityCoverage = Math.round((traceableCount / knowledgeRecords.length) * 100);
  const linkedRecords = knowledgeRecords.filter((record) => record.relatedIds.length > 0).length;

  useEffect(() => {
    if (!filteredRecords.length) return;
    if (!filteredRecords.some((record) => record.id === activeRecordId)) {
      setActiveRecordId(filteredRecords[0].id);
    }
  }, [activeRecordId, filteredRecords]);

  useEffect(() => {
    window.localStorage.setItem(savedStorageKey, JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    window.localStorage.setItem(recentStorageKey, JSON.stringify(recentIds));
  }, [recentIds]);

  const selectRecord = (record: KnowledgeRecord, openReader = false) => {
    setActiveRecordId(record.id);
    setRecentIds((current) => [record.id, ...current.filter((id) => id !== record.id)].slice(0, 8));
    if (openReader) setMobileReaderOpen(true);
  };

  const toggleSaved = (recordId: string) => {
    setSavedIds((current) =>
      current.includes(recordId)
        ? current.filter((id) => id !== recordId)
        : [recordId, ...current],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedDomain('all');
    setSelectedKind('all');
    setSelectedEvidence('all');
    setSavedOnly(false);
    setSortMode('relevance');
  };

  const copyReference = async () => {
    if (!activeRecord) return;
    const text = [
      `${activeRecord.code} — ${activeRecord.title}`,
      `${knowledgeKindLabels[activeRecord.kind]} · ${knowledgeDomainLabels[activeRecord.domain]}`,
      `Evidence class: ${evidenceLabel[activeRecord.evidence]} · Updated: ${formatDate(activeRecord.updated)}`,
      '',
      activeRecord.summary,
      '',
      'Diagnostic path:',
      ...activeRecord.diagnosticPath.map((step, index) => `${index + 1}. ${step.title}: ${step.detail}`),
      '',
      'Verification:',
      ...activeRecord.verification.map((item) => `- ${item}`),
      '',
      'Nexus Engineering Knowledge Vault',
      'https://ecaturonald.tech/knowledge-vault',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopyState('Reference copied');
    } catch {
      setCopyState('Copy unavailable');
    }
    window.setTimeout(() => setCopyState(''), 2200);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nexus Engineering Knowledge Vault',
    url: 'https://ecaturonald.tech/knowledge-vault',
    description:
      'A searchable engineering knowledge system for diagnostics, procedures, field cases, technical reporting and workshop verification.',
    dateModified: '2026-07-19',
    about: domainOrder.map((domain) => knowledgeDomainLabels[domain]),
    hasPart: knowledgeRecords.map((record) => ({
      '@type': 'TechArticle',
      headline: record.title,
      identifier: record.code,
      articleSection: knowledgeDomainLabels[record.domain],
      description: record.summary,
      dateModified: record.updated,
    })),
  };

  return (
    <main className="kv-page">
      <Seo
        title="Engineering Knowledge Vault | Nexus | Ecatu Ronald"
        description="Search evidence-led engineering procedures, field cases, diagnostics, reporting standards and workshop verification knowledge in the Nexus Engineering Knowledge Vault."
        canonicalPath="/knowledge-vault"
        ogType="website"
        jsonLd={jsonLd}
      />

      <section className="kv-hero" aria-labelledby="kv-title">
        <div className="kv-grid" aria-hidden="true" />
        <div className="kv-orbit kv-orbit-a" aria-hidden="true" />
        <div className="kv-orbit kv-orbit-b" aria-hidden="true" />
        <div className="kv-shell kv-hero-layout">
          <motion.div
            className="kv-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="kv-topline">
              <StatusBeacon status="ready" label="Vault indexed" />
              <span>Schema {knowledgeSchemaVersion} · Evidence-first engineering</span>
            </div>
            <p className="kv-overline">NEXUS / KNOWLEDGE DOMAIN / PHASE 02</p>
            <h1 id="kv-title">
              Engineering
              <em>Knowledge Vault</em>
            </h1>
            <p className="kv-hero-summary">
              A traceable system for turning field evidence, diagnostic logic, procedures and verification standards into reusable engineering intelligence.
            </p>
            <div className="kv-hero-actions">
              <CommandButton onClick={() => document.getElementById('vault-search')?.focus()}>
                <Icon name="search" /> Search the vault
              </CommandButton>
              <CommandButton href="/executive-intelligence" tone="blue" variant="outline">
                Executive Intelligence <Icon name="arrow" />
              </CommandButton>
            </div>
          </motion.div>

          <motion.div
            className="kv-hero-map nc-panel"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="kv-map-head">
              <div><small>KNOWLEDGE GRAPH</small><strong>Evidence → Decision → Verification</strong></div>
              <StatusBeacon status="ready" compact label={`${linkedRecords} linked`} />
            </div>
            <div className="kv-map-stage" aria-label="Knowledge domain map">
              <div className="kv-map-core"><span>NX</span><strong>VAULT</strong><small>{knowledgeRecords.length} records</small></div>
              {domainOrder.map((domain, index) => (
                <button
                  key={domain}
                  type="button"
                  className={`kv-map-node kv-map-node-${index + 1} ${selectedDomain === domain ? 'active' : ''}`}
                  onClick={() => setSelectedDomain((current) => current === domain ? 'all' : domain)}
                >
                  <span>{domainCode[domain]}</span>
                  <strong>{domainCounts[domain]}</strong>
                  <small>{knowledgeDomainLabels[domain]}</small>
                </button>
              ))}
              <i className="kv-map-ring kv-map-ring-a" />
              <i className="kv-map-ring kv-map-ring-b" />
            </div>
            <div className="kv-map-foot">
              <span><i /> Searchable</span>
              <span><i /> Evidence-labelled</span>
              <span><i /> Cross-linked</span>
              <span><i /> Versioned</span>
            </div>
          </motion.div>
        </div>
      </section>

      <ContentDisclosure page="knowledge" />

      <section className="kv-section kv-overview" aria-labelledby="kv-overview-title">
        <div className="kv-shell">
          <SectionHeading
            index="01"
            eyebrow="Vault pulse"
            title="Knowledge that shows how it is supported."
            description="Every record exposes domain, type, evidence class, revision date, source class and verification criteria without invented numerical certainty."
          />
          <div className="kv-metrics" id="kv-overview-title">
            <MetricTile label="Indexed records" value={knowledgeRecords.length} unit="records" detail="Curated procedures, cases, standards and diagnostic guides." tone="cyan" />
            <MetricTile label="High-trust evidence" value={verifiedCount} unit="records" detail="Verified or field-proven knowledge with visible evidence classification." tone="lime" />
            <MetricTile label="Knowledge domains" value={domainOrder.length} unit="domains" detail="Automotive, electrical, digital, reporting and operations." tone="blue" />
            <MetricTile label="Saved locally" value={savedIds.length} unit="items" detail="Private browser bookmarks with no account or tracking requirement." tone="amber" />
          </div>
          <div className="kv-integrity-strip nc-panel">
            <ProgressRing value={traceabilityCoverage} label="traceable" size={124} tone="cyan" />
            <div>
              <span>TRUST MODEL</span>
              <h2>Observation is not the same as conclusion.</h2>
              <p>
                Nexus labels field observations, test results, service records and engineering principles separately so the reader can see how each conclusion is supported.
              </p>
            </div>
            <div className="kv-integrity-stats">
              <div><strong>{linkedRecords}</strong><span>records linked</span></div>
              <div><strong>{knowledgeRecords.reduce((total, record) => total + record.sources.length, 0)}</strong><span>evidence sources</span></div>
              <div><strong>{knowledgeRecords.reduce((total, record) => total + record.verification.length, 0)}</strong><span>verification checks</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="kv-section kv-workspace" aria-labelledby="kv-workspace-title">
        <div className="kv-shell">
          <SectionHeading
            index="02"
            eyebrow="Search workspace"
            title="Find the evidence, not only the keyword."
            description="Search titles, symptoms, components, diagnostic steps, findings and verification criteria with domain and trust filters."
          />

          <CommandPanel className="kv-search-panel" ariaLabel="Knowledge Vault search and filters">
            <div className="kv-search-row">
              <div className="kv-search-box">
                <Icon name="search" />
                <input
                  id="vault-search"
                  value={query}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                  placeholder="Search a symptom, component, fault, procedure or report standard…"
                  aria-label="Search Engineering Knowledge Vault"
                />
                {query ? <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="x" /></button> : <kbd>TYPE</kbd>}
              </div>
              <button
                type="button"
                className={`kv-saved-toggle ${savedOnly ? 'active' : ''}`}
                onClick={() => setSavedOnly((current) => !current)}
                aria-pressed={savedOnly}
              >
                <Icon name="report" /> Saved <span>{savedIds.length}</span>
              </button>
            </div>

            <div className="kv-filter-row">
              <label>
                <span>Domain</span>
                <select value={selectedDomain} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedDomain(event.target.value as KnowledgeDomain | 'all')}>
                  <option value="all">All domains</option>
                  {domainOrder.map((domain) => <option key={domain} value={domain}>{knowledgeDomainLabels[domain]} ({domainCounts[domain]})</option>)}
                </select>
              </label>
              <label>
                <span>Knowledge type</span>
                <select value={selectedKind} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedKind(event.target.value as KnowledgeKind | 'all')}>
                  <option value="all">All types</option>
                  {kindOrder.map((kind) => <option key={kind} value={kind}>{knowledgeKindLabels[kind]}</option>)}
                </select>
              </label>
              <label>
                <span>Evidence</span>
                <select value={selectedEvidence} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedEvidence(event.target.value as EvidenceLevel | 'all')}>
                  <option value="all">All evidence levels</option>
                  {evidenceOrder.map((evidence) => <option key={evidence} value={evidence}>{evidenceLabel[evidence]}</option>)}
                </select>
              </label>
              <label>
                <span>Sort</span>
                <select value={sortMode} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSortMode(event.target.value as typeof sortMode)}>
                  <option value="relevance">Relevance</option>
                  <option value="evidence">Evidence strength</option>
                  <option value="updated">Recently updated</option>
                  <option value="title">Title A–Z</option>
                </select>
              </label>
              <button type="button" className="kv-clear-filters" onClick={clearFilters}>Reset filters</button>
            </div>
          </CommandPanel>

          <div className="kv-workspace-grid">
            <div className="kv-results-column">
              <div className="kv-results-head">
                <div><span>INDEX RESULTS</span><strong>{filteredRecords.length} records</strong></div>
                <small>{query ? `Search: “${query}”` : 'Curated engineering index'}</small>
              </div>

              <div className="kv-results-list" aria-live="polite">
                <AnimatePresence mode="popLayout">
                  {filteredRecords.map((record, index) => (
                    <motion.article
                      layout
                      key={record.id}
                      className={`kv-result-card ${record.id === activeRecord?.id ? 'active' : ''}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.15) }}
                    >
                      <button type="button" className="kv-result-main" onClick={() => selectRecord(record, true)}>
                        <div className="kv-result-meta">
                          <span>{record.code}</span>
                          <StatusBeacon status={evidenceStatus[record.evidence]} compact label={evidenceLabel[record.evidence]} />
                        </div>
                        <h3>{record.title}</h3>
                        <p>{record.summary}</p>
                        <div className="kv-result-tags">
                          <span>{knowledgeDomainLabels[record.domain]}</span>
                          <span>{knowledgeKindLabels[record.kind]}</span>
                          <span>{record.system}</span>
                        </div>
                        <div className="kv-result-foot">
                          <span>{evidenceLabel[record.evidence]} evidence</span>
                          <span>{record.readMinutes} min read</span>
                          <span>Updated {formatDate(record.updated)}</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`kv-save-button ${savedIds.includes(record.id) ? 'active' : ''}`}
                        onClick={() => toggleSaved(record.id)}
                        aria-label={savedIds.includes(record.id) ? `Remove ${record.title} from saved` : `Save ${record.title}`}
                        aria-pressed={savedIds.includes(record.id)}
                      >
                        <Icon name={savedIds.includes(record.id) ? 'check' : 'report'} />
                      </button>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {!filteredRecords.length ? (
                  <div className="kv-empty-state">
                    <Icon name="search" />
                    <h3>No record matched this search.</h3>
                    <p>Reset one or more filters, or try a symptom, component, fault code or system name.</p>
                    <CommandButton onClick={clearFilters} variant="outline">Reset the workspace</CommandButton>
                  </div>
                ) : null}
              </div>
            </div>

            {activeRecord ? (
              <aside className="kv-reader-column" aria-label="Selected knowledge record">
                <KnowledgeReader
                  record={activeRecord}
                  relatedRecords={relatedRecords}
                  saved={savedIds.includes(activeRecord.id)}
                  copyState={copyState}
                  onToggleSaved={() => toggleSaved(activeRecord.id)}
                  onCopy={() => void copyReference()}
                  onSelectRelated={(record) => selectRecord(record)}
                />
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <section className="kv-section kv-taxonomy" aria-labelledby="kv-taxonomy-title">
        <div className="kv-shell">
          <SectionHeading
            index="03"
            eyebrow="Knowledge architecture"
            title="A system designed to grow without becoming a document dump."
            description="The vault organizes knowledge by domain, type, evidence, system, symptom, relationship and verification state."
          />
          <div className="kv-domain-grid" id="kv-taxonomy-title">
            {domainOrder.map((domain, index) => (
              <button
                key={domain}
                type="button"
                className={`kv-domain-card nc-tone-${domainTone[domain]}`}
                onClick={() => {
                  setSelectedDomain(domain);
                  document.getElementById('vault-search')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
                }}
              >
                <span>{String(index + 1).padStart(2, '0')} / {domainCode[domain]}</span>
                <strong>{knowledgeDomainLabels[domain]}</strong>
                <p>{domainCounts[domain]} indexed records with cross-domain links and evidence labels.</p>
                <i><Icon name="arrow" /></i>
              </button>
            ))}
          </div>

          <div className="kv-trust-grid">
            {evidenceOrder.map((evidence) => {
              const count = knowledgeRecords.filter((record) => record.evidence === evidence).length;
              const share = Math.round((count / knowledgeRecords.length) * 100);
              return (
                <CommandPanel key={evidence} eyebrow="EVIDENCE CLASS" title={evidenceLabel[evidence]}>
                  <div className="kv-trust-card">
                    <ProgressRing value={share} label="index share" size={100} tone={evidence === 'verified' ? 'lime' : evidence === 'field-proven' ? 'cyan' : evidence === 'reference' ? 'blue' : 'amber'} />
                    <div><strong>{count}</strong><span>records</span><p>{evidence === 'verified' ? 'Validated through direct test or automated verification.' : evidence === 'field-proven' ? 'Supported by documented field observations and outcomes.' : evidence === 'reference' ? 'Built from established engineering principles and practice.' : 'Useful working knowledge awaiting stronger confirmation.'}</p></div>
                  </div>
                </CommandPanel>
              );
            })}
          </div>
        </div>
      </section>

      <section className="kv-section kv-recent" aria-labelledby="kv-recent-title">
        <div className="kv-shell">
          <SectionHeading
            index="04"
            eyebrow="Personal working set"
            title="Continue from where you stopped."
            description="Recent records and saved items stay in this browser. No login is required, and no private workshop data is uploaded."
          />
          <div className="kv-personal-grid" id="kv-recent-title">
            <CommandPanel eyebrow="RECENTLY OPENED" title={recentRecords.length ? `${recentRecords.length} records` : 'No recent records'}>
              <div className="kv-mini-list">
                {recentRecords.map((record) => (
                  <button key={record.id} type="button" onClick={() => selectRecord(record, true)}>
                    <span>{record.code}</span><div><strong>{record.title}</strong><small>{record.system}</small></div><Icon name="arrow" />
                  </button>
                ))}
                {!recentRecords.length ? <p>Open a knowledge record to begin a private recent-history list.</p> : null}
              </div>
            </CommandPanel>
            <CommandPanel eyebrow="SAVED KNOWLEDGE" title={`${savedIds.length} private bookmarks`}>
              <div className="kv-mini-list">
                {savedIds.slice(0, 5).map((id) => knowledgeRecords.find((record) => record.id === id)).filter((record): record is KnowledgeRecord => Boolean(record)).map((record) => (
                  <button key={record.id} type="button" onClick={() => selectRecord(record, true)}>
                    <span>{record.code}</span><div><strong>{record.title}</strong><small>{evidenceLabel[record.evidence]}</small></div><Icon name="arrow" />
                  </button>
                ))}
                {!savedIds.length ? <p>Save important procedures, field cases and standards for faster access.</p> : null}
              </div>
            </CommandPanel>
            <CommandPanel eyebrow="NEXT INTELLIGENCE LAYER" title="AI Diagnostics foundation">
              <div className="kv-next-layer">
                <StatusBeacon status="planned" label="Phase 03" />
                <p>
                  The next module will use the vault’s symptoms, evidence classes, diagnostic paths, verification rules and relationships as structured reasoning inputs.
                </p>
                <Link to="/executive-intelligence">Open the Nexus roadmap <Icon name="arrow" /></Link>
              </div>
            </CommandPanel>
          </div>
        </div>
      </section>

      <section className="kv-final">
        <div className="kv-shell kv-final-grid">
          <div>
            <p>NEXUS KNOWLEDGE STANDARD</p>
            <h2>Searchable. Traceable. Reusable. Honest about uncertainty.</h2>
          </div>
          <div>
            <p>
              The vault begins with a curated, version-controlled public knowledge index. Future releases can add authenticated contribution, review workflows, document ingestion and AI-assisted retrieval without changing the core evidence model.
            </p>
            <div className="kv-final-actions">
              <CommandButton onClick={() => document.getElementById('vault-search')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}>Search records <Icon name="search" /></CommandButton>
              <CommandButton href="/executive-intelligence" tone="blue" variant="outline">Mission control <Icon name="arrow" /></CommandButton>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileReaderOpen && activeRecord ? (
          <motion.div
            className="kv-mobile-reader-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setMobileReaderOpen(false)}
          >
            <motion.div
              className="kv-mobile-reader"
              initial={reduceMotion ? false : { y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => event.stopPropagation()}
            >
              <button type="button" className="kv-mobile-close" onClick={() => setMobileReaderOpen(false)}><Icon name="x" /> Close record</button>
              <KnowledgeReader
                record={activeRecord}
                relatedRecords={relatedRecords}
                saved={savedIds.includes(activeRecord.id)}
                copyState={copyState}
                onToggleSaved={() => toggleSaved(activeRecord.id)}
                onCopy={() => void copyReference()}
                onSelectRelated={(record) => selectRecord(record)}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

interface KnowledgeReaderProps {
  record: KnowledgeRecord;
  relatedRecords: KnowledgeRecord[];
  saved: boolean;
  copyState: string;
  onToggleSaved: () => void;
  onCopy: () => void;
  onSelectRelated: (record: KnowledgeRecord) => void;
}

function KnowledgeReader({
  record,
  relatedRecords,
  saved,
  copyState,
  onToggleSaved,
  onCopy,
  onSelectRelated,
}: KnowledgeReaderProps) {
  return (
    <article className="kv-reader nc-panel">
      <header className="kv-reader-head">
        <div className="kv-reader-code"><span>{record.code}</span><StatusBeacon status={evidenceStatus[record.evidence]} compact label={evidenceLabel[record.evidence]} /></div>
        <h2>{record.title}</h2>
        <p>{record.summary}</p>
        <div className="kv-reader-meta">
          <span>{knowledgeDomainLabels[record.domain]}</span>
          <span>{knowledgeKindLabels[record.kind]}</span>
          <span>{record.difficulty}</span>
          <span>{record.readMinutes} min</span>
        </div>
        <div className="kv-reader-actions">
          <button type="button" className={saved ? 'active' : ''} onClick={onToggleSaved}><Icon name={saved ? 'check' : 'report'} />{saved ? 'Saved' : 'Save'}</button>
          <button type="button" onClick={onCopy}><Icon name="copy" />{copyState || 'Copy reference'}</button>
        </div>
      </header>

      <div className="kv-reader-evidence">
        <div className="kv-reader-evidence-mark">
          <StatusBeacon status={evidenceStatus[record.evidence]} label={evidenceLabel[record.evidence]} />
          <small>{record.sources.length} source {record.sources.length === 1 ? 'class' : 'classes'}</small>
        </div>
        <div>
          <span>SYSTEM</span>
          <strong>{record.system}</strong>
          <small>Updated {formatDate(record.updated)} · {record.status}</small>
        </div>
      </div>

      <ReaderSection index="01" title="Symptoms and entry conditions">
        <ul className="kv-check-list">{record.symptoms.map((item) => <li key={item}><Icon name="diagnostics" />{item}</li>)}</ul>
      </ReaderSection>

      <ReaderSection index="02" title="Prerequisites">
        <ul className="kv-check-list is-neutral">{record.prerequisites.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
      </ReaderSection>

      <ReaderSection index="03" title="Evidence-led diagnostic path">
        <ol className="kv-path-list">
          {record.diagnosticPath.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{step.title}</strong><p>{step.detail}</p>{step.expected ? <small>EXPECTED / {step.expected}</small> : null}</div>
            </li>
          ))}
        </ol>
      </ReaderSection>

      <ReaderSection index="04" title="Findings and decision notes">
        <div className="kv-finding-list">
          {record.findings.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </ReaderSection>

      <ReaderSection index="05" title="Verification before closure">
        <ul className="kv-check-list is-success">{record.verification.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
      </ReaderSection>

      <ReaderSection index="06" title="Safety and evidence boundaries">
        <ul className="kv-safety-list">{record.safety.map((item) => <li key={item}><span>!</span>{item}</li>)}</ul>
      </ReaderSection>

      <ReaderSection index="07" title="Evidence sources">
        <div className="kv-source-list">
          {record.sources.map((source) => (
            <div key={`${source.label}-${source.type}`}><span>{sourceTypeLabel(source.type)}</span><strong>{source.label}</strong></div>
          ))}
        </div>
      </ReaderSection>

      {relatedRecords.length ? (
        <ReaderSection index="08" title="Related knowledge">
          <div className="kv-related-list">
            {relatedRecords.map((related) => (
              <button key={related.id} type="button" onClick={() => onSelectRelated(related)}>
                <span>{related.code}</span><strong>{related.title}</strong><Icon name="arrow" />
              </button>
            ))}
          </div>
        </ReaderSection>
      ) : null}
    </article>
  );
}

function ReaderSection({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="kv-reader-section">
      <header><span>{index}</span><h3>{title}</h3></header>
      {children}
    </section>
  );
}
