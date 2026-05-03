import React from 'react';
import { motion } from 'framer-motion';

export default function Slide4() {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-80px)] max-w-7xl mx-auto p-4 md:p-8 text-center" style={{ background: 'radial-gradient(circle at center, #0a192f 0%, #020617 100%)' }}>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Cost, Scale & Payback</h1>
        <p className="text-xl text-slate-400 mt-2">A shared hub makes dense monitoring more realistic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        
        {/* Cost Side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold text-slate-200 mb-8 border-b border-slate-800 pb-4">Estimated Deployment</h3>
          
          <div className="space-y-6 text-left">
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Amman Scale</div>
              <div className="text-3xl font-bold text-blue-400">1.08 Million</div>
              <div className="text-slate-500">Residential units / households</div>
            </div>
            
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">HydroSense Unit Cost</div>
              <div className="text-3xl font-bold text-blue-400">~9 JOD</div>
              <div className="text-slate-500">Per monitored residential unit</div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-slate-400 text-sm uppercase tracking-wide">Total Estimated Cost</div>
              <div className="text-4xl font-bold text-teal-400">~10 Million JOD</div>
            </div>
          </div>
        </motion.div>

        {/* Savings Side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold text-slate-200 mb-8 border-b border-slate-800 pb-4">Value Proposition</h3>
          
          <div className="space-y-6 text-left">
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Current NRW Economic Value</div>
              <div className="text-3xl font-bold text-emerald-400">~300 Million JOD<span className="text-lg text-emerald-600">/yr</span></div>
            </div>
            
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">If We Reduce Only 10%</div>
              <div className="text-3xl font-bold text-emerald-400">~30 Million JOD<span className="text-lg text-emerald-600">/yr</span></div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-slate-400 text-sm uppercase tracking-wide">Estimated Payback Period</div>
              <div className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-emerald-400">&lt; 5 Months</div>
            </div>
          </div>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-5xl mx-auto mt-12 bg-blue-950/20 border border-blue-900/50 p-4 rounded-xl text-blue-200 text-sm italic"
      >
        Theoretical payback estimate based on reducing 10% of NRW-related economic value (not claiming all NRW is physical leakage).
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-3xl md:text-4xl font-bold text-slate-100"
      >
        "In Jordan, every drop has value — HydroSense is the solution."
      </motion.div>

    </div>
  );
}
