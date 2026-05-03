import React from 'react';
import { motion } from 'framer-motion';

export default function Slide3() {
  const svmKernels = [
    { kernel: 'Linear',  f1: '0.821', sens: '0.834', spec: '0.246' },
    { kernel: 'RBF',     f1: '0.824', sens: '0.809', spec: '0.435' },
    { kernel: 'Poly',    f1: '0.832', sens: '0.827', spec: '0.384' },
    { kernel: 'Sigmoid', f1: '0.889', sens: '0.999', spec: '0.004' },
  ];
  const otherModels = [
    { name: 'Random Forest', f1: '0.890±0.025', sens: '0.953±0.029', spec: '0.237±0.150' },
    { name: 'XGBoost',       f1: '0.863',       sens: '0.868',       spec: '0.416'       },
    { name: 'KNN',           f1: '0.860',       sens: '0.860',       spec: '0.440'       },
    { name: 'CNN + LSTM',    f1: '0.846',       sens: '0.838',       spec: '0.433'       },
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-7xl mx-auto px-4 py-2" style={{ background: 'radial-gradient(circle at center, #0a192f 0%, #020617 100%)' }}>
      
      <div className="mb-3 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Signal Processing & ML Model</h1>
        <p className="text-sm text-slate-400 mt-0.5">From raw vibration signals to leak classification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left Side: Pipeline */}
        <div className="flex flex-col min-h-0">
          <h2 className="text-xl font-bold text-slate-200 mb-2">Processing Pipeline</h2>
          <div className="space-y-2 relative flex-1">
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-blue-900" />
            {[
              { title: 'Raw Signal',          desc: 'Vibration & Acoustic data' },
              { title: 'Filtering',           desc: 'Butterworth bandpass: 100–1000 Hz' },
              { title: 'Windowing',           desc: '2-second windows, 50% overlap' },
              { title: 'Feature Extraction',  desc: '45 features: Statistical, Spectral, Energy, MFCCs' },
              { title: 'ML Classification',   desc: 'Binary decision — Normal vs Leak' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-12"
              >
                <div className="absolute left-[14px] top-3 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-950" />
                <div className="bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800">
                  <div className="font-bold text-blue-300 text-base">{step.title}</div>
                  <div className="text-sm text-slate-400">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 bg-blue-950/20 border border-blue-900/50 px-4 py-2 rounded-xl text-blue-200 text-sm italic">
            "High sensitivity matters — missing a real leak is the biggest risk."
          </div>
        </div>

        {/* Right Side: Models */}
        <div className="flex flex-col gap-2.5 min-h-0">
          <h2 className="text-xl font-bold text-slate-200">Model Comparison</h2>

          {/* MLP — selected, large */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
            className="p-4 rounded-xl border bg-blue-900/30 border-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.25)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg text-slate-100 flex items-center gap-2">
                MLP
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Selected Model</span>
              </div>
              <div className="text-teal-400 font-bold text-base">F1 = 91.0%</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-950/40 rounded px-3 py-1.5">
                <div className="text-slate-500 text-xs uppercase tracking-wide">F1</div>
                <div className="text-slate-200 font-mono text-sm">0.910 ±0.035</div>
              </div>
              <div className="bg-blue-950/40 rounded px-3 py-1.5">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Sensitivity</div>
                <div className="text-teal-300 font-mono font-bold text-sm">0.953 ±0.043</div>
              </div>
              <div className="bg-blue-950/40 rounded px-3 py-1.5">
                <div className="text-slate-500 text-xs uppercase tracking-wide">Specificity</div>
                <div className="text-slate-300 font-mono text-sm">0.433 ±0.149</div>
              </div>
            </div>
            <div className="mt-2 text-teal-300/80 text-xs italic">Detected 61 / 64 leak signals</div>
          </motion.div>

          {/* Other models — compact rows */}
          <div className="grid grid-cols-2 gap-2">
            {otherModels.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-300 font-semibold text-sm">{m.name}</span>
                  <span className="text-slate-400 font-mono text-xs">F1 {m.f1.split('±')[0]}</span>
                </div>
                <div className="flex gap-2 text-xs text-slate-500">
                  <span>Sens <span className="text-slate-300">{m.sens.split('±')[0]}</span></span>
                  <span>Spec <span className="text-slate-300">{m.spec.split('±')[0]}</span></span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SVM kernels — nested table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
            className="bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2.5"
          >
            <div className="text-sm font-semibold text-slate-400 mb-2">SVM Kernels</div>
            <div className="grid grid-cols-4 gap-1.5">
              {svmKernels.map(k => (
                <div key={k.kernel} className="bg-slate-800/60 rounded px-2 py-1.5 text-center">
                  <div className="text-xs font-bold text-slate-300">{k.kernel}</div>
                  <div className="text-xs text-slate-400 font-mono">F1 {k.f1}</div>
                  <div className="text-[10px] text-slate-600">S {k.sens}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
