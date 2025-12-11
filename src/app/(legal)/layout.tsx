export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert prose-slate max-w-none prose-headings:font-serif prose-headings:text-white prose-a:text-gold-400 prose-strong:text-slate-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}