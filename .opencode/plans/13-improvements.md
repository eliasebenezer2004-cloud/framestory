# FRAMESTORY Premium Upgrade — 13 Improvements Implementation Plan

## Status: Ready to Execute
- `lenis` already installed via npm
- `src/hooks` directory created
- All file contents written below — copy into place when build mode activates

---

## PHASE 1: New Files to Create

### 1. src/components/CustomCursor.tsx

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const textPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(0.8)`;
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        const { x, y } = ringPos.current;
        ringRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(1)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;
      textPos.current.x = mousePos.current.x;
      textPos.current.y = mousePos.current.y;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animateRing);
    };

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.getAttribute('data-cursor-text');
      if (text) setCursorText(text);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorText('');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(animateRing);

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, [data-cursor]');
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring hidden md:block ${
          isHovering ? 'cursor-hover' : ''
        }`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        className={`custom-cursor cursor-dot hidden md:block ${
          isHovering ? 'cursor-hover-dot' : ''
        }`}
        style={{ left: 0, top: 0 }}
      />
      {cursorText && (
        <div
          className="custom-cursor hidden md:flex items-center justify-center cursor-text-label"
          style={{
            position: 'fixed',
            left: mousePos.current.x,
            top: mousePos.current.y + 28,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
}
```

### 2. src/components/Preloader.tsx

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadKey = 'framestory_preloaded';
    if (sessionStorage.getItem(loadKey)) {
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
```

### 3. src/components/AnimatedCounter.tsx

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
```

### 4. src/hooks/useScrollReveal.ts

```ts
'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal(options?: {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}) {
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
          { opacity: 0, y: options?.y ?? 40 },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 0.8,
            delay: options?.delay ?? 0,
            stagger: options?.stagger ?? 0.1,
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
```

---

## PHASE 2: globals.css Additions

Add these AFTER the existing `@layer utilities` block (before the closing `@layer utilities`):

```css
/* ===== CUSTOM CURSOR ===== */
.custom-cursor {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(240, 240, 240, 0.5);
  border-radius: 50%;
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

.cursor-ring.cursor-hover {
  width: 60px;
  height: 60px;
  border-color: var(--color-gold);
  margin-left: -10px;
  margin-top: -10px;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--color-gold);
  border-radius: 50%;
  transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
}

.cursor-dot.cursor-hover-dot {
  width: 6px;
  height: 6px;
  opacity: 0.6;
  margin-left: 1px;
  margin-top: 1px;
}

.cursor-text-label {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 500;
}

/* ===== PAGE TRANSITION ===== */
@keyframes pageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-transition {
  animation: pageSlideIn 0.6s var(--ease-smooth) forwards;
}

/* ===== HERO TEXT STAGGER ===== */
.hero-word {
  display: inline-block;
  overflow: hidden;
}

.hero-word-inner {
  display: inline-block;
}

/* ===== SCROLL REVEAL LINE DRAW ===== */
@keyframes lineDraw {
  from { width: 0; }
  to { width: 100%; }
}

.line-draw {
  width: 0;
}

.line-draw.active {
  animation: lineDraw 1s var(--ease-smooth) forwards;
}
```

---

## PHASE 3: layout.tsx Changes

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE, CONTACT } from "@/lib/constants";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Wedding Photography in Trichy`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "wedding photography",
    "event photography",
    "Trichy",
    "Tamil Nadu",
    "candid photography",
    "wedding photographer Trichy",
    "baby shower photography",
    "puberty function photography",
    "pre-wedding shoot",
    "Tamil wedding photographer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} | Wedding Photography in Trichy`,
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Wedding Photography`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Wedding Photography in Trichy`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
    postalCode: CONTACT.address.pin,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7905,
    longitude: 78.7047,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "22:00",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: CONTACT.googleRating,
    bestRating: "5",
    ratingCount: "127",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photography Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Premium Wedding Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Wedding Shoots" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientProviders>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ClientProviders>
      </body>
    </html>
  );
}
```

### New: src/components/ClientProviders.tsx

```tsx
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LenisSmoothScroll from './LenisSmoothScroll';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <LenisSmoothScroll />
      <div className={isLoaded ? 'page-transition' : 'opacity-0'}>
        {children}
      </div>
    </>
  );
}
```

### New: src/components/LenisSmoothScroll.tsx

```tsx
'use client';

import { useEffect } from 'react';

export default function LenisSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: InstanceType<typeof import('lenis')['default']> | null = null;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
```

---

## PHASE 4: page.tsx (Home) — Full Rewrite

Key changes:
- Hero text: Split into word spans with data-reveal for GSAP stagger
- Trust bar: AnimatedCounter for 500+ and 4.9
- About snippet: useImageReveal on image, useScrollReveal on text
- Featured work: useStaggerReveal
- Testimonials: Auto-rotating carousel with fade
- CTA: Subtle background image

```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useScrollReveal, useImageReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85', alt: 'Traditional Tamil Hindu Wedding in Trichy' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=85', alt: 'Candid wedding moment captured at a Trichy reception' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=85', alt: 'Beautiful South Indian wedding ceremony' },
];

const featuredWork = [
  { title: 'Arun & Sneha', category: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { title: 'Kavitha\'s Seemantham', category: 'Baby Shower', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80' },
  { title: 'Priya & Karthik', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80' },
  { title: 'Meera\'s Puberty Ceremony', category: 'Puberty Function', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { title: 'Vikram & Divya', category: 'Wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { title: 'Lakshmi\'s First Birthday', category: 'Birthday', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80' },
];

const testimonials = [
  {
    name: 'Karthik & Priya',
    event: 'Wedding, Srirangam',
    rating: 5,
    text: 'They didn\'t just capture our wedding; they captured our story. Every photo feels like a memory coming alive. The candids from our muhurtham are absolutely priceless.',
  },
  {
    name: 'Anitha Rajan',
    event: 'Seemantham, Trichy',
    rating: 5,
    text: 'The way they captured our baby shower was magical. So natural and warm. We didn\'t even realize they were clicking most of the time. Truly unobtrusive.',
  },
  {
    name: 'Suresh & Meena',
    event: 'Reception, Chennai',
    rating: 5,
    text: 'Professional, creative, and so easy to work with. Our reception photos look like they belong in a magazine. Worth every single rupee.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Hero text stagger animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!heroTextRef.current) return;

    const animate = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      const chars = heroTextRef.current?.querySelectorAll('.hero-word');
      if (!chars) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 1.8,
        }
      );
    };

    animate();
  }, []);

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Image reveal refs
  const aboutImageRef = useImageReveal();
  const aboutTextRef = useScrollReveal();
  const featuredRef = useStaggerReveal(0.08);
  const ctaRef = useScrollReveal();

  const scrollToFeatured = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = window.innerWidth * 0.7;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const heroWords = "Capturing Trichy's Most Beautiful Stories".split(' ');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover ken-burns"
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

        <div
          className="absolute inset-0 flex items-center"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6" data-reveal>
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-medium">
                  Premium Event Photography
                </span>
              </div>

              <div ref={heroTextRef} className="perspective-[1000px]">
                <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-[#FAFAFA] leading-[0.95] mb-6">
                  {heroWords.map((word, i) => (
                    <span key={i} className="hero-word inline-block mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </h1>
              </div>

              <p className="text-[#F0F0F0]/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed" data-reveal>
                Premium Wedding & Event Photography. We don&apos;t just take photos.
                We preserve the soul of every moment.
              </p>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide hover:bg-[#E8C960] transition-all duration-300 group"
                data-reveal
              >
                View Our Portfolio
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                index === currentSlide ? 'bg-[#D4AF37] w-10' : 'bg-[#F0F0F0]/30 w-6'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Bar — Animated Counters */}
      <section className="py-5 bg-[#0A0A0A] border-y border-[#F0F0F0]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-[#F0F0F0]/70 text-sm font-medium">
              Rated <AnimatedCounter target={4.9} suffix="/5" duration={1.5} /> on Google
            </span>
          </div>
          <div className="text-[#F0F0F0]/30 text-sm">
            Trusted by <AnimatedCounter target={500} suffix="+" duration={2} /> families across Tamil Nadu
          </div>
          <div className="text-[#F0F0F0]/30 text-sm">Srirangam &bull; Trichy &bull; Tamil Nadu</div>
        </div>
      </section>

      {/* About Snippet — Image Clip Reveal + Text Reveal */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div ref={aboutImageRef} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden" data-clip-reveal>
                <Image
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                  alt="Karthik Rajan, lead photographer at Framestory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
                />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#D4AF37]/20 -z-10" />
            </div>

            <div ref={aboutTextRef}>
              <div className="flex items-center gap-3 mb-6" data-reveal>
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Our Story</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-6 leading-tight" data-reveal>
                Photography isn&apos;t just taking pictures
              </h2>
              <p className="text-[#F0F0F0]/60 text-lg leading-relaxed mb-8" data-reveal>
                It&apos;s preserving the soul of a moment. At Framestory, we believe every wedding,
                every ceremony, every celebration has a story waiting to be told.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300"
                data-reveal
              >
                Read Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio — Staggered Entrance */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Featured Work</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA]">
                Stories We&apos;ve Told
              </h2>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={() => scrollToFeatured('left')}
                className="w-10 h-10 border border-[#F0F0F0]/20 rounded-full flex items-center justify-center text-[#F0F0F0]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToFeatured('right')}
                className="w-10 h-10 border border-[#F0F0F0]/20 rounded-full flex items-center justify-center text-[#F0F0F0]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 scroll-fade-left scroll-fade-right"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {featuredWork.map((project) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-[75vw] md:w-[55vw] lg:w-[40vw] h-[350px] md:h-[450px] relative overflow-hidden group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                data-cursor-text="View"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.category} photography by Framestory`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="80vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">{project.category}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-[#FAFAFA] mt-1">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials — Auto-rotating carousel */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Testimonials</span>
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA]">
              What Families Say
            </h2>
          </div>

          {/* Desktop: grid view */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#1A1A1A] p-6 md:p-8 border-l-2 border-[#D4AF37]/40 hover:border-l-[#D4AF37] transition-all duration-500"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#F0F0F0]/70 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-[#F0F0F0]/10 pt-4">
                  <p className="font-[family-name:var(--font-display)] font-bold text-[#FAFAFA]">{t.name}</p>
                  <p className="text-[#D4AF37]/70 text-sm">{t.event}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="w-full flex-shrink-0 bg-[#1A1A1A] p-6 border-l-2 border-[#D4AF37]/40"
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-[#F0F0F0]/70 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div className="border-t border-[#F0F0F0]/10 pt-4">
                      <p className="font-[family-name:var(--font-display)] font-bold text-[#FAFAFA]">{t.name}</p>
                      <p className="text-[#D4AF37]/70 text-sm">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-[2px] transition-all duration-500 ${
                    index === activeTestimonial ? 'bg-[#D4AF37] w-10' : 'bg-[#F0F0F0]/30 w-6'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Background image */}
      <section className="relative py-16 md:py-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=60"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        <div ref={ctaRef} className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4" data-reveal>
            <div className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Ready to Begin?</span>
            <div className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-6" data-reveal>
            Let&apos;s Tell Your Story
          </h2>

          <p className="text-[#F0F0F0]/60 text-lg mb-10 max-w-2xl mx-auto" data-reveal>
            Every celebration is unique. Let&apos;s discuss yours and create something
            that will be cherished for generations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4" data-reveal>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide hover:bg-[#E8C960] transition-all duration-300"
            >
              Check Availability
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#F0F0F0]/20 text-[#F0F0F0] font-bold text-sm tracking-wide hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## PHASE 5: Navigation.tsx Changes

Add `data-cursor` and `data-cursor-text` to nav links:

In the desktop nav links map, change each Link to:
```tsx
<Link
  key={link.href}
  href={link.href}
  data-cursor-text="Go"
  className={`relative text-sm tracking-wide transition-colors duration-300 gold-underline ${
    pathname === link.href
      ? 'text-[#D4AF37] active'
      : 'text-[#F0F0F0]/70 hover:text-[#F0F0F0]'
  }`}
>
```

---

## PHASE 6: portfolio/page.tsx Changes

Key additions:
1. Import `useScrollReveal, useStaggerReveal` from hooks
2. Wrap masonry grid children with stagger reveal
3. Add `data-clip-reveal` to each gallery image
4. Add lightbox zoom (wheel handler)
5. Add `data-cursor-text="View"` to each masonry item

Add this scroll-zoom handler inside the lightbox section:
```tsx
const handleLightboxWheel = (e: React.WheelEvent) => {
  // future: zoom in/out on scroll within lightbox
};
```

---

## PHASE 7: about/page.tsx Changes

Key additions:
1. Import `useScrollReveal, useImageReveal, useParallax` from hooks
2. Founder image: `data-clip-reveal` for clip-path reveal
3. Parallax on founder image container: `useParallax(0.2)`
4. Text block: `useScrollReveal()`
5. Philosophy cards: `useStaggerReveal(0.12)`
6. Quote line: Add `line-draw` class with IntersectionObserver trigger

---

## PHASE 8: services/page.tsx Changes

Key additions:
1. Import `useScrollReveal, useImageReveal, useStaggerReveal`
2. Alternating service blocks: `data-clip-reveal` on images
3. Text blocks: `data-reveal` attributes
4. Product cards: `useStaggerReveal(0.1)`

---

## PHASE 9: contact/page.tsx Changes

Key additions:
1. Import `useScrollReveal, useStaggerReveal`
2. Left panel: `data-reveal` on all content
3. Form fields: `data-reveal` with stagger
4. Map: `data-reveal` on scroll

---

## Execution Order
1. Create `src/components/ClientProviders.tsx` (new)
2. Create `src/components/LenisSmoothScroll.tsx` (new)
3. Create `src/components/CustomCursor.tsx` (new)
4. Create `src/components/Preloader.tsx` (new)
5. Create `src/components/AnimatedCounter.tsx` (new)
6. Create `src/hooks/useScrollReveal.ts` (new)
7. Update `globals.css` (append new CSS)
8. Update `layout.tsx` (wrap with ClientProviders)
9. Update `page.tsx` (full rewrite with all effects)
10. Update `Navigation.tsx` (add data-cursor attributes)
11. Update `portfolio/page.tsx` (scroll reveals, clip reveals, zoom)
12. Update `about/page.tsx` (parallax, reveals)
13. Update `services/page.tsx` (reveals, clip reveals)
14. Update `contact/page.tsx` (reveals)
15. Build and verify
