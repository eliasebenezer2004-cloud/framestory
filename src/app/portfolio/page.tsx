'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// Gallery Data
const categories = ['All', 'Weddings', 'Receptions', 'Birthdays', 'Baby Showers', 'Pre-Wedding'];

const projects = [
  {
    id: 1,
    title: "Priya & Arjun's Wedding",
    category: "Weddings",
    location: "Thanjavur",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    description: "A traditional Tamil wedding at the Brihadeeswarar Temple, capturing sacred rituals and candid moments.",
  },
  {
    id: 2,
    title: "Kavya's First Birthday",
    category: "Birthdays",
    location: "Trichy",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    description: "An intimate celebration filled with joy, laughter, and precious family moments.",
  },
  {
    id: 3,
    title: "Meera & Vikram's Reception",
    category: "Receptions",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    description: "A grand reception at a luxury hotel, blending modern elegance with traditional charm.",
  },
  {
    id: 4,
    title: "Anjali's Baby Shower",
    category: "Baby Showers",
    location: "Madurai",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    description: "A beautiful Valaikappu ceremony celebrating the expecting mother with vibrant colors.",
  },
  {
    id: 5,
    title: "Lakshmi & Ravi's Wedding",
    category: "Weddings",
    location: "Coimbatore",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    description: "A three-day wedding celebration showcasing rich Tamil traditions and customs.",
  },
  {
    id: 6,
    title: "Arjun & Meena's Pre-Wedding",
    category: "Pre-Wedding",
    location: "Pondicherry",
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    description: "A romantic pre-wedding shoot along the beaches of Pondicherry at golden hour.",
  },
  {
    id: 7,
    title: "Diya's Second Birthday",
    category: "Birthdays",
    location: "Trichy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    description: "A fun-filled birthday party with themed decorations and candid family moments.",
  },
  {
    id: 8,
    title: "Vijay & Priya's Reception",
    category: "Receptions",
    location: "Salem",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    description: "An elegant evening reception with stunning decor and heartfelt celebrations.",
  },
  {
    id: 9,
    title: "Suresh & Kavitha's Wedding",
    category: "Weddings",
    location: "Tirunelveli",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    description: "A traditional temple wedding with authentic rituals and emotional moments.",
  },
];

// Portfolio Hero
function PortfolioHero() {
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
          PORTFOLIO
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
            Our Work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tight mb-8"
        >
          Visual <span className="text-gradient">Stories</span>
          <br />
          We've Crafted
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream/60 text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Every project is a unique narrative. Explore our collection of 
          captured moments across Tamil Nadu.
        </motion.p>
      </div>
    </div>
  );
}

// Filter Bar
function FilterBar({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (cat: string) => void }) {
  return (
    <div className="sticky top-20 z-30 py-6 bg-charcoal/90 backdrop-blur-xl border-b border-gold/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-gold/50 mr-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm hidden md:block">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm tracking-wide whitespace-nowrap transition-all duration-300 box-cut-sm ${
                activeCategory === category
                  ? 'bg-gold text-charcoal font-bold'
                  : 'bg-warm-gray/50 text-cream/60 hover:text-cream hover:bg-warm-gray'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Project Card
function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
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
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-2 block">
            {project.category}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-2">
            {project.title}
          </h3>
          <p className="text-cream/50 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.description}
          </p>
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-cream/40 text-xs">{project.location}</span>
            <div className="flex items-center gap-2 text-gold text-sm">
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/0 group-hover:border-gold transition-all duration-500" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/0 group-hover:border-gold transition-all duration-500" />
    </motion.div>
  );
}

// Lightbox
function Lightbox({ project, onClose, onNext, onPrev }: { project: typeof projects[0]; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-charcoal/98 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 border border-gold/30 box-cut-sm flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-all duration-300 z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 box-cut-sm flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold/30 box-cut-sm flex items-center justify-center text-cream hover:bg-gold hover:text-charcoal transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl w-full mx-4 md:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-warm-gray box-cut overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </div>

        {/* Details */}
        <div className="p-8">
          <span className="text-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            {project.category}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h2>
          <p className="text-cream/60 leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-cream/40">
            <span>📍 {project.location}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
          Inspired? Let's Create <br />
          <span className="text-gradient">Your Story</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cream/60 text-lg mb-12 max-w-2xl mx-auto"
        >
          Every celebration is unique. Let's discuss how we can capture 
          your special moments in a way that's uniquely you.
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
            Start Your Project
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Main Portfolio Page
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: typeof projects[0], index: number) => {
    setSelectedProject(project);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setCurrentIndex(nextIndex);
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setCurrentIndex(prevIndex);
    setSelectedProject(filteredProjects[prevIndex]);
  };

  return (
    <main>
      <PortfolioHero />
      <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => handleProjectClick(project, index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTASection />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
