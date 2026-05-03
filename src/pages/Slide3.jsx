import React from 'react';
import { motion } from 'framer-motion';

export default function Slide3() {
  const models = [
    { name: 'MLP', metrics: { f1: '0.910', sens: '0.953', spec: '0.433' }, selected: true, note: 'Detected 61 / 64 leak signals' },
    { name: 'Random Forest', metrics: { f1: '0.890', sens: '0.953', spec: '0.237' } },
    { name: 'KNN', metrics: { f1: '0.860', sens: '0.860', spec: '0.440' } },
    { name: 'CNN + LSTM', metrics: { f1: '0.846', sens: '0.838', spec: '0.433' } },
    { name: 'SVM (Linear, RBF, Poly, Sigmoid)', metrics: { f1: '0.889', sens: '-', spec: '-' }, note: 'Sigmoid F1 is highest among SVM' }
  ];

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-80px)] max-w-7xl mx-auto p-4 md:p-8" style={{ background: 'radial-gradient(circle at center, #0a192f 0%, #020617 100%)' }}>
      
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Signal Processing & ML Model</h1>
        <p className="text-xl text-slate-400 mt-2">From raw vibration signals to leak classification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Pipeline */}
        <div>
          <h2 className="text-2xl font-bold text-slate-200 mb-6">Processing Pipeline</h2>
          <div className="space-y-3 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-blue-900" />
            
            {[
              { title: 'Raw Signal', desc: 'Vibration & Acoustic data' },
              { title: 'Filtering', desc: 'Butterworth bandpass filter: 100–1000 Hz' },
              { title: 'Windowing', desc: '2-second windows, 50% overlap' },
              { title: 'Feature Extraction', desc: '45 features/window: Statistical, Spectral, Energy ratios, MFCCs' },
              { title: 'ML Classification', desc: 'Binary decision (Normal vs Leak)' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-14"
              >
                <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-950" />
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-blue-300">{step.title}</div>
                  <div className="text-sm text-slate-400">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Models */}
        <div>
          <h2 className="text-2xl font-bold text-slate-200 mb-6">Model Comparison</h2>
          <div className="space-y-3">
            {models.map((model, i) => (
              <motion.div 
                key={model.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border ${model.selected ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900/50 border-slate-800'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-lg text-slate-200 flex items-center gap-2">
                    {model.name}
                    {model.selected && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Selected Model</span>}
                  </div>
                  <div className={`font-bold ${model.selected ? 'text-teal-400' : 'text-slate-400'}`}>F1 ≈ {(parseFloat(model.metrics.f1)*100).toFixed(0)}%</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-1">
                  <div className="text-slate-400">F1: <span className="text-slate-200">{model.metrics.f1}</span></div>
                  {model.metrics.sens !== '-' && <div className="text-slate-400">Sens: <span className="text-slate-200">{model.metrics.sens}</span></div>}
                  {model.metrics.spec !== '-' && <div className="text-slate-400">Spec: <span className="text-slate-200">{model.metrics.spec}</span></div>}
                </div>
                {model.note && <div className="text-teal-300/80 text-xs italic mt-1">{model.note}</div>}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-blue-950/20 border border-blue-900/50 p-4 rounded-xl text-blue-200 text-sm italic">
            "High sensitivity matters because missing a real leak is the biggest risk."
          </div>
        </div>

      </div>
    </div>
  );
}
