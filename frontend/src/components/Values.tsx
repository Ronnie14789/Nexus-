import { motion, useReducedMotion } from 'framer-motion';
import { values } from '@/data/portfolio';

export default function Values() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="values" className="vg-section vg-values" aria-labelledby="values-title">
      <div className="vg-shell">
        <div className="vg-values-layout">
          <div className="vg-values-lead">
            <p className="vg-eyebrow"><span>08</span> Leadership direction</p>
            <h2 id="values-title">Capability earns attention. Character earns trust.</h2>
            <p>
              My long-term direction is to grow into a manager of integrity and a trusted consultant—someone
              who can understand complex systems, support people and make responsible decisions.
            </p>
            <div className="vg-values-signature"><span>ECATU RONALD</span><i /><small>Engineer · learner · future technical leader</small></div>
          </div>

          <div className="vg-values-cards">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.56, delay: index * 0.06 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="vg-future-band">
          <div><small>10-YEAR DIRECTION</small><strong>Integrity-led management</strong></div>
          <i />
          <div><small>PROFESSIONAL EVOLUTION</small><strong>Technical consultancy</strong></div>
          <i />
          <div><small>CONTINUOUS STANDARD</small><strong>Research, learning and dependable service</strong></div>
        </div>
      </div>
    </section>
  );
}
