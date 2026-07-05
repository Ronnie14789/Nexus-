import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { gallery } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';

export default function TrainingGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => current === null ? 0 : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => current === null ? 0 : (current - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex]);

  const selectedIndex = activeIndex ?? 0;
  const activeImage = activeIndex === null ? null : gallery[selectedIndex];

  return (
    <section id="gallery" className="vg-section vg-gallery" aria-labelledby="gallery-title">
      <div className="vg-section-index" aria-hidden="true">07</div>
      <div className="vg-shell">
        <div className="vg-gallery-head">
          <div>
            <p className="vg-eyebrow"><span>07</span> India training archive</p>
            <h2 id="gallery-title">The people, machines and places behind the learning.</h2>
          </div>
          <p><span>{String(gallery.length).padStart(2, '0')}</span> documented moments · select an image to expand</p>
        </div>

        <div className="vg-gallery-grid">
          {gallery.map((image, index) => (
            <motion.button
              key={`${image.src}-${image.title}`}
              type="button"
              className={`vg-gallery-item vg-gallery-${image.orientation} vg-gallery-${index + 1}`}
              onClick={() => setActiveIndex(index)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.54, delay: index * 0.035 }}
              aria-label={`Open image: ${image.title}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span className="vg-gallery-shade" />
              <span className="vg-gallery-copy"><small>{String(index + 1).padStart(2, '0')} / INDIA</small><strong>{image.title}</strong><span>{image.caption}</span></span>
              <span className="vg-gallery-open"><Icon name="external" /></span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="vg-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <button className="vg-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close image viewer"><Icon name="x" /></button>
            <button className="vg-lightbox-nav vg-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((selectedIndex - 1 + gallery.length) % gallery.length); }} aria-label="Previous image"><Icon name="arrow" /></button>
            <motion.figure initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} onClick={(event) => event.stopPropagation()}>
              <img src={activeImage.src} alt={activeImage.alt} />
              <figcaption><small>{String(selectedIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</small><div><strong>{activeImage.title}</strong><span>{activeImage.caption}</span></div></figcaption>
            </motion.figure>
            <button className="vg-lightbox-nav vg-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((selectedIndex + 1) % gallery.length); }} aria-label="Next image"><Icon name="arrow" /></button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
