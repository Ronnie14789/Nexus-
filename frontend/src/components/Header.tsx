import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/Icon';

const navLinks = [
  { href: '#about', label: 'Profile', no: '01' },
  { href: '#systems', label: 'Systems', no: '02' },
  { href: '#experience', label: 'Field record', no: '03' },
  { href: '#education', label: 'Training', no: '04' },
  { href: '#journey', label: 'Journey', no: '05' },
  { href: '#work', label: 'Casebook', no: '06' },
  { href: '#contact', label: 'Contact', no: '07' },
];

const publicPages = [
  { to: '/executive-intelligence', label: 'Executive', no: '08' },
  { to: '/knowledge-vault', label: 'Knowledge', no: '09' },
  { to: '/electrical-systems', label: 'Electrical', no: '10' },
  { to: '/automotive-systems', label: 'Automotive', no: '11' },
  { to: '/digital-systems', label: 'Digital', no: '12' },
  { to: '/about', label: 'About', no: '13' },
];

export default function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrolled(y > 28);
      setProgress(Math.min(1, y / max));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-22% 0px -68% 0px', threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (location.pathname.startsWith('/admin')) return null;

  const openCommand = () => window.dispatchEvent(new Event('portfolio:command'));
  const pageActive = (to: string) =>
    location.pathname === to ||
    (to === '/automotive-systems' && location.pathname.startsWith('/automotive-systems/'));

  return (
    <header className={`nx-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nx-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav className="nx-nav" aria-label="Primary navigation">
        <Link className="nx-brand" to="/" aria-label={`${siteConfig.name} portfolio home`}>
          <span className="nx-brand-mark" aria-hidden="true">ER</span>
          <span className="nx-brand-copy"><strong>{siteConfig.name}</strong><small>Systems Engineer · Kampala</small></span>
        </Link>

        <ul className="nx-nav-links">
          {navLinks.map((link) => {
            const href = location.pathname === '/' ? link.href : `/${link.href}`;

            return (
              <li key={link.href}>
                <a
                  href={href}
                  className={
                    location.pathname === '/' &&
                    activeSection === link.href.slice(1)
                      ? 'active'
                      : ''
                  }
                >
                  <span>{link.no}</span>{link.label}
                </a>
              </li>
            );
          })}
          {publicPages.map((page) => (
            <li key={page.to}>
              <Link to={page.to} className={pageActive(page.to) ? 'active' : ''}>
                <span>{page.no}</span>{page.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nx-nav-actions">
          <button className="nx-command" type="button" onClick={openCommand} aria-label="Open quick navigation">
            <Icon name="search" /><span>Navigate</span><kbd>⌘ K</kbd>
          </button>
          <button className="nx-theme" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <a
            className="nx-nav-cta"
            href={location.pathname === '/' ? '#contact' : '/#contact'}
          >Connect <Icon name="arrow" /></a>
          <button className="nx-menu-button" type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
            <span>{menuOpen ? 'Close' : 'Menu'}</span><Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="nx-mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nx-mobile-menu-head"><span>Portfolio index</span><small>{siteConfig.location}</small></div>
            <ul>
              {navLinks.map((link, index) => {
                const href = location.pathname === '/' ? link.href : `/${link.href}`;

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.045 }}
                  >
                    <a href={href} onClick={() => setMenuOpen(false)}>
                      <span>{link.no}</span>
                      <strong>{link.label}</strong>
                      <Icon name="arrow" />
                    </a>
                  </motion.li>
                );
              })}
              {publicPages.map((page, index) => (
                <motion.li
                  key={page.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + index) * 0.045 }}
                >
                  <Link to={page.to} onClick={() => setMenuOpen(false)}>
                    <span>{page.no}</span>
                    <strong>{page.label}</strong>
                    <Icon name="arrow" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="nx-mobile-menu-footer">
              <p>{siteConfig.role}</p>
              <a href={siteConfig.emailHref}>{siteConfig.email}</a>
              <span>Uganda · India · Uganda</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
