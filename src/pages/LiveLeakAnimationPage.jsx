import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimArrow from '../components/AnimArrow';
import { MiniWave, MiniHeatmap } from '../components/SignalVisuals';

const LEAK_STAGES = [
  { id: 1, name: 'Normal Operation',   desc: 'Water flows smoothly. All sensors are idle. Dashboard shows normal state.' },
  { id: 2, name: 'Leak Appears',       desc: 'A small, realistic leak begins at a joint. High-frequency acoustic noise and mechanical vibrations start.' },
  { id: 3, name: 'Sensors React',      desc: 'Hydrophone detects the internal acoustic wave. Vibration sensor detects external pipe movement.' },
  { id: 4, name: 'Signal Movement',    desc: 'Signals travel through dedicated wiring to the multiplexer, which selects the active channel.' },
  { id: 5, name: 'Signal Processing',  desc: 'The active channel enters the DSP pipeline. The raw noise is filtered into a clean, targeted waveform.' },
  { id: 6, name: 'Feature Extraction', desc: 'The cleaned signal is converted into a structured feature map for AI analysis.' },
  { id: 7, name: 'AI Decision',        desc: 'The edge AI model analyzes the feature map and confirms the leak signature footprint.' },
  { id: 8, name: 'ESP32 Transmission', desc: 'The binary decision and confidence score are packaged by the ESP32 and transmitted.' },
  { id: 9, name: 'Dashboard Alert',    desc: 'Dashboard updates instantly showing Risk, Impact, Confidence, and specific Channel.' },
];

function DspBlock({ active, label, icon, color, children }) {
  return (
    <motion.div
      animate={{
        borderColor: active ? color + '80' : '#1e293b',
        boxShadow: active ? `0 0 15px ${color}15` : 'none',
      }}
      className="rounded-lg border bg-[#0f172a]/90 backdrop-blur-sm transition-colors duration-500 overflow-hidden"
    >
      <div className="flex items-center gap-2 p-2 border-b border-white/5 bg-white/5">
        <span className="text-sm">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: active ? color : '#64748b' }}>
          {label}
        </span>
      </div>
      <div className="p-3 bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}

export default function LiveLeakAnimationPage() {
  const [stage, setStage] = useState(1);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const s = stage;

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStage((prev) => {
          if (prev >= LEAK_STAGES.length) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Controls */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1e293b]">
        <div className="flex items-center gap-3 bg-[#0f172a] p-1.5 rounded-xl border border-[#1e293b]">
          <button
            onClick={() => { setPlaying(false); setStage(1); }}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] font-medium text-sm transition-all"
          >
            ↺ Reset
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className={`px-8 py-2 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg
              ${playing ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-[#00d4ff] text-[#040c17] hover:bg-[#33e2ff]'}`}
          >
            {playing ? '⏸ Pause' : '▶ Play Sequence'}
          </button>
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#1e293b]">
            <button
              onClick={() => { setPlaying(false); setStage((p) => Math.max(p - 1, 1)); }}
              disabled={s <= 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              ‹
            </button>
            <button
              onClick={() => { setPlaying(false); setStage((p) => Math.min(p + 1, LEAK_STAGES.length)); }}
              disabled={s >= LEAK_STAGES.length}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              ›
            </button>
          </div>
        </div>

        {/* Stage dots */}
        <div className="flex items-center gap-2">
          {LEAK_STAGES.map((ls) => (
            <button
              key={ls.id}
              onClick={() => { setPlaying(false); setStage(ls.id); }}
              className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-bold outline-none transition-all
                ${s === ls.id 
                  ? 'bg-[#00d4ff] text-[#040c17] ring-4 ring-[#00d4ff]/20'
                  : s > ls.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#0f172a] text-slate-500 border border-[#1e293b] hover:bg-[#1e293b] hover:text-slate-300'}`}
            >
              {ls.id}
            </button>
          ))}
        </div>
      </div>

      {/* Stage description */}
      <div className="h-28 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full flex items-start gap-6 bg-gradient-to-r from-[#0f172a] to-transparent p-6 rounded-2xl border-l-4"
            style={{ borderLeftColor: s === LEAK_STAGES.length ? '#ef4444' : '#00d4ff' }}
          >
            <div className="text-5xl font-black text-white/5 w-16 text-center shrink-0 tracking-tighter -mt-2">
              0{s}
            </div>
            <div>
              <div className="text-xl font-bold text-white mb-2 tracking-wide">{LEAK_STAGES[s - 1].name}</div>
              <div className="text-slate-400 text-[15px] leading-relaxed max-w-3xl">{LEAK_STAGES[s - 1].desc}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Engineering Diagram */}
      <div className="relative rounded-3xl border border-[#1e293b] bg-[#020617] p-10 overflow-x-auto shadow-2xl">
        {/* Subtle grid background to look like a blueprint */}
        <div className="absolute inset-0 pattern-grid opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="flex items-center gap-6 min-w-[1100px] relative z-10 py-10 pl-6">

          {/* 1. Pipe & Physical Sensors */}
          <div className="relative shrink-0 w-72 h-64 flex items-center">
            
            {/* The Pipe */}
            <div className="absolute left-0 right-10 top-1/2 -translate-y-1/2 h-24 bg-[#1e293b] rounded-r-none border-y-4 border-r-4 border-slate-600 shadow-[inset_0_20px_20px_rgba(0,0,0,0.5),inset_0_-20px_20px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-visible z-10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:h-1/2 rounded-l-xl">
              
              {/* Realistic water flow */}
              <div className="absolute inset-y-1 inset-x-0 overflow-hidden mix-blend-screen opacity-60">
                <motion.div
                  className="w-[200%] h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.4) 20%, transparent 40%, rgba(0,212,255,0.3) 60%, transparent 80%)',
                    backgroundSize: '50% 100%'
                  }}
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ duration: s >= 2 ? 1.5 : 3, ease: 'linear', repeat: Infinity }}
                />
                
                {/* Flow lines inside water */}
                <motion.div 
                  className="absolute top-[30%] left-0 w-[200%] h-[1px] bg-[#00d4ff]/30"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-[70%] left-0 w-[200%] h-[1px] bg-[#00d4ff]/20"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
                />
              </div>

              <div className="absolute text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] opacity-40 bottom-2 right-4">
                HDPE DN150
              </div>

              {/* The Leak */}
              {s >= 2 && (
                <div className="absolute right-12 top-full -translate-y-1 z-20">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    {/* Dripping / spraying effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-[#00d4ff] to-transparent rounded-t-sm opacity-80" />
                    <motion.div 
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#00d4ff]/30 rounded-full blur-sm"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#00d4ff] whitespace-nowrap ml-4">
                      Micro-fracture
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Hydrophone (Inline/Tapped) */}
            <motion.div 
              className="absolute right-24 top-1/2 -translate-y-1/2 -mt-16 z-30 flex flex-col items-center"
              animate={{ filter: s >= 3 ? 'drop-shadow(0 0 10px rgba(0,212,255,0.4))' : 'none' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[10px] font-bold text-slate-400 mb-1 tracking-wider">Hydrophone</div>
              {/* Sensor body */}
              <div className="w-6 h-12 bg-gradient-to-r from-slate-400 to-slate-300 rounded-t-sm border-x border-t border-slate-500 relative flex justify-center pt-1">
                <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                {s >= 3 && (
                  <motion.div className="absolute inset-0 bg-[#00d4ff]/20 rounded-t-sm mix-blend-screen"
                    animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                )}
              </div>
              {/* Thread/tap into pipe */}
              <div className="w-3 h-4 bg-slate-600 border-x border-slate-700" />
              {/* Signal wire going out */}
              <div className="absolute top-2 right-0 w-16 h-0.5 bg-slate-700 -z-10 origin-left"
                   style={{ transform: 'translate(100%, 0) rotate(15deg)' }} />
            </motion.div>

            {/* Vibration Sensor (Strapped to top) */}
            <motion.div 
              className="absolute right-40 top-1/2 -translate-y-1/2 -mt-[54px] z-30 flex flex-col items-center"
              animate={{ filter: s >= 3 ? 'drop-shadow(0 0 8px rgba(251,191,36,0.3))' : 'none' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[10px] font-bold text-slate-400 mb-1 tracking-wider whitespace-nowrap">Velocimeter</div>
              {/* Sensor block */}
              <div className="w-10 h-3 bg-slate-800 border border-slate-600 rounded flex items-center justify-center relative">
                <div className="w-6 h-1 bg-slate-900 rounded-full" />
                {s >= 3 && (
                  <motion.div 
                    className="absolute inset-0 bg-amber-400/20"
                    animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.2, repeat: Infinity }}
                  />
                )}
              </div>
              {/* Signal wire going out */}
              <div className="absolute top-0 right-0 w-12 h-0.5 bg-slate-700 -z-10 origin-left"
                   style={{ transform: 'translate(100%, -4px) rotate(-10deg)' }} />
            </motion.div>

            {/* Signal waves (Abstract visual to show what's being sensed) */}
            {s >= 3 && (
              <div className="absolute left-[40%] top-20 pointer-events-none z-50">
                {/* Acoustic signal */}
                <motion.svg width="40" height="20" viewBox="0 0 40 20" className="text-[#00d4ff] absolute -top-8 left-10">
                   <motion.path d="M0,10 Q5,0 10,10 T20,10 T30,10 T40,10" fill="transparent" stroke="currentColor" strokeWidth="1.5"
                     animate={{ d: ["M0,10 Q5,0 10,10 T20,10 T30,10 T40,10", "M0,10 Q5,20 10,10 T20,10 T30,10 T40,10"] }}
                     transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} />
                </motion.svg>
                {/* Vibration signal */}
                <motion.svg width="30" height="16" viewBox="0 0 30 16" className="text-amber-400 absolute -top-4 -left-6">
                   <motion.path d="M0,8 L3,8 L6,0 L9,16 L12,4 L15,12 L18,8 L30,8" fill="transparent" stroke="currentColor" strokeWidth="1.5"
                     animate={{ opacity: [1, 0.4, 1], scaleY: [1, 1.2, 0.8, 1] }} transition={{ duration: 0.2, repeat: Infinity }} />
                </motion.svg>
              </div>
            )}
          </div>

          <AnimArrow active={s >= 4} color="#64748b" label="Multi-channel analog" />

          {/* 2. Hardware Hub (MUX + ESP32) */}
          <div className="shrink-0 flex flex-col gap-2 relative">
             <div className="absolute -inset-4 border border-slate-800 rounded-xl bg-slate-900/20 -z-10" />
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center -mt-2">Hub Enclosure</div>
             
             {/* Multiplexer */}
             <motion.div
               animate={{ 
                 borderColor: s >= 4 ? '#3b82f6' : '#1e293b',
                 backgroundColor: s >= 4 ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.5)'
               }}
               className="w-40 p-4 rounded-lg border flex flex-col gap-3 shadow-xl backdrop-blur-md transition-all duration-500"
             >
               <div className="flex items-center justify-between">
                 <div className="text-xs font-bold text-slate-300">ADC / MUX</div>
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s >= 4 ? '#3b82f6' : '#334155' }} />
               </div>
               <div className="flex gap-1">
                 {['CH1', 'CH2', 'CH3'].map((ch) => (
                   <div key={ch} className="flex-1 text-center py-1 bg-black/40 rounded text-[9px] font-bold transition-colors"
                        style={{ color: s >= 4 && ch === 'CH2' ? '#3b82f6' : '#475569', borderBottom: s >= 4 && ch === 'CH2' ? '2px solid #3b82f6' : 'none' }}>
                     {ch}
                   </div>
                 ))}
               </div>
             </motion.div>

             {/* Wire from Hub to DSP (Software representation) */}
             <AnimArrow active={s >= 5} color="#3b82f6" label="Digital I2S" />

             {/* ESP32 block at bottom for later */}
             <motion.div
               animate={{ 
                 borderColor: s >= 8 ? '#10b981' : '#1e293b',
                 opacity: s >= 8 ? 1 : 0.6
               }}
               className="w-40 p-3 mt-auto rounded-lg border bg-[#0f172a] shadow-xl flex items-center justify-center gap-2 transition-all duration-500"
             >
               <span className="text-emerald-500 font-black tracking-tighter">ESP32</span>
               <motion.div
                 animate={{ opacity: s >= 8 ? [1, 0, 1] : 0.2 }}
                 transition={{ duration: 0.5, repeat: Infinity }}
               >
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               </motion.div>
             </motion.div>
          </div>

          {/* 3. Signal Processing (Edge Compute) */}
          <div className="shrink-0 flex gap-4 ml-6 pl-4 border-l border-slate-800/50 relative">
             <div className="absolute text-[10px] font-black text-slate-500 uppercase tracking-widest -top-6 left-6">Local Edge Computer</div>
             
             <div className="w-48 flex flex-col gap-2">
               <div className="text-xs font-bold text-slate-400 mb-1">DSP Pipeline</div>
               <DspBlock active={s >= 5} label="Raw Noise" icon="〰️" color="#3b82f6">
                 {s >= 5 ? <MiniWave noisy color="#3b82f6" className="h-10" /> : <div className="h-10 opacity-20"><MiniWave color="#475569" /></div>}
               </DspBlock>
               <DspBlock active={s >= 5} label="Bandpass Filter" icon="⚡" color="#00d4ff">
                 {s >= 5 ? <MiniWave color="#00d4ff" className="h-10" /> : <div className="h-10 opacity-20"><MiniWave color="#475569" /></div>}
               </DspBlock>
               <DspBlock active={s >= 6} label="STFT Features" icon="📊" color="#a78bfa">
                 {s >= 6 ? <MiniHeatmap className="h-16" /> : <div className="h-16 opacity-10 bg-slate-800 rounded" />}
               </DspBlock>
             </div>

             <div className="flex flex-col justify-center">
               <AnimArrow active={s >= 7} color="#a78bfa" label="" />
             </div>

             {/* 4. AI Model */}
             <div className="w-40 flex flex-col justify-center">
               <motion.div
                 animate={{
                   borderColor: s >= 7 ? '#d946ef' : '#1e293b',
                   boxShadow: s >= 7 ? '0 0 30px rgba(217, 70, 239, 0.15)' : 'none',
                 }}
                 className="p-5 rounded-xl border bg-black/40 backdrop-blur-xl relative overflow-hidden"
               >
                 <div className="text-xs font-bold text-fuchsia-400 mb-4 tracking-wide text-center">AI INFERENCE</div>
                 <div className="flex justify-center mb-4 relative">
                   <motion.div
                     animate={{ rotate: s >= 7 ? 360 : 0 }}
                     transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                     className="w-16 h-16 rounded-full border-2 border-dashed border-fuchsia-500/40"
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-xl">🧠</div>
                 </div>
                 
                 <div className="h-16">
                   {s >= 7 ? (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="bg-[#4c0519] border border-red-900/50 rounded-lg p-2 text-center"
                     >
                       <div className="text-red-500 font-black text-sm tracking-widest">LEAK</div>
                       <div className="text-red-300/80 text-[10px] mt-0.5 font-mono">Conf: 92%</div>
                     </motion.div>
                   ) : (
                     <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-2 text-center opacity-50 flex items-center justify-center h-full">
                       <span className="text-[10px] text-slate-500 uppercase font-bold">Waiting...</span>
                     </div>
                   )}
                 </div>
               </motion.div>
             </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Logic link back to ESP32 */}
            <div className="h-32 border-r-2 border-dashed border-slate-700 relative">
               <div className="absolute text-[9px] text-slate-500 -left-12 top-1/2 -rotate-90">Decision</div>
               {s >= 8 && <motion.div className="w-3 h-3 rounded-full bg-emerald-500 absolute -right-1.5" animate={{ top: ['0%', '100%'] }} transition={{ duration: 1 }} />}
            </div>
            <AnimArrow active={s >= 8} color="#10b981" label="" />
          </div>

          {/* 5. Cloud Dashboard */}
          <motion.div
            animate={{
              borderColor: s >= 9 ? '#ef4444' : '#1e293b',
              y: s >= 9 ? -5 : 0
            }}
            className="shrink-0 w-56 rounded-xl border bg-[#0a0f1c] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ml-4 relative"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ef4444] to-transparent opacity-0"
                 style={{ opacity: s >= 9 ? 1 : 0 }} />
            
            <div className="px-4 py-3 bg-[#0f172a] border-b border-[#1e293b] flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-400">Dashboard Web App</div>
              <div className={`w-2 h-2 rounded-full ${s >= 9 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              <div className={`text-center py-2 rounded font-black tracking-widest text-sm transition-colors duration-500 ${
                s >= 9 ? 'bg-red-950/40 text-red-500 border border-red-900/50' : 'bg-slate-900 border border-slate-800 text-slate-500'
              }`}>
                {s >= 9 ? 'CRITICAL ALERT' : 'NORMAL'}
              </div>

              <div className="bg-black/20 rounded p-3 space-y-2 border border-white/5">
                {[
                  ['Loss Impact', s >= 9 ? '~103 L/h'  : '0 L/h',   s >= 9 ? '#f59e0b' : '#64748b'],
                  ['Confidence',  s >= 9 ? '92%'       : '—',       s >= 9 ? '#00d4ff' : '#64748b'],
                  ['Source',      s >= 9 ? 'Node 4 / CH2' : 'All Clear', s >= 9 ? '#f87171' : '#64748b'],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex justify-between items-end border-b border-slate-800/50 pb-1 last:border-0 last:pb-0">
                     <span className="text-[10px] text-slate-500 uppercase">{k}</span>
                     <span className="text-xs font-bold font-mono" style={{ color: c, textShadow: s >= 9 ? `0 0 10px ${c}40` : 'none' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );}