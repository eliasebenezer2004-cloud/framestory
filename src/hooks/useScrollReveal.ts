'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const children = containerRef.current?.querySelectorAll('[data-reveal]');
        if (!children || children.length === 0) return;

        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }, containerRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return containerRef;
}

export function useImageReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const images = containerRef.current?.querySelectorAll('[data-clip-reveal]');
        if (!images || images.length === 0) return;

        images.forEach((img) => {
          gsap.fromTo(
            img,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: img as Element,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }, containerRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return containerRef;
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }, ref);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, [speed]);

  return ref;
}

export function useStaggerReveal(stagger: number = 0.08) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const children = containerRef.current?.children;
        if (!children || children.length === 0) return;

        gsap.fromTo(
          Array.from(children),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }, containerRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, [stagger]);

  return containerRef;
}

export function useLineDraw() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const lines = containerRef.current?.querySelectorAll('.line-draw');
        if (!lines || lines.length === 0) return;

        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { width: '0%' },
            {
              width: '100%',
              duration: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: line as Element,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }, containerRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return containerRef;
}
