'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Eye, Clock } from 'lucide-react';
import { useScrollReveal, useImageReveal, useStaggerReveal, useParallax, useLineDraw } from '@/hooks/useScrollReveal';

const philosophy = [
  {
    icon: Eye,
    title: 'Unobtrusive Candid Focus',
    description: 'We believe the best photos happen when you forget the camera is there. Our candid approach captures genuine emotions without interrupting your celebration.',
  },
  {
    icon: Camera,
    title: 'Cinematic Editing',
    description: 'Every image is carefully graded and composed with a cinematic eye. We don\'t apply filters — we craft a visual language that makes your story timeless.',
  },
  {
    icon: Clock,
    title: 'Timeless Quality',
    description: 'Trends come and go, but true artistry endures. We deliver photos that will look just as stunning fifty years from now as they do today.',
  },
];

export default function AboutPage() {
  const imageRevealRef = useImageReveal();
  const founderTextRef = useScrollReveal();
  const philosophyRef = useStaggerReveal(0.12);
  const ctaRef = useScrollReveal();
  const parallaxRef = useParallax(0.15);
  const lineDrawRef = useLineDraw();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=85"
          alt="Framestory photography team in action at a wedding venue in Trichy"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-12">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-[#FAFAFA]">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Founder's Story — Parallax + Image Reveal + Text Reveal */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image with parallax + clip reveal */}
            <div ref={imageRevealRef} className="relative">
              <div ref={parallaxRef} className="relative aspect-[4/5] overflow-hidden" data-clip-reveal>
                <Image
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                  alt="Karthik Rajan, founder and lead photographer at Framestory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
                />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#D4AF37]/20 -z-10" />
            </div>

            {/* Text with scroll reveal */}
            <div ref={founderTextRef}>
              <div className="flex items-center gap-3 mb-6" data-reveal>
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">The Founder&apos;s Story</span>
              </div>

              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-8 leading-tight" data-reveal>
                Hi, I&apos;m Karthik Rajan
              </h2>

              <div className="space-y-4 text-[#F0F0F0]/60 text-lg leading-relaxed" data-reveal>
                <p>
                  I&apos;m obsessed with light, emotion, and the beautiful chaos of South Indian weddings.
                  Growing up in Trichy, I watched countless ceremonies unfold — the vibrant silk sarees,
                  the flickering oil lamps, the tears of joy, the uncontrollable laughter.
                </p>
                <p>
                  I started Framestory because I realised that most photographers capture moments, but
                  very few capture <em className="text-[#D4AF37]">feelings</em>. I wanted to create something
                  different — images that make you feel the warmth of a mother&apos;s blessing, the excitement
                  of a first look, the solemnity of sacred vows.
                </p>
                <p>
                  Today, we&apos;re a small but passionate team based in Srirangam, Trichy. We&apos;ve had the
                  honour of documenting over 500 celebrations across Tamil Nadu, and every single one
                  has taught us something new about love, tradition, and the art of storytelling.
                </p>
              </div>

              {/* Quote with line-draw animation */}
              <div ref={lineDrawRef} className="mt-10 md:mt-12 text-center lg:text-left" data-reveal>
                <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto lg:mx-0 mb-6 line-draw" />
                <span className="font-[family-name:var(--font-display)] text-[#D4AF37] italic text-xl md:text-2xl">
                  &ldquo;Every photo should feel like coming home.&rdquo;
                </span>
                <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto lg:mx-0 mt-6 line-draw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — Staggered entrance */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Our Philosophy</span>
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA]">
              Three Pillars of Our Craft
            </h2>
          </div>

          <div ref={philosophyRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="bg-[#121212] border-t-2 border-[#D4AF37]/20 hover:border-t-[#D4AF37] p-6 md:p-8 text-center transition-all duration-500"
              >
                <div className="w-14 h-14 mx-auto mb-5 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-[#FAFAFA] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#F0F0F0]/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div ref={ctaRef} className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-6" data-reveal>
            Let&apos;s Work Together
          </h2>
          <p className="text-[#F0F0F0]/60 text-lg mb-10" data-reveal>
            Ready to tell your story? We&apos;d love to hear about your celebration.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide hover:bg-[#E8C960] transition-all duration-300"
            data-reveal
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
