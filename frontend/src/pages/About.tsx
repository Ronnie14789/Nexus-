import Seo from '@/components/Seo';
import NexusFooter from '@/components/nexus/NexusFooter';
import {
  disciplines,
  education,
  experience,
  siteConfig,
} from '@/data/portfolio';
import '@/about.css';

const description =
  'Professional profile of Ecatu Ronald, a Ugandan Electrical and Automotive Systems Engineer working across commercial-vehicle diagnostics, electrical systems, technical reporting, workshop operations and digital development.';

const sameAs = [
  siteConfig.socialLinks.linkedin,
  siteConfig.socialLinks.github,
].filter((value): value is string => Boolean(value));

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://ecaturonald.tech/about#profile-page',
  url: 'https://ecaturonald.tech/about',
  name: 'About Ecatu Ronald',
  headline: 'Ecatu Ronald — Electrical & Automotive Systems Engineer',
  description,
  dateModified: '2026-07-12',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://ecaturonald.tech/#person',
    name: siteConfig.name,
    alternateName: ['Ronald Ecatu', 'EcatuRonald'],
    url: 'https://ecaturonald.tech/',
    image: 'https://ecaturonald.tech/images/ecatu-hero.webp',
    email: siteConfig.emailHref,
    telephone: siteConfig.mobile,
    jobTitle: siteConfig.role,
    description,
    nationality: {
      '@type': 'Country',
      name: 'Uganda',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.employer,
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Uganda Technical College Elgon',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Tata Motors Service Training Centre',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jamshedpur',
          addressCountry: 'IN',
        },
      },
    ],
    knowsLanguage: siteConfig.languages,
    knowsAbout: [
      'Commercial vehicle diagnostics',
      'Automotive electrical systems',
      'Diesel engine systems',
      'Common-rail fuel systems',
      'BS6 emissions and aftertreatment',
      'Cummins INSITE',
      'Tata Diagnostic Software',
      'Warranty technical reporting',
      'Workshop operations',
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
    ],
    sameAs,
  },
};

export default function About() {
  return (
    <>
      <Seo
        title="About Ecatu Ronald | Electrical & Automotive Systems Engineer"
        description={description}
        canonicalPath="/about"
        image="/images/ecatu-hero.webp"
        jsonLd={profileSchema}
      />

      <a className="skip-link" href="#about-main">
        Skip to profile
      </a>

      <main id="about-main" className="about-page">
        <section className="about-hero">
          <div className="nx-shell about-hero-grid">
            <div className="about-hero-copy">
              <p className="nx-eyebrow">
                <span>Professional identity</span>
              </p>

              <h1>
                Ecatu
                <em> Ronald</em>
              </h1>

              <p className="about-lead">
                I connect electrical power, commercial-vehicle diagnostics,
                technical operations and digital systems to make engineering
                decisions clearer, safer and more reliable.
              </p>

              <div className="about-actions">
                <a href="/#contact" className="about-primary">
                  Start a professional conversation
                </a>

                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="me noreferrer"
                  className="about-secondary"
                >
                  LinkedIn profile
                </a>
              </div>
            </div>

            <figure className="about-portrait">
              <img
                src="/images/ecatu-hero.webp"
                alt="Ecatu Ronald, Electrical and Automotive Systems Engineer"
              />
              <figcaption>
                <strong>{siteConfig.role}</strong>
                <span>{siteConfig.location}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="about-section">
          <div className="nx-shell about-two-column">
            <header>
              <p className="nx-eyebrow">
                <span>01 · Profile</span>
              </p>
              <h2>A systems-minded technical professional.</h2>
            </header>

            <div className="about-prose">
              <p>
                I am a Ugandan technical professional with practical experience
                across electrical engineering, automotive diagnostics,
                commercial-vehicle maintenance, warranty reporting and digital
                development.
              </p>

              <p>
                My work combines hands-on inspection, diagnostic software,
                electrical testing, mechanical analysis and clear technical
                documentation. I focus on confirming evidence before making
                repair recommendations.
              </p>

              <p>
                My professional development includes Tata Motors SkillPro
                training in Jamshedpur, India, with emphasis on BS6 systems,
                driveline, workshop practice, Cummins INSITE and Tata Diagnostic
                Software.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section about-dark">
          <div className="nx-shell">
            <header className="about-section-heading">
              <p className="nx-eyebrow">
                <span>02 · Technical scope</span>
              </p>
              <h2>Electrical, automotive and digital systems.</h2>
              <p>
                Three connected disciplines supporting safer diagnosis,
                stronger communication and better technical decisions.
              </p>
            </header>

            <div className="about-discipline-grid">
              {disciplines.map((discipline) => (
                <article key={discipline.code}>
                  <small>{discipline.code}</small>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.description}</p>
                  <ul>
                    {discipline.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="nx-shell">
            <header className="about-section-heading">
              <p className="nx-eyebrow">
                <span>03 · Field record</span>
              </p>
              <h2>Professional experience.</h2>
            </header>

            <div className="about-timeline">
              {experience.map((item) => (
                <article key={`${item.company}-${item.period}`}>
                  <div className="about-time">
                    <span>{item.period}</span>
                    <small>{item.location}</small>
                  </div>

                  <div>
                    <h3>{item.role}</h3>
                    <strong>{item.company}</strong>
                    <p>{item.description}</p>
                    <ul>
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section about-training">
          <div className="nx-shell">
            <header className="about-section-heading">
              <p className="nx-eyebrow">
                <span>04 · Education and training</span>
              </p>
              <h2>Learning applied to real systems.</h2>
            </header>

            <div className="about-training-grid">
              {education.map((item) => (
                <article key={`${item.institution}-${item.period}`}>
                  <small>{item.period}</small>
                  <h3>{item.qualification}</h3>
                  <strong>{item.institution}</strong>
                  <span>{item.location}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section about-identity">
          <div className="nx-shell about-identity-grid">
            <div>
              <p className="nx-eyebrow">
                <span>05 · Verified identity</span>
              </p>
              <h2>Follow the official profiles.</h2>
              <p>
                These are the official public profiles and contact channels for
                Ecatu Ronald.
              </p>
            </div>

            <div className="about-identity-links">
              <a href="https://ecaturonald.tech/" rel="me">
                <span>Official website</span>
                <strong>ecaturonald.tech</strong>
              </a>

              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="me noreferrer"
              >
                <span>LinkedIn</span>
                <strong>Ronald Ecatu</strong>
              </a>

              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="me noreferrer"
              >
                <span>GitHub</span>
                <strong>Ronnie14789</strong>
              </a>

              <a href={siteConfig.emailHref}>
                <span>Email</span>
                <strong>{siteConfig.email}</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <NexusFooter />
    </>
  );
}
