import Icon from '@/components/ui/Icon';
import NexusMark from '@/components/brand/NexusMark';
import { siteConfig } from '@/data/portfolio';

export default function NexusFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="nx-footer">
      <div className="nx-footer-marquee" aria-hidden="true">
        <span>POWER · MOTION · INTELLIGENCE · EVIDENCE · INTEGRITY · SERVICE ·</span>
        <span>POWER · MOTION · INTELLIGENCE · EVIDENCE · INTEGRITY · SERVICE ·</span>
      </div>

      <div className="nx-shell nx-footer-main">
        <div className="nx-footer-statement">
          <div className="nx-footer-brand-lockup">
            <NexusMark />
            <div><strong>NEXUS</strong><span>Power · Motion · Intelligence<br />by Ecatu Ronald</span></div>
          </div>
          <small>FUTURE SYSTEMS COMPANY / PROFESSIONAL FOUNDATION</small>
          <h2>Connecting systems.<br />Building trust.</h2>
          <a href="/#hero">Return to the beginning <Icon name="arrow" /></a>
        </div>

        <div className="nx-footer-columns">
          <div>
            <span>Explore</span>
            <a href="/#about">Profile</a>
            <a href="/#nexus-company">Nexus company</a>
            <a href="/#systems">Systems</a>
            <a href="/#experience">Field record</a>
            <a href="/#journey">Journey</a>
            <a href="/#work">Casebook</a>
          </div>
          <div>
            <span>Connect</span>
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
            <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">WhatsApp <Icon name="external" /></a>
            <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a>
          </div>
          <div className="nx-footer-status">
            <span>Current base</span>
            <strong>{siteConfig.location}</strong>
            <p>Available for meaningful engineering, technical and digital collaboration.</p>
          </div>
        </div>
      </div>

      <div className="nx-shell nx-footer-bottom">
        <p>© {year} {siteConfig.name}. Nexus is presented here as a future company direction.</p>
        <p>Power · motion · intelligence · integrity</p>
      </div>
    </footer>
  );
}
