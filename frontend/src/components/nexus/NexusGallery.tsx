import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { gallery } from '@/data/portfolio';

export function NexusGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((selected + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setSelected((selected - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="gallery" className="nx-section nx-gallery" aria-labelledby="nx-gallery-title">
      <div className="nx-section-number" aria-hidden="true">07</div>
      <div className="nx-shell">
        <div className="nx-section-head nx-section-head-wide">
          <div>
            <p className="nx-eyebrow"><span>07</span> International field archive</p>
            <h2 id="nx-gallery-title">People, machines and places that expanded the system.</h2>
          </div>
          <p>
            A visual record of SkillPro, technical learning, industry exposure, teamwork and the wider India experience.
          </p>
        </div>

        <div className="nx-gallery-grid">
          {gallery.map((item, index) => (
            <motion.button
              type="button"
              key={item.src}
              className={`nx-gallery-item nx-gallery-${index + 1}`}
              onClick={() => setSelected(index)}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="nx-gallery-count">{String(index + 1).padStart(2, '0')}</span>
              <div><small>{item.title}</small><strong>{item.caption}</strong></div>
              <Icon name="external" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null ? (
          <motion.div
            className="nx-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={gallery[selected].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="nx-lightbox-close" onClick={() => setSelected(null)} aria-label="Close image viewer"><Icon name="x" /></button>
            <button type="button" className="nx-lightbox-prev" onClick={() => setSelected((selected - 1 + gallery.length) % gallery.length)} aria-label="Previous image">←</button>
            <motion.figure
              key={gallery[selected].src}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.32 }}
            >
              <img src={gallery[selected].src} alt={gallery[selected].alt} />
              <figcaption><small>{String(selected + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</small><strong>{gallery[selected].title}</strong><span>{gallery[selected].caption}</span></figcaption>
            </motion.figure>
            <button type="button" className="nx-lightbox-next" onClick={() => setSelected((selected + 1) % gallery.length)} aria-label="Next image">→</button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
