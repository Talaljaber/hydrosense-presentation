import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedNumber({ value, decimals = 0, suffix = '', prefix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setDisplay(v)
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

export default function FinalValuePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-16">
      
      {/* 1. Intro Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto my-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 font-bold rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-xs uppercase tracking-widest mb-6 border border-[#00d4ff]/20">
          Financial Advantage
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
          Affordable by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#34d399]">Design</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Why HydroSense is built to scale across Amman — combining high-fidelity leak detection with smart architectural choices to deliver wider coverage at a fraction of the cost.
        </p>
      </motion.div>

      {/* 2. Visual Comparison Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        {/* Traditional Approach */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-[#040f1f] relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 p-6 opacity-30 text-8xl blur-sm select-none">🏛️</div>
          <div className="text-red-400 font-black mb-8 tracking-widest uppercase text-xs">Traditional Approach</div>
          
          <ul className="space-y-8 relative z-10">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 font-bold">1</div>
              <div>
                <div className="text-white font-bold text-lg">1 processor for each pipe</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Every individual sensor needs its own dedicated microcontroller, housing, and radio module.</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 font-bold">$$</div>
              <div>
                <div className="text-white font-bold text-lg">Higher cost per home</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Individual hardware setups drastically inflate the unit price.</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 font-bold">!</div>
              <div>
                <div className="text-white font-bold text-lg">Large city deployment cost</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Prohibitive to deploy across all of Amman due to immense scaling expenses.</div>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* HydroSense */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl border border-[#00d4ff]/40 bg-gradient-to-bl from-[#00d4ff]/10 to-[#040f1f] shadow-[0_0_50px_rgba(0,212,255,0.05)] relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 p-6 opacity-30 text-8xl blur-sm select-none">💎</div>
          <div className="text-[#00d4ff] font-black mb-8 tracking-widest uppercase text-xs flex justify-between items-center">
            <span>HydroSense Hub Approach</span>
            <span className="bg-[#00d4ff]/20 text-[#00d4ff] px-2 py-1 rounded-md text-[10px]">Optimal</span>
          </div>
          
          <ul className="space-y-8 relative z-10">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] flex items-center justify-center shrink-0 border border-[#00d4ff]/30 font-bold">10</div>
              <div>
                <div className="text-white font-bold text-lg">1 processor for up to 10 pipes</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Custom multiplexing allows many sensors to route through a single intelligent hub.</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] flex items-center justify-center shrink-0 border border-[#00d4ff]/30 font-bold">📉</div>
              <div>
                <div className="text-white font-bold text-lg">Much lower cost per home</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Cost is shared, creating extreme economies of scale at the building level.</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] flex items-center justify-center shrink-0 border border-[#00d4ff]/30 font-bold">✓</div>
              <div>
                <div className="text-white font-bold text-lg">Lower city deployment cost</div>
                <div className="text-slate-400 text-sm mt-1 leading-relaxed">Financially viable to blanket an entire district efficiently and responsibly.</div>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* 3. Cost Comparison Visuals */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#050d1a]/50 backdrop-blur-xl border border-[#00d4ff]/20 rounded-[2.5rem] p-8 lg:p-12 relative shadow-2xl mt-20"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d4ff] to-[#34d399] text-[#040f1f] font-black px-6 py-2 xl:px-8 xl:py-3 rounded-full uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(0,212,255,0.4)] whitespace-nowrap">
          💸 Cost Comparison
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
          {/* Per Subscriber */}
          <div className="bg-[#040f1f] p-8 rounded-3xl border border-[#0d2a4a]">
            <h3 className="text-slate-500 font-bold mb-10 text-xs uppercase tracking-widest text-center">Cost Per Subscriber</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-red-400/80 font-bold text-sm">Traditional System</span>
                  <span className="text-slate-300 font-medium text-lg">~15 JOD</span>
                </div>
                <div className="h-4 w-full bg-[#0a1526] rounded-full overflow-hidden border border-[#0d2a4a]/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-red-500/60 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[#00d4ff] font-black text-sm uppercase tracking-wide">HydroSense</span>
                  <span className="text-white font-black text-4xl">
                    <AnimatedNumber value={3.55} decimals={2} /> <span className="text-base font-bold text-[#00d4ff]">JOD</span>
                  </span>
                </div>
                <div className="h-6 w-full bg-[#0a1526] rounded-full overflow-hidden border border-[#0d2a4a]/50 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '23.6%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, type: 'spring', bounce: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0099ff] rounded-full relative"
                  />
                </div>
                <div className="mt-3 text-right text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  76% Savings
                </div>
              </div>
            </div>
          </div>

          {/* City Wide */}
          <div className="bg-[#040f1f] p-8 rounded-3xl border border-[#0d2a4a]">
            <h3 className="text-slate-500 font-bold mb-10 text-xs uppercase tracking-widest text-center">City-wide Deployment (Amman)</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-red-400/80 font-bold text-sm">Traditional Rollout</span>
                  <span className="text-slate-300 font-medium text-lg">~<AnimatedNumber value={9.0} decimals={1} />M JOD</span>
                </div>
                <div className="h-4 w-full bg-[#0a1526] rounded-full overflow-hidden border border-[#0d2a4a]/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-red-500/60 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[#34d399] font-black text-sm uppercase tracking-wide">HydroSense Setup</span>
                  <span className="text-white font-black text-4xl">
                    ~<AnimatedNumber value={2.1} decimals={1} /> <span className="text-base font-bold text-[#34d399]">M JOD</span>
                  </span>
                </div>
                <div className="h-6 w-full bg-[#0a1526] rounded-full overflow-hidden border border-[#0d2a4a]/50 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '23.3%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, type: 'spring', bounce: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#34d399] to-[#059669] rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)] relative"
                  />
                </div>
                <div className="mt-3 text-right text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  6.9M JOD Freed Up
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Small Diagram & Explainer */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center mt-24">
        
        {/* Explainers */}
        <div className="flex flex-col justify-center gap-6 order-2 lg:order-1">
          <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Why it dramatically <br/><span className="text-[#fbbf24]">saves money</span>
          </h3>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-5 p-5 rounded-2xl bg-[#050d1a] border border-[#0d2a4a] hover:border-[#fbbf24]/50 transition-colors duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] flex items-center justify-center text-2xl shrink-0">🤝</div>
            <div>
              <div className="font-black text-white text-lg mb-1">Shared processor across many pipes</div>
              <div className="text-slate-400 text-sm leading-relaxed">Eliminates redundant processing power per pipe, centralizing the intelligence.</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-5 p-5 rounded-2xl bg-[#050d1a] border border-[#0d2a4a] hover:border-[#fbbf24]/50 transition-colors duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] flex items-center justify-center text-2xl shrink-0">📦</div>
            <div>
              <div className="font-black text-white text-lg mb-1">Fewer expensive hardware units</div>
              <div className="text-slate-400 text-sm leading-relaxed">Considerably less raw materials, casing, power supplies, and logic boards.</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-5 p-5 rounded-2xl bg-[#050d1a] border border-[#0d2a4a] hover:border-[#fbbf24]/50 transition-colors duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] flex items-center justify-center text-2xl shrink-0">🏢</div>
            <div>
              <div className="font-black text-white text-lg mb-1">Perfect fit for apartments</div>
              <div className="text-slate-400 text-sm leading-relaxed">Ideal for Jordan's dense apartment complexes with clustered rooftop tanks.</div>
            </div>
          </motion.div>
        </div>

        {/* Diagram */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#0a1526] to-[#040f1f] border border-[#0d2a4a] rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden order-1 lg:order-2 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05),transparent_70%)] pointer-events-none" />
          <h3 className="text-[#00d4ff] font-bold uppercase text-[10px] tracking-widest absolute top-8 border border-[#00d4ff]/20 px-3 py-1 rounded-full bg-[#00d4ff]/5">
            Architecture for Residential Buildings
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center mt-12 w-full gap-4 lg:gap-8 relative z-10">
            {/* Apartments cluster */}
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#040f1f] border border-[#103a5c] px-4 py-3 rounded-xl text-slate-300 text-sm flex items-center gap-3 font-medium shadow-lg z-10 relative">
                  <span className="text-[#00d4ff]">🚰</span> Apt {i}
                  <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-8 lg:w-16 h-px bg-gradient-to-r from-[#103a5c] to-[#00d4ff]/80 hidden sm:block" />
                </div>
              ))}
              <div className="text-slate-500 text-xs text-center border-2 border-dashed border-[#103a5c]/50 py-2 rounded-xl mt-1">
                ...up to 10
              </div>
            </div>

            <div className="h-8 shrink-0 sm:hidden"></div>

            {/* Core Hub */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="bg-[#040f1f] border-2 border-[#00d4ff] shadow-[0_0_40px_rgba(0,212,255,0.3)] w-28 h-32 lg:w-32 lg:h-36 rounded-2xl flex flex-col items-center justify-center text-[#00d4ff] relative z-20 shrink-0 mt-8 sm:mt-0 sm:ml-4 lg:ml-8"
            >
              <div className="absolute inset-0 rounded-2xl border border-[#00d4ff] animate-ping opacity-20" />
              
              <div className="text-4xl mb-3">🧠</div>
              <div className="text-[11px] font-black uppercase text-center leading-tight">Shared<br/>Mux Hub</div>
              <div className="mt-2 bg-[#00d4ff]/20 text-[#00d4ff] text-[9px] px-2 py-0.5 rounded-sm font-bold">1 PROCESSOR</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 5. ROI Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 text-center border border-emerald-500/30 bg-gradient-to-b from-[#040f1f] to-emerald-950/20 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 blur-[100px] w-[500px] h-[500px] rounded-full pointer-events-none" />
        
        <div className="inline-block bg-emerald-500 text-[#040f1f] font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-8 relative z-10">
          Return on Investment
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-black text-white relative z-10 mb-6">Fast Return, Real Impact</h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg relative z-10 mb-14 leading-relaxed">
          Even a small reduction in non-revenue water translates into millions retained per year. HydroSense pays for itself quickly, operating at pure value for the rest of its lifecycle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-4xl mx-auto">
          <div className="bg-[#050d1a]/60 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-10 flex flex-col justify-center items-center shadow-emerald-900/50 shadow-xl hover:scale-105 transition-transform duration-500">
            <div className="text-emerald-400/80 text-xs font-bold uppercase tracking-widest mb-4">Estimated Payback Period</div>
            <div className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 mb-3 drop-shadow-sm">
              <AnimatedNumber value={3} /> <span className="text-3xl text-emerald-500">Months</span>
            </div>
            <div className="text-emerald-200/50 text-sm font-medium mt-2">Capital investment fully recovered</div>
          </div>

          <div className="bg-[#050d1a]/60 backdrop-blur-xl border border-[#00d4ff]/30 rounded-3xl p-10 flex flex-col justify-center items-center shadow-cyan-900/50 shadow-xl hover:scale-105 transition-transform duration-500">
            <div className="text-[#00d4ff]/80 text-xs font-bold uppercase tracking-widest mb-4">Projected Yearly Savings</div>
            <div className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00d4ff] to-blue-600 mb-3 flex items-baseline gap-2 drop-shadow-sm">
              <AnimatedNumber value={8.8} decimals={1} duration={2.5} /> <span className="text-3xl text-[#00d4ff]">M JOD</span>
            </div>
            <div className="text-[#00d4ff]/50 text-sm font-medium mt-2">Direct savings for water authority</div>
          </div>
        </div>

      </motion.div>

      <div className="h-12" />
    </div>
  );
}