import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  color: string;
}

/** Sidebar thumbnail grid. Clicking a thumbnail opens the full-screen viewer at that image. */
export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, color }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <div className="flex flex-col gap-4 border-2 border-ink dark:border-paper p-6">
      <span className="label text-[10px] text-mute dark:text-void-mute">
        Gallery · {images.length}
      </span>
      <div className="grid grid-cols-3 gap-1.5 w-4/5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${title} image ${i + 1} of ${images.length}`}
            className="aspect-square border-2 border-ink dark:border-paper overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          title={title}
          color={color}
          startIndex={openIndex}
          onClose={close}
        />
      )}
    </div>
  );
};

/** Minimum horizontal travel, in px, for a drag to count as a swipe. */
const SWIPE_THRESHOLD = 50;

const Lightbox: React.FC<{
  images: string[];
  title: string;
  color: string;
  startIndex: number;
  onClose: () => void;
}> = ({ images, title, color, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const swipeStartX = useRef<number | null>(null);
  // A swipe ends with a click on the backdrop; this stops that click closing the viewer.
  const justSwiped = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const count = images.length;

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);

  // Keyboard controls, scroll lock, and focus in/out.
  useEffect(() => {
    const returnFocusTo = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [go, onClose]);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      justSwiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const showNav = count > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fixed inset-0 z-100 flex flex-col bg-ink text-paper"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4" onClick={(e) => e.stopPropagation()}>
        <span className="flex items-center gap-3 label text-[11px]">
          <span className="w-2.5 h-2.5" style={{ backgroundColor: color }} />
          {title} / {index + 1} of {count}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex items-center justify-center w-11 h-11 border-2 border-paper hover:bg-paper hover:text-ink transition-colors cursor-pointer"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Image stage — drag or swipe sideways to change image */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-5 sm:px-20 pb-6 touch-pan-y select-none"
        onPointerDown={(e) => (swipeStartX.current = e.clientX)}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipeStartX.current = null)}
        onClickCapture={(e) => {
          if (justSwiped.current) {
            justSwiped.current = false;
            e.stopPropagation();
          }
        }}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title} image ${index + 1} of ${count}`}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-full object-contain border-2 border-paper"
        />

        {showNav && (
          <>
            <NavButton direction="prev" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Position dots */}
      {showNav && (
        <div className="flex justify-center gap-2 pb-6" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className="w-2.5 h-2.5 border-2 border-paper cursor-pointer"
              style={{ backgroundColor: i === index ? color : 'transparent' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavButton: React.FC<{ direction: 'prev' | 'next'; onClick: () => void }> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    onPointerDown={(e) => e.stopPropagation()}
    aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === 'prev' ? 'left-2 sm:left-5' : 'right-2 sm:right-5'
    } flex items-center justify-center w-11 h-11 bg-ink border-2 border-paper hover:bg-paper hover:text-ink transition-colors cursor-pointer`}
  >
    {direction === 'prev' ? <ArrowLeft size={20} strokeWidth={2.5} /> : <ArrowRight size={20} strokeWidth={2.5} />}
  </button>
);
