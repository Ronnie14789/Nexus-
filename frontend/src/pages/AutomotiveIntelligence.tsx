import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import ContentDisclosure from '@/components/ContentDisclosure';
import Icon from '@/components/ui/Icon';
import AutomotiveHubNav from '@/components/automotive/AutomotiveHubNav';
import { CommandPanel, MetricTile, SectionHeading, StatusBeacon } from '@/components/nexus-command/NexusCommandUI';
import {
  automotiveServiceRecords,
  serviceLibraryMetadata,
  serviceRecordTypeLabels,
  serviceSystemLabels,
  type AutomotiveServiceRecord,
  type ServiceRecordType,
  type ServiceSystem,
} from '@/data/automotiveServiceIntelligence';
import '@/styles/nexus-command-system.css';
import '@/automotive-intelligence.css';

const systems = Object.keys(serviceSystemLabels) as ServiceSystem[];
const recordTypes = Object.keys(serviceRecordTypeLabels) as ServiceRecordType[];

function createReference(record: AutomotiveServiceRecord) {
  return [
    `${record.code} — ${record.title}`,
    '',
    `System: ${serviceSystemLabels[record.system]}`,
    `Record type: ${serviceRecordTypeLabels[record.type]}`,
    `Vehicle class: ${record.vehicleClass}`,
    '',
    'COMPLAINT',
    record.complaint,
    '',
    'OPERATING CONTEXT',
    record.operatingContext,
    '',
    'OBSERVED EVIDENCE',
    ...record.evidence.map((item) => `- ${item}`),
    '',
    'ASSESSMENT',
    record.assessment,
    '',
    'TEST PLAN',
    ...record.testPlan.map((item, index) => `${index + 1}. ${item}`),
    '',
    'CORRECTIVE ACTION',
    ...record.correctiveAction.map((item) => `- ${item}`),
    '',
    'VERIFICATION',
    ...record.verification.map((item) => `- ${item}`),
    '',
    'SOURCE STATUS',
    record.sourceSummary,
    '',
    'Nexus Automotive Intelligence Centre',
    'https://ecaturonald.tech/automotive-systems/intelligence',
  ].join('\n');
}

export default function AutomotiveIntelligence() {
  const reduceMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [system, setSystem] = useState<ServiceSystem | 'all'>('all');
  const [recordType, setRecordType] = useState<ServiceRecordType | 'all'>('all');
  const [activeId, setActiveId] = useState(
    automotiveServiceRecords.find((record) =>
      initialQuery && `${record.code} ${record.title}`.toLowerCase().includes(initialQuery.toLowerCase()),
    )?.id ?? automotiveServiceRecords[0].id,
  );
  const [copyState, setCopyState] = useState('');

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return automotiveServiceRecords.filter((record) => {
      if (system !== 'all' && record.system !== system) return false;
      if (recordType !== 'all' && record.type !== recordType) return false;
      if (!clean) return true;
      return [
        record.code,
        record.title,
        serviceSystemLabels[record.system],
        serviceRecordTypeLabels[record.type],
        record.complaint,
        record.operatingContext,
        record.assessment,
        ...record.evidence,
        ...record.measurements,
        ...record.testPlan,
        ...record.correctiveAction,
        ...record.verification,
        ...record.keywords,
      ].join(' ').toLowerCase().includes(clean);
    });
  }, [query, recordType, system]);

  const activeRecord =
    automotiveServiceRecords.find((record) => record.id === activeId) ??
    filtered[0] ??
    automotiveServiceRecords[0];

  const selectRecord = (record: AutomotiveServiceRecord) => {
    setActiveId(record.id);
    setQuery(record.code);
    setSearchParams({ q: record.code });
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(createReference(activeRecord));
      setCopyState('Reference copied');
    } catch {
      setCopyState('Copy unavailable');
    }
    window.setTimeout(() => setCopyState(''), 2200);
  };

  const measuredCount = automotiveServiceRecords.filter((record) =>
    record.evidenceStatus.includes('measured'),
  ).length;
  const systemCount = new Set(automotiveServiceRecords.map((record) => record.system)).size;

  return (
    <main className="ai-page">
      <Seo
        title="Automotive Service Intelligence | Nexus | Ecatu Ronald"
        description="Search real anonymized automotive field cases, diagnostic procedures, measured evidence, repair verification and technical-report references."
        canonicalPath="/automotive-systems/intelligence"
        ogType="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Nexus Automotive Service Intelligence',
          url: 'https://ecaturonald.tech/automotive-systems/intelligence',
          description: 'An evidence-led automotive service intelligence library based on anonymized field cases.',
          dateModified: '2026-07-19',
        }}
      />

      <section className="ai-hero">
        <div className="ai-grid" aria-hidden="true" />
        <div className="ai-shell ai-hero-layout">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ai-topline">
              <StatusBeacon status="ready" label="Field intelligence indexed" />
              <span>Policy {serviceLibraryMetadata.evidencePolicyVersion} · Reviewed {serviceLibraryMetadata.lastReviewed}</span>
            </div>
            <p className="ai-overline">NEXUS / AUTOMOTIVE SYSTEMS / SERVICE INTELLIGENCE</p>
            <h1>Real field evidence.<em>Useful decisions.</em></h1>
            <p className="ai-summary">
              Search practical cases built from real workshop complaints, measurements,
              dismantling findings and verification requirements. Application-specific
              specifications are never invented.
            </p>
            <div className="ai-actions">
              <a href="#records">Search field records <Icon name="search" /></a>
              <Link to="/automotive-systems/diagnostics">Diagnose a fault <Icon name="diagnostics" /></Link>
            </div>
          </motion.div>

          <div className="ai-evidence-policy">
            <span>EVIDENCE POLICY</span>
            <strong>Observation is separated from conclusion.</strong>
            <p>
              Records distinguish measured values, field observations, service-history support
              and items that still require the correct manufacturer specification.
            </p>
            <div><i /><small>No customer names, VINs or confidential warranty identifiers are published.</small></div>
          </div>
        </div>
      </section>

      <AutomotiveHubNav />

      <ContentDisclosure page="automotive-intelligence" />

      <section className="ai-section">
        <div className="ai-shell">
          <SectionHeading
            index="01"
            eyebrow="Information architecture"
            title="Everything a technician expects to find."
            description="Search by complaint, code, component, measurement, likely mechanism, test sequence or verification requirement."
          />
          <div className="ai-find-grid">
            {[
              ['Complaint to cause', 'Move from the driver report to areas for testing.'],
              ['Fault-code context', 'Treat codes as starting evidence, not automatic parts decisions.'],
              ['Measured evidence', 'Preserve units, operating state and comparison requirements.'],
              ['Field cases', 'Learn from anonymized dismantling and inspection findings.'],
              ['Repair verification', 'Define the checks required before returning the vehicle.'],
              ['Technical reporting', 'Copy a structured reference for a professional report.'],
            ].map(([title, detail], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="records" className="ai-section ai-record-section">
        <div className="ai-shell">
          <SectionHeading
            index="02"
            eyebrow="Production field library"
            title="Search real automotive service intelligence."
            description="These records are based on field information supplied during actual technical-report and diagnostic work."
          />

          <div className="ai-metrics">
            <MetricTile label="Published field records" value={automotiveServiceRecords.length} detail="Anonymized cases and guides" />
            <MetricTile label="System groups" value={systemCount} detail="Powertrain, chassis, braking, body and electrical" tone="blue" />
            <MetricTile label="Records with measured values" value={measuredCount} detail="Units and interpretation preserved" tone="lime" />
          </div>

          <div className="ai-filter-bar">
            <label>
              <span>Search</span>
              <input
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  setQuery(value);
                  setSearchParams(value ? { q: value } : {});
                }}
                placeholder="Try 0559, 32 volts, clutch pedal, high range or air leak"
              />
            </label>
            <label>
              <span>System</span>
              <select value={system} onChange={(event) => setSystem(event.target.value as ServiceSystem | 'all')}>
                <option value="all">All systems</option>
                {systems.map((item) => <option key={item} value={item}>{serviceSystemLabels[item]}</option>)}
              </select>
            </label>
            <label>
              <span>Record type</span>
              <select value={recordType} onChange={(event) => setRecordType(event.target.value as ServiceRecordType | 'all')}>
                <option value="all">All record types</option>
                {recordTypes.map((item) => <option key={item} value={item}>{serviceRecordTypeLabels[item]}</option>)}
              </select>
            </label>
            <strong>{filtered.length} results</strong>
          </div>

          <div className="ai-library">
            <div className="ai-record-list" aria-label="Automotive service records">
              {filtered.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  className={activeRecord.id === record.id ? 'active' : ''}
                  onClick={() => selectRecord(record)}
                >
                  <span>{record.code}</span>
                  <strong>{record.title}</strong>
                  <small>{serviceSystemLabels[record.system]} · {serviceRecordTypeLabels[record.type]}</small>
                </button>
              ))}
              {!filtered.length ? <p>No matching record. Clear or change the filters.</p> : null}
            </div>

            <article className="ai-record-reader">
              <header>
                <div>
                  <span>{activeRecord.code} · {serviceSystemLabels[activeRecord.system]}</span>
                  <h2>{activeRecord.title}</h2>
                  <p>{activeRecord.vehicleClass}</p>
                </div>
                <button type="button" onClick={copyReference}>{copyState || 'Copy technical reference'}</button>
              </header>

              <div className="ai-record-summary">
                <section><small>COMPLAINT</small><p>{activeRecord.complaint}</p></section>
                <section><small>OPERATING CONTEXT</small><p>{activeRecord.operatingContext}</p></section>
              </div>

              <CommandPanel eyebrow="Observed evidence" title="What was actually recorded">
                <ul className="ai-check-list">
                  {activeRecord.evidence.map((item) => <li key={item}><Icon name="check" />{item}</li>)}
                </ul>
              </CommandPanel>

              <CommandPanel eyebrow="Measurements" title="Values and specification boundaries">
                <ul className="ai-measure-list">
                  {activeRecord.measurements.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </CommandPanel>

              <CommandPanel eyebrow="Engineering assessment" title="Evidence-based interpretation">
                <p className="ai-assessment">{activeRecord.assessment}</p>
              </CommandPanel>

              <div className="ai-plan-grid">
                <CommandPanel eyebrow="Test plan" title="Recommended diagnostic order">
                  <ol>
                    {activeRecord.testPlan.map((item, index) => (
                      <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
                    ))}
                  </ol>
                </CommandPanel>
                <CommandPanel eyebrow="Verification" title="The repair is not closed until">
                  <ul className="ai-check-list">
                    {activeRecord.verification.map((item) => <li key={item}><Icon name="check" />{item}</li>)}
                  </ul>
                </CommandPanel>
              </div>

              <div className="ai-source">
                <strong>Source status</strong>
                <p>{activeRecord.sourceSummary}</p>
                <small>Library review: {serviceLibraryMetadata.lastReviewed} · Record owner: {serviceLibraryMetadata.owner}</small>
                <div>{activeRecord.evidenceStatus.map((status) => <span key={status}>{status.replaceAll('-', ' ')}</span>)}</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="knowledge" className="ai-section ai-knowledge-section">
        <div className="ai-shell">
          <SectionHeading
            index="03"
            eyebrow="Knowledge relationship"
            title="Cases, diagnostics and engineering principles remain connected."
            description="The centre links field evidence to diagnostic reasoning and the wider cross-domain Knowledge Vault."
          />
          <div className="ai-knowledge-links">
            <Link to="/automotive-systems/diagnostics">
              <span>01</span><strong>Automotive Diagnostics</strong><p>Use confirmed evidence to rank hypotheses and produce a test plan.</p><Icon name="arrow" />
            </Link>
            <Link to="/knowledge-vault">
              <span>02</span><strong>Cross-domain Knowledge Vault</strong><p>Search electrical, digital, reporting and workshop knowledge.</p><Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section id="reporting" className="ai-section">
        <div className="ai-shell">
          <SectionHeading
            index="04"
            eyebrow="Technical reporting"
            title="A professional report separates facts, mechanism and verification."
            description="Use the copied record as a structured reference, then insert exact vehicle and repair information from the job."
          />
          <div className="ai-report-standard">
            {['Complaint', 'Inspection', 'Measurements', 'Primary failure', 'Secondary damage', 'Assessment', 'Corrective action', 'Verification'].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
