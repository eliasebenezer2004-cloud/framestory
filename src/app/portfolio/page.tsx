'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Puberty Functions', 'Seemantham', 'Candid'] as const;

type Category = (typeof categories)[number];

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, 'All'>;
  image: string;
  aspect: string;
}

const projects: Project[] = [
  { id: 1, title: 'Arun & Sneha\'s Wedding - Srirangam', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 2, title: 'Priya & Karthik - Court Wedding', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', aspect: 'aspect-[3/4]' },
  { id: 3, title: 'Meera\'s Half-Saree Ceremony', category: 'Puberty Functions', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 4, title: 'Kavitha\'s Seemantham - Trichy', category: 'Seemantham', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', aspect: 'aspect-[3/4]' },
  { id: 5, title: 'Vikram & Divya\'s Reception', category: 'Weddings', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', aspect: 'aspect-[4/3]' },
  { id: 6, title: 'Candid Moments - Temple Wedding', category: 'Candid', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', aspect: 'aspect-[3/4]' },
  { id: 7, title: 'Suresh & Meena - Outdoor Shoot', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 8, title: 'Lakshmi\'s First Birthday', category: 'Seemantham', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', aspect: 'aspect-[4/3]' },
  { id: 9, title: 'Traditional Iyer Wedding', category: 'Weddings', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', aspect: 'aspect-[3/4]' },
  { id: 10, title: 'Candid Reception Highlights', category: 'Candid', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', aspect: 'aspect-[4/5]' },
  { id: 11, title: 'Divya\'s Puberty Function', category: 'Puberty Functions', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', aspect: 'aspect-[4/3]' },
  { id: 12, title: 'Raj & Priya Pre-Wedding', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80', aspect: 'aspect-[3/4]' },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, nextImage, prevImage]);

  // Touch swipe for lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85"
          alt="Framestory portfolio - wedding and event photography showcase"
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
              Our Masterpieces
            </h1>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-[#121212]/95 backdrop-blur-sm border-b border-[#F0F0F0]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex gap-4 md:gap-6 overflow-x-auto py-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap text-xs md:text-sm font-medium transition-colors duration-300 pb-2 gold-underline ${
                  activeFilter === cat
                    ? 'text-[#D4AF37] active'
                    : 'text-[#F0F0F0]/50 hover:text-[#F0F0F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="masonry-grid">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                className="masonry-item cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className={`relative ${project.aspect} overflow-hidden`}>
                  <Image
                    src={project.image}
                    alt={`${project.title} - Framestory photography`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23121212'/%3E%3C/svg%3E"
                  />
                  <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/50 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#FAFAFA] font-[family-name:var(--font-display)] font-bold text-base md:text-lg">
                      {project.title}
                    </p>
                    <p className="text-[#D4AF37] text-sm">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#F0F0F0] hover:text-[#D4AF37] transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-3 md:left-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#F0F0F0] hover:text-[#D4AF37] transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="relative w-[92vw] h-[75vh] md:h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].image.replace('w=800', 'w=1600')}
              alt={filtered[lightboxIndex].title}
              fill
              className="object-contain"
              sizes="92vw"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent text-center">
              <p className="text-[#FAFAFA] font-[family-name:var(--font-display)] font-bold text-lg md:text-xl">
                {filtered[lightboxIndex].title}
              </p>
              <p className="text-[#D4AF37] text-sm mt-1">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-3 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#F0F0F0] hover:text-[#D4AF37] transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      )}
    </main>
  );
}
