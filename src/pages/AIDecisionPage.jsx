import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureMapViz } from '../components/SignalVisuals';

export default function AIDecisionPage() {
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDecided(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-8 max-w-3xl">
        The AI model receives the extracted features, checks whether the pattern looks like a leak,
        and outputs one simple binary decision.
      </p>

      {/* Main flow */}
      <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
        {/* Feature input */}
        <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#2a1a5a] bg-[#080412] w-52">
          <div className="text-sm font-bold text-purple-300 uppercase tracking-widest text-center">
            Extracted Features
          </div>
          <FeatureMapViz />
          <div className="text-xs text-slate-500 text-center">
            Frequency-domain patterns from the cleaned signal
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          className="text-5xl text-purple-500"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ›
        </motion.div>

        {/* AI model */}
        <div className="relative flex items-center justify-center w-48 h-48">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-pink-500/20"
          />
          <div className="flex flex-col items-center gap-2 z-10">
            <span className="text-5xl">🧠</span>
            <div className="text-pink-400 font-black text-lg text-center">
              AI Leak<br />Classifier
            </div>
            <div className="text-xs text-slate-500 text-center">
              Binary model<br />Runs on edge
            </div>
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          className="text-5xl text-pink-500"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ›
        </motion.div>

        {/* Decision output */}
        <div className="flex flex-col gap-4 w-48">
          <AnimatePresence>
            {decided && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-2xl border-2 border-red-500 bg-red-950/30 text-center"
                style={{ boxShadow: '0 0 30px rgba(239,68,68,0.25)' }}
              >
                <div className="text-3xl font-black text-red-400 mb-2">LEAK</div>
                <div className="text-slate-400 text-sm mb-3">Detected</div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Confidence</span>
                  <span className="text-red-400 font-bold">92%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0d2a4a] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4 rounded-xl border border-[#0d2a4a] bg-[#040f1f] text-center opacity-35">
            <div className="text-lg font-black text-emerald-400 mb-1">NO LEAK</div>
            <div className="text-slate-500 text-xs">Not selected</div>
          </div>
        </div>
      </div>

      {/* Why edge */}
      <div className="p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a]">
        <div className="text-base font-black text-[#00d4ff] mb-3">
          Why the model runs on the local edge computer, not on the ESP32
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Easier to build and debug',
            'Avoids overloading ESP32 memory',
            'Keeps inference near real-time',
            'Easier to update the model later',
          ].map((r) => (
            <div key={r} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-emerald-400 mt-0.5">✓</span>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Output summary */}
      <div className="mt-5 p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a]">
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
          What the model sends to the dashboard
        </div>
        <div className="flex gap-6 flex-wrap">
          {[
            { label: 'Decision',    value: 'Leak / No Leak',    color: '#f472b6' },
            { label: 'Confidence', value: '0–100%',             color: '#00d4ff' },
            { label: 'Channel',    value: 'CH1 / CH2 / CH3',   color: '#a78bfa' },
          ].map((o) => (
            <div key={o.label} className="flex items-center gap-3">
              <div className="text-xs text-slate-500 uppercase">{o.label}</div>
              <div className="font-black text-base" style={{ color: o.color }}>{o.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
