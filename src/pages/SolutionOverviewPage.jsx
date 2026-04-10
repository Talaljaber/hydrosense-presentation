import React from 'react';
import { motion } from 'framer-motion';

const BLOCKS = [
  { label: 'Leak Event',                sub: 'Real physical leakage begins in the pipe',          color: '#ef4444', icon: '💧' },
  { label: 'Hydrophone +\nVib Sensor',  sub: 'Multi-sensor monitoring at the pipe',               color: '#00d4ff', icon: '🎙' },
  { label: 'Multiplexer Hub',           sub: 'Several channels share one hub',                    color: '#fbbf24', icon: '🔀' },
  { label: 'Signal Processing',         sub: 'Filter · Denoise · Extract features',               color: '#a78bfa', icon: '📊' },
  { label: 'AI Model',                  sub: 'Binary Leak / No Leak decision',                    color: '#f472b6', icon: '🧠' },
  { label: 'ESP32 / Comms',             sub: 'Wireless result transmission',                      color: '#34d399', icon: '📡' },
  { label: 'Dashboard',                 sub: 'Risk · Impact · Confidence · Channel',              color: '#60a5fa', icon: '🖥️' },
];

export default function SolutionOverviewPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-10 max-w-3xl">
        HydroSense uses a shared multiplexer hub so multiple sensing channels work through
        one signal-processing and AI pipeline — keeping cost low.
      </p>

      {/* Desktop flow */}
      <div className="hidden md:flex items-stretch gap-0 mb-10">
        {BLOCKS.map((b, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex-1 flex flex-col items-center p-5 rounded-2xl border-2 bg-[#040f1f] text-center"
              style={{ borderColor: b.color + '60' }}
            >
              <span className="text-4xl mb-3">{b.icon}</span>
              <div
                className="font-black text-base leading-snug whitespace-pre-line mb-2"
                style={{ color: b.color }}
              >
                {b.label}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">{b.sub}</div>
            </motion.div>
            {i < BLOCKS.length - 1 && (
              <div className="flex items-center px-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="text-2xl text-slate-500 font-bold"
                >
                  ›
                </motion.div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile flow */}
      <div className="flex md:hidden flex-col gap-3 mb-8">
        {BLOCKS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border bg-[#040f1f]"
            style={{ borderColor: b.color + '60' }}
          >
            <span className="text-3xl">{b.icon}</span>
            <div>
              <div className="font-black text-base" style={{ color: b.color }}>{b.label}</div>
              <div className="text-xs text-slate-400">{b.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4 key differentiators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { title: 'Multi-sensor monitoring', desc: 'Hydrophone + vibration sensors work together',           color: '#00d4ff' },
          { title: 'Shared hub design',        desc: 'One hub covers several sensing channels via multiplexer', color: '#fbbf24' },
          { title: 'Leak / No Leak AI',        desc: 'Simple binary output — clear and fast',                  color: '#f472b6' },
          { title: 'Dashboard alert',          desc: 'Risk, impact, confidence, and channel shown clearly',    color: '#34d399' },
        ].map((d) => (
          <div key={d.title} className="p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a]">
            <div className="text-base font-black mb-2" style={{ color: d.color }}>{d.title}</div>
            <div className="text-sm text-slate-400">{d.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
