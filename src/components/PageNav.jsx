import { motion, AnimatePresence } from 'framer-motion';

const PAGES = [
  { id: 0, short: 'Problem' },
  { id: 1, short: 'Existing Solutions' },
  { id: 2, short: 'Hub Architecture' },
  { id: 3, short: 'Live Animation' },
  { id: 4, short: 'Signal Pipeline' },
  { id: 5, short: 'AI Decision' },
  { id: 6, short: 'Dashboard' },
  { id: 7, short: 'Final Value' },
];

export const TITLES = [
  'Jordan Cannot Afford Hidden Water Loss',
  'Why Available Solutions Are Not Ideal for Jordan',
  'HydroSense: A Low-Cost Hub for Plastic-Pipe Leak Detection',
  'HydroSense Hub Architecture',
  'How HydroSense Detects a Leak',
  'From Raw Signal to Useful Leak Features',
  'AI Decision: Leak or No Leak',
  'Final Output for the Monitoring Team',
  'Why HydroSense Matters',
];

export default function PageNav({ page, total, onGo, title }) {
  return (
    <>
      {/* ── Header ── */}
      <header className="z-50 flex items-center justify-between px-8 py-4
                         border-b border-[#0d2a4a] bg-[#040c17]/90 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="#00d4ff" strokeWidth="2" />
              <path
                d="M8 22 Q12 10 16 14 Q20 18 24 10"
                stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round"
              />
            </svg>
            <span className="text-2xl font-black text-[#00d4ff] tracking-wide">
              HydroSense Jordan
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-0.5 ml-11">
            Multiplexed Leak Detection · Judge Presentation
          </p>
        </div>

        {/* Page tabs */}
        <div className="hidden lg:flex items-center gap-1.5">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => onGo(p.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all
                ${page === p.id
                  ? 'bg-[#00d4ff] text-[#040c17]'
                  : 'bg-[#0d2a4a] text-slate-400 hover:text-white hover:bg-[#0e3560]'}`}
            >
              {p.short}
            </button>
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onGo(page - 1)}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center rounded-lg
                       bg-[#0d2a4a] text-white disabled:opacity-30 hover:bg-[#0e3560] transition text-xl"
          >
            ‹
          </button>
          <span className="text-sm text-slate-400 font-mono w-16 text-center">
            {page + 1} / {total}
          </span>
          <button
            onClick={() => onGo(page + 1)}
            disabled={page === total - 1}
            className="w-10 h-10 flex items-center justify-center rounded-lg
                       bg-[#00d4ff] text-[#040c17] font-bold text-xl disabled:opacity-30
                       hover:bg-[#33deff] transition"
          >
            ›
          </button>
        </div>
      </header>

      {/* ── Page title bar ── */}
      <div className="bg-[#040f1f] border-b border-[#0d2a4a] px-8 py-3">
        <AnimatePresence mode="wait">
          <motion.h1
            key={page}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold text-white"
          >
            {TITLES[page]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </>
  );
}
