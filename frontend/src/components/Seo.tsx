import { useEffect } from 'react';

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  jsonLd?: JsonLd;
}

const HOME_TITLE = 'Ecatu Ronald | Electrical & Automotive Systems Engineer';
const HOME_DESCRIPTION =
  'The professional portfolio of Ecatu Ronald, an Electrical & Automotive Systems Engineer in Kampala, Uganda, specialising in commercial-vehicle diagnostics, electrical systems, technical reporting and digital development.';
const SITE_URL = 'https://ecaturonald.tech';

const upsertMeta = (
  attribute: 'name' | 'property',
  key: string,
  content: string,
) => {
  const existing = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}]`),
  ).find((element) => element.getAttribute(attribute) === key);

  const element = existing ?? document.createElement('meta');

  if (!existing) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (url: string) => {
  let canonical =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = url;
};

export default function Seo({
  title,
  description,
  canonicalPath,
  image = '/images/og-portfolio.jpg',
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', 'Ecatu Ronald');
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:type', 'profile');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    setCanonical(canonicalUrl);

    const scriptId = 'page-structured-data';
    document.getElementById(scriptId)?.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
      document.title = HOME_TITLE;

      upsertMeta('name', 'description', HOME_DESCRIPTION);
      upsertMeta('property', 'og:type', 'website');
      upsertMeta('property', 'og:title', HOME_TITLE);
      upsertMeta('property', 'og:description', HOME_DESCRIPTION);
      upsertMeta('property', 'og:url', `${SITE_URL}/`);
      upsertMeta('property', 'og:image', `${SITE_URL}/images/og-portfolio.jpg`);

      setCanonical(`${SITE_URL}/`);
    };
  }, [canonicalPath, description, image, jsonLd, title]);

  return null;
}
