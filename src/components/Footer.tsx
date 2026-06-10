'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Heart, Globe, Play } from 'lucide-react';

const footerLinks = {
  studio: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Weddings', href: '/services' },
    { label: 'Receptions', href: '/services' },
    { label: 'First Birthdays', href: '/services' },
    { label: 'Baby Showers', href: '/services' },
    { label: 'Pre-Wedding', href: '/services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Globe, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@framestory.in', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal border-t border-gold/10">
      {/* Top Marquee */}
      <div className="py-6 border-b border-gold/10 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-block text-[120px] md:text-[200px] font-display font-bold text-gold/5 leading-none mx-8">
            FRAMESTORY
          </span>
          <span className="inline-block text-[120px] md:text-[200px] font-display font-bold text-gold/5 leading-none mx-8">
            VISUAL NARRATIVES
          </span>
          <span className="inline-block text-[120px] md:text-[200px] font-display font-bold text-gold/5 leading-none mx-8">
            FRAMESTORY
          </span>
          <span className="inline-block text-[120px] md:text-[200px] font-display font-bold text-gold/5 leading-none mx-8">
            VISUAL NARRATIVES
          </span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold box-cut-sm flex items-center justify-center">
                  <span className="text-charcoal font-display font-bold text-xl">F</span>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold tracking-tight text-cream block">
                    FRAMESTORY
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-gold/60 uppercase">
                    Visual Narratives
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed max-w-sm mb-8">
              Crafting timeless visual stories that celebrate life's most precious moments. 
              Based in Trichy, capturing emotions across Tamil Nadu.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 border border-gold/20 box-cut-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-sm tracking-wider text-gold mb-6 uppercase">
              Studio
            </h4>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/50 text-sm hover:text-cream transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-sm tracking-wider text-gold mb-6 uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/50 text-sm hover:text-cream transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-sm tracking-wider text-gold mb-6 uppercase">
              Get in Touch
            </h4>
            <div className="space-y-4 mb-8">
              <a
                href="tel:+919876543210"
                className="block text-cream/70 text-lg font-display hover:text-gold transition-colors duration-300"
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@framestory.in"
                className="block text-cream/70 text-lg font-display hover:text-gold transition-colors duration-300"
              >
                hello@framestory.in
              </a>
              <p className="text-cream/50 text-sm">
                123 Temple Road, Srirangam<br />
                Trichy, Tamil Nadu 620006
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-semibold text-sm box-cut-sm hover:bg-gold-light transition-all duration-300"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            © 2024 Framestory. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-maroon fill-maroon" /> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
