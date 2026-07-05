import { motion, useReducedMotion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import { engineeringPrinciples, siteConfig } from '@/data/portfolio';

const facts = [
  ['CURRENT BASE', 'Kampala, Uganda'],
  ['CURRENT PRACTICE', 'Technician · Tata Uganda Ltd'],
  ['LANGUAGES', siteConfig.languages.join(' · ')],
  ['LONG-TERM DIRECTION', 'Integrity-led management and technical consultancy'],
];

export default function NexusProfile() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="nx-section nx-profile" aria-labelledby="nx-profile-title">
      <div className="nx-section-number" aria-hidden="true">01</div>
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-wide">
          <div>
            <p className="nx-eyebrow"><span>01</span> Professional profile</p>
            <h2 id="nx-profile-title">A systems thinker shaped by the field.</h2>
          </div>
          <p>
            My work began with electrical distribution and industrial circuits, expanded into commercial-vehicle
            service, and now reaches into software and digital workflow design.
          </p>
        </div>

        <div className="nx-profile-grid">
          <motion.div
            className="nx-profile-visual"
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nx-profile-image-main">
              <picture>
                <source media="(max-width: 760px)" srcSet="/images/ecatu-casual-760.webp" />
                <source media="(max-width: 1200px)" srcSet="/images/ecatu-casual-1100.webp" />
                <img src="/images/ecatu-casual.webp" alt="Ecatu Ronald in a professional outdoor portrait" loading="lazy" />
              </picture>
              <span className="nx-image-label">KAMPALA / UGANDA</span>
            </div>
            <div className="nx-profile-image-small">
              <img src="/images/ecatu-blue-portrait.webp" alt="Ecatu Ronald during SkillPro training in India" loading="lazy" />
              <span>JAMSHEDPUR / INDIA</span>
            </div>
            <div className="nx-profile-coordinate" aria-hidden="true">00°20′N · 32°35′E</div>
          </motion.div>

          <motion.div
            className="nx-profile-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.05 }}
          >
            <div className="nx-profile-manifesto">
              <span>WHY ENGINEERING</span>
              <p>
                I chose engineering to solve everyday challenges across automotive, electrical and software
                systems—and to make service delivery safer, clearer and more dependable.
              </p>
            </div>

            <div className="nx-fact-matrix">
              {facts.map(([label, value]) => (
                <div key={label}><small>{label}</small><strong>{value}</strong></div>
              ))}
            </div>

            <div className="nx-profile-note">
              <small>PERSONAL DRIVE</small>
              <p>Researching, learning and time with family keep my technical ambition connected to purpose.</p>
            </div>

            <a className="nx-inline-link" href="#experience">Trace the field record <Icon name="arrow" /></a>
          </motion.div>
        </div>

        <div className="nx-principles">
          <div className="nx-principles-title">
            <p className="nx-eyebrow"><span>STANDARD</span> How I work</p>
            <h3>Every decision must be clear enough to test, explain and defend.</h3>
          </div>
          <div className="nx-principles-list">
            {engineeringPrinciples.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <div><h4>{principle.title}</h4><p>{principle.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
