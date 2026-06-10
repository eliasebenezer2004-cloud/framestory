export const SITE = {
  name: 'FRAMESTORY',
  tagline: 'Visual Narratives',
  description: 'Premium event photography services capturing weddings, receptions, first birthdays, and baby showers across Tamil Nadu. Based in Trichy.',
  url: 'https://heritage-lens.vercel.app',
} as const;

export const CONTACT = {
  phone: '+919876543210',
  phoneFormatted: '+91 98765 43210',
  email: 'hello@framestory.in',
  address: {
    street: '123 Temple Road, Srirangam',
    city: 'Trichy',
    state: 'Tamil Nadu',
    pin: '620006',
    full: '123 Temple Road, Srirangam\nTrichy, Tamil Nadu 620006',
  },
  hours: '10am - 7pm, Monday to Saturday',
} as const;

export const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
] as const;
