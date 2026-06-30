'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(18,18,18,0.85)] backdrop-blur-[10px]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-[#D4AF37] rounded-sm flex items-center justify-center">
                <span className="text-[#121212] font-[family-name:var(--font-display)] font-bold text-base md:text-lg">F</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] text-base md:text-xl font-bold tracking-tight text-[#F0F0F0]">
                  FRAMESTORY
                </span>
                <span className="block text-[9px] md:text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
                  Visual Narratives
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
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
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-[#F0F0F0]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-[rgba(18,18,18,0.98)] backdrop-blur-xl lg:hidden menu-fade-in"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl md:text-4xl font-[family-name:var(--font-display)] font-bold tracking-tight transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-[#D4AF37]'
                    : 'text-[#F0F0F0]/50 hover:text-[#F0F0F0]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
