import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { journey } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function Journey() {
  const [active, setActive] = useState(1);
  const reduceMotion = useReducedMotion();
  const stage = journey[active];

  return (
    <section id="journey" className="vg-section vg-journey" aria-labelledby="journey-title">
      <div className="vg-section-index" aria-hidden="true">05</div>
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-split">
          <div>
            <p className="vg-eyebrow"><span>05</span> Uganda → India → Uganda</p>
            <h2 id="journey-title">Distance changed the view. Application created the value.</h2>
          </div>
          <p>
            The journey matters because the knowledge returned to real workshop problems. Select a stage
            to see how each chapter shaped the next one.
          </p>
        </div>

        <div className="vg-route-map" aria-label="Professional journey route">
          <div className="vg-route-line"><i /><i /><i /></div>
          {journey.map((item, index) => (
            <button key={item.marker + item.phase} type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
              <span>{item.marker}</span><strong>{item.phase}</strong><small>{item.place}</small>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.title}
            className="vg-journey-stage"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38 }}
          >
            <div className="vg-journey-stage-image">
              <img src={stage.image} alt={stage.title} loading="lazy" />
              <div className="vg-journey-stage-overlay" />
              <span>{String(active + 1).padStart(2, '0')} / 03</span>
            </div>
            <div className="vg-journey-stage-copy">
              <small>{stage.phase} · {stage.place}</small>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <div className="vg-journey-stage-insight">
                <span>{active === 0 ? 'Foundation' : active === 1 ? 'Expansion' : 'Application'}</span>
                <strong>{active === 0 ? 'Practical discipline and field responsibility.' : active === 1 ? 'Advanced systems, international teamwork and technical breadth.' : 'Deeper diagnosis, stronger reporting and continuous improvement.'}</strong>
              </div>
              <a className="vg-inline-link" href="#work">See how the journey becomes work <Icon name="arrow" /></a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
