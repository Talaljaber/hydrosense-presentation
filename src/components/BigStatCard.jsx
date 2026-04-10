export default function BigStatCard({ num, unit, label, sub, color }) {
  const colors = {
    cyan:   { border: '#0d4080', text: '#00d4ff', bg: '#040f20' },
    amber:  { border: '#7a5000', text: '#fbbf24', bg: '#0f0a00' },
    orange: { border: '#7a3000', text: '#fb923c', bg: '#100800' },
    red:    { border: '#7a1010', text: '#f87171', bg: '#120000' },
  };
  const c = colors[color];
  return (
    <div
      className="p-6 rounded-xl border-2 flex flex-col gap-2"
      style={{ borderColor: c.border, background: c.bg }}
    >
      <div className="text-4xl font-black" style={{ color: c.text }}>{num}</div>
      <div className="text-sm font-bold text-slate-300">{unit}</div>
      <div className="text-base font-bold text-white">{label}</div>
      <div className="text-xs text-slate-500 leading-relaxed">{sub}</div>
    </div>
  );
}
