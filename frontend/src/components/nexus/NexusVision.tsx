import { motion, useReducedMotion } from 'framer-motion';
import { values } from '@/data/portfolio';

export function NexusVision() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="values" className="nx-section nx-vision" aria-labelledby="nx-vision-title">
      <div className="nx-shell">
        <div className="nx-vision-layout">
          <div className="nx-vision-intro">
            <p className="nx-eyebrow"><span>08</span> Character &amp; direction</p>
            <h2 id="nx-vision-title">Capability earns attention. Character earns trust.</h2>
            <p>
              My long-term direction is to become a manager of integrity and a trusted consultant—someone able to connect people, systems and evidence into responsible decisions.
            </p>
          </div>

          <div className="nx-vision-orbit" aria-hidden="true">
            <span className="nx-vision-core">ER</span>
            <i /><i /><i />
            <b>INTEGRITY</b><b>RESEARCH</b><b>SERVICE</b>
          </div>

          <div className="nx-values-list">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.52, delay: index * 0.08 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{value.title}</h3><p>{value.description}</p></div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="nx-ten-year">
          <span>THE TEN-YEAR DIRECTION</span>
          <p>Lead with integrity. Consult with evidence. Build systems that improve service delivery.</p>
          <div><small>MANAGEMENT</small><i /><small>CONSULTANCY</small><i /><small>TECHNICAL LEADERSHIP</small></div>
        </div>
      </div>
    </section>
  );
}
