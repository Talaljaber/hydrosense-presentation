export default function DashCard({ label, value, color, large, wide }) {
  const colors = {
    red:    { text: '#ef4444', border: '#7a1010', bg: '#120000' },
    green:  { text: '#34d399', border: '#065f46', bg: '#00100a' },
    orange: { text: '#fb923c', border: '#7a3000', bg: '#100800' },
    cyan:   { text: '#00d4ff', border: '#004080', bg: '#040f20' },
    purple: { text: '#a78bfa', border: '#3a1a7a', bg: '#080212' },
    amber:  { text: '#fbbf24', border: '#7a5000', bg: '#0f0a00' },
    dim:    { text: '#4a6a8a', border: '#0d2a4a', bg: '#040f1f' },
  };
  const c = colors[color] || colors.dim;
  return (
    <div
      className={`p-5 rounded-xl border-2 flex flex-col gap-2 ${wide ? 'col-span-1 md:col-span-2' : ''}`}
      style={{ borderColor: c.border, background: c.bg }}
    >
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
      <div
        className={`font-black ${large ? 'text-3xl' : 'text-2xl'}`}
        style={{ color: c.text }}
      >
        {value}
      </div>
    </div>
  );
}
