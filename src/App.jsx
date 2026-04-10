import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Droplets, Activity, Radio, Router, CheckCircle2, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

const PAGES = [
  'Problem',
  'Solution Overview',
  'Full Architecture',
  'Interactive System Canvas',
  'Live Process Animation',
  'Signal Processing Breakdown',
  'AI Model Breakdown',
  'Dashboard Impact'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, PAGES.length - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen bg-gray-950 text-slate-200 flex flex-col font-sans selection:bg-cyan-500/30 overflow-hidden">
      <header className="p-4 border-b border-gray-800 flex items-center justify-between z-50 bg-gray-950/80 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-cyan-400">HydroSense Jordan</h1>
          <p className="text-xs text-slate-400">Multiplexed Leak Detection Technical Explainer</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-400 mr-2">
            Page {currentPage + 1} of {PAGES.length}: <span className="text-white font-semibold">{PAGES[currentPage]}</span>
          </div>
          <button 
            onClick={prevPage} 
            disabled={currentPage === 0}
            className="p-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage === PAGES.length - 1}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        {currentPage === 0 && <ProblemPage />}
        {currentPage === 1 && <SolutionOverviewPage />}
        {currentPage === 2 && <ArchitecturePage />}
        {currentPage === 3 && <InteractiveSystemCanvasPage />}
        {currentPage === 4 && <ProcessAnimationPage />}
        {currentPage === 5 && <DSPBreakdownPage />}
        {currentPage === 6 && <ModelBreakdownPage />}
        {currentPage === 7 && <DashboardImpactPage />}
      </main>

      <div className="h-1 w-full bg-gray-900 absolute bottom-0 left-0">
        <motion.div 
          className="h-full bg-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / PAGES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function ProblemPage() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-5xl h-full flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-12 text-cyan-400">The Problem: Hidden Water Loss</h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 w-full">
           <div className="relative w-full h-[300px] border border-gray-800 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center flex-col shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_10%,transparent_15%,transparent_85%,rgba(0,0,0,0.5)_90%)]" />
              <div className="w-[80%] h-16 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-500 relative flex items-center shadow-lg">
                 <motion.div className="h-full bg-cyan-500/20 absolute inset-0" animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }} transition={{ duration: 2, repeat: Infinity }} />
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold tracking-widest uppercase">Plastic Infrastructure</div>
                 
                 <motion.div className="absolute bottom-[-15px] left-[60%] w-6 h-6 border-b border-l border-blue-400/50 rounded-bl-full" />
                 <motion.div className="absolute bottom-[-30px] left-[61%] flex flex-col items-center">
                    <Droplets className="text-blue-400 animate-bounce" size={16} />
                 </motion.div>
              </div>
           </div>
        </div>
        <div className="flex-1 space-y-6 w-full">
           <Card title="Plastic Pipe Challenge" desc="Plastic pipes damp acoustic energy heavily. Traditional metallic-pipe solutions fail or severely degrade." />
           <Card title="Hidden Leaks" desc="Leaks often occur underground or in tight structural shafts, causing massive invisible water loss over time." />
           <Card title="Water Scarcity" desc="In regions like Jordan, non-revenue water (NRW) is critically expensive. Every drop matters." />
           <Card title="Need for Low-Cost Monitoring" desc="Existing high-end correlators are too expensive for widespread, building-level hubs. We need a targeted, low-cost edge solution." />
        </div>
      </div>
    </motion.div>
  );
}

function SolutionOverviewPage() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-6xl h-full flex flex-col justify-center items-center">
       <h2 className="text-3xl font-bold mb-16 text-cyan-400 text-center">HydroSense Solution Overview</h2>
       
       <div className="flex justify-between items-center relative w-full h-[200px] max-w-4xl">
          <FlowBlock icon={<Droplets size={32} className="text-blue-400"/>} label="Sensors" desc="Acoustic + Vib" delay={0.1} />
          <FlowBlock icon={<Router size={32} className="text-amber-400"/>} label="Multiplexer" desc="Shared Path" delay={0.3} />
          <FlowBlock icon={<Cpu size={32} className="text-purple-400"/>} label="AI MCU" desc="ESP32 Edge" delay={0.5} />
          <FlowBlock icon={<Activity size={32} className="text-green-400"/>} label="Dashboard" desc="Remote Alert" delay={0.7} />

          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
             <motion.line x1="22%" y1="50%" x2="28%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="6" animate={{ strokeDashoffset: -20 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
             <motion.line x1="47%" y1="50%" x2="53%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="6" animate={{ strokeDashoffset: -20 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
             <motion.line x1="72%" y1="50%" x2="78%" y2="50%" stroke="#374151" strokeWidth="2" strokeDasharray="6" animate={{ strokeDashoffset: -20 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
          </svg>
       </div>
    </motion.div>
  );
}

function FlowBlock({ icon, label, desc, delay }) {
  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: 'spring' }} className="w-40 h-40 bg-gray-900 border border-gray-700 rounded-xl flex flex-col items-center justify-center p-4 z-10 shadow-xl">
       <div className="bg-gray-800 p-4 rounded-full mb-3">
          {icon}
       </div>
       <div className="font-bold text-gray-200">{label}</div>
       <div className="text-xs text-gray-500 mt-1 text-center">{desc}</div>
    </motion.div>
  )
}

function ArchitecturePage() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl h-[600px] flex flex-col border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50 p-6">
       <h2 className="text-xl font-bold mb-8 text-cyan-400 bg-gray-900 inline-block px-4 py-2 rounded-lg border border-gray-800 self-start">Full System Architecture</h2>
       
       <div className="flex-1 flex gap-4 relative">
          <div className="flex-none w-[20%] border-r border-gray-800 pr-4 flex flex-col justify-center items-center">
             <div className="w-full h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg relative flex items-center justify-center mb-8 border border-gray-500 shadow-lg">
                <span className="text-sm font-bold text-gray-300">Plastic Pipe</span>
             </div>
             <div className="flex gap-4">
                <div className="p-3 border border-cyan-700/50 bg-cyan-900/20 rounded-md text-xs font-bold text-cyan-400 text-center"><Droplets className="mx-auto mb-1" size={16}/> Hydrophone</div>
                <div className="p-3 border border-white/20 bg-white/5 rounded-md text-xs font-bold text-gray-300 text-center"><Activity className="mx-auto mb-1" size={16}/> Vibration</div>
             </div>
          </div>
          
          <div className="flex-none w-[15%] border-r border-gray-800 pr-4 flex flex-col justify-center items-center">
             <div className="w-24 h-32 border-2 border-amber-600/50 bg-amber-900/20 rounded-xl flex flex-col items-center justify-center text-amber-500 shadow-xl shadow-amber-500/10">
                <Router size={24} className="mb-2"/>
                <span className="font-bold text-xs">Multiplexer</span>
                <span className="text-[10px] text-amber-500/70 mt-1">Routes signals</span>
             </div>
          </div>
          
          <div className="flex-none w-[25%] border-r border-gray-800 pr-4 flex flex-col justify-center gap-4">
             <div className="p-3 border border-gray-700 bg-gray-800/80 rounded-lg text-xs font-bold text-gray-300 text-center">Raw Signal</div>
             <div className="h-4 w-0.5 bg-cyan-500 mx-auto" />
             <div className="p-3 border border-cyan-600/50 bg-cyan-900/20 rounded-lg text-xs font-bold text-cyan-400 text-center">Filtering / Denoising</div>
             <div className="h-4 w-0.5 bg-purple-500 mx-auto" />
             <div className="p-3 border border-purple-600/50 bg-purple-900/20 rounded-lg text-xs font-bold text-purple-400 text-center">Feature Extraction</div>
          </div>
          
          <div className="flex-none w-[20%] border-r border-gray-800 pr-4 flex flex-col justify-center items-center">
             <div className="w-32 py-6 border-2 border-rose-500/50 bg-rose-950/30 rounded-xl shadow-xl flex flex-col items-center mb-8">
                <Cpu size={24} className="text-rose-400 mb-2"/>
                <span className="font-bold text-sm text-gray-200 text-center px-2">AI Leak Classifier</span>
             </div>
             
             <div className="w-16 h-16 border border-blue-500/50 bg-blue-900/20 rounded-xl flex items-center justify-center flex-col text-blue-400">
                <Radio size={20} className="mb-1" />
                <span className="text-[10px] font-bold">ESP32</span>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center pl-2">
             <div className="w-full max-w-[200px] bg-gray-950 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
                 <div className="bg-gray-800 text-xs font-bold p-2 px-3 border-b border-gray-700">Remote Dashboard</div>
                 <div className="p-4 flex flex-col gap-2">
                    <div className="h-6 w-full bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400 flex items-center justify-center font-bold">Alert Detected</div>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="h-10 bg-gray-900 rounded text-[8px] p-1 border border-gray-800 text-gray-500 flex flex-col justify-center"><span className="block">Risk</span><span className="text-white text-xs">High</span></div>
                       <div className="h-10 bg-gray-900 rounded text-[8px] p-1 border border-gray-800 text-gray-500 flex flex-col justify-center"><span className="block">Location</span><span className="text-white text-xs">CH2</span></div>
                    </div>
                 </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function ProcessAnimationPage() {
   const [stage, setStage] = React.useState(1);
   const [isPlaying, setIsPlaying] = React.useState(false);

   React.useEffect(() => {
     let timer;
     if (isPlaying) {
       timer = setInterval(() => setStage(prev => (prev < 8 ? prev + 1 : 8)), 2500);
     }
     return () => clearInterval(timer);
   }, [isPlaying]);

   const sceneNames = [
     'Normal Operation', 'Leak Starts', 'Sensor Pickup & Routing', 
     'Filtering', 'Feature Extraction', 'Model Decision', 
     'ESP32 Comm', 'Dashboard Alert'
   ];

   const s = stage;

   return (
      <div className="w-full max-w-6xl h-[600px] flex flex-col border border-gray-800 rounded-xl bg-gray-900/50 p-6 overflow-hidden">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-cyan-400">Live End-to-End Process Animation</h2>
            <div className="flex gap-4 items-center">
               <span className="text-sm font-bold text-gray-300">Phase {stage}/8: {sceneNames[stage-1]}</span>
               <button onClick={() => { setIsPlaying(false); setStage(1); }} className="px-3 py-1 bg-gray-800 text-xs rounded hover:bg-gray-700">Reset</button>
               <button onClick={() => setIsPlaying(!isPlaying)} className={`px-3 py-1 text-xs rounded font-bold ${isPlaying ? 'bg-amber-600' : 'bg-cyan-600'}`}>{isPlaying ? 'Pause' : 'Play'}</button>
               <button onClick={() => { setIsPlaying(false); setStage(prev => prev < 8 ? prev+1 : 8)}} className="px-3 py-1 bg-gray-800 text-xs rounded hover:bg-gray-700">Next Step</button>
            </div>
         </div>

         <div className="flex-1 relative border border-gray-800 bg-gray-950 rounded-xl overflow-hidden flex items-center justify-center p-8">
            <div className="w-full max-w-5xl h-[400px] relative flex justify-between items-center">
               
               <div className="w-64 h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl relative border-2 border-gray-500 flex items-center justify-center shadow-2xl">
                  <span className="text-gray-400 font-bold opacity-30 text-xl tracking-widest pointer-events-none z-10">WATER PIPE</span>
                  <motion.div className="h-full w-full bg-cyan-500/10 absolute inset-0 z-0" animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                  
                  {s >= 2 && (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-[-15px] left-[60%] w-4 h-4 bg-red-500 rounded-full blur-[4px]">
                        <motion.div animate={{ scale: [1, 3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 rounded-full border-2 border-red-500" />
                     </motion.div>
                  )}
                  
                  {s >= 3 && (
                     <motion.div className="absolute -top-12 left-[60%] -translate-x-1/2 w-10 h-10 border-2 border-amber-400 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-[0_0_15px_rgba(251,191,36,0.3)]" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <Radio size={16} className="text-amber-400" />
                     </motion.div>
                  )}
               </div>

               <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                  <motion.line x1="280" y1="200" x2="350" y2="200" stroke={s >= 3 ? '#fbbf24' : '#374151'} strokeWidth="3" strokeDasharray="8" animate={s>=3 ? { strokeDashoffset: [-20, 0] } : {}} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
                  <motion.line x1="450" y1="200" x2="520" y2="200" stroke={s >= 4 ? '#22d3ee' : '#374151'} strokeWidth="3" strokeDasharray="8" animate={s>=4 ? { strokeDashoffset: [-20, 0] } : {}} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
                  <motion.line x1="620" y1="200" x2="680" y2="200" stroke={s >= 5 ? '#a855f7' : '#374151'} strokeWidth="3" strokeDasharray="8" animate={s>=5 ? { strokeDashoffset: [-20, 0] } : {}} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
                  <motion.line x1="780" y1="200" x2="840" y2="200" stroke={s >= 7 ? '#3b82f6' : '#374151'} strokeWidth="3" strokeDasharray="8" animate={s>=7 ? { strokeDashoffset: [-20, 0] } : {}} transition={{ duration: 1, repeat: Infinity, ease: 'linear'}} />
               </svg>

               <div className={`z-10 w-24 h-24 border-2 rounded flex flex-col items-center justify-center p-2 text-center transition-colors ${s >= 4 ? 'border-cyan-400 bg-cyan-950/30 text-cyan-400' : 'border-gray-800 bg-gray-900 text-gray-600'}`}>
                  <Activity size={24} className="mb-1" />
                  <span className="text-[10px] font-bold">Filter / Denoise</span>
               </div>

               <div className={`z-10 w-28 h-24 border-2 rounded flex flex-col items-center justify-center p-2 text-center transition-colors ${s >= 5 ? 'border-purple-400 bg-purple-950/30 text-purple-400' : 'border-gray-800 bg-gray-900 text-gray-600'}`}>
                  <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-8 mb-1 px-1">
                     {Array.from({length: 9}).map((_, i) => (
                        <motion.div key={i} className={s >= 5 ? "bg-purple-400/50" : "bg-gray-800"} animate={s >= 5 ? { opacity: [0.3, 1, 0.3] } : {}} transition={{ duration: Math.random() * 2, repeat: Infinity }} />
                     ))}
                  </div>
                  <span className="text-[10px] font-bold">Features Extracted</span>
               </div>

               <div className={`z-10 w-24 h-32 border-2 rounded-xl flex flex-col items-center justify-center p-2 text-center shadow-xl transition-all ${s >= 6 ? 'border-rose-500 bg-rose-950/40 text-rose-400 scale-110' : 'border-gray-800 bg-gray-900 text-gray-600'}`}>
                  <Cpu size={32} className="mb-2" />
                  <span className="text-xs font-bold block mb-1">AI Model</span>
                  {s >= 6 && <span className="text-[8px] bg-rose-500/20 text-rose-300 px-1 py-0.5 rounded uppercase font-bold animate-pulse">Leak</span>}
               </div>

               <div className={`z-10 w-36 h-40 border rounded-xl overflow-hidden transition-colors ${s >= 8 ? 'border-red-500 bg-gray-900 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-gray-800 bg-gray-950'}`}>
                  <div className={`text-[10px] font-bold p-1 border-b text-center ${s >= 8 ? 'bg-red-950 border-red-900 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>Dashboard</div>
                  <div className="p-2 space-y-2">
                     <div className={`h-8 rounded flex items-center justify-center text-[10px] font-bold uppercase transition-colors ${s >= 8 ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 text-gray-600'}`}>
                        {s >= 8 ? 'Alert Active' : 'Normal'}
                     </div>
                     <div className="flex justify-between text-[8px] border border-gray-800 rounded p-1 bg-black">
                        <span className="text-gray-500">Risk</span>
                        <span className={s >= 8 ? 'text-red-400 font-bold' : 'text-gray-500'}>{s >= 8 ? 'High' : 'Low'}</span>
                     </div>
                     <div className="flex justify-between text-[8px] border border-gray-800 rounded p-1 bg-black">
                        <span className="text-gray-500">Impact</span>
                        <span className={s >= 8 ? 'text-rose-400 font-bold' : 'text-gray-500'}>{s >= 8 ? 'Significant' : 'None'}</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}

function DSPBreakdownPage() {
   return (
     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-5xl h-full flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Signal Processing Pipeline</h2>
        <p className="text-gray-400 mb-10 text-center w-2/3">Raw sensor noise must be mathematically cleaned and framed into discrete features before it is fed to the model.</p>
        
        <div className="flex flex-col gap-6 w-full max-w-3xl">
           <div className="flex border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden h-28 items-center pr-6 group shadow-lg">
              <div className="w-64 bg-gray-800 h-full flex flex-col justify-center px-6 border-r border-gray-700">
                 <h3 className="font-bold text-amber-500 mb-1">1. Raw Signal</h3>
                 <p className="text-xs text-gray-400">Untreated acoustic noise.</p>
              </div>
              <div className="flex-1 px-8 relative h-full flex items-center">
                 <svg className="w-full h-16 stroke-amber-500/60 fill-none" strokeWidth="2" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d="M 0 20 Q 5 5 10 25 T 20 15 T 30 35 T 40 5 T 50 25 T 60 10 T 70 30 T 80 15 T 90 25 T 100 5 T 110 35 T 120 15 T 130 25 T 140 5 T 150 35 T 160 15 T 170 25 T 180 10 T 190 30 T 200 15" />
                 </svg>
              </div>
           </div>

           <div className="flex border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden h-28 items-center pr-6 shadow-lg">
              <div className="w-64 bg-gray-800 h-full flex flex-col justify-center px-6 border-r border-gray-700">
                 <h3 className="font-bold text-cyan-400 mb-1">2. Filtering / Denoising</h3>
                 <p className="text-xs text-gray-400">Removes background noise.</p>
              </div>
              <div className="flex-1 px-8 relative h-full flex items-center">
                 <svg className="w-full h-16 stroke-cyan-400 fill-none" strokeWidth="3" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d="M 0 20 Q 20 10 40 25 T 80 15 T 120 25 T 160 15 T 200 20" />
                 </svg>
              </div>
           </div>

           <div className="flex border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden h-28 items-center pr-6 shadow-lg">
              <div className="w-64 bg-gray-800 h-full flex flex-col justify-center px-6 border-r border-gray-700">
                 <h3 className="font-bold text-purple-400 mb-1">3. Feature Extraction</h3>
                 <p className="text-xs text-gray-400">Converts signal to machine-readable features (MFCC heatmaps / vectors).</p>
              </div>
              <div className="flex-1 px-8 py-4 h-full flex items-center gap-1">
                 {Array.from({length: 30}).map((_, i) => (
                    <motion.div key={i} className="flex-1 bg-purple-500 rounded-sm" style={{ height: `${Math.max(20, Math.random() * 100)}%`, opacity: Math.random() * 0.5 + 0.3 }} />
                 ))}
              </div>
           </div>
        </div>
     </motion.div>
   );
}

function ModelBreakdownPage() {
   return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-4xl h-full flex flex-col justify-center items-center">
         <h2 className="text-3xl font-bold mb-4 text-cyan-400">Model Decision Logic</h2>
         <p className="text-gray-400 mb-16 text-center">A lightweight binary classification model running directly on edge hardware.</p>
         
         <div className="flex items-center gap-12 bg-gray-900/80 p-12 rounded-2xl border border-gray-800 shadow-2xl relative">
            
            <div className="flex flex-col items-center z-10">
               <div className="w-24 h-24 bg-gray-800 rounded-lg p-2 grid grid-cols-4 grid-rows-4 gap-1 mb-4 border border-gray-700 shadow-lg">
                  {Array.from({length:16}).map((_,i) => <div key={i} className="bg-purple-500/50 rounded-sm" />)}
               </div>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Extracted<br/>Features</span>
            </div>

            <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="z-0">
               <ChevronRight size={32} className="text-gray-600" />
            </motion.div>

            <div className="w-56 h-56 rounded-full border-4 border-rose-500/80 bg-rose-950/30 flex items-center justify-center flex-col relative shadow-[0_0_40px_rgba(244,63,94,0.15)] z-10">
               <Cpu size={48} className="text-rose-400 mb-3" />
               <span className="font-bold text-white tracking-wide text-center px-4 text-lg">AI Leak Classifier</span>
               <div className="absolute inset-0 rounded-full border border-rose-500/20" />
               <motion.div className="absolute inset-0 rounded-full border border-rose-400/40" animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            </div>

            <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="z-0">
               <ChevronRight size={32} className="text-gray-600" />
            </motion.div>

            <div className="flex flex-col gap-4 z-10">
               <div className="px-6 py-5 rounded-xl border-2 border-red-500/50 bg-red-500/10 shadow-lg flex flex-col items-center">
                  <span className="text-2xl font-bold text-red-500 uppercase tracking-widest text-center leading-tight">LEAK<br/>DETECTED</span>
                  <div className="mt-3 text-xs font-bold text-red-300 bg-red-950/50 px-2 py-1 rounded">Confidence: 96%</div>
               </div>
               <div className="px-6 py-3 rounded-xl border border-gray-700 bg-gray-800 opacity-40 flex items-center justify-center filter grayscale">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Leak</span>
               </div>
            </div>

         </div>
      </motion.div>
   );
}

function DashboardImpactPage() {
   return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-5xl h-full flex flex-col justify-center items-center">
         <h2 className="text-3xl font-bold mb-4 text-cyan-400">Final Dashboard Interface</h2>
         <p className="text-gray-400 mb-12 text-center">Transforming hardware signals into actionable utility data.</p>
         
         <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="h-14 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
               <div className="flex gap-3 items-center">
                  <Activity size={20} className="text-cyan-500" />
                  <span className="font-bold text-base text-gray-200">Zone B Monitoring Setup</span>
               </div>
               <div className="flex gap-2 items-center">
                  <motion.div animate={{ opacity:[1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-xs font-bold tracking-widest uppercase text-red-400">Live Warning</span>
               </div>
            </div>
            
            <div className="p-8 grid grid-cols-3 gap-6">
               <div className="col-span-3 bg-red-950/20 border border-red-900/50 rounded-xl p-8 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-6">
                     <div className="bg-red-500/20 p-5 rounded-full border border-red-500/30">
                        <AlertTriangle size={56} className="text-red-500" />
                     </div>
                     <div>
                        <div className="text-red-400 font-bold tracking-widest uppercase mb-1 text-sm">System Status</div>
                        <div className="text-4xl font-bold text-white">Leak Detected</div>
                     </div>
                  </div>
                  <div className="text-right border-l border-red-900/50 pl-8">
                     <div className="text-gray-400 font-bold mb-1 uppercase text-xs tracking-wider">Time Detected</div>
                     <div className="text-2xl text-white font-mono">Just Now</div>
                  </div>
               </div>

               <StatCard title="Risk Level" value="High" color="red" />
               <StatCard title="Water Impact" value="Moderate" color="amber" />
               <StatCard title="AI Confidence" value="92.0%" color="cyan" />
               <StatCard title="Target Location" value="Pipe Segment B" color="white" bg="gray" colSpan={2} />
               <StatCard title="Active Channel" value="CH2" color="purple" bg="gray" />
            </div>
         </div>
      </motion.div>
   );
}

function StatCard({ title, value, color, bg="black", colSpan=1 }) {
   const colorVariants = {
      red: 'text-red-500',
      amber: 'text-amber-500',
      cyan: 'text-cyan-500',
      purple: 'text-purple-400',
      white: 'text-white'
   };
   
   return (
      <div className={`p-6 rounded-xl border border-gray-800 flex flex-col justify-center shadow-lg ${bg === 'black' ? 'bg-black' : 'bg-gray-900'} ${colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}>
         <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">{title}</span>
         <span className={`text-3xl font-bold ${colorVariants[color]}`}>{value}</span>
      </div>
   );
}

function Card({ title, desc }) {
   return (
      <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors shadow-md">
         <h4 className="font-bold text-cyan-300 mb-3 text-lg">{title}</h4>
         <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
   )
}

// --- Page: Interactive System Canvas (Original Explainer) ---
const STAGES = [
  { id: 1, name: 'Normal Operation', desc: 'Full system visible in normal state' },
  { id: 2, name: 'Leak Occurs', desc: 'A subtle leak event begins' },
  { id: 3, name: 'Sensor Response', desc: 'Hydrophones & vibration sensors activate' },
  { id: 4, name: 'Multiplexer Routing', desc: 'Signals travel and converge into MUX' },
  { id: 5, name: 'Raw Signal', desc: 'Signal enters processing pipeline' },
  { id: 6, name: 'Filtering/Denoising', desc: 'Noise reduction effect applied' },
  { id: 7, name: 'Feature Extraction', desc: 'Transforms to frequency/MFCC features' },
  { id: 8, name: 'Model Inference', desc: 'AI classification: Leak or No Leak' },
  { id: 9, name: 'ESP32 Transfer', desc: 'Wireless transmission to dashboard' },
  { id: 10, name: 'Dashboard Alert', desc: 'Dashboard updates showing risk and impact' }
];

function InteractiveSystemCanvasPage() {
  const [stage, setStage] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStage(prev => (prev < 10 ? prev + 1 : 10));
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const isLeak = stage >= 2;
  const isSensorActive = stage >= 3;
  const isMuxActive = stage >= 4;
  const isRawActive = stage >= 5;
  const isFilterActive = stage >= 6;
  const isFeatureActive = stage >= 7;
  const isModelActive = stage >= 8;
  const isEsp32Active = stage >= 9;
  const isDashboardAlert = stage >= 10;

  return (
    <div className="w-full max-w-7xl h-[600px] flex flex-col border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50">
      <div className="flex justify-between items-center bg-gray-950 p-4 border-b border-gray-800 z-20">
         <div className="flex gap-2 text-xs">
            {STAGES.map(s => (
              <button
                key={s.id}
                onClick={() => setStage(s.id)}
                title={s.name}
                className={`w-6 h-6 rounded-full flex flex-col justify-center items-center transition-colors ${stage === s.id ? 'bg-cyan-500 text-white' : stage > s.id ? 'bg-cyan-900/40 text-cyan-300' : 'bg-gray-800 text-gray-500'}`}
              >
                {s.id}
              </button>
            ))}
         </div>
         <div className="flex gap-2 items-center">
            <span className="bg-gray-900 px-3 py-1 rounded text-cyan-400 text-xs font-bold border border-gray-700">Scene {stage}: {STAGES[stage-1].name}</span>
            <button onClick={() => { setIsPlaying(false); setStage(1); }} className="px-3 py-1 rounded bg-gray-800 text-xs hover:bg-gray-700 text-gray-400">Reset</button>
            <button onClick={() => setIsPlaying(!isPlaying)} className={`px-3 py-1 rounded font-bold text-xs ${isPlaying ? 'bg-amber-600/20 text-amber-500' : 'bg-cyan-600 text-white'}`}>{isPlaying ? 'Pause' : 'Play Sequence'}</button>
         </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-gray-950 p-6 flex flex-col">
        <div className="w-full h-full max-w-[1200px] mx-auto relative scale-[0.85] origin-center flex flex-col justify-center">
          
          {/* ZONE 1 & 2: PHYSICAL & ROUTING */}
          <div className="absolute left-0 top-[60%] w-[35%] h-24 -translate-y-1/2 rounded-r-2xl bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-l-0 border-gray-600 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 via-cyan-500/30 to-cyan-900/50" animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ backgroundSize: '200% 100%' }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_10%,transparent_15%,transparent_85%,rgba(0,0,0,0.3)_90%)] mix-blend-overlay" />
            
            {isLeak && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0.5, 1, 0.8], scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }} className="absolute top-1/2 left-[60%] w-6 h-6 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
                <div className="absolute inset-0 bg-red-500/40 rounded-full blur-[8px]" />
                <div className="absolute inset-[30%] bg-white rounded-full" />
                <motion.div className="absolute inset-[-100%] rounded-full border border-red-400/50" animate={{ scale: [1, 3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }} />
              </motion.div>
            )}
            
            {(isLeak && stage <= 3) && <div className="absolute top-[80%] left-[62%] text-[10px] text-red-300 font-bold px-1 bg-gray-900/60 rounded">Leak Point</div>}
            <div className="absolute bottom-2 left-4 text-[10px] font-bold text-cyan-200/50 tracking-wider">PLASTIC PIPE</div>
          </div>

          <SensorNode x={15} y={45} name="Hyd (CH1)" type="acoustic" active={isSensorActive && isLeak} color="cyan" isLeakSrc={false} />
          <SensorNode x={22} y={35} name="Hyd (CH2)" type="acoustic" active={isSensorActive} color="amber" isLeakSrc={true} />
          <SensorNode x={28} y={45} name="Vib (CH3)" type="vibration" active={isSensorActive} color="amber" isLeakSrc={true} />

          <svg className="absolute inset-0 pointer-events-none w-full h-full text-gray-700" style={{ zIndex: 0 }}>
            <SignalPath path="M 180 270 Q 250 250 350 300" active={isMuxActive && false} color="cyan" timing={0} />
            <SignalPath path="M 264 210 Q 320 210 350 300" active={isMuxActive} color="amber" dashLength={8} timing={0.2} />
            <SignalPath path="M 336 270 Q 380 280 350 300" active={isMuxActive} color="white" dashLength={5} timing={0.4} />
          </svg>

          <motion.div className={`absolute left-[33%] top-[45%] w-24 h-32 -translate-y-1/2 -translate-x-1/2 rounded-lg border-2 flex flex-col items-center justify-center p-2 bg-gray-900 transition-colors duration-500 z-10 ${isMuxActive ? 'border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-gray-700'}`}>
            <Router className={`mb-2 ${isMuxActive ? 'text-amber-400' : 'text-gray-500'}`} />
            <div className="text-[10px] font-bold text-center mb-1 text-gray-300">MUX</div>
            <div className="w-full text-[8px] flex justify-between px-1 text-gray-500">
              <span className={isMuxActive && !isLeak ? 'text-cyan-400 font-bold' : ''}>CH1</span>
              <span className={isMuxActive ? 'text-amber-400 font-bold' : ''}>CH2</span>
              <span className={isMuxActive ? 'text-white font-bold' : ''}>CH3</span>
            </div>
            {isMuxActive && <motion.div className="absolute right-0 top-1/2 w-3 h-1 bg-amber-500 rounded-full" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
          </motion.div>

          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <SignalPath path="M 450 270 L 510 270" active={isRawActive} color="amber" strokeWidth={3} />
          </svg>

          {/* ZONE 3: DSP PIPELINE */}
          <div className="absolute left-[47%] top-[45%] -translate-y-1/2 -translate-x-1/2 w-64 h-[400px] flex flex-col justify-between z-10">
            <ProcessBlock title="Raw Signal" active={isRawActive} color="amber">
              <svg className="w-full h-12 stroke-amber-400/80 fill-none mt-2" strokeWidth="1.5" viewBox="0 0 100 40">
                <motion.path d={isRawActive ? "M 0 20 Q 5 10 10 20 T 20 20 T 30 10 T 40 30 T 50 15 T 60 25 T 70 5 T 80 35 T 90 20 T 100 20" : "M 0 20 L 100 20"} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
              </svg>
            </ProcessBlock>

            <div className="relative">
              <div className={`absolute left-1/2 -top-6 w-0.5 h-6 -translate-x-1/2 ${isFilterActive ? 'bg-cyan-500' : 'bg-gray-800'}`}>
                {isFilterActive && <motion.div className="w-full h-2 bg-cyan-300" animate={{ y: [0, 24] }} transition={{ duration: 0.5, repeat: Infinity }} />}
              </div>
              <ProcessBlock title="Filtering / Denoising" active={isFilterActive} color="cyan">
                <svg className="w-full h-12 stroke-cyan-400 fill-none mt-2" strokeWidth="2" viewBox="0 0 100 40">
                  <motion.path d={isFilterActive ? "M 0 20 Q 15 5 25 20 T 50 20 T 75 20 T 100 20" : "M 0 20 L 100 20"} />
                </svg>
              </ProcessBlock>
            </div>

            <div className="relative">
              <div className={`absolute left-1/2 -top-6 w-0.5 h-6 -translate-x-1/2 ${isFeatureActive ? 'bg-purple-500' : 'bg-gray-800'}`}>
                {isFeatureActive && <motion.div className="w-full h-2 bg-purple-300" animate={{ y: [0, 24] }} transition={{ duration: 0.5, repeat: Infinity }} />}
              </div>
              <ProcessBlock title="Feature Extraction" active={isFeatureActive} color="purple">
                <div className="grid grid-cols-4 grid-rows-3 gap-0.5 mt-2 h-12 w-full p-1 border border-purple-500/20 bg-gray-950/50 rounded">
                  {Array.from({length: 12}).map((_, i) => (
                    <motion.div key={i} className="bg-purple-500/0" animate={isFeatureActive ? { backgroundColor: `rgba(168, 85, 247, ${Math.random() * 0.8 + 0.2})` } : {}} transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: 'reverse' }} />
                  ))}
                </div>
              </ProcessBlock>
            </div>
          </div>

          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
            <SignalPath path="M 680 430 Q 750 430 750 270 L 780 270" active={isModelActive} color="purple" strokeWidth={3} />
          </svg>

          {/* ZONE 4: AI MODEL */}
          <motion.div className={`absolute left-[65%] top-[45%] -translate-y-1/2 -translate-x-1/2 w-48 p-4 rounded-xl border flex flex-col items-center shadow-lg transition-all duration-700 z-10 ${isModelActive ? 'border-rose-500/80 bg-rose-950/30' : 'border-gray-800 bg-gray-900/50'}`}>
            <Cpu className={`mb-3 w-8 h-8 ${isModelActive ? 'text-rose-400' : 'text-gray-600'}`} />
            <h3 className="font-bold text-xs mb-1 text-gray-200">AI Classifier</h3>
            <div className="w-full h-px bg-gray-800 my-2" />
            <div className="w-full mt-2 relative overflow-hidden rounded bg-gray-900 border border-gray-800 h-[60px] flex items-center justify-center p-2">
              {!isModelActive ? (
                <span className="text-gray-600 text-[10px]">Waiting...</span>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full text-center">
                  <p className="font-bold text-rose-500 text-xs animate-pulse">LEAK DETECTED</p>
                  <div className="mt-1 w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-rose-500 h-full" />
                  </div>
                  <p className="text-[9px] text-rose-300 mt-1">Confidence: 92%</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <svg className="absolute inset-0 pointer-events-none w-full h-full">
            <SignalPath path="M 870 270 L 920 270" active={isEsp32Active} color="rose" strokeWidth={2} dashLength={10} />
          </svg>

          {/* ESP32 Module */}
          <motion.div className={`absolute left-[78%] top-[45%] -translate-y-1/2 -translate-x-1/2 border-2 rounded-md p-3 flex flex-col items-center z-10 bg-[#1e293b] ${isEsp32Active ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-700'}`}>
            <div className="w-10 h-14 border border-gray-600 rounded bg-slate-800 flex flex-col justify-between p-1 relative">
              <div className="w-full h-4 relative">
                 <div className="absolute top-1 right-1 w-4 h-2 border-t-2 border-r-2 border-blue-400/50 rounded-tr" />
              </div>
              <div className="w-4 h-4 bg-gray-900 rounded-sm self-center flex items-center justify-center">
                <span className="text-[4px] text-gray-500">ESP32</span>
              </div>
              <div className="w-full flex justify-between px-0.5 pb-1">
                 <div className="w-1 h-1 bg-yellow-500/50 rounded-full" />
                 <div className={`w-1 h-1 rounded-full ${isEsp32Active ? 'bg-blue-400 animate-pulse' : 'bg-gray-700'}`} />
              </div>
            </div>
            
            {isEsp32Active && (
              <div className="absolute -top-6 right-0 text-blue-400">
                <motion.div initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }} animate={{ opacity: [0, 1, 0], scale: 1.5, x: 40, y: -20 }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Radio size={20} />
                </motion.div>
              </div>
            )}
          </motion.div>

          <motion.div className={`absolute right-0 top-1/2 -translate-y-1/2 w-52 rounded-xl border bg-gray-950 shadow-2xl overflow-hidden flex flex-col transition-colors duration-700 z-10 scale-95 ${isDashboardAlert ? 'border-red-500/50' : 'border-gray-700'}`}>
            <div className={`p-3 border-b flex items-center justify-between text-[10px] font-bold ${isDashboardAlert ? 'bg-red-950/40 border-red-900/50 text-red-200' : 'bg-gray-900 border-gray-800 text-gray-400'}`}>
              <div className="flex items-center gap-2"><Activity size={12} /> MONITORING</div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isDashboardAlert ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <span>{isDashboardAlert ? 'ALERT V2' : 'LIVE'}</span>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className={`p-2 rounded-lg border transition-all ${isDashboardAlert ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/5 border-green-500/20'}`}>
                <div className="flex items-center gap-2 text-xs">
                  {isDashboardAlert ? <AlertTriangle className="text-red-500" size={16} /> : <CheckCircle2 className="text-green-500" size={16} />}
                  <span className={`font-bold ${isDashboardAlert ? 'text-red-400' : 'text-green-400'}`}>{isDashboardAlert ? 'Leak Detected' : 'Normal'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <MiniDashCard label="Risk Level" value={isDashboardAlert ? 'High' : 'Low'} alert={isDashboardAlert} />
                <MiniDashCard label="Impact" value={isDashboardAlert ? 'Mod.' : 'None'} alert={isDashboardAlert} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function SensorNode({ x, y, name, type, active, color, isLeakSrc }) {
  const Icon = type === 'acoustic' ? Droplets : Activity;
  return (
    <div className="absolute z-10 isolate flex flex-col items-center" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
      <div className={`relative w-8 h-8 rounded-full border-2 bg-gray-900 flex items-center justify-center transition-colors duration-300 ${active ? `border-${color}-400 shadow-[0_0_15px_rgba(var(--tw-colors-${color}-500),0.5)]` : 'border-gray-600'}`}>
        <Icon className={`w-4 h-4 ${active ? `text-${color}-400` : 'text-gray-500'}`} />
        {active && (
          <motion.div className={`absolute inset-0 rounded-full border border-${color}-400/50`} animate={isLeakSrc ? { scale: [1, 2.5], opacity: [0.8, 0] } : { scale: [1, 1.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: isLeakSrc ? 0.8 : 1.5 }} />
        )}
      </div>
      <div className="w-0.5 h-4 bg-gray-700 mt-1" />
      <div className={`mt-1 text-[9px] font-semibold px-2 py-0.5 rounded backdrop-blur bg-gray-900/80 border ${active ? `text-${color}-300 border-${color}-900/50` : 'text-gray-500 border-gray-800'}`}>{name}</div>
    </div>
  );
}

function SignalPath({ path, active, color, dashLength = 6, strokeWidth = 2, timing = 0 }) {
  const cMap = { cyan: '#22d3ee', amber: '#fbbf24', white: '#f8fafc', purple: '#a855f7', rose: '#f43f5e' };
  return (
    <motion.path d={path} fill="none" stroke={active ? cMap[color] : '#334155'} strokeWidth={strokeWidth} strokeDasharray={active ? dashLength : '0'} animate={active ? { strokeDashoffset: [0, -20] } : {}} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ opacity: active ? 0.8 : 0.4 }} />
  );
}

function ProcessBlock({ title, active, color, children }) {
  const textColors = { amber: 'text-amber-400', cyan: 'text-cyan-400', purple: 'text-purple-400' };
  return (
    <motion.div animate={{ scale: active ? 1.02 : 1, opacity: active ? 1 : 0.6 }} className={`w-full p-3 rounded-lg border-2 bg-gray-900/80 flex flex-col transition-all duration-500 ${active ? `border-${color}-500/50 bg-${color}-950/20` : 'border-gray-700'}`}>
      <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${active ? textColors[color] : 'text-gray-500'}`}>{title}</div>
      <div className="flex-1 w-full bg-black/40 rounded border border-gray-800/80 p-1 flex justify-center items-center overflow-hidden">{children}</div>
    </motion.div>
  );
}

function MiniDashCard({ label, value, alert }) {
  return (
    <div className={`bg-gray-900 border rounded p-2 ${alert ? 'border-red-900/50' : 'border-gray-800'}`}>
      <div className="text-[8px] text-gray-500 uppercase leading-none mb-1">{label}</div>
      <div className={`font-semibold text-xs ${alert ? 'text-red-300' : 'text-white'}`}>{value}</div>
    </div>
  );
}