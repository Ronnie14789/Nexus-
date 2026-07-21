import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';
import NexusMark from '@/components/brand/NexusMark';

const companyDomains = [
  {
    code: '01 / POWER',
    title: 'Nexus Electrical',
    description: 'Power, control, distribution, protection and evidence-led electrical service.',
    to: '/electrical-systems',
    tone: 'power',
  },
  {
    code: '02 / MOTION',
    title: 'Nexus Automotive',
    description: 'Vehicle systems, diagnostics, service intelligence and reliability operations.',
    to: '/automotive-systems',
    tone: 'motion',
  },
  {
    code: '03 / INTELLIGENCE',
    title: 'Nexus Digital',
    description: 'Software, data and practical tools that improve technical decision-making.',
    to: '/digital-systems',
    tone: 'intelligence',
  },
] as const;

const companyRoadmap = [
  {
    phase: 'NOW',
    title: 'Professional foundation',
    description: 'Build trusted field experience, technical evidence, public work and a clear operating standard.',
  },
  {
    phase: 'NEXT',
    title: 'Product platform',
    description: 'Turn the Knowledge Vault, diagnostics and workflow tools into focused Nexus products.',
  },
  {
    phase: 'FUTURE',
    title: 'Systems company',
    description: 'Form a responsible company delivering connected engineering, digital and advisory services.',
  },
] as const;

export default function NexusCompany() {
  return (
    <section id="nexus-company" className="nx-company" aria-labelledby="nx-company-title">
      <div className="nx-company-grid" aria-hidden="true" />
      <div className="nx-shell">
        <header className="nx-company-head">
          <div>
            <p className="nx-company-kicker"><span>00</span> The company seed</p>
            <h2 id="nx-company-title">Nexus is where systems connect.</h2>
          </div>
          <div className="nx-company-definition">
            <strong>NEXUS /ˈnɛksəs/</strong>
            <p>A central connection between people, machines, power and intelligence—built to turn separate capabilities into one dependable operating system.</p>
          </div>
        </header>

        <div className="nx-company-core">
          <div className="nx-company-symbol">
            <NexusMark animated title="Nexus orbital company mark connecting power, motion and intelligence" />
            <div className="nx-company-axis nx-company-axis--power"><i /><span>POWER</span></div>
            <div className="nx-company-axis nx-company-axis--motion"><i /><span>MOTION</span></div>
            <div className="nx-company-axis nx-company-axis--intelligence"><i /><span>INTELLIGENCE</span></div>
          </div>

          <div className="nx-company-manifesto">
            <p className="nx-company-status"><i /> Company concept · identity system 01</p>
            <h3>One name for a future built across three connected domains.</h3>
            <p>
              Nexus begins with Ecatu Ronald’s professional portfolio. Its long-term direction is a systems company that connects physical engineering, field service and digital intelligence without losing evidence, safety or human responsibility.
            </p>
            <div className="nx-company-principle">
              <span>THE OPERATING IDEA</span>
              <strong>Observe the whole. Connect the evidence. Improve the system.</strong>
            </div>
          </div>
        </div>

        <div className="nx-company-domains" aria-label="Future Nexus company domains">
          {companyDomains.map((domain) => (
            <Link key={domain.title} className={`nx-company-domain nx-company-domain--${domain.tone}`} to={domain.to}>
              <span>{domain.code}</span>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
              <small>Explore domain <Icon name="arrow" /></small>
            </Link>
          ))}
        </div>

        <div className="nx-company-roadmap">
          <div className="nx-company-roadmap-head">
            <span>COMPANY DEVELOPMENT PATH</span>
            <p>Growth is presented as a direction—not as a claim that Nexus is already incorporated.</p>
          </div>
          <ol>
            {companyRoadmap.map((item, index) => (
              <li key={item.phase}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <div><small>{item.phase}</small><strong>{item.title}</strong><p>{item.description}</p></div>
              </li>
            ))}
          </ol>
          <div className="nx-company-actions">
            <Link to="/executive-intelligence">Open the Nexus roadmap <Icon name="arrow" /></Link>
            <Link to="/knowledge-vault">Enter the Knowledge Vault <Icon name="arrow" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
