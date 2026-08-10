import { useState, useEffect, useCallback } from 'react';

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setActive(i => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => setActive(i)}
            className="h-48 md:h-64 w-auto rounded-2xl object-cover snap-start shrink-0 hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
            loading="lazy"
          />
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <img
            src={images[active].src}
            alt={images[active].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="absolute bottom-6 text-white/50 text-sm">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
