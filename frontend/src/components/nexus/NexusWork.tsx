import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState, type KeyboardEvent } from 'react';
import Icon from '@/components/ui/Icon';
import { projects } from '@/data/portfolio';

export function NexusWork() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[active];

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % projects.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;

    event.preventDefault();
    setActive(next);
    requestAnimationFrame(() => document.getElementById(`nx-case-tab-${next}`)?.focus());
  };

  return (
    <section id="work" className="nx-section nx-work" aria-labelledby="nx-work-title">
      <div className="nx-work-grid" aria-hidden="true" />
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-dark">
          <div>
            <p className="nx-eyebrow"><span>06</span> Engineering casebook</p>
            <h2 id="nx-work-title">Real problems. Structured reasoning. Clear outcomes.</h2>
          </div>
          <p>
            Each case separates the public record, the working method, the scope boundary, the verification rule, and the evidence still needed.
          </p>
        </div>

        <div className="nx-casebook">
          <div className="nx-casebook-index" role="tablist" aria-label="Project case files">
            {projects.map((item, index) => (
              <button
                key={item.number}
                type="button"
                role="tab"
                id={`nx-case-tab-${index}`}
                aria-controls={`nx-case-panel-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
                onKeyDown={(event) => moveTab(event, index)}
              >
                <span>{item.number}</span>
                <div><small>{item.category}</small><strong>{item.title}</strong></div>
                <Icon name="arrow" />
              </button>
            ))}
          </div>

          <div className="nx-casebook-stage">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.number}
                id={`nx-case-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`nx-case-tab-${active}`}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.34 }}
              >
                <div className="nx-case-head">
                  <div><small>CASE FILE / {project.number}</small><h3>{project.title}</h3></div>
                  <span>{project.status}</span>
                </div>
                <p className="nx-case-summary">{project.summary}</p>

                <div className="nx-case-evidence-bar" aria-label="Case evidence status">
                  <div><small>EVIDENCE CLASS</small><strong>{project.proof.classification}</strong></div>
                  <div><small>REVIEWED</small><strong>{project.proof.reviewed}</strong></div>
                  <div><small>RECORD BASIS</small><strong>{project.proof.artifacts.length} trace points</strong></div>
                </div>

                <div className="nx-case-flow">
                  <div><span>01</span><small>PROBLEM</small><p>{project.problem}</p></div>
                  <i />
                  <div><span>02</span><small>METHOD</small><p>{project.approach}</p></div>
                  <i />
                  <div><span>03</span><small>OUTCOME</small><p>{project.outcome}</p></div>
                </div>

                <div className="nx-case-proof">
                  <section aria-labelledby={`nx-case-evidence-${active}`}>
                    <div className="nx-case-proof-head">
                      <div><small>TRACEABLE BASIS</small><h4 id={`nx-case-evidence-${active}`}>Evidence register</h4></div>
                      <span>{project.proof.artifacts.length.toString().padStart(2, '0')} ITEMS</span>
                    </div>
                    <p>{project.proof.basis}</p>
                    <ul>
                      {project.proof.artifacts.map((artifact) => <li key={artifact}><i aria-hidden="true" />{artifact}</li>)}
                    </ul>
                  </section>

                  <aside aria-label="Case controls and boundaries">
                    <div><small>SCOPE BOUNDARY</small><p>{project.proof.scope}</p></div>
                    <div><small>VERIFICATION RULE</small><p>{project.proof.verification}</p></div>
                    <div className="nx-case-gap"><small>OPEN EVIDENCE MILESTONE</small><p>{project.proof.gap}</p></div>
                  </aside>
                </div>

                <div className="nx-case-footer">
                  <div className="nx-case-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="nx-case-links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                        {link.label} <Icon name="arrow" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
