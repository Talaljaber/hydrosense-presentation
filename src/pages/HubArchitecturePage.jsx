import { motion } from 'framer-motion';

function ArchZone({ color, label, children, wide = false }) {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex-shrink-0 flex flex-col gap-2 ${wide ? 'w-48' : 'w-36'}`}
      style={{ borderColor: color + '60', background: color + '10' }}
    >
      <div
        className="text-xs font-bold text-center pb-2 border-b"
        style={{ color, borderColor: color + '40' }}
      >
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function ConnArrow({ color, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 flex-shrink-0 w-14">
      <div className="text-xs text-slate-500 text-center leading-tight">{label}</div>
      <motion.div
        className="text-2xl font-bold"
        style={{ color }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ›
      </motion.div>
    </div>
  );
}

function PipeBlock() {
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-800 h-10 flex items-center justify-center overflow-hidden relative">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: 'linear-gradient(90deg, #00d4ff, transparent, #00d4ff)' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <span className="text-xs font-bold text-slate-400 z-10">Plastic Pipe</span>
    </div>
  );
}

function SensorBlock({ icon, label, color, ch }) {
  return (
    <div
      className="rounded-lg border p-2 flex items-center gap-2 text-xs"
      style={{ borderColor: color + '60', background: color + '10' }}
    >
      <span className="text-lg">{icon}</span>
      <div>
        <div className="font-bold" style={{ color }}>{label}</div>
        <div className="text-slate-500">{ch}</div>
      </div>
    </div>
  );
}

function EdgeBlock({ icon, label, color }) {
  return (
    <div
      className="rounded-lg border p-2 flex items-center gap-2 text-xs"
      style={{ borderColor: color + '50', background: color + '0d' }}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

function MiniDashPreview() {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-950/20 p-2 text-xs space-y-2">
      <div className="text-center font-black text-red-400">⚠ LEAK</div>
      {[['Risk', 'High', '#ef4444'], ['CH', 'CH2', '#a78bfa'], ['Conf', '92%', '#00d4ff']].map(
        ([k, v, c]) => (
          <div key={k} className="flex justify-between">
            <span className="text-slate-500">{k}</span>
            <span className="font-bold" style={{ color: c }}>{v}</span>
          </div>
        ),
      )}
    </div>
  );
}

export default function HubArchitecturePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-8 max-w-3xl">
        ESP32 handles sensing and channel routing. A local edge computer cleans signals,
        extracts features, runs the AI model, and serves the dashboard.
      </p>

      {/* Architecture strip */}
      <div className="flex items-stretch gap-2 mb-8 overflow-x-auto pb-2">
        <ArchZone color="#0066aa" label="Physical Layer">
          <div className="space-y-3">
            <PipeBlock />
            <SensorBlock icon="🎙" label="Hydrophone" color="#00d4ff" ch="CH1" />
            <SensorBlock icon="🎙" label="Hydrophone" color="#00d4ff" ch="CH2" />
            <SensorBlock icon="📳" label="Vibration"  color="#fbbf24" ch="CH3" />
          </div>
        </ArchZone>

        <ConnArrow color="#0066aa" label="Analog signal" />

        <ArchZone color="#aa5500" label="Multiplexer">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="text-3xl">🔀</div>
            <div className="font-black text-amber-400 text-center text-sm">MUX</div>
            {['CH1', 'CH2', 'CH3'].map((ch) => (
              <div
                key={ch}
                className="w-full text-center text-xs font-bold py-1 rounded"
                style={{ background: '#1a0800', color: ch === 'CH2' ? '#fbbf24' : '#4a4a4a' }}
              >
                {ch}
              </div>
            ))}
            <div className="text-xs text-slate-500 text-center mt-1">
              Selects active<br />channel
            </div>
          </div>
        </ArchZone>

        <ConnArrow color="#aa5500" label="Selected signal" />

        <ArchZone color="#005588" label="ESP32">
          <div className="flex flex-col items-center gap-3">
            <span className="text-4xl">📟</span>
            <div className="font-black text-[#00d4ff] text-sm text-center">ESP32</div>
            <div className="text-xs text-slate-400 text-center leading-relaxed">
              Sensor reading<br />Channel selection<br />Signal acquisition<br />Sends windows to edge
            </div>
          </div>
        </ArchZone>

        <ConnArrow color="#005588" label="Signal windows" />

        <ArchZone color="#005522" label="Local Edge Computer" wide>
          <div className="space-y-3">
            <EdgeBlock icon="🌊" label="Raw Signal"           color="#fbbf24" />
            <EdgeBlock icon="🔇" label="Filtering / Denoising" color="#00d4ff" />
            <EdgeBlock icon="📊" label="Feature Extraction"   color="#a78bfa" />
            <EdgeBlock icon="🧠" label="AI Leak Classifier"   color="#f472b6" />
          </div>
        </ArchZone>

        <ConnArrow color="#005522" label="Result / JSON" />

        <ArchZone color="#003377" label="Remote Dashboard">
          <MiniDashPreview />
        </ArchZone>
      </div>

      {/* Host mapping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            who: 'ESP32',
            color: '#00d4ff',
            border: '#004080',
            items: ['Sensor reading', 'Channel selection logic', 'Basic acquisition', 'Send signal windows to edge'],
          },
          {
            who: 'Edge Computer\n(Laptop / Raspberry Pi)',
            color: '#34d399',
            border: '#003a20',
            items: ['Signal processing pipeline', 'Feature extraction', 'AI model inference', 'Dashboard backend + frontend'],
          },
          {
            who: 'Remote Dashboard',
            color: '#60a5fa',
            border: '#003070',
            items: ['Leak / No Leak status', 'Risk and impact level', 'Confidence score', 'Affected channel and location'],
          },
        ].map((h) => (
          <div
            key={h.who}
            className="p-5 rounded-xl border bg-[#040f1f]"
            style={{ borderColor: h.border }}
          >
            <div
              className="text-lg font-black whitespace-pre-line mb-3"
              style={{ color: h.color }}
            >
              {h.who}
            </div>
            <ul className="space-y-2">
              {h.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: h.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
