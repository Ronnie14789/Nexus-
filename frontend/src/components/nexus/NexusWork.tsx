import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { projects } from '@/data/portfolio';

export function NexusWork() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[active];

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
            These case files show how I approach workshop operations, technical communication, software architecture and workflow improvement.
          </p>
        </div>

        <div className="nx-casebook">
          <div className="nx-casebook-index" role="tablist" aria-label="Project case files">
            {projects.map((item, index) => (
              <button
                key={item.number}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
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

                <div className="nx-case-flow">
                  <div><span>01</span><small>PROBLEM</small><p>{project.problem}</p></div>
                  <i />
                  <div><span>02</span><small>METHOD</small><p>{project.approach}</p></div>
                  <i />
                  <div><span>03</span><small>OUTCOME</small><p>{project.outcome}</p></div>
                </div>

                <div className="nx-case-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
