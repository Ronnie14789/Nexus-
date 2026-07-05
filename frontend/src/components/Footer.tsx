import { siteConfig } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="vg-footer">
      <div className="vg-footer-ticker" aria-hidden="true">
        <span>ECATU RONALD · ELECTRICAL · AUTOMOTIVE · DIGITAL · UGANDA · INDIA ·</span>
        <span>ECATU RONALD · ELECTRICAL · AUTOMOTIVE · DIGITAL · UGANDA · INDIA ·</span>
      </div>

      <div className="vg-shell vg-footer-hero">
        <span>ENGINEERING RELIABLE SYSTEMS</span>
        <h2>Building a career<br />worthy of trust.</h2>
        <a href="#hero">Return to top <Icon name="arrow" /></a>
      </div>

      <div className="vg-shell vg-footer-grid">
        <div className="vg-footer-identity">
          <a className="vg-footer-brand" href="#hero"><span>ER</span><div><strong>{siteConfig.name}</strong><small>{siteConfig.role}</small></div></a>
          <p>Uganda-based. Internationally trained. Focused on practical, traceable and dependable engineering decisions.</p>
        </div>
        <div><span>Explore</span><a href="#about">Profile</a><a href="#systems">Systems</a><a href="#experience">Experience</a><a href="#journey">Journey</a><a href="#work">Selected work</a></div>
        <div><span>Connect</span><a href={siteConfig.emailHref}>{siteConfig.email} <Icon name="arrow" /></a><a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">WhatsApp <Icon name="external" /></a><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a></div>
        <div className="vg-footer-status"><span>Current base</span><strong>Kampala, Uganda</strong><p>Available for meaningful technical, engineering and digital collaboration.</p></div>
      </div>

      <div className="vg-shell vg-footer-bottom"><p>© {year} {siteConfig.name}. Personal professional portfolio.</p><p>Clarity · accessibility · performance · integrity</p></div>
    </footer>
  );
}
