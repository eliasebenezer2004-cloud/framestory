'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Play, Send, Check } from 'lucide-react';

// Magnetic Button Component
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {href ? <Link href={href} className="contents">{children}</Link> : children}
    </motion.div>
  );
}

// Contact Hero
function ContactHero() {
  return (
    <div className="relative h-[70vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[120px] md:text-[250px] font-display font-bold text-gold/[0.03] leading-none whitespace-nowrap"
        >
          CONTACT
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
            Get in Touch
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tight mb-8"
        >
          Let's Start a <br />
          <span className="text-gradient">Conversation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream/60 text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Have a celebration coming up? We'd love to hear about it. 
          Reach out and let's create something beautiful together.
        </motion.p>
      </div>
    </div>
  );
}

// Contact Form
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="relative py-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl font-bold mb-8">
                Tell Us About Your <span className="text-gradient">Event</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Event Type *
                    </label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm"
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="reception">Reception</option>
                      <option value="birthday">First Birthday</option>
                      <option value="baby-shower">Baby Shower</option>
                      <option value="pre-wedding">Pre-Wedding Shoot</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Event Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                      Preferred Package
                    </label>
                    <select className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm">
                      <option value="">Select Package</option>
                      <option value="essential">Essential (₹45,000)</option>
                      <option value="premium">Premium (₹85,000)</option>
                      <option value="luxury">Luxury (₹1,50,000)</option>
                      <option value="custom">Custom Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-cream/60 text-sm mb-2 tracking-wide">
                    Tell Us More *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-warm-gray/30 border border-gold/10 text-cream focus:border-gold/50 focus:outline-none transition-colors duration-300 box-cut-sm resize-none"
                    placeholder="Tell us about your celebration, venue details, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-300 cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="p-8 bg-warm-gray/30 border border-gold/10 box-cut">
                <h3 className="font-display text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <a
                    href="tel:+919876543210"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0 box-cut-sm group-hover:bg-gold/20 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-sm mb-1">Call Us</p>
                      <p className="font-display text-lg group-hover:text-gold transition-colors duration-300">
                        +91 98765 43210
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@framestory.in"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0 box-cut-sm group-hover:bg-gold/20 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-sm mb-1">Email Us</p>
                      <p className="font-display text-lg group-hover:text-gold transition-colors duration-300">
                        hello@framestory.in
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0 box-cut-sm">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-sm mb-1">Visit Us</p>
                      <p className="font-display text-lg">
                        123 Temple Road, Srirangam<br />
                        Trichy, Tamil Nadu 620006
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-8 bg-warm-gray/30 border border-gold/10 box-cut">
                <h3 className="font-display text-xl font-bold mb-6">Follow Our Work</h3>
                <div className="flex gap-4">
                  <MagneticButton
                    href="#"
                    className="w-14 h-14 border border-gold/20 box-cut-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-all duration-300"
                  >
                    <Globe className="w-6 h-6" />
                  </MagneticButton>
                  <MagneticButton
                    href="#"
                    className="w-14 h-14 border border-gold/20 box-cut-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 hover:bg-gold/10 transition-all duration-300"
                  >
                    <Play className="w-6 h-6" />
                  </MagneticButton>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="p-8 bg-gradient-to-br from-maroon-dark/50 to-charcoal border border-gold/10 box-cut">
                <h3 className="font-display text-xl font-bold mb-4">Prefer to Talk?</h3>
                <p className="text-cream/50 text-sm mb-6 leading-relaxed">
                  Give us a call and let's discuss your celebration in person. 
                  We're available 10am - 7pm, Monday to Saturday.
                </p>
                <MagneticButton
                  href="tel:+919876543210"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-bold text-sm box-cut-sm hover:bg-gold-light transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Map Section
function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-warm-gray noise-bg">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold mb-4">
            Find <span className="text-gradient">Us</span>
          </h2>
          <p className="text-cream/50">
            Located in the heart of Trichy, easily accessible from all parts of the city.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="aspect-[21/9] bg-charcoal border border-gold/10 box-cut overflow-hidden relative"
        >
          {/* Map Placeholder */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gold/30 mx-auto mb-4" />
              <p className="text-cream/40">Interactive Map</p>
              <p className="text-cream/30 text-sm mt-2">123 Temple Road, Srirangam, Trichy</p>
            </div>
          </div>
        </motion.div>
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
      
      {/* Animated Circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/10 rounded-full"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-bold mb-8"
        >
          Your Story <span className="text-gradient">Awaits</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto"
        >
          Every great photograph starts with a conversation. 
          Let's begin yours today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="tel:+919876543210"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </MagneticButton>
          <MagneticButton
            href="mailto:hello@framestory.in"
            className="group inline-flex items-center gap-2 px-10 py-5 border border-cream/20 text-cream font-bold text-sm tracking-wide box-cut hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// Main Contact Page
export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <MapSection />
      <CTASection />
    </main>
  );
}
