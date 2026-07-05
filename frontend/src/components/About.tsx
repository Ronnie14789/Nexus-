import { motion, useReducedMotion } from 'framer-motion';
import { engineeringPrinciples, siteConfig } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

const facts = [
  { label: 'Current base', value: siteConfig.location },
  { label: 'Professional environment', value: siteConfig.employer },
  { label: 'Languages', value: siteConfig.languages.join(' · ') },
  { label: 'Long-term direction', value: 'Integrity-led management and consultancy' },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="vg-section vg-about" aria-labelledby="about-title">
      <div className="vg-section-index" aria-hidden="true">01</div>
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-split">
          <div>
            <p className="vg-eyebrow"><span>01</span> Professional profile</p>
            <h2 id="about-title">I diagnose the complete system—not only the visible symptom.</h2>
          </div>
          <p>
            My work connects mechanical, electrical, electronic and digital thinking. The result is a
            disciplined approach that turns uncertain complaints into evidence, decisions and clear action.
          </p>
        </div>

        <div className="vg-about-layout">
          <motion.div
            className="vg-about-visual"
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="vg-about-photo">
              <picture>
                <source media="(max-width: 760px)" srcSet="/images/ecatu-casual-760.webp" />
                <source media="(max-width: 1200px)" srcSet="/images/ecatu-casual-1100.webp" />
                <img src="/images/ecatu-casual.webp" alt="Ecatu Ronald in a professional outdoor portrait" width="1448" height="1086" loading="lazy" />
              </picture>
              <div className="vg-photo-coordinate"><span>00°20′N</span><i /><span>32°35′E</span></div>
              <div className="vg-photo-note"><small>PERSON / PURPOSE</small><strong>Research-led. Family-grounded. Service-focused.</strong></div>
            </div>
            <div className="vg-about-mini-photo">
              <img src="/images/ecatu-blue-portrait.webp" alt="Ecatu Ronald during Tata Motors SkillPro training" loading="lazy" />
              <span>JAMSHEDPUR / INDIA</span>
            </div>
          </motion.div>

          <motion.div
            className="vg-about-content"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.06 }}
          >
            <div className="vg-about-statement">
              <span>WHY ENGINEERING</span>
              <p>
                I became an engineer to solve everyday challenges across automotive, electrical and software
                systems—and to make service delivery safer, clearer and more dependable.
              </p>
            </div>

            <div className="vg-facts-grid">
              {facts.map((fact) => (
                <div key={fact.label}><small>{fact.label}</small><strong>{fact.value}</strong></div>
              ))}
            </div>

            <a className="vg-inline-link" href="#experience">Trace the professional journey <Icon name="arrow" /></a>
          </motion.div>
        </div>

        <div className="vg-principles">
          <div className="vg-principles-intro">
            <span>THE OPERATING STANDARD</span>
            <h3>Three principles govern every technical decision.</h3>
          </div>
          <div className="vg-principles-list">
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
