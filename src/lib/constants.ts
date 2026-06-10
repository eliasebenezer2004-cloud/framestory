export const SITE = {
  name: 'FRAMESTORY',
  tagline: 'Visual Narratives',
  description: 'Premium wedding and event photography in Trichy, Tamil Nadu. Capturing candid moments, traditional ceremonies, and timeless stories.',
  url: 'https://framestory.vercel.app',
} as const;

export const CONTACT = {
  phone: '+919876543210',
  phoneFormatted: '+91 98765 43210',
  whatsapp: '+919876543210',
  whatsappLink: 'https://wa.me/919876543210',
  email: 'hello@framestory.in',
  address: {
    street: '123 Temple Road, Srirangam',
    city: 'Trichy',
    state: 'Tamil Nadu',
    pin: '620006',
    full: '123 Temple Road, Srirangam, Trichy, Tamil Nadu 620006',
  },
  workingHours: '10 AM - 10 PM',
  googleRating: '4.9',
} as const;

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/framestory' },
  { label: 'YouTube', href: 'https://youtube.com/@framestory' },
] as const;

export const SERVICES = [
  'Premium Weddings & Receptions',
  'Post-Wedding / Outdoor Shoots',
  'Puberty Functions & Half-Saree Ceremonies',
  'Seemantham (Baby Showers) & Maternity',
  'Local Festive & Cultural Events',
  'Candid Photography',
] as const;

export const PRODUCTS = [
  {
    title: '4K Premium Synthetic Albums',
    description: 'Heirloom-quality albums with vivid prints that last generations.',
  },
  {
    title: 'Baby Casting Services',
    description: 'Preserve tiny hands and feet in beautiful resin casts.',
  },
  {
    title: 'Customized Light Frames',
    description: 'Illuminated frames that make your favourite photo glow.',
  },
  {
    title: 'Photo Mugs',
    description: 'Start every morning with your most cherished memory.',
  },
  {
    title: 'Imaginary Art',
    description: 'Creative artistic renditions of your beloved photographs.',
  },
] as const;
