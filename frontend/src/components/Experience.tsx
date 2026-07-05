import { motion, useReducedMotion } from 'framer-motion';
import { experience } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="vg-section vg-experience" aria-labelledby="experience-title">
      <div className="vg-section-index" aria-hidden="true">03</div>
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-split">
          <div>
            <p className="vg-eyebrow"><span>03</span> Field record</p>
            <h2 id="experience-title">Built in the field. Refined in the workshop.</h2>
          </div>
          <p>
            Each role expanded the same core discipline: work safely, understand the system, communicate
            clearly and leave behind a dependable result.
          </p>
        </div>

        <div className="vg-experience-layout">
          <aside className="vg-experience-aside">
            <span>2022</span>
            <i />
            <strong>Present</strong>
            <p>Electrical distribution → industrial systems → commercial vehicles</p>
          </aside>

          <div className="vg-career-line">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                className={item.current ? 'is-current' : ''}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, delay: index * 0.06 }}
              >
                <div className="vg-career-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="vg-career-meta"><span>{item.period}</span><small>{item.location}</small></div>
                <div className="vg-career-main">
                  <div className="vg-career-title-row">
                    <div><small>{item.company}</small><h3>{item.role}</h3></div>
                    {item.current ? <span className="vg-current-badge"><i /> Current role</span> : null}
                  </div>
                  <p>{item.description}</p>
                  <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}><Icon name="check" />{responsibility}</li>)}</ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="vg-experience-quote">
          <span>THE THREAD THROUGH EVERY ROLE</span>
          <blockquote>“Reliable service begins with disciplined observation and ends with clear communication.”</blockquote>
          <a href="#education">See the training behind the practice <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
