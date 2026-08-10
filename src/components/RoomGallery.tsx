import { useState, useEffect, useCallback } from 'react';

interface RoomGalleryProps {
  images: string[];
  alt: string;
}

export default function RoomGallery({ images, alt }: RoomGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const close = useCallback(() => setLightbox(false), []);
  const prev = useCallback(() => setSelected(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setSelected(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightbox) return;
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
  }, [lightbox, close, prev, next]);

  return (
    <>
      <img
        src={images[selected]}
        alt={alt}
        width={600}
        height={400}
        onClick={() => setLightbox(true)}
        className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl border border-gray-300 cursor-pointer"
      />
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${alt} ${i + 1}`}
              onClick={() => setSelected(i)}
              className={`w-24 h-24 rounded-xl object-cover border shrink-0 hover:scale-105 transition-all cursor-pointer ${
                i === selected ? 'border-onyx ring-2 ring-onyx/30' : 'border-gray-300'
              }`}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {lightbox && (
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
            src={images[selected]}
            alt={alt}
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
            {selected + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
