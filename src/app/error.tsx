'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="text-center px-6">
        <div className="w-16 h-16 bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6 rounded-full">
          <span className="text-[#D4AF37] text-2xl">!</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
          Something Went Wrong
        </h1>
        <p className="text-[#F0F0F0]/50 text-lg mb-10 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#121212] font-bold text-sm tracking-wide rounded-sm hover:bg-[#E8C960] transition-all duration-300 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
