export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-gold/20 box-cut-sm" />
          <div className="absolute inset-0 border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent box-cut-sm animate-spin" />
        </div>
        <p className="text-cream/40 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
