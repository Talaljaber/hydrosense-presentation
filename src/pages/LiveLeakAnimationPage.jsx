import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MiniHeatmap } from '../components/SignalVisuals';

const LEAK_STAGES = [
  { id: 1, name: 'Normal Operation',   color: '#00d4ff', desc: 'Water flows under normal pressure. All three sensors are idle. The multiplexer scans all channels. Dashboard shows nominal state.' },
  { id: 2, name: 'Leak Appears',       color: '#ef4444', desc: 'A micro-fracture opens at a pipe joint. Pressure drops locally. High-frequency acoustic energy and mechanical vibrations propagate through the pipe wall.' },
  { id: 3, name: 'Sensors React',      color: '#00d4ff', desc: 'The hydrophone detects acoustic waves inside the fluid. The velocimeter detects mechanical vibration on the pipe surface. Both activate on CH2.' },
  { id: 4, name: 'Signal Routing',     color: '#3b82f6', desc: 'Analogue signals from CH1, CH2, CH3 reach the multiplexer. The ADC/MUX selects CH2 as the active channel and digitizes at 44.1 kHz.' },
  { id: 5, name: 'Signal Processing',  color: '#3b82f6', desc: 'The raw I2S stream enters the DSP pipeline. A bandpass filter removes low-frequency interference and ambient noise, isolating the leak signature.' },
  { id: 6, name: 'Feature Extraction', color: '#a78bfa', desc: 'A Short-Time Fourier Transform converts the filtered waveform into a time-frequency feature map, encoding the spectral signature of the leak.' },
  { id: 7, name: 'AI Classification',  color: '#d946ef', desc: 'The trained binary classifier analyzes the feature map. It identifies the leak signature and outputs a decision with 92.4% confidence.' },
  { id: 8, name: 'ESP32 Transmission', color: '#10b981', desc: 'The ESP32 packages the result as a JSON payload and transmits it over WiFi to the remote dashboard endpoint in under 200 ms.' },
  { id: 9, name: 'Dashboard Alert',    color: '#ef4444', desc: 'Dashboard switches to alert state. Risk, Impact, Confidence, Channel, and the affected pipe segment are displayed immediately for operator action.' },
];

// Oscilloscope-style waveform display
function Scope({ active, noisy, color, height = 44 }) {
  const noisy_d  = 'M0,22 Q5,8 10,28 T20,12 T30,30 T40,10 T50,26 T60,8 T70,28 T80,14 T90,26 T100,22';
  const clean_d  = 'M0,22 Q12,8 25,22 T50,22 T75,22 T100,22';
  const idle_d   = 'M0,22 L100,22';
  return (
    <div className="relative rounded overflow-hidden bg-[#010c06]" style={{ height, borderColor: active ? color + '60' : '#1e293b', border: '1px solid' }}>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(${color}30 1px, transparent 1px), linear-gradient(90deg, ${color}30 1px, transparent 1px)`, backgroundSize: '25% 33%' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)' }} />
      <svg viewBox="0 0 100 44" className="w-full h-full" preserveAspectRatio="none">
        {active ? (
          <motion.path d={noisy ? noisy_d : clean_d} fill="transparent" stroke={color} strokeWidth="1.5" strokeLinecap="round" filter={`drop-shadow(0 0 3px ${color})`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
        ) : (
          <path d={idle_d} fill="transparent" stroke="#1e293b" strokeWidth="1" />
        )}
      </svg>
    </div>
  );
}

// ESP32 PCB Module
function ESP32({ active }) {
  return (
    <div className="relative w-[72px] h-[120px] bg-[#1a1c23] rounded border border-[#374151] flex flex-col items-center shadow-xl">
      {/* Gold pins left */}
      <div className="absolute top-10 -left-[4px] flex flex-col gap-[5px]">
        {[...Array(7)].map((_, i) => <div key={i} className="w-[4px] h-[3px] bg-[#d4af37]" />)}
      </div>
      {/* Gold pins right */}
      <div className="absolute top-10 -right-[4px] flex flex-col gap-[5px]">
        {[...Array(7)].map((_, i) => <div key={i} className="w-[4px] h-[3px] bg-[#d4af37]" />)}
      </div>
      {/* PCB trace dots */}
      <div className="absolute inset-0 rounded opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 0)', backgroundSize: '4px 4px' }} />
      {/* Inverted-F Antenna */}
      <div className="w-[54px] h-[22px] border-[1.5px] border-[#d4af37] border-b-0 mt-[6px] relative flex justify-center">
        <div className="w-[24px] h-[12px] border-x-[1.5px] border-[#d4af37] absolute bottom-0" />
      </div>
      {/* WROOM Shield */}
      <div className="w-[54px] bg-[#252525] border border-[#4b5563] rounded-sm mt-[4px] flex-1 mb-[6px] flex flex-col items-center justify-center gap-[3px] shadow-inner">
        <span className="text-[4.5px] text-gray-400 font-mono tracking-tight">ESP32-WROOM-32D</span>
        <span className="text-[3.5px] text-gray-600 font-mono">4MB · 240 MHz</span>
        {active && (
          <motion.div
            className="w-[7px] h-[7px] bg-blue-500 rounded-full mt-[2px] border border-blue-300"
            animate={{ opacity: [0.2, 1, 0.2], boxShadow: ['0 0 0 #3b82f6', '0 0 6px #3b82f6', '0 0 0 #3b82f6'] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        )}
        {active && <span className="text-[4px] text-emerald-400 font-mono mt-[1px]">TX → WiFi</span>}
      </div>
    </div>
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
        setStage(prev => {
          if (prev >= LEAK_STAGES.length) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  return (
    <div className="p-6 max-w-[100rem] mx-auto">

      {/* ─── Controls ─── */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#1e293b]">
        <div className="flex items-center gap-2 bg-[#0a0f1c] p-1.5 rounded-xl border border-[#1e293b]">
          <button onClick={() => { setPlaying(false); setStage(1); }} className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] text-sm font-medium transition-all">
            ↺ Reset
          </button>
          <button onClick={() => setPlaying(!playing)} className={`px-6 py-1.5 rounded-lg font-bold text-sm transition-all ${playing ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-[#00d4ff] text-[#040c17] hover:bg-[#33e2ff]'}`}>
            {playing ? '⏸ Pause' : '▶ Play Sequence'}
          </button>
          <div className="flex gap-1 pl-2 border-l border-[#1e293b]">
            <button onClick={() => { setPlaying(false); setStage(p => Math.max(p-1,1)); }} disabled={s<=1} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-[#1e293b] text-lg disabled:opacity-20 transition-all">‹</button>
            <button onClick={() => { setPlaying(false); setStage(p => Math.min(p+1,LEAK_STAGES.length)); }} disabled={s>=LEAK_STAGES.length} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-[#1e293b] text-lg disabled:opacity-20 transition-all">›</button>
          </div>
        </div>
        <div className="flex gap-1.5">
          {LEAK_STAGES.map(ls => (
            <button key={ls.id} onClick={() => { setPlaying(false); setStage(ls.id); }}
              style={s===ls.id ? { backgroundColor: ls.color, color: '#040c17', boxShadow: `0 0 12px ${ls.color}55` } : {}}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${s===ls.id ? 'ring-4' : s>ls.id ? 'bg-[#0d2015] text-emerald-500 border border-emerald-800/50' : 'text-slate-600 border border-[#1e293b] hover:border-slate-500 hover:text-slate-300'}`}>
              {ls.id}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Stage Description ─── */}
      <div className="mb-6" style={{ minHeight: 88 }}>
        <AnimatePresence mode="wait">
          <motion.div key={s} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:16}} transition={{duration:0.25}}
            className="flex items-start gap-5 p-5 rounded-xl bg-[#050c18] border-l-4"
            style={{ borderLeftColor: LEAK_STAGES[s-1].color }}>
            <div className="text-5xl font-black w-14 text-center shrink-0 leading-none" style={{ color: 'rgba(255,255,255,0.03)' }}>0{s}</div>
            <div>
              <div className="text-lg font-bold text-white mb-1.5" style={{ color: LEAK_STAGES[s-1].color }}>{LEAK_STAGES[s-1].name}</div>
              <div className="text-slate-400 text-sm leading-relaxed">{LEAK_STAGES[s-1].desc}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Active Layer Highlight ─── */}
      <div className="mb-4 flex items-center gap-0 rounded-xl overflow-hidden border border-[#1e293b] bg-[#040a12]">
        {[
          { label: 'Physical Layer',       stages: [1,2,3],   color: '#00d4ff' },
          { label: 'Aggregation',           stages: [4],       color: '#3b82f6' },
          { label: 'DSP Processing',        stages: [5,6],     color: '#a78bfa' },
          { label: 'AI Inference',          stages: [7],       color: '#d946ef' },
          { label: 'Transmission',          stages: [8],       color: '#10b981' },
          { label: 'Dashboard Alert',       stages: [9],       color: '#ef4444' },
        ].map(layer => {
          const active = layer.stages.includes(s);
          return (
            <div key={layer.label} className="flex-1 py-2 px-3 flex flex-col items-center gap-1 transition-all duration-400"
              style={{ backgroundColor: active ? layer.color + '12' : 'transparent', borderRight: '1px solid #1e293b' }}>
              <div className="w-full h-0.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: active ? layer.color : '#1e293b', boxShadow: active ? `0 0 8px ${layer.color}` : 'none' }} />
              <span className="text-[7.5px] font-bold uppercase tracking-widest transition-colors duration-400"
                style={{ color: active ? layer.color : '#334155' }}>{layer.label}</span>
            </div>
          );
        })}
      </div>

      {/* ─── Engineering Canvas ─── */}
      <div className="relative rounded-2xl border border-[#1e293b] bg-[#02050a] overflow-x-auto shadow-2xl">
        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="flex items-stretch min-w-[1380px] p-8 gap-4 relative z-10">

          {/* ══════════════════════════════════════════════
              ZONE 1 — PHYSICAL PIPE & SENSORS
          ══════════════════════════════════════════════ */}
          <div className="shrink-0 flex flex-col" style={{ width: 460 }}>
            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-700" /> Physical Layer — Pipe & Sensors
            </div>

            {/* Soil context label */}
            <div className="text-[7.5px] text-slate-700 font-mono mb-1 flex items-center gap-2">
              <span>📍</span><span>Irbid District Water Grid — Pipe Segment B-04</span>
            </div>
            {/* Pipe viewport */}
            <div className="relative bg-[#01080f] rounded-xl border border-[#0d2a4a] overflow-hidden flex-1" style={{ minHeight: 200 }}>
              {/* Underground soil strip */}
              <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: 28 }}>
                <div className="absolute inset-0 rounded-b-xl"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(120,83,45,0.12) 40%, rgba(90,60,30,0.20))', borderTop: '1px dashed rgba(120,83,45,0.18)' }} />
                <span className="absolute right-3 bottom-2 text-[7px] text-[#6b4c2a] font-mono opacity-50 uppercase tracking-widest">Underground ≈ 1.2 m depth</span>
              </div>

              {/* ── The Pipe ── */}
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2" style={{ height: 100 }}>
                {/* Top wall */}
                <div className="absolute inset-x-0 top-0 h-3 rounded-tl-lg" style={{ background: 'linear-gradient(180deg,#384357 0%,#243044 100%)' }} />
                {/* Inner bore */}
                <div className="absolute inset-x-0 top-3 bottom-3 bg-[#040c18] overflow-hidden">
                  {/* Water flow */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div className="absolute inset-0 w-[300%]"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.35) 30%, rgba(0,180,255,0.2) 55%, transparent 85%)', backgroundSize: '33% 100%' }}
                      animate={{ x: ['-33%', '0%'] }}
                      transition={{ duration: s >= 2 ? 0.9 : 2.2, ease: 'linear', repeat: Infinity }}
                    />
                    {/* Streamlines */}
                    <motion.div className="absolute h-px left-0 right-0 blur-[0.5px] bg-cyan-500/25" style={{ top: '22%' }} animate={{ x: ['0%', '-33%'] }} transition={{ duration: 0.75, ease: 'linear', repeat: Infinity }} />
                    <motion.div className="absolute h-px left-0 right-0 blur-[0.5px] bg-cyan-500/18" style={{ top: '55%' }} animate={{ x: ['0%', '-33%'] }} transition={{ duration: 1.1, ease: 'linear', repeat: Infinity }} />
                    <motion.div className="absolute h-px left-0 right-0 blur-[0.5px] bg-cyan-500/12" style={{ top: '80%' }} animate={{ x: ['0%', '-33%'] }} transition={{ duration: 0.85, ease: 'linear', repeat: Infinity }} />
                  </div>
                </div>
                {/* Bottom wall */}
                <div className="absolute inset-x-0 bottom-0 h-3 rounded-bl-lg" style={{ background: 'linear-gradient(0deg,#384357 0%,#243044 100%)' }} />
                {/* Specular */}
                <div className="absolute inset-x-0 top-3 h-5 pointer-events-none" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.09) 0%,transparent 100%)' }} />
                {/* DN label */}
                <div className="absolute right-3 bottom-[14px] text-[8px] font-black uppercase text-slate-700 tracking-[0.2em]">HDPE DN150 PN16</div>
                {/* Pipe flanges */}
                <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col">
                  <div className="h-2 bg-[#4a5568] rounded-tl-sm" />
                  <div className="flex-1 bg-[#2d3a4a] border-r border-[#64748b]/30" />
                  <div className="h-2 bg-[#4a5568] rounded-bl-sm" />
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col">
                  <div className="h-2 bg-[#4a5568] rounded-tr-sm" />
                  <div className="flex-1 bg-[#2d3a4a] border-l border-[#64748b]/30" />
                  <div className="h-2 bg-[#4a5568] rounded-br-sm" />
                </div>
                {/* Bolt holes on flanges */}
                {[0,1].map(side => [0,1,2].map(i => (
                  <div key={`${side}-${i}`} className="absolute w-1 h-1 rounded-full bg-[#1e293b] border border-[#374151]"
                    style={{ [side===0?'left':'right']: 1, top: 10 + i * 26 }} />
                )))}

                {/* ── Leak Event ── */}
                {s >= 2 && (
                  <div className="absolute" style={{ right: '22%', top: '100%' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex justify-center">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-t from-cyan-400/80 to-transparent" />
                      <motion.div className="absolute -top-3 w-8 h-4 bg-cyan-400/15 rounded-full blur-sm"
                        animate={{ scaleX: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 0.35, repeat: Infinity }} />
                      {[...Array(4)].map((_, i) => (
                        <motion.div key={i} className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-300 rounded-full"
                          animate={{ y: [0, -(18 + i * 6)], x: [(i-1.5)*8], opacity: [0.9, 0] }}
                          transition={{ duration: 0.25 + i * 0.07, repeat: Infinity, delay: i * 0.06 }} />
                      ))}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-bold text-cyan-300 whitespace-nowrap bg-black/75 px-1.5 py-0.5 rounded border border-cyan-900/60">
                        Micro-fracture
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* ── Acoustic rings ── */}
                {s >= 3 && (
                  <div className="absolute" style={{ right: '20%', bottom: 3 }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="absolute rounded-full border border-cyan-500/25"
                        style={{ left: -20, top: -20 }}
                        animate={{ width: [4, 50], height: [4, 50], opacity: [0.5, 0] }}
                        transition={{ duration: 1.4, delay: i * 0.45, repeat: Infinity, ease: 'easeOut' }} />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Hydrophone sensor ── */}
              <motion.div
                className="absolute flex flex-col items-center"
                style={{ left: '36%', top: 12 }}
                animate={{ filter: s >= 3 ? 'drop-shadow(0 0 10px rgba(0,212,255,0.55))' : 'none' }}
              >
                <div className="text-[8px] text-slate-500 font-bold mb-1 text-center tracking-wide">Hydrophone</div>
                <div className="text-[7px] text-cyan-700 font-mono mb-0.5 text-center">CH2</div>
                {/* Probe head */}
                <div className="w-5 h-11 flex justify-center rounded-t-lg border-x border-t border-gray-500 relative shadow-lg"
                     style={{ background: 'linear-gradient(90deg,#8a8a8a,#d0d0d0,#9a9a9a)' }}>
                  <div className="w-3 h-3 bg-gray-900 rounded-full mt-1.5 flex items-center justify-center shadow-inner">
                    {s >= 3 && <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 0.12, repeat: Infinity }} />}
                  </div>
                  {s >= 3 && <motion.div className="absolute inset-0 rounded-t-lg bg-cyan-400/12" animate={{ opacity: [0,1,0] }} transition={{ duration: 0.7, repeat: Infinity }} />}
                </div>
                {/* Threaded section */}
                <div className="w-3 h-10 bg-[#2a2a2a] border-x border-black/50"
                     style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#111 2px,#111 4px)' }} />
                {/* Cable going right */}
                {s >= 3 && (
                  <motion.div className="absolute h-px bg-cyan-600/60" style={{ top: 16, left: '100%', width: 40 }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3 }} style={{ transformOrigin: 'left', top: 16, left: '100%', width: 40, height: 1 }} />
                )}
              </motion.div>

              {/* ── Velocimeter sensor ── */}
              <motion.div
                className="absolute flex flex-col items-center"
                style={{ left: '58%', top: 14 }}
                animate={{ filter: s >= 3 ? 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' : 'none' }}
              >
                <div className="text-[8px] text-slate-500 font-bold mb-1 text-center tracking-wide">Velocimeter</div>
                <div className="text-[7px] text-amber-700 font-mono mb-0.5 text-center">CH2</div>
                {/* PCB-style sensor block */}
                <div className="w-12 h-5 bg-[#1a1c22] border-2 border-gray-600 rounded flex items-center justify-between px-1.5 relative shadow-lg">
                  <div className="w-1.5 h-1.5 bg-[#252525] rounded-sm border border-gray-700" />
                  <div className="w-5 h-1 bg-gray-700 rounded" />
                  {s >= 3 && <motion.div className="absolute top-0.5 right-1 w-1 h-1 bg-amber-400 rounded-full" animate={{ opacity: [0,1,0] }} transition={{ duration: 0.11, repeat: Infinity }} />}
                </div>
                {/* Clamp band */}
                <div className="w-14 h-0.5 bg-gray-500/50 rounded mt-0.5" />
                {/* Cable going right */}
                {s >= 3 && (
                  <motion.div className="absolute h-px bg-amber-500/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
                    style={{ transformOrigin: 'left', top: 18, left: '100%', width: 36, height: 1 }} />
                )}
              </motion.div>
            </div>

            {/* ── Signal previews ── */}
            {s >= 3 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[8px] text-cyan-600 font-mono mb-1 uppercase tracking-wide">Acoustic (Hydrophone)</div>
                  <Scope active noisy color="#00d4ff" height={40} />
                </div>
                <div>
                  <div className="text-[8px] text-amber-600 font-mono mb-1 uppercase tracking-wide">Vibration (Velocimeter)</div>
                  <Scope active noisy color="#fbbf24" height={40} />
                </div>
              </div>
            )}
          </div>

          {/* ── Connector arrow 1 ── */}
          <div className="shrink-0 w-16 flex flex-col items-center justify-center gap-1.5 self-stretch pt-8">
            <span className="text-[7px] font-mono uppercase tracking-widest" style={{ color: s>=4?'#94a3b8':'#334155' }}>Analog</span>
            <svg width="52" height="18" viewBox="0 0 52 18">
              {/* Coaxial-style cable */}
              <line x1="0" y1="9" x2="52" y2="9" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
              <motion.line x1="0" y1="9" x2="44" y2="9" stroke={s>=4?'#f59e0b':'#263040'} strokeWidth="1.5" strokeDasharray={s>=4?"5 3":"0"}
                animate={s>=4?{strokeDashoffset:[16,0]}:{}} transition={{duration:0.5,repeat:Infinity,ease:'linear'}} />
              <polygon points="44,5 52,9 44,13" fill={s>=4?'#f59e0b':'#263040'} />
            </svg>
            <span className="text-[7px] font-mono uppercase tracking-widest" style={{ color: s>=4?'#f59e0b':'#334155' }}>Coax CH1·2·3</span>
          </div>

          {/* ══════════════════════════════════════════════
              ZONE 2 — HUB ENCLOSURE (MUX + ESP32)
          ══════════════════════════════════════════════ */}
          <div className="shrink-0 flex flex-col">
            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" /> Aggregation — Hub Enclosure
            </div>
            <div className="relative flex gap-4 p-5 bg-[#040913] border border-[#1e293b] rounded-xl shadow-2xl flex-1"
                 style={{ minHeight: 200 }}>
              <div className="absolute -top-2.5 left-3 text-[7px] font-black text-slate-700 uppercase tracking-widest bg-[#02050a] px-2 border border-[#1e293b] rounded">
                IP65 Field Enclosure
              </div>

              {/* MUX / ADC PCB */}
              <div className="relative bg-[#0a2010] border-2 border-[#165a39] rounded-lg shadow-xl flex flex-col gap-3 z-10 p-3" style={{ width: 130 }}>
                {/* PCB texture */}
                <div className="absolute inset-0 rounded-md opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 0)', backgroundSize: '6px 6px' }} />
                <div className="absolute inset-x-0 top-1/2 h-px bg-green-500/15" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-green-500/15" />

                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] text-green-400 font-mono font-bold">MUX / ADC</span>
                  <motion.div className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s>=4?'#22c55e':'#1e3a2a' }}
                    animate={s>=4?{opacity:[0.4,1,0.4]}:{}} transition={{duration:1,repeat:Infinity}} />
                </div>

                {/* IC chip visual */}
                <div className="flex justify-center z-10">
                  <div className="bg-black border border-gray-700 rounded-sm flex items-center justify-center relative" style={{ width: 72, height: 40 }}>
                    {[...Array(4)].map((_,i) => (
                      <React.Fragment key={i}>
                        <div className="absolute w-1 h-1.5 bg-[#d4af37]" style={{ left: -4, top: 4 + i*8 }} />
                        <div className="absolute w-1 h-1.5 bg-[#d4af37]" style={{ right: -4, top: 4 + i*8 }} />
                      </React.Fragment>
                    ))}
                    <span className="text-[5px] text-gray-700 font-mono">CD74HC4067</span>
                  </div>
                </div>

                {/* Channel display */}
                <div className="flex gap-1 z-10">
                  {['CH1','CH2','CH3'].map(ch => (
                    <div key={ch} className="flex-1 text-center py-0.5 rounded text-[7px] font-black border transition-all duration-300"
                         style={{ color: s>=4&&ch==='CH2'?'#3b82f6':'#334155', borderColor: s>=4&&ch==='CH2'?'#3b82f6':'#1e293b', backgroundColor: s>=4&&ch==='CH2'?'rgba(59,130,246,0.08)':'transparent', boxShadow: s>=4&&ch==='CH2'?'0 0 6px rgba(59,130,246,0.2)':'none' }}>
                      {ch}
                    </div>
                  ))}
                </div>
              </div>

              {/* UART arrow */}
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[6px] font-mono text-slate-600">UART</span>
                <svg width="24" height="12" viewBox="0 0 24 12">
                  <motion.line x1="0" y1="6" x2="16" y2="6" stroke={s>=8?'#10b981':'#1e293b'} strokeWidth="1.5" strokeDasharray={s>=8?"3 2":"0"}
                    animate={s>=8?{strokeDashoffset:[10,0]}:{}} transition={{duration:0.4,repeat:Infinity,ease:'linear'}} />
                  <polygon points="16,3 24,6 16,9" fill={s>=8?'#10b981':'#1e293b'} />
                </svg>
              </div>

              {/* ESP32 module */}
              <div className="flex flex-col justify-center">
                <div className="text-[8px] text-slate-500 font-mono font-bold mb-2 text-center">ESP32-WROOM-32D</div>
                <ESP32 active={s >= 8} />
              </div>
            </div>
          </div>

          {/* ── Connector arrow 2 ── */}
          <div className="shrink-0 w-16 flex flex-col items-center justify-center gap-1.5 self-stretch pt-8">
            <span className="text-[7px] font-mono uppercase tracking-widest" style={{ color: s>=5?'#94a3b8':'#334155' }}>I2S Data</span>
            <svg width="52" height="18" viewBox="0 0 52 18">
              {/* Flat flex cable look */}
              <line x1="0" y1="7" x2="52" y2="7" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
              <motion.line x1="0" y1="9" x2="44" y2="9" stroke={s>=5?'#3b82f6':'#263040'} strokeWidth="1.5" strokeDasharray={s>=5?"5 3":"0"}
                animate={s>=5?{strokeDashoffset:[16,0]}:{}} transition={{duration:0.5,repeat:Infinity,ease:'linear'}} />
              <polygon points="44,5 52,9 44,13" fill={s>=5?'#3b82f6':'#263040'} />
            </svg>
            <span className="text-[7px] font-mono uppercase tracking-widest" style={{ color: s>=5?'#3b82f6':'#334155' }}>44.1 kHz</span>
          </div>

          {/* ══════════════════════════════════════════════
              ZONE 3 — EDGE COMPUTE (DSP + AI)
          ══════════════════════════════════════════════ */}
          <div className="shrink-0 flex flex-col">
            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-700" /> Processing — Edge Computer
            </div>
            <div className="relative bg-[#0c1220] border border-[#2d3748] rounded-xl shadow-2xl flex flex-col flex-1" style={{ minHeight: 200 }}>
              {/* Heatsink vents */}
              <div className="h-2 bg-[#1c2535] border-b border-[#2d3748] rounded-t-xl flex items-center gap-0.5 px-3">
                {[...Array(10)].map((_,i) => <div key={i} className="flex-1 h-0.5 bg-[#0c1220] rounded-full" />)}
              </div>
              <div className="absolute text-[7px] font-black text-slate-600 uppercase tracking-widest -top-2.5 left-3 bg-[#02050a] px-2 border border-[#1e293b] rounded">
                Edge Compute Node
              </div>

              <div className="flex gap-4 p-4 flex-1 mt-1">
                {/* DSP Column */}
                <div className="flex flex-col gap-2" style={{ width: 180 }}>
                  <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest border-b border-[#1e293b] pb-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500/70" /> DSP Pipeline
                  </div>

                  {/* Raw block */}
                  <motion.div animate={{ borderColor: s>=5?'#3b82f640':'#1e293b' }} className="rounded-lg border bg-black/50 overflow-hidden transition-colors duration-500">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/5 bg-[#0a1525]/60">
                      <span className="text-[8px] opacity-70">〰</span>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider" style={{ color: s>=5?'#3b82f6':'#475569' }}>Raw I2S Signal</span>
                    </div>
                    <div className="p-1.5">
                      <Scope active={s>=5} noisy color="#3b82f6" height={38} />
                    </div>
                  </motion.div>

                  {/* Filter block */}
                  <motion.div animate={{ borderColor: s>=5?'#00d4ff40':'#1e293b' }} className="rounded-lg border bg-black/50 overflow-hidden transition-colors duration-500">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/5 bg-[#0a1525]/60">
                      <span className="text-[8px] opacity-70">⚡</span>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider" style={{ color: s>=5?'#00d4ff':'#475569' }}>Bandpass Filter</span>
                    </div>
                    <div className="p-1.5">
                      <Scope active={s>=5} noisy={false} color="#00d4ff" height={38} />
                    </div>
                  </motion.div>

                  {/* Features block */}
                  <motion.div animate={{ borderColor: s>=6?'#a78bfa40':'#1e293b' }} className="rounded-lg border bg-black/50 overflow-hidden transition-colors duration-500">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/5 bg-[#0a1525]/60">
                      <span className="text-[8px] opacity-70">📊</span>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider" style={{ color: s>=6?'#a78bfa':'#475569' }}>STFT Feature Map</span>
                    </div>
                    <div className="p-1.5">
                      {s >= 6 ? <MiniHeatmap /> : <div className="rounded bg-slate-900/60 opacity-20" style={{ height: 36 }} />}
                    </div>
                  </motion.div>
                </div>

                {/* Arrow within edge compute */}
                <div className="flex flex-col justify-center w-8">
                  <svg width="28" height="16" viewBox="0 0 28 16">
                    <motion.line x1="0" y1="8" x2="20" y2="8" stroke={s>=7?'#d946ef':'#1e293b'} strokeWidth="1.5" strokeDasharray={s>=7?"4 2":"0"}
                      animate={s>=7?{strokeDashoffset:[12,0]}:{}} transition={{duration:0.4,repeat:Infinity,ease:'linear'}} />
                    <polygon points="20,4 28,8 20,12" fill={s>=7?'#d946ef':'#1e293b'} />
                  </svg>
                </div>

                {/* AI Column */}
                <div className="flex flex-col" style={{ width: 150 }}>
                  <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest border-b border-[#1e293b] pb-1 flex items-center gap-1.5 mb-2">
                    <span className="w-1 h-1 rounded-full bg-fuchsia-500/70" /> AI Inference
                  </div>
                  <motion.div animate={{ borderColor: s>=7?'#d946ef':'#2d3748', boxShadow: s>=7?'0 0 20px rgba(217,70,239,0.15)':'none' }}
                    className="flex-1 p-3 rounded-lg border bg-black/50 flex flex-col transition-all duration-500">
                    <div className="text-[8px] text-fuchsia-400 font-bold uppercase tracking-widest text-center mb-3">Binary Classifier</div>
                    {/* Model ring visual */}
                    <div className="flex justify-center mb-3 relative" style={{ height: 56 }}>
                      <motion.div animate={{ rotate: s>=7?360:0 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-14 h-14 rounded-full border-2 border-dashed border-fuchsia-500/25 absolute" />
                      <motion.div animate={{ rotate: s>=7?-240:0 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 rounded-full border border-fuchsia-500/15 absolute" style={{ top: '50%', left: '50%', marginLeft: -16, marginTop: -16 }} />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
                    </div>

                    {/* Confidence bar */}
                    {s >= 7 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3">
                        <div className="flex justify-between text-[7px] mb-1">
                          <span className="text-slate-500 font-mono">Confidence</span>
                          <span className="text-red-400 font-mono font-bold">92.4%</span>
                        </div>
                        <div className="h-1.5 bg-[#0f172a] rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
                            initial={{ width: 0 }} animate={{ width: '92.4%' }} transition={{ duration: 0.9, delay: 0.2 }} />
                        </div>
                      </motion.div>
                    )}

                    {/* Decision buttons */}
                    <div className="grid grid-cols-2 gap-1.5 mt-auto">
                      <motion.div animate={{ opacity: s>=7?1:0.18, boxShadow: s>=7?'0 0 10px rgba(220,38,38,0.25)':'none' }}
                        className="py-2 rounded border border-red-900/60 bg-red-950/40 text-center transition-all duration-500">
                        <div className="text-red-500 font-black text-[10px] tracking-wider">LEAK</div>
                      </motion.div>
                      <motion.div animate={{ opacity: s>=7?0.15:0.28 }}
                        className="py-2 rounded border border-emerald-900/30 bg-emerald-950/15 text-center">
                        <div className="text-emerald-700 font-black text-[10px] tracking-wider">NO LEAK</div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Terminal footer */}
              <div className="h-5 bg-[#080d18] border-t border-[#1e293b] rounded-b-xl flex items-center px-3 gap-2">
                <span className="text-[6.5px] text-slate-700 font-mono">$ python3 hydrosense_infer.py --port /dev/ttyUSB0</span>
                {s >= 5 && <motion.span className="w-1 h-1 rounded-full bg-emerald-500" animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />}
              </div>
            </div>
          </div>

          {/* ── Connector arrow 3 (WiFi) ── */}
          <div className="shrink-0 w-20 flex flex-col items-center justify-center gap-2 self-stretch pt-8">
            <span className="text-[7px] font-mono text-slate-600 uppercase tracking-widest">WiFi/4G</span>
            <svg width="44" height="36" viewBox="0 0 44 36">
              {[0,1,2].map(i => (
                <motion.path key={i}
                  d={`M${8+i*6},${28-i*6} Q22,${16-i*6} ${36-i*6},${28-i*6}`}
                  fill="transparent" stroke={s>=8?'#10b981':'#1e293b'} strokeWidth="1.5" strokeLinecap="round"
                  animate={s>=8?{opacity:[0.3,0.85,0.3]}:{}} transition={{duration:1.2,delay:i*0.35,repeat:Infinity}} />
              ))}
              <circle cx="22" cy="32" r="2" fill={s>=8?'#10b981':'#1e293b'} />
            </svg>
          </div>

          {/* ══════════════════════════════════════════════
              ZONE 4 — REMOTE DASHBOARD
          ══════════════════════════════════════════════ */}
          <div className="shrink-0 flex flex-col">
            <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700" /> Output — Remote Dashboard
            </div>
            <motion.div
              animate={{ borderColor: s>=9?'#ef4444':'#1e293b', y: s>=9?-4:0 }}
              className="rounded-xl border bg-[#050912] shadow-2xl flex flex-col overflow-hidden flex-1 transition-all duration-500"
              style={{ width: 256, minHeight: 200 }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#0f172a] border-b border-[#1e293b]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex-1 bg-black/40 rounded-full text-center text-[7px] text-slate-500 font-mono px-2 py-0.5 truncate">
                  hydrosense.jo/dashboard
                </div>
                <motion.div className={`w-1.5 h-1.5 rounded-full ${s>=9?'bg-red-500':'bg-emerald-500'}`}
                  animate={s>=9?{opacity:[0.5,1,0.5]}:{}} transition={{duration:0.6,repeat:Infinity}} />
              </div>

              {/* Status banner */}
              <AnimatePresence mode="wait">
                <motion.div key={s>=9?'alert':'normal'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`mx-3 my-2 py-2 rounded border text-center font-black tracking-wider text-xs transition-all duration-500 ${s>=9?'bg-red-950/50 border-red-900/60 text-red-500':'bg-emerald-950/20 border-emerald-900/30 text-emerald-500'}`}
                  style={{ boxShadow: s>=9?'0 0 12px rgba(220,38,38,0.15)':'' }}>
                  {s>=9 ? '⚠  LEAK DETECTED' : '●  SYSTEM NORMAL'}
                </motion.div>
              </AnimatePresence>

              {/* Metric grid — 3 cols */}
              <div className="px-3 pb-3 grid grid-cols-3 gap-1.5 flex-1">
                {[
                  { label: 'Leak',      val: s>=9?'YES':'NO',         color: s>=9?'#ef4444':'#22c55e' },
                  { label: 'Risk',      val: s>=9?'HIGH':'LOW',       color: s>=9?'#ef4444':'#22c55e' },
                  { label: 'Status',    val: s>=9?'Alert':'Normal',   color: s>=9?'#ef4444':'#22c55e' },
                  { label: 'Impact',    val: s>=9?'103 L/hr':'0 L/hr',color: s>=9?'#f59e0b':'#64748b' },
                  { label: 'Conf.',     val: s>=9?'92.4%':'—',        color: s>=9?'#00d4ff':'#64748b' },
                  { label: 'Channel',   val: s>=9?'CH2':'All OK',     color: s>=9?'#a78bfa':'#64748b' },
                  { label: 'Segment',   val: s>=9?'B-04':'—',         color: s>=9?'#f87171':'#64748b' },
                  { label: 'Location',  val: s>=9?'Irbid NW':'—',     color: s>=9?'#fb923c':'#64748b' },
                  { label: 'Latency',   val: s>=8?'182 ms':'—',       color: s>=8?'#34d399':'#64748b' },
                ].map(m => (
                  <motion.div key={m.label}
                    animate={{ borderColor: s>=9&&m.color!=='#64748b'?m.color+'30':'#1e293b', backgroundColor: s>=9&&m.label==='Leak'?'rgba(127,0,0,0.12)':'rgba(0,0,0,0.4)' }}
                    className="border rounded-lg p-1.5 flex flex-col justify-between transition-all duration-500"
                  >
                    <div className="text-[6.5px] text-slate-500 uppercase font-bold tracking-wide">{m.label}</div>
                    <div className="text-[10px] font-black font-mono mt-0.5"
                         style={{ color: m.color, textShadow: s>=9&&m.color!=='#64748b'?`0 0 8px ${m.color}50`:'' }}>
                      {m.val}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pressure mini-bar */}
              {s >= 1 && (
                <div className="px-3 pb-1">
                  <div className="flex justify-between text-[6.5px] font-mono mb-0.5" style={{ color: s>=2?'#ef4444':'#64748b' }}>
                    <span>Line Pressure</span>
                    <span>{s>=2 ? '2.1 bar ▼ DROP' : '3.4 bar ▲ OK'}</span>
                  </div>
                  <div className="h-1 bg-[#0f172a] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      animate={{ width: s>=2?'38%':'72%', backgroundColor: s>=2?'#ef4444':'#22c55e' }}
                      transition={{ duration: 0.8 }} />
                  </div>
                </div>
              )}
              {/* Timestamp footer */}
              <div className="px-3 pb-2">
                <div className="text-[6.5px] text-slate-700 font-mono text-right">
                  {s>=8 ? 'Last update: 2026-04-10 · 09:41:03 UTC' : 'Awaiting signal...'}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}