import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { siteConfig } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/Icon';

const commands = [
  { key: '01', label: 'Profile', detail: 'Story, principles and direction', href: '#about' },
  { key: '02', label: 'Systems atlas', detail: 'Power, motion and intelligence', href: '#systems' },
  { key: '03', label: 'Executive Intelligence', detail: 'Mission control, platform pulse, global command and roadmap', href: '/executive-intelligence' },
  { key: '04', label: 'Automotive Intelligence Centre', detail: 'Real field cases, fault context, measurements, test plans and verification', href: '/automotive-systems/intelligence' },
  { key: '05', label: 'Automotive Diagnostics', detail: 'Rank evidence-supported hypotheses and build a test plan', href: '/automotive-systems/diagnostics' },
  { key: '06', label: 'Automotive systems', detail: 'Vehicle architecture, powertrain, chassis and control', href: '/automotive-systems' },
  { key: '07', label: 'Engineering Knowledge Vault', detail: 'Cross-domain procedures, cases and verification evidence', href: '/knowledge-vault' },
  { key: '08', label: 'Electrical systems', detail: 'Power, protection, control and diagnostics', href: '/electrical-systems' },
  { key: '09', label: 'Digital systems', detail: 'Architecture, data, cloud, security and operations', href: '/digital-systems' },
  { key: '10', label: 'Experience', detail: 'Roles and responsibilities', href: '#experience' },
  { key: '11', label: 'Education', detail: 'Uganda and India', href: '#education' },
  { key: '12', label: 'Journey', detail: 'Uganda → India → Uganda', href: '#journey' },
  { key: '13', label: 'Selected work', detail: 'Case studies and systems', href: '#work' },
  { key: '14', label: 'Training archive', detail: 'SkillPro visual record', href: '#gallery' },
  { key: '15', label: 'Contact', detail: 'First-party secure contact form', href: '#contact' },
  { key: '16', label: 'About Ecatu Ronald', detail: 'Professional identity and verified profiles', href: '/about' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return commands;
    return commands.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(clean));
  }, [query]);

  useEffect(() => {
    const openPalette = () => setOpen(true);
    const keyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('portfolio:command', openPalette);
    window.addEventListener('keydown', keyboard);
    return () => {
      window.removeEventListener('portfolio:command', openPalette);
      window.removeEventListener('keydown', keyboard);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery('');

    if (href.startsWith('/')) {
      window.location.assign(href);
      return;
    }

    if (window.location.pathname !== '/') {
      window.location.assign(`/${href}`);
      return;
    }

    window.setTimeout(
      () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }),
      80,
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="vg-command-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            className="vg-command-panel"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <div className="vg-command-search">
              <Icon name="diagnostics" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                placeholder="Search Nexus systems…"
                aria-label="Search portfolio and system pages"
              />
              <kbd>ESC</kbd>
            </div>

            <div className="vg-command-label">Navigate</div>
            <div className="vg-command-results">
              {filtered.map((item) => (
                <button key={item.href} type="button" onClick={() => navigate(item.href)}>
                  <span>{item.key}</span>
                  <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                  <Icon name="arrow" />
                </button>
              ))}
              {!filtered.length ? <p>No matching Nexus section found.</p> : null}
            </div>

            <div className="vg-command-actions">
              <button type="button" onClick={toggleTheme}>
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                Switch to {theme === 'dark' ? 'light' : 'dark'} mode
              </button>
              <a href={siteConfig.emailHref}><Icon name="mail" /> Email Ronald</a>
              <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer"><Icon name="phone" /> WhatsApp</a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
