import { motion } from 'framer-motion';

const VALUES = [
  {
    icon: '🔧',
    title: 'Built for Plastic Pipes',
    body: 'Purpose-tuned for HDPE and PVC networks that dominate Jordan\'s distribution grid — not retrofitted from steel-pipe solutions.',
    color: '#00d4ff',
    border: '#0a2035',
  },
  {
    icon: '💰',
    title: 'Low-Cost Multiplexer Hub',
    body: 'A single hub covers three sensors simultaneously, cutting wiring cost and reducing the number of microcontrollers needed per district.',
    color: '#fbbf24',
    border: '#2a1a00',
  },
  {
    icon: '📡',
    title: 'Multi-Sensor Monitoring',
    body: 'Hydrophone plus vibration sensors capture both acoustic and mechanical signatures, improving detection reliability.',
    color: '#a78bfa',
    border: '#1a0a3a',
  },
  {
    icon: '📈',
    title: 'Easier to Scale',
    body: 'The hub design lets field crews add more sensors to the same ESP32 without changing firmware — just plug in.',
    color: '#34d399',
    border: '#002a1a',
  },
  {
    icon: '🧠',
    title: 'Clear AI Decision',
    body: 'Binary Leak / No Leak output with confidence score gives operators a single actionable signal rather than raw waveforms.',
    color: '#f472b6',
    border: '#2a0a1a',
  },
  {
    icon: '🖥️',
    title: 'Actionable Dashboard',
    body: 'Web interface shows decision, confidence, estimated water loss in litres and Jordanian Dinars, and the exact sensor channel.',
    color: '#fb923c',
    border: '#2a1000',
  },
];

const RECALL = [
  { num: '61 m³', label: 'Water per person per year in Jordan' },
  { num: '>35%', label: 'Lost before reaching any tap' },
  { num: '94.77M m³', label: 'Annual water gap' },
  { num: '~50.18M JOD', label: 'Economic value of losses each year' },
];

export default function FinalValuePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Value cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border flex flex-col gap-3"
            style={{ borderColor: v.border, background: '#040f1f' }}
          >
            <div className="text-4xl">{v.icon}</div>
            <div className="text-lg font-black" style={{ color: v.color }}>
              {v.title}
            </div>
            <div className="text-slate-300 text-sm leading-relaxed">{v.body}</div>
            <div
              className="h-1 rounded-full mt-auto"
              style={{ background: v.color, opacity: 0.35 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Problem reminder */}
      <div className="p-5 rounded-2xl border border-[#0d2a4a] bg-[#040f1f] mb-8">
        <div className="text-base font-black text-slate-400 uppercase tracking-widest mb-4">
          The problem HydroSense is solving
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RECALL.map((r) => (
            <div
              key={r.num}
              className="text-center p-4 rounded-xl bg-[#050d1a] border border-[#0d2a4a]"
            >
              <div className="text-2xl lg:text-3xl font-black text-[#00d4ff] mb-1">
                {r.num}
              </div>
              <div className="text-xs text-slate-400">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="relative p-10 rounded-2xl overflow-hidden text-center"
        style={{
          background:
            'linear-gradient(135deg, #040f1f 0%, #0a0f2e 50%, #040f1f 100%)',
          border: '1px solid #0d2a4a',
          boxShadow: '0 0 60px rgba(0,212,255,0.07)',
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, #00d4ff 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #a78bfa 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <div className="text-5xl mb-4">💧</div>
          <div className="text-3xl lg:text-4xl font-black text-white mb-3">
            HydroSense
          </div>
          <div className="text-xl font-bold text-[#00d4ff] mb-6">
            Detect the leak. Save the water. Make every drop count.
          </div>
          <div className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            Jordan cannot afford to keep losing half its water to hidden pipe leaks.
            HydroSense provides a practical, low-cost AI system built specifically
            for the infrastructure and constraints of Jordanian water networks.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
