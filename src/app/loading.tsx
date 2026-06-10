export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        </div>
        <p className="text-[#F0F0F0]/40 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
