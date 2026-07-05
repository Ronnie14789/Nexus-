import { motion, useReducedMotion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { education, experience, journey, trainingFocus } from '@/data/portfolio';

export function NexusExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="nx-section nx-experience" aria-labelledby="nx-experience-title">
      <div className="nx-section-number" aria-hidden="true">03</div>
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-wide">
          <div>
            <p className="nx-eyebrow"><span>03</span> Field record</p>
            <h2 id="nx-experience-title">Built in the field. Refined in the workshop.</h2>
          </div>
          <p>
            A career path moving from electrical distribution and industrial circuits into commercial-vehicle
            diagnosis, warranty operations and systems-level technical communication.
          </p>
        </div>

        <div className="nx-field-layout">
          <aside className="nx-field-summary">
            <span>2022 → PRESENT</span>
            <h3>Three environments.<br />One growing standard.</h3>
            <p>Every role added a new layer: power, safety, service, diagnosis, evidence and responsibility.</p>
            <div className="nx-field-route" aria-label="Career progression">
              <div><b>01</b><span>Distribution</span></div><i />
              <div><b>02</b><span>Industrial</span></div><i />
              <div><b>03</b><span>Automotive</span></div>
            </div>
          </aside>

          <div className="nx-field-records">
            {experience.map((item, index) => (
              <motion.article
                key={item.company}
                className={item.current ? 'is-current' : ''}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.62, delay: index * 0.08 }}
              >
                <div className="nx-field-index"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="nx-field-main">
                  <div className="nx-field-meta"><span>{item.period}</span><span>{item.location}</span>{item.current ? <b>ACTIVE</b> : null}</div>
                  <h3>{item.company}</h3>
                  <h4>{item.role}</h4>
                  <p>{item.description}</p>
                </div>
                <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}><Icon name="check" />{responsibility}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NexusEducation() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="nx-section nx-education" aria-labelledby="nx-education-title">
      <div className="nx-education-grid" aria-hidden="true" />
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-dark">
          <div>
            <p className="nx-eyebrow"><span>04</span> Education &amp; technical development</p>
            <h2 id="nx-education-title">Theory built the foundation. India expanded the system.</h2>
          </div>
          <p>
            Formal electrical engineering, active university study and six months of international commercial-vehicle training now converge in one professional direction.
          </p>
        </div>

        <div className="nx-education-feature">
          <motion.div
            className="nx-education-portrait"
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.72 }}
          >
            <img src="/images/ecatu-blue-portrait.webp" alt="Ecatu Ronald during Tata Motors SkillPro training" loading="lazy" />
            <div className="nx-education-photo-caption"><small>JAMSHEDPUR · INDIA · 2025</small><strong>International Business Commercial Vehicles Skill Development Program</strong></div>
          </motion.div>

          <div className="nx-training-panel">
            <div className="nx-training-panel-head">
              <div><small>FEATURED CREDENTIAL</small><h3>Tata Motors SkillPro</h3></div>
              <span>06 MONTHS</span>
            </div>
            <p>
              Focused professional development across BS6 systems, commercial-vehicle diagnosis, workshop practice,
              driveline, Cummins INSITE and Tata Diagnostic Software.
            </p>
            <div className="nx-training-focus">
              {trainingFocus.map((focus, index) => (
                <article key={focus.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{focus.title}</h4><p>{focus.detail}</p></div></article>
              ))}
            </div>
          </div>
        </div>

        <div className="nx-education-ledger">
          {education.map((item, index) => (
            <motion.article
              key={item.institution}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="nx-education-time"><small>{item.period}</small><b>{item.location}</b></div>
              <div><h3>{item.institution}</h3><h4>{item.qualification}</h4><p>{item.detail}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NexusJourney() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="nx-section nx-journey" aria-labelledby="nx-journey-title">
      <div className="nx-section-number" aria-hidden="true">05</div>
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-wide">
          <div>
            <p className="nx-eyebrow"><span>05</span> Uganda → India → Uganda</p>
            <h2 id="nx-journey-title">Distance changed the view. Application created the value.</h2>
          </div>
          <p>
            The journey is not presented as travel alone. It is a progression from local technical foundation,
            through international development, back to real workshop application.
          </p>
        </div>

        <div className="nx-journey-map">
          <div className="nx-journey-line" aria-hidden="true"><i /><i /><i /></div>
          {journey.map((item, index) => (
            <motion.article
              key={item.title}
              className={`nx-journey-card nx-journey-card-${index + 1}`}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.64, delay: index * 0.1 }}
            >
              <div className="nx-journey-image"><img src={item.image} alt="" loading="lazy" /><span>{item.marker}</span></div>
              <div className="nx-journey-content">
                <small>{String(index + 1).padStart(2, '0')} / {item.phase}</small>
                <h3>{item.title}</h3>
                <strong>{item.place}</strong>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="nx-journey-conclusion">
          <span>THE RESULT</span>
          <p>International exposure matters most when it returns as better judgement, clearer communication and stronger service.</p>
        </div>
      </div>
    </section>
  );
}
