import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import '@/styles/automotive-intelligence-shell.css';

const hubLinks = [
  { to: '/automotive-systems', label: 'Overview', code: '01' },
  { to: '/automotive-systems/intelligence', label: 'Service intelligence', code: '02' },
  { to: '/automotive-systems/diagnostics', label: 'Diagnose a fault', code: '03' },
  { to: '/automotive-systems/intelligence#records', label: 'Field cases', code: '04' },
  { to: '/automotive-systems/intelligence#knowledge', label: 'Knowledge', code: '05' },
  { to: '/automotive-systems#operating-cycle', label: 'Calculators', code: '06' },
  { to: '/automotive-systems/intelligence#reporting', label: 'Reports', code: '07' },
];

export default function AutomotiveHubNav() {
  const location = useLocation();
  const isActive = (to: string) => {
    const [pathname, hash] = to.split('#');
    if (hash) return location.pathname === pathname && location.hash === `#${hash}`;
    return location.pathname === pathname;
  };

  return (
    <nav className="aih-nav" aria-label="Automotive Intelligence Centre">
      <div className="aih-nav-shell">
        <Link className="aih-nav-brand" to="/automotive-systems">
          <span>NX / MOTION</span>
          <strong>Automotive Intelligence Centre</strong>
        </Link>
        <div className="aih-nav-links">
          {hubLinks.map((item) => (
            <Link key={item.to} to={item.to} className={isActive(item.to) ? 'active' : ''}>
              <span>{item.code}</span>{item.label}
            </Link>
          ))}
        </div>
        <Link className="aih-nav-command" to="/automotive-systems/diagnostics">
          Diagnose <Icon name="arrow" />
        </Link>
      </div>
    </nav>
  );
}
