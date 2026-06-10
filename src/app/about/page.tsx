'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Camera, Heart, Award, Users } from 'lucide-react';

// Hero Section
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 diagonal-pattern" />
      
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          style={{ y }}
          className="text-[150px] md:text-[300px] font-display font-bold text-gold/[0.03] leading-none whitespace-nowrap"
        >
          ABOUT US
        </motion.span>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="max-w-[1800px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
                Our Story
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tight mb-8"
            >
              Where <span className="text-gradient">Tradition</span>
              <br />
              Meets Vision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-cream/60 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Framestory was born from a simple belief: every celebration has a soul, 
              and our job is to capture it. We blend traditional values with contemporary 
              aesthetics to create timeless visual narratives.
            </motion.p>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-gold/20 box-cut" />
              <div className="relative aspect-[4/5] bg-warm-gray box-cut overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-maroon/30 to-charcoal/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-gold/20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Philosophy Section
function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: "Authenticity",
      description: "We believe in capturing real emotions, not staged moments. Every smile, every tear, every glance tells a story.",
      icon: Heart,
    },
    {
      title: "Artistry",
      description: "Photography is our art form. We approach every event with the eye of an artist and the precision of a craftsman.",
      icon: Camera,
    },
    {
      title: "Heritage",
      description: "We honor the rich traditions of Tamil Nadu while bringing a fresh, modern perspective to every celebration.",
      icon: Award,
    },
    {
      title: "Connection",
      description: "We don't just document events; we build relationships. Understanding your story helps us capture it better.",
      icon: Users,
    },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-warm-gray noise-bg">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Title */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase">Philosophy</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl font-bold mb-8"
            >
              What Drives <br />
              <span className="text-gradient">Our Craft</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-cream/60 leading-relaxed"
            >
              At Framestory, we approach every project with intention. 
              Our philosophy is rooted in the belief that great photography 
              requires both technical mastery and emotional intelligence.
            </motion.p>
          </div>

          {/* Right - Values */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group p-8 bg-charcoal/50 border border-gold/10 box-cut hover:border-gold/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6 box-cut-sm group-hover:bg-gold/20 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Journey Section
function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    {
      year: "2016",
      title: "The Beginning",
      description: "Started with a borrowed camera and a passion for storytelling. First wedding shoot at a small temple in Srirangam.",
    },
    {
      year: "2018",
      title: "First Major Break",
      description: "Covered a 3-day wedding for a prominent family in Trichy. The photos went viral on social media.",
    },
    {
      year: "2020",
      title: "Studio Founded",
      description: "Opened our first dedicated studio. Expanded team to 3 photographers and 2 videographers.",
    },
    {
      year: "2022",
      title: "Across Tamil Nadu",
      description: "Expanded operations to cover events across Chennai, Madurai, Coimbatore, and beyond.",
    },
    {
      year: "2024",
      title: "Award Winning",
      description: "Recognized as one of the top event photography studios in South India. 500+ events captured.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
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
            <span className="text-gold text-sm tracking-[0.3em] uppercase">Our Journey</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            A Decade of <span className="text-gradient">Stories</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-mono text-gold text-sm">{milestone.year}</span>
                  <h3 className="font-display text-2xl font-bold mt-2 mb-3">{milestone.title}</h3>
                  <p className="text-cream/50 leading-relaxed">{milestone.description}</p>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex justify-center">
                  <div className="w-4 h-4 bg-gold box-cut-sm relative">
                    <div className="absolute inset-0 bg-gold/30 animate-ping" />
                  </div>
                </div>

                {/* Empty Space */}
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Team Section
function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Karthik Rajan",
      role: "Founder & Lead Photographer",
      description: "With over 8 years of experience, Karthik brings a unique blend of traditional and contemporary aesthetics to every project.",
    },
    {
      name: "Divya Prakash",
      role: "Creative Director",
      description: "Divya's background in fine arts and cinematography adds a cinematic quality to our visual narratives.",
    },
    {
      name: "Arun Kumar",
      role: "Senior Photographer",
      description: "Specializing in candid moments, Arun has an incredible eye for capturing emotions in their purest form.",
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
            <span className="text-gold text-sm tracking-[0.3em] uppercase">The Team</span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            Meet the <span className="text-gradient">Artists</span>
          </motion.h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              {/* Photo Placeholder */}
              <div className="relative aspect-[3/4] bg-charcoal mb-6 box-cut overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gold/20" />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="font-display text-xl font-bold mb-1 group-hover:text-gold transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-gold/60 text-sm mb-3">{member.role}</p>
              <p className="text-cream/50 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "500+", label: "Events Covered" },
    { number: "8+", label: "Years Experience" },
    { number: "15+", label: "Team Members" },
    { number: "50K+", label: "Photos Delivered" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "25+", label: "Cities Covered" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-maroon-dark overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[150px] md:text-[300px] font-display font-bold text-white/[0.02] leading-none">
          NUMBERS
        </span>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.number}
              </div>
              <div className="text-cream/50 text-sm tracking-wider uppercase">
                {stat.label}
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
      <div className="absolute inset-0 diagonal-pattern" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-bold mb-8"
        >
          Ready to Tell <span className="text-gradient">Your Story?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto"
        >
          We'd love to hear about your upcoming celebration. 
          Let's create something beautiful together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-all duration-300"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main About Page
export default function About() {
  return (
    <main>
      <AboutHero />
      <Philosophy />
      <Journey />
      <Team />
      <Stats />
      <CTASection />
    </main>
  );
}
