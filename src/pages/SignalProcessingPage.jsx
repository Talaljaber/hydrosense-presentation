import { motion } from 'framer-motion';

function RawSignalViz() {
  // Deterministic "noisy" path using fixed seeds
  const pts = Array.from({ length: 80 }, (_, i) => {
    const noise = Math.sin(i * 2.3) * 12 + Math.sin(i * 5.1) * 8 + Math.sin(i * 11.7) * 5;
    const x = i * 5;
    const y = 30 + noise;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 400 60" className="w-full h-14">
      <polyline points={pts} fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FilteredSignalViz() {
  return (
    <svg viewBox="0 0 400 60" className="w-full h-14">
      <motion.path
        d="M0,30 C30,30 40,10 80,28 S160,46 200,30 S280,14 320,28 S380,38 400,30"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2 }}
      />
    </svg>
  );
}

function FeatureMapViz() {
  return (
    <div className="w-full">
      <div
        className="grid grid-rows-4 gap-0.5 rounded overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}
      >
        {Array.from({ length: 64 }).map((_, i) => {
          const seed = ((i * 13 + 7) % 17) / 17;
          return (
            <motion.div
              key={i}
              className="h-5 rounded-sm"
              animate={{
                backgroundColor: `hsl(${270 + seed * 80}, 70%, ${20 + seed * 50}%)`,
              }}
              transition={{ duration: 2 + seed * 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
        <span>Low Freq</span>
        <span>Feature Map (MFCC-style)</span>
        <span>High Freq</span>
      </div>
    </div>
  );
}

function SignalStage({ num, label, icon, desc, visual }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Number(num) * 0.1 }}
      className="rounded-2xl border-2 overflow-hidden"
      style={{ borderColor: visual.color + '50' }}
    >
      <div className="flex items-center gap-4 p-5" style={{ background: visual.color + '10' }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl"
          style={{ background: visual.color + '30', color: visual.color }}
        >
          {num}
        </div>
        <span className="text-3xl">{icon}</span>
        <div className="text-2xl font-black" style={{ color: visual.color }}>{label}</div>
      </div>
      <div className="p-5 flex flex-col md:flex-row gap-6 bg-[#040f1f]">
        <p className="text-slate-300 text-base leading-relaxed flex-1">{desc}</p>
        <div className="flex-1 rounded-xl bg-[#030b14] border border-[#0d2a4a] p-4 flex items-center justify-center min-h-[100px]">
          {visual.component}
        </div>
      </div>
    </motion.div>
  );
}

export default function SignalProcessingPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-8 max-w-3xl">
        Raw sensor data goes through three clear stages before it becomes useful input for the AI model.
        No heavy math — just the concept.
      </p>

      <div className="space-y-6">
        <SignalStage
          num="1"
          label="Raw Signal"
          icon="🌊"
          desc="The hydrophone or vibration sensor produces a continuous voltage signal. At this stage it contains both the leak-related pattern and unwanted background noise from pumps, traffic, and the environment."
          visual={{ color: '#fbbf24', component: <RawSignalViz /> }}
        />

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl text-slate-500"
          >
            ↓
          </motion.div>
        </div>

        <SignalStage
          num="2"
          label="Filtering / Denoising"
          icon="🔇"
          desc="A bandpass filter removes frequencies outside the range where leak sounds appear. The result is a much cleaner signal where the leak pattern becomes visible."
          visual={{ color: '#00d4ff', component: <FilteredSignalViz /> }}
        />

        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl text-slate-500"
          >
            ↓
          </motion.div>
        </div>

        <SignalStage
          num="3"
          label="Feature Extraction"
          icon="📊"
          desc="The cleaned time-domain signal is converted into a frequency-domain feature map — similar to an MFCC spectrogram — that highlights patterns the AI model can recognize. This turns the waveform into a structured set of numbers."
          visual={{ color: '#a78bfa', component: <FeatureMapViz /> }}
        />
      </div>

      {/* Pipeline summary */}
      <div className="mt-8 flex items-center gap-3 p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a] flex-wrap">
        {[
          { label: 'Sensor Signal',     color: '#fbbf24' },
          { label: 'Filter',            color: '#00d4ff' },
          { label: 'Clean Signal',      color: '#00d4ff' },
          { label: 'Feature Extraction',color: '#a78bfa' },
          { label: 'Feature Vector',    color: '#a78bfa' },
          { label: 'AI Model',          color: '#f472b6' },
        ].map((item, i, arr) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
            {i < arr.length - 1 && <span className="text-slate-600">›</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
