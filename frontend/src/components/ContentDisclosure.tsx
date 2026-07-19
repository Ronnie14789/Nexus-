import Icon from '@/components/ui/Icon';
import {
  contentTrustProfiles,
  type PublicContentPage,
} from '@/data/contentTrust';
import '@/components/content-disclosure.css';

interface ContentDisclosureProps {
  page: PublicContentPage;
}

export default function ContentDisclosure({ page }: ContentDisclosureProps) {
  const profile = contentTrustProfiles[page];

  return (
    <section className={`content-disclosure content-disclosure--${page}`} aria-labelledby={`content-trust-${page}`}>
      <div className="content-disclosure-shell">
        <header className="content-disclosure-heading">
          <p><span>CONTENT TRUST</span><i /> EVIDENCE &amp; SCOPE</p>
          <h2 id={`content-trust-${page}`}>{profile.title}</h2>
          <p>{profile.summary}</p>
        </header>

        <dl className="content-disclosure-grid">
          <div>
            <dt>Evidence basis</dt>
            <dd>{profile.evidenceBasis}</dd>
          </div>
          <div>
            <dt>Scope boundary</dt>
            <dd>{profile.scopeBoundary}</dd>
          </div>
          <div>
            <dt>Last reviewed</dt>
            <dd><strong>{profile.reviewed}</strong><span>{profile.reviewLabel}</span></dd>
          </div>
        </dl>

        <div className="content-disclosure-references">
          <span>References and provenance</span>
          <div>
            {profile.references.map((reference) => {
              const content = (
                <>
                  <small>{reference.authority}</small>
                  <strong>{reference.label}</strong>
                  {reference.href ? <Icon name="external" /> : <Icon name="report" />}
                </>
              );

              return reference.href ? (
                <a
                  key={`${reference.authority}-${reference.label}`}
                  href={reference.href}
                  target={reference.href.startsWith('http') ? '_blank' : undefined}
                  rel={reference.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {content}
                </a>
              ) : (
                <article key={`${reference.authority}-${reference.label}`}>{content}</article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
