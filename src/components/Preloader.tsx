'use client';

import { useEffect, useRef, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadKey = 'framestory_preloaded';
    if (sessionStorage.getItem(loadKey)) {
      setIsAnimating(false);
      onComplete();
      return;
    }

    const animate = async () => {
      const gsap = (await import('gsap')).default;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(loadKey, '1');
          setIsAnimating(false);
          onComplete();
        },
      });

      tl.set(overlayRef.current, { opacity: 1 });

      const chars = overlayRef.current?.querySelectorAll('.preloader-char');
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 30, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' }
        );
      }

      const line = overlayRef.current?.querySelector('.preloader-line');
      if (line) {
        tl.to(line, { width: '100%', duration: 0.8, ease: 'power2.inOut' }, '-=0.2');
      }

      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.3,
      });
    };

    const timer = setTimeout(() => animate(), 100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#0A0A0A] flex items-center justify-center opacity-0"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="overflow-hidden">
          <span className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight">
            {'FRAMESTORY'.split('').map((char, i) => (
              <span key={i} className="preloader-char inline-block" style={{ perspective: '600px' }}>
                {char}
              </span>
            ))}
          </span>
        </div>
        <div className="w-32 h-[1px] bg-[#F0F0F0]/10 relative overflow-hidden">
          <div className="preloader-line absolute inset-y-0 left-0 bg-[#D4AF37]" style={{ width: '0%' }} />
        </div>
        <span className="text-[#D4AF37]/60 text-xs tracking-[0.4em] uppercase">
          Visual Narratives
        </span>
      </div>
    </div>
  );
}
