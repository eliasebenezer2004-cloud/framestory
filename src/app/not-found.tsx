import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-center px-6">
        <div className="font-[family-name:var(--font-display)] text-[clamp(6rem,15vw,12rem)] font-bold text-[#D4AF37]/10 leading-none mb-4">
          404
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-[#F0F0F0]/50 text-lg mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide rounded-sm hover:bg-[#E8C960] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
