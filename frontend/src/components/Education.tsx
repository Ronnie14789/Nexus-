import { motion, useReducedMotion } from 'framer-motion';
import { education, trainingFocus } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function Education() {
  const reduceMotion = useReducedMotion();
  const international = education.find((item) => item.kind === 'international');
  const otherEducation = education.filter((item) => item.kind !== 'international');

  return (
    <section id="education" className="vg-section vg-education" aria-labelledby="education-title">
      <div className="vg-education-beam" aria-hidden="true" />
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-dark vg-section-heading-split">
          <div>
            <p className="vg-eyebrow"><span>04</span> Education & international training</p>
            <h2 id="education-title">Theory built the foundation. India expanded the view.</h2>
          </div>
          <p>
            Formal electrical engineering education, field experience and six months of international
            commercial-vehicle development created a broader, more connected technical perspective.
          </p>
        </div>

        {international ? (
          <div className="vg-training-feature">
            <motion.div
              className="vg-training-image"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.74 }}
            >
              <img src="/images/ecatu-blue-portrait.webp" alt="Ecatu Ronald at Tata Motors SkillPro training in India" loading="lazy" />
              <div className="vg-training-image-tag"><span>INTERNATIONAL CHAPTER</span><strong>Jamshedpur · India · 2025</strong></div>
              <div className="vg-training-image-ring" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="vg-training-copy"
              initial={reduceMotion ? false : { opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.7, delay: 0.06 }}
            >
              <span className="vg-training-duration">{international.period}</span>
              <small>{international.institution}</small>
              <h3>{international.qualification}</h3>
              <p>{international.detail}</p>
              <div className="vg-training-focus-grid">
                {trainingFocus.map((focus, index) => (
                  <article key={focus.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h4>{focus.title}</h4>
                    <p>{focus.detail}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        ) : null}

        <div className="vg-credentials">
          <div className="vg-credentials-head"><span>FORMAL FOUNDATION</span><strong>Education that supports the field practice</strong></div>
          <div className="vg-credentials-list">
            {otherEducation.map((item, index) => (
              <motion.article
                key={`${item.institution}-${item.period}`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.56, delay: index * 0.05 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><small>{item.period} · {item.location}</small><h3>{item.qualification}</h3><strong>{item.institution}</strong><p>{item.detail}</p></div>
                <Icon name="arrow" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
