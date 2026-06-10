'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Check, Camera, Video, Users, Clock, Image, Sparkles } from 'lucide-react';

// Services Hero
function ServicesHero() {
  return (
    <div className="relative h-[70vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 diagonal-pattern" />
      
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[120px] md:text-[250px] font-display font-bold text-gold/[0.03] leading-none whitespace-nowrap"
        >
          SERVICES
        </motion.span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-12 h-[1px] bg-gold" />
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            What We Offer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tight mb-8"
        >
          Crafting <span className="text-gradient">Visual</span>
          <br />
          Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream/60 text-lg md:text-xl max-w-xl leading-relaxed"
        >
          From intimate gatherings to grand celebrations, we offer comprehensive 
          photography services tailored to your unique story.
        </motion.p>
      </div>
    </div>
  );
}

// Bento Grid Services
function BentoServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Wedding Photography",
      description: "Complete wedding coverage from preparations to final send-off. We capture every ritual, every emotion, every detail.",
      icon: Camera,
      features: ["Full Day Coverage", "Two Photographers", "500+ Edited Photos", "Online Gallery"],
      span: "md:col-span-2 md:row-span-2",
      featured: true,
    },
    {
      title: "Cinematic Videography",
      description: "Short films and highlight reels that bring your story to life.",
      icon: Video,
      features: ["4K Quality", "Drone Shots", "Same Day Edit"],
      span: "md:col-span-1",
      featured: false,
    },
    {
      title: "Pre-Wedding Shoots",
      description: "Romantic sessions at scenic locations across Tamil Nadu.",
      icon: Sparkles,
      features: ["Location Scouting", "2-3 Hour Session", "50+ Photos"],
      span: "md:col-span-1",
      featured: false,
    },
    {
      title: "First Birthdays",
      description: "Capturing the joy and innocence of your child's milestone celebration.",
      icon: Users,
      features: ["Candid Coverage", "Family Portraits", "200+ Photos"],
      span: "md:col-span-1",
      featured: false,
    },
    {
      title: "Baby Showers",
      description: "Intimate moments of anticipation and blessings for the expecting mother.",
      icon: Image,
      features: ["Traditional Coverage", "Detail Shots", "150+ Photos"],
      span: "md:col-span-1",
      featured: false,
    },
    {
      title: "Same Day Edits",
      description: "Watch your highlights at the event itself with our same-day edit service.",
      icon: Clock,
      features: ["3-5 Minute Film", "Projected at Event", "Extra Cost"],
      span: "md:col-span-2",
      featured: false,
    },
  ];

  return (
    <section ref={ref} className="relative py-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative p-8 bg-warm-gray/30 border border-gold/10 box-cut hover:border-gold/30 transition-all duration-500 ${
                service.span
              } ${service.featured ? 'bg-gradient-to-br from-warm-gray/50 to-maroon-dark/20' : ''}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gold/10 flex items-center justify-center mb-6 box-cut-sm group-hover:bg-gold/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-cream/50 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-cream/60">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300"
              >
                Enquire Now
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/0 group-hover:border-gold transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Essential",
      price: "₹45,000",
      description: "Perfect for intimate celebrations",
      features: [
        "6 Hours Coverage",
        "1 Photographer",
        "300+ Edited Photos",
        "Online Gallery",
        "Print Rights",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "₹85,000",
      description: "Our most popular package",
      features: [
        "Full Day Coverage",
        "2 Photographers",
        "500+ Edited Photos",
        "Online Gallery",
        "Print Rights",
        "Same Day Edit",
        "Pre-Wedding Shoot",
      ],
      popular: true,
    },
    {
      name: "Luxury",
      price: "₹1,50,000",
      description: "The complete experience",
      features: [
        "Multi-Day Coverage",
        "3 Photographers",
        "1000+ Edited Photos",
        "Online Gallery",
        "Print Rights",
        "Same Day Edit",
        "Pre-Wedding Shoot",
        "Cinematic Video",
        "Album Design",
      ],
      popular: false,
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-warm-gray noise-bg">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Pricing</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Investment in <span className="text-gradient">Memories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-cream/60 max-w-2xl mx-auto"
          >
            Choose the package that best fits your celebration. 
            All packages can be customized to your specific needs.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`relative p-8 border box-cut ${
                pkg.popular
                  ? 'bg-gradient-to-br from-maroon-dark/50 to-charcoal border-gold/30'
                  : 'bg-charcoal/50 border-gold/10 hover:border-gold/30'
              } transition-all duration-500`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-8 px-4 py-1 bg-gold text-charcoal text-xs font-bold tracking-wider uppercase box-cut-sm">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-cream/50 text-sm mb-4">{pkg.description}</p>
                <div className="font-display text-4xl font-bold text-gold">{pkg.price}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-cream/70">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className={`w-full py-4 font-bold text-sm tracking-wide text-center box-cut-sm block transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gold text-charcoal hover:bg-gold-light'
                    : 'border border-gold/30 text-gold hover:bg-gold/10'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-cream/40 text-sm">
            Need something custom? <Link href="/contact" className="text-gold hover:underline">Contact us</Link> for a personalized quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, preferences, and requirements to understand your story.",
    },
    {
      step: "02",
      title: "Planning",
      description: "We create a detailed shot list and timeline to ensure no moment is missed.",
    },
    {
      step: "03",
      title: "Coverage",
      description: "Our team captures your celebration with creativity and professionalism.",
    },
    {
      step: "04",
      title: "Curation",
      description: "We carefully select and edit the best moments from your event.",
    },
    {
      step: "05",
      title: "Delivery",
      description: "Your photos are delivered via online gallery with print-ready files.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Our Process</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            How We <span className="text-gradient">Work</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative p-6 bg-warm-gray/30 border border-gold/10 box-cut group hover:border-gold/30 transition-all duration-500"
            >
              {/* Step Number */}
              <span className="font-mono text-gold/30 text-sm block mb-4">{step.step}</span>
              
              {/* Content */}
              <h3 className="font-display text-lg font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-gold/30">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 3-6 months in advance for weddings and major events. However, we do accommodate last-minute requests based on availability.",
    },
    {
      question: "Do you travel for destination events?",
      answer: "Absolutely! We cover events across Tamil Nadu and South India. Travel costs are included in our premium and luxury packages.",
    },
    {
      question: "How long does it take to receive our photos?",
      answer: "Standard delivery is 4-6 weeks after the event. Rush delivery is available for an additional fee.",
    },
    {
      question: "Can I request specific editing styles?",
      answer: "Yes! During our consultation, we discuss your preferred aesthetic and ensure the final photos match your vision.",
    },
    {
      question: "Do you offer video services?",
      answer: "Yes, we offer cinematic videography as part of our premium and luxury packages, or as a standalone service.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-warm-gray noise-bg">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase">FAQ</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Got <span className="text-gradient">Questions?</span>
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="p-6 bg-charcoal/50 border border-gold/10 box-cut-sm hover:border-gold/30 transition-all duration-500"
            >
              <h3 className="font-display text-lg font-bold mb-3">{faq.question}</h3>
              <p className="text-cream/50 leading-relaxed">{faq.answer}</p>
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
      <div className="absolute inset-0 diagonal-pattern" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-bold mb-8"
        >
          Ready to <span className="text-gradient">Begin?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto"
        >
          Let's discuss your upcoming celebration and create something beautiful together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-300"
          >
            Get a Quote
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <Link
            href="tel:+919876543210"
            className="group inline-flex items-center gap-2 px-10 py-5 border border-cream/20 text-cream font-bold text-sm tracking-wide box-cut hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
          >
            Call Us Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Services Page
export default function Services() {
  return (
    <main>
      <ServicesHero />
      <BentoServices />
      <Pricing />
      <Process />
      <FAQ />
      <CTASection />
    </main>
  );
}
