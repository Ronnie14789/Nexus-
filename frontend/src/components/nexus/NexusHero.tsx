import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import NexusMark from '@/components/brand/NexusMark';
import { siteConfig } from '@/data/portfolio';

function KampalaClock() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Kampala',
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return <>{time} EAT</>;
}

const disciplines = [
  { no: '01', label: 'POWER', title: 'Electrical systems', icon: 'electrical' as const },
  { no: '02', label: 'MOTION', title: 'Automotive systems', icon: 'engine' as const },
  { no: '03', label: 'INTELLIGENCE', title: 'Digital systems', icon: 'code' as const },
];

const method = ['Observe', 'Measure', 'Isolate', 'Verify', 'Document'];

export default function NexusHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="nx-hero" aria-labelledby="nx-hero-title">
      <div className="nx-hero-noise" aria-hidden="true" />
      <div className="nx-hero-orbit nx-hero-orbit-a" aria-hidden="true" />
      <div className="nx-hero-orbit nx-hero-orbit-b" aria-hidden="true" />
      <div className="nx-hero-wordmark" aria-hidden="true">NEXUS</div>

      <div className="nx-shell nx-hero-layout">
        <motion.div
          className="nx-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nx-hero-topline">
            <span className="nx-live"><i /> Open to meaningful engineering opportunities</span>
            <span>Kampala, Uganda · <KampalaClock /></span>
          </div>

          <p className="nx-overline">NEXUS / POWER · MOTION · INTELLIGENCE</p>
          <h1 id="nx-hero-title">
            <span>Evidence</span>
            <span>becomes</span>
            <em>engineering.</em>
          </h1>

          <div className="nx-hero-summary">
            <p>
              I am <strong>{siteConfig.name}</strong>. I connect electrical power, commercial-vehicle
              diagnostics and digital systems to make technical decisions clearer, safer and more reliable.
            </p>
            <div className="nx-hero-quote">
              <small>THE STANDARD</small>
              <strong>Understand the complete system before deciding.</strong>
            </div>
          </div>

          <div className="nx-hero-actions">
            <a className="nx-btn nx-btn-primary" href="#work">Explore case files <Icon name="arrow" /></a>
            <a className="nx-btn nx-btn-line" href="#journey">Follow the Uganda–India journey <Icon name="arrow" /></a>
          </div>

          <div className="nx-hero-disciplines" aria-label="Engineering disciplines">
            {disciplines.map((item) => (
              <a key={item.no} href="#systems">
                <span>{item.no}</span>
                <Icon name={item.icon} />
                <div><small>{item.label}</small><strong>{item.title}</strong></div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="nx-hero-portrait"
          initial={reduceMotion ? false : { opacity: 0, x: 56, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.08, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nx-hero-company-mark">
            <NexusMark animated />
            <div><small>FUTURE SYSTEMS COMPANY</small><strong>NEXUS</strong></div>
          </div>
          <div className="nx-portrait-frame">
            <picture>
              <source media="(max-width: 720px)" srcSet="/images/ecatu-hero-760.webp" />
              <source media="(max-width: 1200px)" srcSet="/images/ecatu-hero-1100.webp" />
              <img
                src="/images/ecatu-hero.webp"
                alt="Ecatu Ronald wearing a blue Tata Motors SkillPro training shirt"
                width="1448"
                height="1086"
                fetchPriority="high"
              />
            </picture>
            <div className="nx-portrait-light" aria-hidden="true" />
            <div className="nx-portrait-lines" aria-hidden="true" />
          </div>

          <div className="nx-portrait-caption">
            <small>INTERNATIONAL TECHNICAL DEVELOPMENT</small>
            <strong>Tata Motors SkillPro · Jamshedpur, India</strong>
            <span>Six-month professional development programme · 2025</span>
          </div>

          <div className="nx-route-chip">
            <small>FIELD ROUTE</small>
            <div><b>UG</b><i /><b>IN</b><i /><b>UG</b></div>
            <span>Foundation → expansion → application</span>
          </div>

          <motion.div
            className="nx-method-card"
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="nx-method-head"><span>DIAGNOSTIC LOOP</span><i /></div>
            <ol>
              {method.map((item, index) => (
                <li key={item}><b>{String(index + 1).padStart(2, '0')}</b><span>{item}</span></li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>

      <div className="nx-hero-footer">
        <div className="nx-shell">
          <span>SCROLL TO ENTER THE FIELD RECORD</span>
          <i />
          <span>POWER · MOTION · INTELLIGENCE</span>
        </div>
      </div>
    </section>
  );
}
