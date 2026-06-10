'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80', alt: 'Traditional Tamil Hindu Wedding in Trichy' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80', alt: 'Candid wedding moment captured at a Trichy reception' },
  { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80', alt: 'Beautiful South Indian wedding ceremony' },
];

const featuredWork = [
  { title: 'Arun & Sneha', category: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', height: 'h-[500px]' },
  { title: 'Kavitha\'s Seemantham', category: 'Baby Shower', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', height: 'h-[350px]' },
  { title: 'Priya & Karthik', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', height: 'h-[400px]' },
  { title: 'Meera\'s Puberty Ceremony', category: 'Puberty Function', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', height: 'h-[450px]' },
  { title: 'Vikram & Divya', category: 'Wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', height: 'h-[380px]' },
  { title: 'Lakshmi\'s First Birthday', category: 'Birthday', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', height: 'h-[420px]' },
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
  const featuredRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Horizontal scroll for featured section
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInSection) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const atStart = container.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = container.scrollLeft >= maxScroll - 1 && e.deltaY > 0;

        if (!atStart && !atEnd) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollToFeatured = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = window.innerWidth * 0.8;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
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
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

        {/* Content */}
        <div
          className="absolute inset-0 flex items-center"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-medium">
                  Premium Event Photography
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-[#FAFAFA] leading-[0.95] mb-6">
                Capturing Trichy&apos;s Most Beautiful Stories
              </h1>

              <p className="text-[#F0F0F0]/70 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Premium Wedding & Event Photography. We don&apos;t just take photos.
                We preserve the soul of every moment.
              </p>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide rounded-sm hover:bg-[#E8C960] transition-all duration-300 group"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#D4AF37] w-8' : 'bg-[#F0F0F0]/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-[#0A0A0A] border-y border-[#F0F0F0]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="text-[#F0F0F0]/70 text-sm font-medium">Rated 4.9/5 on Google</span>
          </div>
          <div className="text-[#F0F0F0]/30 text-sm">Trusted by 500+ families across Tamil Nadu</div>
          <div className="text-[#F0F0F0]/30 text-sm">Srirangam &bull; Trichy &bull; Tamil Nadu</div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                  alt="Karthik Rajan, lead photographer at Framestory, capturing a wedding moment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#D4AF37]/30 rounded-sm -z-10" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Our Story</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6 leading-tight">
                Photography isn&apos;t just taking pictures
              </h2>
              <p className="text-[#F0F0F0]/60 text-lg leading-relaxed mb-8">
                It&apos;s preserving the soul of a moment. At Framestory, we believe every wedding,
                every ceremony, every celebration has a story waiting to be told. We&apos;re here to tell it
                through our lens with authenticity, artistry, and a deep respect for tradition.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium tracking-wide hover:gap-3 transition-all duration-300"
              >
                Read Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio - Horizontal Scroll */}
      <section ref={featuredRef} className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Featured Work</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA]">
                Stories We&apos;ve Told
              </h2>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={() => scrollToFeatured('left')}
                className="w-12 h-12 border border-[#F0F0F0]/20 rounded-full flex items-center justify-center text-[#F0F0F0]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToFeatured('right')}
                className="w-12 h-12 border border-[#F0F0F0]/20 rounded-full flex items-center justify-center text-[#F0F0F0]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredWork.map((project) => (
            <div
              key={project.title}
              className={`flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] ${project.height} relative overflow-hidden rounded-sm group cursor-pointer`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={project.image}
                alt={`${project.title} - ${project.category} photography by Framestory in Trichy`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">{project.category}</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#FAFAFA] mt-1">{project.title}</h3>
              </div>
            </div>
          ))}
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

      {/* Testimonials */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Testimonials</span>
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA]">
              What Families Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#1A1A1A] border border-[#F0F0F0]/5 rounded-sm p-8 hover:border-[#D4AF37]/20 transition-all duration-500"
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
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Ready to Begin?</span>
            <div className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-[#FAFAFA] mb-6">
            Let&apos;s Tell Your Story
          </h2>

          <p className="text-[#F0F0F0]/60 text-lg mb-10 max-w-2xl mx-auto">
            Every celebration is unique. Let&apos;s discuss yours and create something
            that will be cherished for generations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide rounded-sm hover:bg-[#E8C960] transition-all duration-300"
            >
              Check Availability
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#F0F0F0]/20 text-[#F0F0F0] font-bold text-sm tracking-wide rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
