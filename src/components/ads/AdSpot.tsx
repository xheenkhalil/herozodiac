export function AdSpot({ type = 'rectangle', label = 'Advertisement' }: { type?: 'leaderboard' | 'rectangle' | 'sidebar', label?: string }) {
  // Styles based on ad type
  const styles = {
    leaderboard: "h-[90px] w-full max-w-[728px]",
    rectangle: "h-[250px] w-full max-w-[300px]",
    sidebar: "h-[600px] w-full max-w-[300px]"
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <span className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">{label}</span>
      <div className={`${styles[type]} bg-slate-900/50 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-slate-600 text-xs`}>
        {/* Later, your AdSense/Script goes here */}
        Ad Space ({type})
      </div>
    </div>
  );
}