'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="text-center px-6">
        <div className="w-16 h-16 bg-maroon/20 flex items-center justify-center mx-auto mb-6 box-cut-sm">
          <span className="text-maroon text-2xl">!</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Something Went Wrong
        </h1>
        <p className="text-cream/50 text-lg mb-10 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-bold text-sm tracking-wide box-cut-sm hover:bg-gold-light transition-all duration-300 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
