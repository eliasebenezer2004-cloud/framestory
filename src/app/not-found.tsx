import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="text-center px-6">
        <div className="font-display text-[clamp(6rem,15vw,12rem)] font-bold text-gold/10 leading-none mb-4">
          404
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-cream/50 text-lg mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut-sm hover:bg-gold-light transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
