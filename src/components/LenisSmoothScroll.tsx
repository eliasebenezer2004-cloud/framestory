'use client';

import { useEffect, useRef } from 'react';

export default function LenisSmoothScroll() {
  const lenisRef = useRef<{ destroy: () => void; raf: (time: number) => void } | null>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const init = async () => {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenisRef.current?.destroy();
    };
  }, []);

  return null;
}
