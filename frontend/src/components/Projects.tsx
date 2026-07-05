import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function Projects() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[active];

  return (
    <section id="work" className="vg-section vg-work" aria-labelledby="work-title">
      <div className="vg-work-grid" aria-hidden="true" />
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-dark vg-section-heading-split">
          <div>
            <p className="vg-eyebrow"><span>06</span> Selected work</p>
            <h2 id="work-title">Real problems. Structured reasoning. Clear outcomes.</h2>
          </div>
          <p>
            These case files show how I translate technical complexity into a repeatable process—whether
            the system is a vehicle, a workflow or a software product.
          </p>
        </div>

        <div className="vg-case-files">
          <div className="vg-case-tabs" role="tablist" aria-label="Selected project case files">
            {projects.map((item, index) => (
              <button key={item.number} type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
                <span>{item.number}</span>
                <div><small>{item.category}</small><strong>{item.title}</strong></div>
                <i />
              </button>
            ))}
          </div>

          <div className="vg-case-stage">
            <AnimatePresence mode="wait">
              <motion.article
                key={project.number}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.34 }}
              >
                <div className="vg-case-stage-head">
                  <div><span>CASE FILE / {project.number}</span><small>{project.category}</small></div>
                  <strong>{project.status}</strong>
                </div>
                <h3>{project.title}</h3>
                <p className="vg-case-summary">{project.summary}</p>

                <div className="vg-case-flow">
                  <div><span>01</span><small>Problem</small><p>{project.problem}</p></div>
                  <i><Icon name="arrow" /></i>
                  <div><span>02</span><small>Approach</small><p>{project.approach}</p></div>
                  <i><Icon name="arrow" /></i>
                  <div><span>03</span><small>Outcome</small><p>{project.outcome}</p></div>
                </div>

                <div className="vg-case-footer">
                  <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href="#contact">Discuss a similar challenge <Icon name="arrow" /></a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="vg-work-proof">
          <div><span>01</span><strong>Evidence-led</strong><small>Every recommendation links back to a finding.</small></div>
          <div><span>02</span><strong>System-aware</strong><small>Primary causes and secondary effects are treated together.</small></div>
          <div><span>03</span><strong>Communicable</strong><small>Technical decisions become clear to teams and customers.</small></div>
        </div>
      </div>
    </section>
  );
}
