'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Play, ChevronDown } from 'lucide-react';

// Animated Hero Component
function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const titleWords = "Capturing Moments That Last Forever".split(" ");

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0" y1="0" x2="100%" y2="100%"
          stroke="rgba(201, 168, 76, 0.1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="100%" y1="0" x2="0" y2="100%"
          stroke="rgba(201, 168, 76, 0.1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
      </svg>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-20 w-32 h-32 border border-gold/20 box-cut"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-16 w-24 h-24 border border-gold/20 box-cut-sm"
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
                  Event Photography
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight mb-8">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word === "Forever" ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-cream/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
              >
                We don't just take photos. We freeze emotions, preserve traditions, 
                and craft visual stories that resonate across generations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/portfolio"
                  className="group relative px-8 py-4 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Our Work
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 border border-cream/20 text-cream font-bold text-sm tracking-wide box-cut-sm overflow-hidden transition-all duration-300 hover:border-gold/50 hover:bg-gold/5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Session
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Stats */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                {/* Decorative Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -top-10 -right-10 w-full h-full border border-gold/20 box-cut"
                />
                
                {/* Stats Grid */}
                <div className="relative bg-warm-gray/50 p-8 box-cut">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: '500+', label: 'Events Captured' },
                      { number: '8+', label: 'Years Experience' },
                      { number: '100%', label: 'Client Satisfaction' },
                      { number: '50K+', label: 'Photos Delivered' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        className="text-center p-4"
                      >
                        <div className="font-display text-3xl md:text-4xl font-bold text-gold mb-2">
                          {stat.number}
                        </div>
                        <div className="text-cream/50 text-xs tracking-wider uppercase">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cream/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gold/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Featured Work Section
function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Priya & Arjun",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    },
    {
      title: "Kavya's First Birthday",
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    },
    {
      title: "Meera & Vikram",
      category: "Reception",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    },
    {
      title: "Anjali's Baby Shower",
      category: "Baby Shower",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-warm-gray noise-bg">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase">Featured Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold"
            >
              Stories We've <span className="text-gradient">Told</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-cream/60 hover:text-gold transition-colors duration-300 mt-6 md:mt-0"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group relative aspect-[4/3] overflow-hidden box-cut cursor-pointer"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-gold text-xs tracking-[0.3em] uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-cream/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/0 group-hover:border-gold transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Marquee Section
function MarqueeSection() {
  const text = "WEDDINGS • RECEPTIONS • FIRST BIRTHDAYS • BABY SHOWERS • PRE-WEDDING • CANDID • TRADITIONAL • MODERN • ";
  
  return (
    <section className="py-12 bg-charcoal border-y border-gold/10 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="inline-block text-4xl md:text-6xl font-display font-bold text-stroke-gold mx-8"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}

// Services Preview
function ServicesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Weddings",
      description: "Complete wedding coverage from rituals to candid moments",
      icon: "01",
    },
    {
      title: "Receptions",
      description: "Grand celebration photography with editorial style",
      icon: "02",
    },
    {
      title: "First Birthdays",
      description: "Precious milestone captured with warmth and joy",
      icon: "03",
    },
    {
      title: "Baby Showers",
      description: "Intimate moments of anticipation and blessing",
      icon: "04",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 diagonal-pattern">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Title */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase">What We Do</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl font-bold mb-8"
            >
              Every Occasion <br />
              <span className="text-gradient">Deserves Art</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-cream/60 leading-relaxed"
            >
              From intimate family gatherings to grand celebrations, 
              we bring our unique perspective to every event.
            </motion.p>
          </div>

          {/* Right - Services List */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group relative p-6 bg-warm-gray/30 border border-gold/10 box-cut-sm hover:border-gold/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-gold/40 text-sm">{service.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-1 group-hover:text-gold transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-cream/50 text-sm">{service.description}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-cream/20 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Priya & Arjun",
      event: "Wedding, 2024",
      quote: "They didn't just capture our wedding; they captured our story. Every photo feels like a memory coming alive.",
    },
    {
      name: "Lakshmi Raman",
      event: "First Birthday, 2024",
      quote: "The way they captured our daughter's first birthday was magical. These photos will be treasured forever.",
    },
    {
      name: "Meera & Vikram",
      event: "Reception, 2024",
      quote: "Professional, creative, and so easy to work with. They made our reception photos look like a Bollywood film.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-maroon-dark noise-bg overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[200px] md:text-[400px] font-display font-bold text-white/[0.02] leading-none">
          TESTIMONIALS
        </span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Testimonials</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Words That <span className="text-gradient">Warm</span> Our Hearts
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="relative p-8 bg-charcoal/50 border border-gold/10 box-cut group hover:border-gold/30 transition-all duration-500"
            >
              {/* Quote Mark */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gold flex items-center justify-center box-cut-sm">
                <span className="text-charcoal font-display font-bold text-lg">&ldquo;</span>
              </div>
              
              <p className="text-cream/70 text-lg leading-relaxed mb-8 mt-4">
                {testimonial.quote}
              </p>
              
              <div className="border-t border-gold/10 pt-6">
                <p className="font-display font-bold text-cream">{testimonial.name}</p>
                <p className="text-gold/60 text-sm">{testimonial.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated Circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/5 rounded-full"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-8 h-[1px] bg-gold" />
          <span className="text-gold text-sm tracking-[0.3em] uppercase">Ready to Begin?</span>
          <div className="w-8 h-[1px] bg-gold" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl font-bold mb-8"
        >
          Let's Create Something <br />
          <span className="text-gradient">Extraordinary</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto"
        >
          Every story is unique. Let's discuss yours and create something 
          that will be cherished for generations.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Start Your Story
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
          <Link
            href="tel:+919876543210"
            className="group relative px-10 py-5 border border-cream/20 text-cream font-bold text-sm tracking-wide box-cut hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Call Us Now
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Home Page
export default function Home() {
  return (
    <main>
      <AnimatedHero />
      <FeaturedWork />
      <MarqueeSection />
      <ServicesPreview />
      <Testimonials />
      <CTASection />
    </main>
  );
}
