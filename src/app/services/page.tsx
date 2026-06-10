'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Heart, Sparkles, Frame, Image as ImageIcon, Baby } from 'lucide-react';

const eventServices = [
  {
    title: 'Premium Weddings & Receptions',
    description: 'Complete coverage of your big day — from the sacred rituals to the grand celebration. We capture every emotion, every detail, every stolen glance.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    title: 'Post-Wedding / Outdoor Shoots',
    description: 'Romantic, cinematic portraits in stunning locations across Tamil Nadu. Your love story deserves a beautiful epilogue.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
  },
  {
    title: 'Puberty Functions & Half-Saree Ceremonies',
    description: 'Celebrating this beautiful milestone with vibrant, joyful photography that honours tradition and captures youthful energy.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
  },
  {
    title: 'Seemantham (Baby Showers) & Maternity',
    description: 'Intimate moments of anticipation, blessing, and joy. We document the beautiful journey into motherhood with warmth and sensitivity.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  },
  {
    title: 'Local Festive & Cultural Events',
    description: 'From temple festivals to cultural performances, we bring the vibrancy of Trichy\'s rich heritage to life through our lens.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  },
];

const products = [
  { icon: Frame, title: '4K Premium Synthetic Albums', description: 'Heirloom-quality albums with vivid prints that last generations.' },
  { icon: Baby, title: 'Baby Casting Services', description: 'Preserve tiny hands and feet in beautiful resin casts.' },
  { icon: Sparkles, title: 'Customized Light Frames', description: 'Illuminated frames that make your favourite photo glow.' },
  { icon: ImageIcon, title: 'Photo Mugs', description: 'Start every morning with your most cherished memory.' },
  { icon: Heart, title: 'Imaginary Art', description: 'Creative artistic renditions of your beloved photographs.' },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80"
          alt="Framestory photography services - family holding a beautiful photo album"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-[#FAFAFA]">
              Our Services
            </h1>
            <p className="text-[#F0F0F0]/70 text-lg mt-4 max-w-xl">
              From intimate family gatherings to grand celebrations, we bring artistry and heart to every event.
            </p>
          </div>
        </div>
      </section>

      {/* Event Coverage - Alternating Blocks */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Event Coverage</span>
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA]">
              Every Occasion, Perfectly Captured
            </h2>
          </div>

          <div className="space-y-24">
            {eventServices.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={service.image}
                      alt={`${service.title} - Framestory event photography in Trichy`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[#F0F0F0]/60 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Products Upsell */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Physical Products</span>
              <div className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4">
              Turn Memories Into Heirlooms
            </h2>
            <p className="text-[#F0F0F0]/60 text-lg max-w-2xl mx-auto">
              Don&apos;t leave your memories on a hard drive. Turn them into tangible treasures
              that you can hold, display, and pass down for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.title}
                className="bg-[#121212] border border-[#F0F0F0]/5 rounded-sm p-8 hover:border-[#D4AF37]/20 transition-all duration-500 group"
              >
                <product.icon className="w-8 h-8 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#FAFAFA] mb-2">
                  {product.title}
                </h3>
                <p className="text-[#F0F0F0]/50 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-6">
            Ready to Book?
          </h2>
          <p className="text-[#F0F0F0]/60 text-lg mb-10">
            Let&apos;s discuss your event and create something beautiful together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide rounded-sm hover:bg-[#E8C960] transition-all duration-300"
          >
            Check Availability
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
