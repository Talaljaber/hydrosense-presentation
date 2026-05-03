import React from 'react';
import { motion } from 'framer-motion';

export default function Slide1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full p-8 md:p-16" style={{ background: 'radial-gradient(circle at center, #0a192f 0%, #020617 100%)' }}>
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Jordan’s Water Loss Problem
        </h1>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
          </div>
          <div className="text-5xl font-bold text-blue-400 mb-4">&gt; 40%</div>
          <div className="text-xl text-slate-300 font-semibold">Non-Revenue Water problem</div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-teal-400" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3v2h2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-16v2h2V7h-2zM7 3v2h2V3H7zm12 6h2V7h-2v2zm-8 12h2v-2h-2v2v-2h2v2H11zm-4 0h2v-2H7v2v-2h2v2H7zm12 0h2v-2h-2v2h-2v2h2v-2zm-8-16h2V3h-2v2H11zm-4 0h2V3H7v2V3h2v2H7zm12 0h2V3h-2v2V3h2v2z"/></svg>
          </div>
          <div className="text-5xl font-bold text-teal-400 mb-4">136M<span className="text-2xl ml-1 text-teal-600">m³/vr</span></div>
          <div className="text-xl text-slate-300 font-semibold">Estimated non-revenue water volume</div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div className="text-5xl font-bold text-emerald-400 mb-4">~300M<span className="text-2xl ml-1 text-emerald-600">JOD</span></div>
          <div className="text-xl text-slate-300 font-semibold">Economic value of NRW-related loss</div>
          <div className="text-sm text-slate-500 mt-4 border-t border-slate-700/50 pt-2">Based on real supply cost ≈ 2.20 JOD/m³</div>
        </motion.div>

      </div>

      {/* Caveat */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-5xl mt-12 bg-blue-950/20 border border-blue-900/50 p-6 rounded-xl backdrop-blur-sm"
      >
        <h3 className="text-lg text-blue-300 font-semibold mb-2">Important Note on Non-Revenue Water</h3>
        <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
          <li>NRW includes physical leaks, technical losses, commercial losses, meter errors, and unbilled water.</li>
          <li><strong className="text-blue-200">HydroSense targets the physical losses</strong>: hidden leaks and abnormal pipe behavior.</li>
        </ul>
      </motion.div>

      {/* Presenter Cue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 right-8 text-slate-500 italic flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        "In Jordan, every cubic meter lost matters."
      </motion.div>

    </div>
  );
}
