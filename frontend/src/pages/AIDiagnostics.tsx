import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Icon from '@/components/ui/Icon';
import {
  CommandPanel,
  MetricTile,
  ProgressRing,
  SectionHeading,
  StatusBeacon,
} from '@/components/nexus-command/NexusCommandUI';
import { diagnosticModels, type Severity } from '@/data/aiDiagnostics';
import {
  analyzeDiagnostic,
  createDiagnosticReport,
  type DiagnosticInput,
  type DiagnosticResult,
} from '@/lib/diagnosticEngine';
import '@/styles/nexus-command-system.css';
import '@/ai-diagnostics.css';

const blankInput: DiagnosticInput = {
  complaint: '',
  evidence: [],
  severity: 'medium',
  notes: '',
};

export default function AIDiagnostics() {
  const reduceMotion = useReducedMotion();
  const [modelId, setModelId] = useState(diagnosticModels[0].id);
  const [input, setInput] = useState<DiagnosticInput>(blankInput);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [copyState, setCopyState] = useState('');

  const model = useMemo(
    () => diagnosticModels.find((item) => item.id === modelId) ?? diagnosticModels[0],
    [modelId],
  );

  const primary = result?.causes[0];
  const coverage = Math.round((input.evidence.length / model.evidence.length) * 100);

  const switchModel = (id: string) => {
    setModelId(id);
    setInput(blankInput);
    setResult(null);
  };

  const toggleEvidence = (id: string) => {
    setInput((current) => ({
      ...current,
      evidence: current.evidence.includes(id)
        ? current.evidence.filter((item) => item !== id)
        : [...current.evidence, id],
    }));
  };

  const analyze = (event: FormEvent) => {
    event.preventDefault();
    setResult(analyzeDiagnostic(model, input));
    window.setTimeout(
      () =>
        document.getElementById('ai-diagnostic-results')?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
        }),
      60,
    );
  };

  const copyReport = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(createDiagnosticReport(input, result));
      setCopyState('Report copied');
    } catch {
      setCopyState('Copy unavailable');
    }
    window.setTimeout(() => setCopyState(''), 2200);
  };

  return (
    <main className="ad-page">
      <Seo
        title="AI Diagnostics | Nexus | Ecatu Ronald"
        description="Evidence-led diagnostic decision support with explainable cause ranking, test plans and report-ready technical findings."
        canonicalPath="/ai-diagnostics"
        ogType="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Nexus AI Diagnostics',
          applicationCategory: 'EngineeringApplication',
        }}
      />

      <section className="ad-hero">
        <div className="ad-grid" aria-hidden="true" />
        <div className="ad-shell ad-hero-layout">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ad-topline">
              <StatusBeacon status="online" label="Reasoning engine ready" />
              <span>Explainable · Evidence weighted · Technician controlled</span>
            </div>
            <p className="ad-overline">NEXUS / DIAGNOSTIC DOMAIN / PHASE 03</p>
            <h1>AI <em>Diagnostics</em></h1>
            <p className="ad-summary">
              Convert a complaint and confirmed evidence into ranked causes, an ordered test plan,
              verification requirements and a report-ready technical assessment.
            </p>
            <div className="ad-actions">
              <a href="#ai-diagnostic-workbench">
                Start diagnostic session <Icon name="diagnostics" />
              </a>
              <Link to="/knowledge-vault">
                Open Knowledge Vault <Icon name="arrow" />
              </Link>
            </div>
          </motion.div>

          <div className="ad-pipeline">
            <span>REASONING PIPELINE</span>
            {['Complaint', 'Evidence', 'Hypotheses', 'Tests', 'Verification'].map((item, index) => (
              <div key={item}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <strong>{item}</strong>
                <i />
              </div>
            ))}
            <small>Decision support, not automatic repair authorization.</small>
          </div>
        </div>
      </section>

      <section className="ad-section">
        <div className="ad-shell">
          <SectionHeading
            index="01"
            eyebrow="Diagnostic models"
            title="Select the system that matches the complaint."
            description="Each model uses explicit engineering evidence and shows why a cause moves up or down."
          />
          <div className="ad-models">
            {diagnosticModels.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === model.id ? 'active' : ''}
                onClick={() => switchModel(item.id)}
              >
                <span>{item.domain}</span>
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-diagnostic-workbench" className="ad-section">
        <div className="ad-shell">
          <SectionHeading
            index="02"
            eyebrow="Evidence workbench"
            title={model.title}
            description={model.summary}
          />
          <form className="ad-workbench" onSubmit={analyze}>
            <CommandPanel eyebrow="Session input" title="Complaint and operating context">
              <label className="ad-field">
                <span>Customer complaint</span>
                <textarea
                  required
                  rows={4}
                  value={input.complaint}
                  onChange={(event) =>
                    setInput((current) => ({ ...current, complaint: event.target.value }))
                  }
                  placeholder={`Example: ${model.symptoms[0]}`}
                />
              </label>

              <div className="ad-severity">
                <span>Severity</span>
                {(['low', 'medium', 'high', 'critical'] as Severity[]).map((severity) => (
                  <button
                    key={severity}
                    type="button"
                    className={input.severity === severity ? 'active' : ''}
                    onClick={() => setInput((current) => ({ ...current, severity }))}
                  >
                    {severity}
                  </button>
                ))}
              </div>

              <label className="ad-field">
                <span>Measurements, codes and notes</span>
                <textarea
                  rows={4}
                  value={input.notes}
                  onChange={(event) =>
                    setInput((current) => ({ ...current, notes: event.target.value }))
                  }
                />
              </label>
            </CommandPanel>

            <CommandPanel
              eyebrow="Observed evidence"
              title="Select only confirmed observations"
              action={<ProgressRing value={coverage} label="coverage" size={82} tone="lime" />}
            >
              <div className="ad-evidence">
                {model.evidence.map((item) => {
                  const checked = input.evidence.includes(item.id);
                  return (
                    <label key={item.id} className={checked ? 'checked' : ''}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleEvidence(item.id)}
                      />
                      <i>{checked ? '✓' : '+'}</i>
                      <strong>{item.label}</strong>
                      <small>Weight {item.weight}</small>
                    </label>
                  );
                })}
              </div>
            </CommandPanel>

            <div className="ad-run">
              <div>
                <strong>Technician remains in control</strong>
                <span>The engine ranks evidence; it does not replace testing or specifications.</span>
              </div>
              <button type="submit">
                Analyze evidence <Icon name="arrow" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {result && primary ? (
        <section id="ai-diagnostic-results" className="ad-section ad-results">
          <div className="ad-shell">
            <SectionHeading
              index="03"
              eyebrow="Explainable result"
              title="Ranked causes and verification path"
              description="Confidence is relative to the current candidate set and changes when evidence changes."
            />

            <div className="ad-metrics">
              <MetricTile
                label="Primary confidence"
                value={primary.confidence}
                unit="%"
                detail={primary.title}
              />
              <MetricTile
                label="Evidence selected"
                value={input.evidence.length}
                unit={`of ${model.evidence.length}`}
                detail="Confirmed observations"
                tone="lime"
              />
              <MetricTile
                label="Candidate causes"
                value={result.causes.length}
                detail="Preserved for comparison"
                tone="blue"
              />
            </div>

            <div className="ad-result-grid">
              <CommandPanel eyebrow="Cause ranking" title="Why each hypothesis is positioned here">
                <div className="ad-ranking">
                  {result.causes.map((cause, index) => (
                    <article key={cause.id} className={index === 0 ? 'primary' : ''}>
                      <header>
                        <b>{String(index + 1).padStart(2, '0')}</b>
                        <div>
                          <strong>{cause.title}</strong>
                          <small>{cause.confidence}% relative confidence</small>
                        </div>
                      </header>
                      <div className="ad-bar"><i style={{ width: `${cause.confidence}%` }} /></div>
                      <p>{cause.mechanism}</p>
                    </article>
                  ))}
                </div>
              </CommandPanel>

              <CommandPanel eyebrow="Next-best action" title={`Test plan for ${primary.title}`}>
                <ol className="ad-tests">
                  {primary.tests.map((test, index) => (
                    <li key={test}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {test}
                    </li>
                  ))}
                </ol>
                {result.missingEvidence.length ? (
                  <div className="ad-missing">
                    <strong>Evidence that could improve ranking</strong>
                    {result.missingEvidence.map((item) => <span key={item}>{item}</span>)}
                  </div>
                ) : null}
              </CommandPanel>
            </div>

            <div className="ad-result-grid ad-lower">
              <CommandPanel
                eyebrow="Repair verification"
                title="The fault is not closed until these checks pass"
              >
                <ul className="ad-checks">
                  {primary.verification.map((item) => (
                    <li key={item}><Icon name="check" />{item}</li>
                  ))}
                </ul>
              </CommandPanel>

              <CommandPanel
                eyebrow="Report output"
                title="Technical assessment"
                action={
                  <button className="ad-copy" type="button" onClick={copyReport}>
                    {copyState || 'Copy report'}
                  </button>
                }
              >
                <pre>{createDiagnosticReport(input, result)}</pre>
                <div className="ad-refs">
                  {primary.knowledgeRefs.map((reference) => (
                    <Link key={reference} to="/knowledge-vault">{reference}</Link>
                  ))}
                </div>
              </CommandPanel>
            </div>

            <div className="ad-warning">
              <Icon name="diagnostics" />
              <p>{result.disclaimer}</p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
