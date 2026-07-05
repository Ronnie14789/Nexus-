import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

function KampalaClock() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Kampala',
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <>{time} EAT</>;
}

const evidence = [
  { value: '2022—NOW', label: 'Technical field experience' },
  { value: '06 MONTHS', label: 'SkillPro · India' },
  { value: '03 SYSTEMS', label: 'Electrical · Automotive · Digital' },
  { value: '02 COUNTRIES', label: 'Uganda · India' },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="tx-hero" aria-labelledby="hero-title">
      <div className="tx-hero-atmosphere" aria-hidden="true" />
      <div className="tx-hero-grid" aria-hidden="true" />
      <div className="tx-hero-arc tx-arc-a" aria-hidden="true" />
      <div className="tx-hero-arc tx-arc-b" aria-hidden="true" />

      <div className="tx-hero-side-rail" aria-hidden="true">
        <span>ECATU RONALD</span><i /><span>ENGINEERING PORTFOLIO · 2026</span>
      </div>

      <div className="tx-shell tx-hero-layout">
        <motion.div
          className="tx-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tx-hero-meta">
            <span className="tx-availability"><i /> Available for meaningful engineering opportunities</span>
            <span>Kampala · <KampalaClock /></span>
          </div>

          <p className="tx-kicker">ELECTRICAL · AUTOMOTIVE · DIGITAL SYSTEMS</p>
          <h1 id="hero-title">
            <span>Engineering</span>
            <span>systems that</span>
            <em>earn trust.</em>
          </h1>

          <div className="tx-mobile-portrait" aria-hidden="true">
            <img src="/images/ecatu-hero-760.webp" alt="" />
            <div><small>SKILLPRO · INDIA · 2025</small><strong>International technical development</strong></div>
          </div>

          <div className="tx-hero-intro-grid">
            <p>
              I am <strong>{siteConfig.name}</strong>, an {siteConfig.role} connecting field evidence,
              diagnostic discipline and digital thinking across Uganda and India.
            </p>
            <div className="tx-hero-principle">
              <small>OPERATING PRINCIPLE</small>
              <strong>Understand the complete system before deciding.</strong>
            </div>
          </div>

          <div className="tx-hero-actions">
            <a className="tx-button tx-button-primary" href="#work">View case files <Icon name="arrow" /></a>
            <a className="tx-button tx-button-quiet" href="#journey">Explore the journey <Icon name="arrow" /></a>
          </div>

          <div className="tx-evidence-ledger" aria-label="Professional evidence summary">
            {evidence.map((item) => (
              <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="tx-hero-visual"
          initial={reduceMotion ? false : { opacity: 0, x: 48, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tx-portrait-shell">
            <div className="tx-portrait-number">01</div>
            <div className="tx-portrait-frame">
              <picture>
                <source media="(max-width: 720px)" srcSet="/images/ecatu-hero-760.webp" />
                <source media="(max-width: 1200px)" srcSet="/images/ecatu-hero-1100.webp" />
                <img src="/images/ecatu-hero.webp" alt="Ecatu Ronald in a blue Tata Motors SkillPro training shirt" width="1448" height="1086" fetchPriority="high" />
              </picture>
              <div className="tx-portrait-shade" />
              <div className="tx-portrait-scan" aria-hidden="true" />
            </div>

            <div className="tx-portrait-caption">
              <small>INTERNATIONAL DEVELOPMENT / 2025</small>
              <strong>Tata Motors SkillPro</strong>
              <span>Jamshedpur · India</span>
            </div>

            <motion.div
              className="tx-method-card"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="tx-method-card-head"><span>DIAGNOSTIC METHOD</span><i /></div>
              <ol>
                <li><b>01</b><span>Observe</span></li>
                <li><b>02</b><span>Test</span></li>
                <li><b>03</b><span>Isolate</span></li>
                <li><b>04</b><span>Verify</span></li>
                <li><b>05</b><span>Document</span></li>
              </ol>
            </motion.div>

            <div className="tx-route-card">
              <small>PROFESSIONAL ROUTE</small>
              <div><span>UG</span><i /><span>IN</span><i /><span>UG</span></div>
              <strong>Foundation → expansion → application</strong>
            </div>

            <div className="tx-portrait-stamp" aria-hidden="true">
              <span>ER</span><small>SYSTEMS / 2026</small>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="tx-hero-bottom">
        <div className="tx-shell">
          <span>Scroll to enter the field record</span><i /><span>Power · Motion · Intelligence</span>
        </div>
      </div>
    </section>
  );
}
