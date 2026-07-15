import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import { capabilities, disciplines } from '@/data/portfolio';

const systems = [
  {
    key: 'electrical',
    label: 'POWER',
    metric: 'AC / DC · 1 kV · 415 V',
    chain: ['Supply', 'Protection', 'Control', 'Load', 'Feedback'],
    principle: 'Measure before replacement.',
  },
  {
    key: 'engine',
    label: 'MOTION',
    metric: 'Diesel · BS6 · CAN · Warranty',
    chain: ['Complaint', 'Data', 'Inspection', 'Isolation', 'Verification'],
    principle: 'Find the root cause, not only the failed part.',
  },
  {
    key: 'code',
    label: 'INTELLIGENCE',
    metric: 'React · TypeScript · Express',
    chain: ['Need', 'Model', 'Interface', 'Validation', 'Delivery'],
    principle: 'Build simple systems that can be understood and tested.',
  },
] as const;

const capabilityIndexes = [[2, 4], [0, 1], [3, 5]] as const;

export default function NexusSystems() {
  const [active, setActive] = useState(1);
  const reduceMotion = useReducedMotion();
  const discipline = disciplines[active];
  const meta = systems[active];
  const selectedCapabilities = capabilityIndexes[active].map((index) => capabilities[index]);

  return (
    <section id="systems" className="nx-section nx-systems" aria-labelledby="nx-systems-title">
      <div className="nx-systems-grid" aria-hidden="true" />
      <div className="nx-systems-glow" aria-hidden="true" />
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-dark">
          <div>
            <p className="nx-eyebrow"><span>02</span> Systems atlas</p>
            <h2 id="nx-systems-title">Three disciplines. One operating logic.</h2>
          </div>
          <p>
            Select a system to explore the tools, signal path and decision standard behind my work.
            The technical environment changes; the evidence-first method does not.
          </p>
        </div>

        <div className="nx-atlas">
          <div className="nx-atlas-nav" role="tablist" aria-label="Engineering systems">
            {disciplines.map((item, index) => (
              <button
                key={item.code}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon name={item.icon} />
                <div><small>{systems[index].label}</small><strong>{item.title}</strong></div>
                <i />
              </button>
            ))}
          </div>

          <div className="nx-atlas-stage">
            <div className="nx-atlas-radar" aria-hidden="true">
              <span /><span /><span /><span />
              <i className="nx-radar-node nx-radar-node-a" />
              <i className="nx-radar-node nx-radar-node-b" />
              <i className="nx-radar-node nx-radar-node-c" />
              <b>{String(active + 1).padStart(2, '0')}</b>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={discipline.code}
                className="nx-atlas-content"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.34 }}
              >
                <div className="nx-atlas-heading">
                  <div className="nx-atlas-icon"><Icon name={discipline.icon} /></div>
                  <div><small>ACTIVE SYSTEM / {meta.label}</small><h3>{discipline.title}</h3></div>
                  <span className="nx-atlas-live"><i /> system mapped</span>
                </div>

                <p className="nx-atlas-description">{discipline.description}</p>

                <div className="nx-signal-path" aria-label={`${discipline.title} process path`}>
                  {meta.chain.map((step, index) => (
                    <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < meta.chain.length - 1 ? <i /> : null}</div>
                  ))}
                </div>

                <div className="nx-atlas-details">
                  <div>
                    <small>CAPABILITY SET</small>
                    <ul>{discipline.skills.map((skill: string) => <li key={skill}><Icon name="check" />{skill}</li>)}</ul>
                  </div>
                  <div className="nx-system-standard">
                    <small>SYSTEM STANDARD</small>
                    <strong>{meta.principle}</strong>
                    <span>{meta.metric}</span>
                  </div>
                </div>

                {meta.key === 'electrical' ? (
                  <Link className="nx-btn nx-btn-primary" to="/electrical-systems">
                    Enter the complete electrical systems field <Icon name="arrow" />
                  </Link>
                ) : null}

                {meta.key === 'engine' ? (
                  <Link className="nx-btn nx-btn-primary" to="/automotive-systems">
                    Enter the complete automotive systems field <Icon name="arrow" />
                  </Link>
                ) : null}

                {meta.key === 'code' ? (
                  <Link className="nx-btn nx-btn-primary" to="/digital-systems">
                    Enter the complete digital systems field <Icon name="arrow" />
                  </Link>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="nx-capability-pair"
            initial={reduceMotion ? false : { opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.32 }}
          >
            {selectedCapabilities.map((capability, index) => (
              <article key={capability.title}>
                <span>{String(active * 2 + index + 1).padStart(2, '0')}</span>
                <Icon name={capability.icon} />
                <div><h3>{capability.title}</h3><p>{capability.description}</p></div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
