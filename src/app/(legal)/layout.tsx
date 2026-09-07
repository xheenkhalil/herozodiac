export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 md:p-14 shadow-sm">
          <div className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-a:text-[#7B1123] prose-strong:text-stone-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}