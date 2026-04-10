import { motion } from 'framer-motion';
import BigStatCard from '../components/BigStatCard';

function JordanVisual() {
  return (
    <div className="relative rounded-2xl border border-[#0d2a4a] bg-[#040f1f] overflow-hidden h-56
                    flex items-center justify-center">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040c1a" />
            <stop offset="100%" stopColor="#071a30" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#skyGrad)" />
        <rect x="0" y="145" width="400" height="55" fill="#0a1a2a" />
        {/* Pipe */}
        <rect x="20" y="120" width="360" height="30" rx="6" fill="#1a3a5a" stroke="#0d4a7a" strokeWidth="2" />
        <motion.rect
          x="22" y="122" width="356" height="26" rx="5"
          fill="none" stroke="#00d4ff" strokeWidth="1" strokeDasharray="20 10"
          animate={{ strokeDashoffset: [0, -90] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Leak */}
        <motion.circle
          cx="250" cy="135" r="4" fill="#ef4444"
          animate={{ r: [4, 7, 4], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="250" cy="150" rx="6" ry="3" fill="#00d4ff" opacity="0.7"
          animate={{ rx: [6, 10, 6], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="200" y="93" fill="#00d4ff" fontSize="11" textAnchor="middle" fontWeight="bold">
          Jordan Water Distribution Network
        </text>
        <text x="250" y="172" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">
          ↑ LEAK POINT
        </text>
        <text x="70" y="140" fill="#4a8aaa" fontSize="9" textAnchor="middle">Plastic Pipe</text>
        {[60, 130, 320, 370].map((x, i) => (
          <motion.text
            key={i} x={x} y="115" fill="#00d4ff" fontSize="12" textAnchor="middle"
            animate={{ y: [115, 108, 115], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            💧
          </motion.text>
        ))}
      </svg>
    </div>
  );
}

function FormulaCard() {
  return (
    <div className="p-6 rounded-xl border border-[#0d4080] bg-[#040f20]">
      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
        Simple Money-Loss Formula
      </div>
      <div className="text-lg text-white font-mono mb-2">
        Lost Value = Lost Volume × Cost per m³
      </div>
      <div className="text-slate-400 mb-3 text-sm">Using official Miyahuna 2022 data:</div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl font-black text-orange-400">94.77M m³</span>
        <span className="text-xl text-slate-400">×</span>
        <span className="text-2xl font-black text-yellow-400">0.5295 JOD</span>
        <span className="text-xl text-slate-400">=</span>
        <span className="text-3xl font-black text-red-400">~50.18M JOD</span>
      </div>
    </div>
  );
}

export default function ProblemPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-8 max-w-3xl">
        A large amount of water is lost every year, and part of that loss is real leakage in the network.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left — visual */}
        <div className="space-y-6">
          <JordanVisual />
          <FormulaCard />
        </div>

        {/* Right — stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <BigStatCard
            num="61"
            unit="m³ / person / year"
            label="Renewable Water Resource"
            sub="Jordan has one of the world's lowest fresh-water resources per capita"
            color="cyan"
          />
          <BigStatCard
            num=">35%"
            unit="water loss"
            label="Official Utility Loss Rate"
            sub="More than one-third of water entering the system is counted as lost"
            color="amber"
          />
          <BigStatCard
            num="94.77M"
            unit="m³ / year"
            label="Amman Annual Gap"
            sub="244.99M distributed − 150.22M authorized = 94.77M m³ yearly gap"
            color="orange"
          />
          <BigStatCard
            num="~50.18M"
            unit="JOD / year"
            label="Estimated Yearly Value"
            sub="94.77M m³ × 0.5295 JOD/m³ using Miyahuna 2022 production cost"
            color="red"
          />
        </div>
      </div>

      {/* Caution */}
      <div className="mt-8 p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-200 text-base leading-relaxed">
        <span className="font-bold text-amber-400">Important · </span>
        This yearly gap is an estimate using official utility cost data. It is not all leaks only.
        Official reports group several types of water loss together. But official reports also show
        that real physical leakage is an important part of this gap.
      </div>

      {/* Physical loss types */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🔧', title: 'Pipe Leaks',          desc: 'Leaks in transmission and distribution pipes' },
          { icon: '🏗️', title: 'Tank Leaks',           desc: 'Leaks and overflow in utility storage tanks' },
          { icon: '🏠', title: 'Service Connections', desc: 'Leaks in service connections up to the customer meter' },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 p-5 rounded-xl bg-[#071525] border border-[#0d2a4a]"
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <div className="font-bold text-white text-lg">{item.title}</div>
              <div className="text-slate-400 text-sm mt-1">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
