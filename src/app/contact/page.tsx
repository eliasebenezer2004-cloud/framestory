'use client';

import { useState } from 'react';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

const eventTypes = [
  'Wedding',
  'Reception',
  'Pre-Wedding Shoot',
  'Puberty Function',
  'Seemantham / Baby Shower',
  'First Birthday',
  'Maternity',
  'Cultural Event',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: '',
    eventType: '',
    venue: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Split Screen Section */}
      <section className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* Left - Information */}
          <div className="bg-[#0A0A0A] flex items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="max-w-md w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Contact</span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-6 md:mb-8 leading-tight">
                Let&apos;s Tell Your Story
              </h1>

              <p className="text-[#F0F0F0]/60 text-lg leading-relaxed mb-8 md:mb-10">
                Have a celebration coming up? We&apos;d love to hear about it.
                Reach out and let&apos;s create something beautiful together.
              </p>

              <div className="space-y-5">
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-4 text-[#F0F0F0]/70 hover:text-[#D4AF37] transition-colors duration-300 group"
                >
                  <div className="w-11 h-11 border border-[#F0F0F0]/10 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider">Phone</p>
                    <p className="font-medium text-sm md:text-base">{CONTACT.phoneFormatted}</p>
                  </div>
                </a>

                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[#F0F0F0]/70 hover:text-[#D4AF37] transition-colors duration-300 group"
                >
                  <div className="w-11 h-11 border border-[#F0F0F0]/10 rounded-full flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider">WhatsApp</p>
                    <p className="font-medium text-sm md:text-base">Chat with us</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-[#F0F0F0]/70">
                  <div className="w-11 h-11 border border-[#F0F0F0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider">Studio</p>
                    <p className="font-medium text-sm md:text-base">{CONTACT.address.full}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#F0F0F0]/70">
                  <div className="w-11 h-11 border border-[#F0F0F0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider">Working Hours</p>
                    <p className="font-medium text-sm md:text-base">{CONTACT.workingHours}, All Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="max-w-md w-full">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <Send className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#FAFAFA] mb-3">
                    Thank You!
                  </h3>
                  <p className="text-[#F0F0F0]/60">
                    We&apos;ve received your inquiry. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-[#FAFAFA] mb-2">
                      Book a Session
                    </h2>
                    <p className="text-[#F0F0F0]/50 text-sm">
                      Fill in the details and we&apos;ll check availability for your date.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      className="input-bottom-border"
                      placeholder="e.g. Karthik Rajan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="input-bottom-border"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Event Date</label>
                    <input
                      type="date"
                      className="input-bottom-border"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Event Type</label>
                    <select
                      className="input-bottom-border bg-transparent"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    >
                      <option value="" className="bg-[#121212]">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#121212]">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Event Venue</label>
                    <input
                      type="text"
                      className="input-bottom-border"
                      placeholder="e.g. Temple Road, Srirangam"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#F0F0F0]/40 uppercase tracking-wider block mb-2">Tell Us About Your Event</label>
                    <textarea
                      rows={3}
                      className="input-bottom-border resize-none"
                      placeholder="Any special requests or details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide hover:bg-[#E8C960] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Check Availability
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="w-full h-[350px] md:h-[400px] bg-[#0A0A0A]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.7361873618735!2d78.7047!3d10.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d5ed0c2b43%3A0x4d3ba79b6f8e6b4a!2sSrirangam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Framestory studio location in Srirangam, Trichy"
        />
      </section>
    </main>
  );
}
