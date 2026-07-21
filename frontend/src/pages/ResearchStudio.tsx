import { useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import ContentDisclosure from '@/components/ContentDisclosure';
import Seo from '@/components/Seo';
import ResearchDiagram from '@/components/research/ResearchDiagram';
import Icon from '@/components/ui/Icon';
import api from '@/lib/api';
import {
  assistantSuggestions,
  audienceProfiles,
  diyProjects,
  getResearchSource,
  researchPaths,
  researchSources,
  researchTopics,
  type ResearchAudience,
  type ResearchDomain,
  type ResearchMode,
} from '@/data/researchStudio';
import '@/research-studio.css';

interface AnswerSource {
  title: string;
  url: string;
}

interface ResearchResponse {
  success: boolean;
  mode: 'web' | 'model' | 'local' | 'safety';
  answer: string;
  sources: AnswerSource[];
  related?: string[];
  degraded?: boolean;
  message?: string;
}

interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: AnswerSource[];
  mode?: ResearchResponse['mode'];
  degraded?: boolean;
}

const domainOptions: Array<{ id: ResearchDomain; label: string; detail: string }> = [
  { id: 'all', label: 'All fields', detail: 'Connect power, motion and intelligence' },
  { id: 'electrical', label: 'Electrical', detail: 'Power, protection and measurement' },
  { id: 'automotive', label: 'Automotive', detail: 'Vehicles, controls and diagnosis' },
  { id: 'digital', label: 'Digital', detail: 'Software, data and operations' },
];

const modeOptions: Array<{ id: ResearchMode; label: string; detail: string }> = [
  { id: 'explain', label: 'Explain', detail: 'Build understanding clearly' },
  { id: 'research', label: 'Research', detail: 'Evidence, sources and limits' },
  { id: 'project', label: 'Project', detail: 'Plan a safe learning activity' },
  { id: 'compare', label: 'Compare', detail: 'Study similarities and differences' },
];

const initialMessage: ConversationMessage = {
  id: 'welcome',
  role: 'assistant',
  mode: 'local',
  content: 'Welcome to Nexus Research Assistant. Choose your audience, field and answer mode, then ask one clear question. I will use the curated Nexus library and, when the research service is configured, current web sources with visible citations.',
};

const domainLabel = (domain: ResearchDomain) =>
  domainOptions.find((item) => item.id === domain)?.label ?? 'All fields';

const modePresentation: Record<ResearchResponse['mode'], { label: string; detail: string }> = {
  web: { label: 'LIVE WEB SOURCES', detail: 'Current research with cited pages' },
  model: { label: 'RESEARCH MODEL', detail: 'Model answer without live web search' },
  local: { label: 'CURATED NEXUS LIBRARY', detail: 'Reviewed local learning index' },
  safety: { label: 'SAFE LEARNING BOUNDARY', detail: 'Principles and supervised alternatives' },
};

function MessageText({ content }: { content: string }) {
  return (
    <div className="rs-message-text">
      {content.split('\n').map((line, index) =>
        line.trim() ? <p key={`${line.slice(0, 20)}-${index}`}>{line}</p> : <span key={`space-${index}`} aria-hidden="true" />,
      )}
    </div>
  );
}

export default function ResearchStudio() {
  const [audience, setAudience] = useState<ResearchAudience>('student');
  const [domain, setDomain] = useState<ResearchDomain>('all');
  const [mode, setMode] = useState<ResearchMode>('explain');
  const [useWeb, setUseWeb] = useState(true);
  const [query, setQuery] = useState('');
  const [topicQuery, setTopicQuery] = useState('');
  const [topicDomain, setTopicDomain] = useState<ResearchDomain>('all');
  const [projectDomain, setProjectDomain] = useState<ResearchDomain>('all');
  const [activeProjectId, setActiveProjectId] = useState(diyProjects[0].id);
  const [messages, setMessages] = useState<ConversationMessage[]>([initialMessage]);
  const [related, setRelated] = useState<string[]>(assistantSuggestions.slice(0, 4));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const assistantRef = useRef<HTMLElement>(null);

  const activeAudience = audienceProfiles.find((item) => item.id === audience) ?? audienceProfiles[0];
  const filteredProjects = useMemo(
    () => diyProjects.filter((project) => projectDomain === 'all' || project.domain === projectDomain),
    [projectDomain],
  );
  const activeProject = diyProjects.find((project) => project.id === activeProjectId) ?? filteredProjects[0] ?? diyProjects[0];
  const filteredTopics = useMemo(() => {
    const clean = topicQuery.trim().toLowerCase();
    return researchTopics.filter((topic) => {
      if (topicDomain !== 'all' && topic.domain !== topicDomain) return false;
      if (!clean) return true;
      return [topic.title, topic.summary, topic.level, ...topic.concepts].join(' ').toLowerCase().includes(clean);
    });
  }, [topicDomain, topicQuery]);

  const scrollToAssistant = (prompt?: string) => {
    if (prompt) setQuery(prompt);
    assistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectProjectDomain = (nextDomain: ResearchDomain) => {
    setProjectDomain(nextDomain);
    const first = diyProjects.find((project) => nextDomain === 'all' || project.domain === nextDomain);
    if (first) setActiveProjectId(first.id);
  };

  const askQuestion = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = query.trim();
    if (loading) return;
    if (question.length < 3) {
      setError('Please ask a question using at least 3 characters.');
      return;
    }

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
    };
    const history = messages
      .filter((message) => message.id !== 'welcome')
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.content }));

    setMessages((current) => [...current, userMessage]);
    setQuery('');
    setError('');
    setLoading(true);

    try {
      const response = await api.post<ResearchResponse>('/research/ask', {
        question,
        audience,
        domain,
        mode,
        useWeb,
        history,
      }, { timeout: 55_000 });
      const answer = response.data;
      if (!answer.success) throw new Error(answer.message || 'The research request could not be completed.');
      setMessages((current) => [...current, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: answer.answer,
        sources: answer.sources,
        mode: answer.mode,
        degraded: answer.degraded,
      }]);
      setRelated(answer.related?.length ? answer.related : assistantSuggestions.slice(0, 4));
    } catch (requestError: unknown) {
      const apiError = requestError as { response?: { data?: { message?: string } }; message?: string };
      setError(apiError.response?.data?.message || apiError.message || 'The assistant is unavailable. Please use the concept atlas and source library while the connection is restored.');
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([initialMessage]);
    setRelated(assistantSuggestions.slice(0, 4));
    setQuery('');
    setError('');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nexus Research Studio',
    description: 'Evidence-led learning, safe projects, technical diagrams and research assistance for electrical, automotive and digital systems.',
    url: 'https://ecaturonald.tech/research-studio',
    about: ['Electrical engineering', 'Automotive engineering', 'Digital systems'],
    audience: audienceProfiles.map((profile) => ({ '@type': 'Audience', audienceType: profile.label })),
  };

  return (
    <main className="rs-page">
      <Seo
        title="Nexus Research Studio | Electrical, Automotive & Digital Learning"
        description="Explore evidence-led learning paths, safe DIY projects, engineering diagrams, authoritative sources and research assistance across electrical, automotive and digital systems."
        canonicalPath="/research-studio"
        ogType="website"
        jsonLd={jsonLd}
      />

      <section className="rs-hero" aria-labelledby="rs-title">
        <div className="rs-hero-grid" aria-hidden="true" />
        <div className="rs-hero-orbit" aria-hidden="true"><i /><i /><i /><span>NX</span></div>
        <div className="rs-shell rs-hero-layout">
          <div className="rs-hero-copy">
            <p className="rs-eyebrow"><span>NX / 03</span> Research and learning system</p>
            <h1 id="rs-title">Understand the system.<br /><em>Trace the evidence.</em></h1>
            <p className="rs-hero-lead">One focused learning space for electrical power, automotive motion and digital intelligence—built for students, teachers, researchers and practitioners.</p>
            <div className="rs-hero-actions">
              <button type="button" className="rs-button rs-button-primary" onClick={() => scrollToAssistant()}>
                Ask the research assistant <Icon name="arrow" />
              </button>
              <a className="rs-button rs-button-ghost" href="#projects">Explore safe projects <Icon name="workshop" /></a>
            </div>
            <div className="rs-hero-proof">
              <div><strong>3</strong><span>connected fields</span></div>
              <div><strong>{researchTopics.length}</strong><span>concept maps</span></div>
              <div><strong>{diyProjects.length}</strong><span>safe guided projects</span></div>
              <div><strong>{researchSources.length}</strong><span>authority links</span></div>
            </div>
          </div>
          <div className="rs-hero-console" aria-label="Research Studio overview">
            <header><span><i /> NEXUS RESEARCH STUDIO</span><small>POWER · MOTION · INTELLIGENCE</small></header>
            <div className="rs-console-question">
              <small>RESEARCH QUESTION</small>
              <strong>What do we know, how do we know it, and where are the limits?</strong>
            </div>
            <div className="rs-console-path">
              {researchPaths.map((path, index) => (
                <div key={path.id} className={`is-${path.id}`}>
                  <span>0{index + 1}</span><i /><p><small>{path.code}</small><strong>{path.title}</strong></p>
                </div>
              ))}
            </div>
            <footer><span>LEARN</span><i /><span>TEST</span><i /><span>VERIFY</span><i /><span>CITE</span></footer>
          </div>
        </div>
      </section>

      <section className="rs-audience" aria-labelledby="rs-audience-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-split">
            <div><p className="rs-eyebrow"><span>01</span> Choose your level</p><h2 id="rs-audience-title">The same system, explained for your purpose.</h2></div>
            <p>Changing the audience changes the vocabulary, teaching structure and evidence depth—not the underlying facts.</p>
          </header>
          <div className="rs-audience-grid" role="tablist" aria-label="Learning audience">
            {audienceProfiles.map((profile, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={audience === profile.id}
                className={audience === profile.id ? 'is-active' : ''}
                key={profile.id}
                onClick={() => setAudience(profile.id)}
              >
                <span>0{index + 1}</span><strong>{profile.label}</strong><p>{profile.promise}</p><i><Icon name="arrow" /></i>
              </button>
            ))}
          </div>
          <div className="rs-audience-promise"><small>ANSWER STANDARD / {activeAudience.label.toUpperCase()}</small><p>{activeAudience.answerStyle}</p></div>
        </div>
      </section>

      <section className="rs-paths" aria-labelledby="rs-paths-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-dark">
            <p className="rs-eyebrow"><span>02</span> Connected curriculum</p>
            <h2 id="rs-paths-title">Three fields. One evidence-first method.</h2>
            <p>Move from fundamentals to architecture, diagnosis and research. Each field stays distinct while using the same disciplined questions.</p>
          </header>
          <div className="rs-path-grid">
            {researchPaths.map((path) => (
              <article key={path.id} className={`is-${path.id}`}>
                <header><small>{path.code}</small><h3>{path.title}</h3><p>{path.summary}</p></header>
                <ol>{path.stages.map((stage) => <li key={stage.index}><span>{stage.index}</span><div><strong>{stage.title}</strong><p>{stage.detail}</p></div></li>)}</ol>
                <button type="button" onClick={() => { setDomain(path.id); scrollToAssistant(`Build a learning path for ${path.title.toLowerCase()} at my level.`); }}>Build my learning path <Icon name="arrow" /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="rs-projects" aria-labelledby="rs-projects-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-split">
            <div><p className="rs-eyebrow"><span>03</span> Safe project laboratory</p><h2 id="rs-projects-title">Build understanding—not unnecessary risk.</h2></div>
            <p>Every activity uses isolated extra-low voltage, a paper model, a simulation or browser software. Real safety-critical equipment needs qualified supervision and exact procedures.</p>
          </header>
          <div className="rs-filter-row" aria-label="Filter projects by field">
            {domainOptions.map((option) => <button type="button" key={option.id} onClick={() => selectProjectDomain(option.id)} className={projectDomain === option.id ? 'is-active' : ''}>{option.label}</button>)}
          </div>
          <div className="rs-project-layout">
            <nav className="rs-project-index" aria-label="Project library">
              {filteredProjects.map((project, index) => (
                <button type="button" key={project.id} className={activeProject.id === project.id ? 'is-active' : ''} onClick={() => setActiveProjectId(project.id)}>
                  <span>{String(index + 1).padStart(2, '0')}</span><div><small>{project.domain} · {project.level}</small><strong>{project.title}</strong><p>{project.duration}</p></div><Icon name="arrow" />
                </button>
              ))}
            </nav>
            <article className={`rs-project-reader is-${activeProject.domain}`}>
              <header className="rs-project-reader-head">
                <div><p><span>{activeProject.safety}</span></p><h3>{activeProject.title}</h3><strong>{activeProject.objective}</strong></div>
                <div><small>LEVEL</small><b>{activeProject.level}</b><small>DURATION</small><b>{activeProject.duration}</b></div>
              </header>
              <ResearchDiagram kind={activeProject.diagram} title={`${activeProject.title} simplified diagram`} />
              <div className="rs-project-detail-grid">
                <section><h4>Materials</h4><ul>{activeProject.materials.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></section>
                <section className="rs-project-steps"><h4>Method</h4><ol>{activeProject.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></section>
                <section><h4>Why it works</h4><p>{activeProject.explanation}</p><h4>Record</h4><div className="rs-project-tags">{activeProject.record.map((item) => <span key={item}>{item}</span>)}</div></section>
                <section><h4>Reflection questions</h4><ol className="rs-project-questions">{activeProject.questions.map((item) => <li key={item}>{item}</li>)}</ol><h4>Reference</h4>{activeProject.sourceIds.map((id) => { const source = getResearchSource(id); return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer">{source.authority}<Icon name="external" /></a> : null; })}</section>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="rs-atlas" aria-labelledby="rs-atlas-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-split">
            <div><p className="rs-eyebrow"><span>04</span> Concept atlas</p><h2 id="rs-atlas-title">Find the idea before chasing the answer.</h2></div>
            <p>Search systems, concepts and evidence levels. Each map links to an authority trail and a useful next research question.</p>
          </header>
          <div className="rs-atlas-tools">
            <label><Icon name="search" /><input value={topicQuery} onChange={(event) => setTopicQuery(event.target.value)} placeholder="Search voltage, CAN, APIs, verification…" aria-label="Search the concept atlas" /></label>
            <div>{domainOptions.map((option) => <button type="button" key={option.id} onClick={() => setTopicDomain(option.id)} className={topicDomain === option.id ? 'is-active' : ''}>{option.label}</button>)}</div>
          </div>
          <div className="rs-topic-grid">
            {filteredTopics.map((topic) => (
              <article key={topic.id} className={`is-${topic.domain}`}>
                <header><span>{topic.domain}</span><small>{topic.level}</small></header><h3>{topic.title}</h3><p>{topic.summary}</p>
                <div>{topic.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
                <footer>{topic.sourceIds.map((id) => { const source = getResearchSource(id); return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer" aria-label={`Open ${source.title}`}>{source.authority}<Icon name="external" /></a> : null; })}<button type="button" onClick={() => { setDomain(topic.domain); scrollToAssistant(`Explain ${topic.title.toLowerCase()} for a ${activeAudience.label.toLowerCase()}.`); }}>Ask Nexus <Icon name="arrow" /></button></footer>
              </article>
            ))}
            {!filteredTopics.length ? <p className="rs-empty">No concept matches that search. Try a system, component, measurement or broader field.</p> : null}
          </div>
        </div>
      </section>

      <section ref={assistantRef} className="rs-assistant" aria-labelledby="rs-assistant-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-dark">
            <p className="rs-eyebrow"><span>05</span> Nexus Research Assistant</p>
            <h2 id="rs-assistant-title">Ask better questions. Get traceable answers.</h2>
            <p>The assistant adapts to your role, uses Nexus knowledge, can research current sources when configured, and shows exactly which source mode produced the answer.</p>
          </header>
          <div className="rs-assistant-frame">
            <aside className="rs-assistant-controls">
              <div className="rs-assistant-brand"><span>NX</span><div><strong>RESEARCH ASSISTANT</strong><small>Evidence-led learning interface</small></div><i /></div>
              <fieldset><legend>Audience</legend>{audienceProfiles.map((profile) => <button type="button" key={profile.id} className={audience === profile.id ? 'is-active' : ''} onClick={() => setAudience(profile.id)}><span>{profile.label}</span><small>{profile.promise.split('.')[0]}</small></button>)}</fieldset>
              <fieldset><legend>Field</legend>{domainOptions.map((option) => <button type="button" key={option.id} className={domain === option.id ? 'is-active' : ''} onClick={() => setDomain(option.id)}><span>{option.label}</span><small>{option.detail}</small></button>)}</fieldset>
              <fieldset><legend>Answer mode</legend>{modeOptions.map((option) => <button type="button" key={option.id} className={mode === option.id ? 'is-active' : ''} onClick={() => setMode(option.id)}><span>{option.label}</span><small>{option.detail}</small></button>)}</fieldset>
              <label className="rs-web-toggle"><input type="checkbox" checked={useWeb} onChange={(event) => setUseWeb(event.target.checked)} /><span><i /><b>Current web research</b><small>Use cited web pages when the service is enabled</small></span></label>
              <button type="button" className="rs-clear" onClick={clearConversation}><Icon name="x" /> New research session</button>
            </aside>

            <div className="rs-chat">
              <header className="rs-chat-head"><div><span><i /> READY</span><strong>{activeAudience.label} · {domainLabel(domain)} · {modeOptions.find((item) => item.id === mode)?.label}</strong></div><p>Answers can still be incomplete. Check citations, exact specifications and local rules.</p></header>
              <div className="rs-messages" aria-live="polite">
                {messages.map((message) => (
                  <article key={message.id} className={`rs-message is-${message.role}`}>
                    <div className="rs-message-avatar">{message.role === 'assistant' ? 'NX' : 'YOU'}</div>
                    <div className="rs-message-body">
                      <header><strong>{message.role === 'assistant' ? 'Nexus Research Assistant' : 'Your question'}</strong>{message.mode ? <span className={`is-${message.mode}`}>{modePresentation[message.mode].label}</span> : null}</header>
                      <MessageText content={message.content} />
                      {message.degraded ? <p className="rs-degraded">Live research was unavailable, so this answer used the curated Nexus library.</p> : null}
                      {message.sources?.length ? <div className="rs-answer-sources"><small>SOURCES USED</small><div>{message.sources.map((source, index) => <a key={`${source.url}-${index}`} href={source.url} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><strong>{source.title}</strong><Icon name="external" /></a>)}</div></div> : null}
                    </div>
                  </article>
                ))}
                {loading ? <article className="rs-message is-assistant is-loading"><div className="rs-message-avatar">NX</div><div className="rs-message-body"><header><strong>Researching your question</strong><span>CHECKING EVIDENCE</span></header><div className="rs-thinking"><i /><i /><i /></div><p>Reviewing relevant context and source boundaries…</p></div></article> : null}
              </div>
              <div className="rs-related"><small>TRY A RESEARCH QUESTION</small><div>{related.slice(0, 4).map((prompt) => <button type="button" key={prompt} onClick={() => setQuery(prompt)}>{prompt}<Icon name="arrow" /></button>)}</div></div>
              <form className="rs-composer" onSubmit={askQuestion}>
                <label htmlFor="research-question">Ask about a principle, comparison, learning plan, system or evidence claim.</label>
                <div><textarea id="research-question" value={query} onChange={(event) => { setQuery(event.target.value); setError(''); }} rows={3} maxLength={1200} placeholder="Example: Explain how a three-wire sensor signal works, then show what evidence would confirm a fault." onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void askQuestion(); } }} /><button type="submit" disabled={loading || query.trim().length < 3}><span>{loading ? 'Researching…' : 'Ask Nexus'}</span><Icon name="arrow" /></button></div>
                <footer><span>{query.length}/1200 · Enter to send · Shift + Enter for a new line</span><span>Do not enter private or confidential information</span></footer>
                {error ? <p className="rs-assistant-error" role="alert">{error}</p> : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-sources" aria-labelledby="rs-sources-title">
        <div className="rs-shell">
          <header className="rs-section-head rs-section-head-split"><div><p className="rs-eyebrow"><span>06</span> Authority library</p><h2 id="rs-sources-title">Start from sources that can be checked.</h2></div><p>Standards organizations, manufacturers, public safety agencies and established web authorities anchor the first version of the library.</p></header>
          <div className="rs-source-grid">{researchSources.map((source, index) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><div><small>{source.domain}</small><strong>{source.title}</strong><p>{source.authority}</p></div><Icon name="external" /></a>)}</div>
          <div className="rs-source-note"><Icon name="report" /><p><strong>A citation is a starting point—not automatic proof.</strong> Check the publication date, scope, method, operating conditions and whether it applies to your exact equipment or research question.</p><Link to="/knowledge-vault">Open the Knowledge Vault <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <ContentDisclosure page="research" />
    </main>
  );
}
