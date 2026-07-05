import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { capabilities, disciplines } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

const chains = {
  electrical: ['Supply', 'Protection', 'Control', 'Load', 'Feedback'],
  engine: ['Complaint', 'Live data', 'Mechanical check', 'Isolation', 'Verification'],
  code: ['Need', 'Architecture', 'Interface', 'Validation', 'Deployment'],
} as const;

const systemMetrics = {
  electrical: [
    ['Primary focus', 'Power & control'],
    ['Field range', 'AC / DC · 1 kV · 415 V'],
    ['Decision style', 'Measure before replacement'],
  ],
  engine: [
    ['Primary focus', 'Reliability & root cause'],
    ['Tools', 'Cummins INSITE · Tata diagnostics'],
    ['Decision style', 'Evidence before assumptions'],
  ],
  code: [
    ['Primary focus', 'Workflow clarity'],
    ['Stack', 'React · TypeScript · Express'],
    ['Decision style', 'Simple, testable systems'],
  ],
} as const;

export default function Expertise() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const discipline = disciplines[active];
  const chain = chains[discipline.icon];
  const metrics = systemMetrics[discipline.icon];
  const capabilityGroups = useMemo(() => [
    [capabilities[2], capabilities[4]],
    [capabilities[0], capabilities[1]],
    [capabilities[3], capabilities[5]],
  ] as const, []);
  const filteredCapabilities = capabilityGroups[active];

  return (
    <section id="systems" className="vg-section vg-systems" aria-labelledby="systems-title">
      <div className="vg-systems-grid" aria-hidden="true" />
      <div className="vg-shell">
        <div className="vg-section-heading vg-section-heading-dark">
          <p className="vg-eyebrow"><span>02</span> Connected disciplines</p>
          <h2 id="systems-title">One engineer. Three systems. One disciplined way of thinking.</h2>
          <p>
            Select a discipline to see how I connect tools, evidence and action. The interface changes,
            but the operating principle stays the same: understand the complete system before deciding.
          </p>
        </div>

        <div className="vg-systems-console">
          <div className="vg-system-tabs" role="tablist" aria-label="Engineering disciplines">
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
                <div><small>{item.code}</small><strong>{item.title}</strong></div>
                <i />
              </button>
            ))}
          </div>

          <div className="vg-system-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={discipline.code}
                className="vg-system-stage-inner"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32 }}
              >
                <div className="vg-system-stage-head">
                  <div className="vg-system-icon"><Icon name={discipline.icon} /></div>
                  <div><small>ACTIVE SYSTEM / {String(active + 1).padStart(2, '0')}</small><h3>{discipline.title}</h3></div>
                  <span className="vg-system-live"><i /> system mapped</span>
                </div>

                <p className="vg-system-description">{discipline.description}</p>

                <div className="vg-signal-chain" aria-label={`${discipline.code} signal chain`}>
                  {chain.map((item, index) => (
                    <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < chain.length - 1 ? <i /> : null}</div>
                  ))}
                </div>

                <div className="vg-system-detail-grid">
                  <div>
                    <small>CAPABILITY SET</small>
                    <ul>{discipline.skills.map((skill) => <li key={skill}><Icon name="check" />{skill}</li>)}</ul>
                  </div>
                  <div>
                    <small>SYSTEM PROFILE</small>
                    <dl>{metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="vg-capability-strip">
          <div className="vg-capability-strip-head"><span>SELECTED CAPABILITIES</span><strong>Focused depth within the active discipline</strong></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="vg-capability-cards"
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCapabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>{String(active * 2 + index + 1).padStart(2, '0')}</span>
                  <Icon name={capability.icon} />
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
