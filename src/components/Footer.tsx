import Link from 'next/link';
import { SITE, CONTACT, SOCIALS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#F0F0F0]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-sm flex items-center justify-center">
                  <span className="text-[#121212] font-[family-name:var(--font-display)] font-bold text-lg">F</span>
                </div>
                <div>
                  <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#F0F0F0] block">
                    {SITE.name}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
                    {SITE.tagline}
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-[#F0F0F0]/50 text-sm leading-relaxed max-w-sm">
              {SITE.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-sm tracking-wider text-[#D4AF37] mb-6 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F0F0F0]/50 text-sm hover:text-[#F0F0F0] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-bold text-sm tracking-wider text-[#D4AF37] mb-6 uppercase">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${CONTACT.phone}`}
                className="block text-[#F0F0F0]/70 hover:text-[#D4AF37] transition-colors duration-300"
              >
                {CONTACT.phoneFormatted}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-[#F0F0F0]/70 hover:text-[#D4AF37] transition-colors duration-300"
              >
                {CONTACT.email}
              </a>
              <p className="text-[#F0F0F0]/50">
                {CONTACT.address.street}<br />
                {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.pin}
              </p>
              <p className="text-[#F0F0F0]/50">
                <span className="text-[#D4AF37]/70">Working Hours:</span><br />
                {CONTACT.workingHours}
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#F0F0F0]/40 hover:text-[#D4AF37] transition-colors duration-300 text-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F0F0F0]/30 text-xs">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-[#F0F0F0]/30 text-xs">
            Crafted with care in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
