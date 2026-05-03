import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1 from './pages/Slide1';
import Slide2 from './pages/Slide2';
import Slide3 from './pages/Slide3';
import Slide4 from './pages/Slide4';
import Slide5 from './pages/Slide5';

const PAGES = [
  <Slide1 />,
  <Slide2 />,
  <Slide3 />,
  <Slide4 />,
  <Slide5 />
];

const TOTAL = PAGES.length;

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 }),
};

export default function App() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    const clamped = Math.max(0, Math.min(next, TOTAL - 1));
    if (clamped === page) return;
    setDir(clamped > page ? 1 : -1);
    setPage(clamped);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        go(page + 1);
      } else if (e.key === 'ArrowLeft') {
        go(page - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{
        background: '#050d1a',
        color: '#e2e8f0',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-hidden"
          >
            {PAGES[page]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <div className="h-20 bg-[#020617] border-t border-slate-800 flex items-center justify-between px-8 z-50">
        <button 
          onClick={() => go(page - 1)} 
          disabled={page === 0}
          className="px-6 py-2 rounded-full border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          &larr; Previous
        </button>

        <div className="flex gap-2">
          {PAGES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => go(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === page ? 'bg-blue-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'}`}
            />
          ))}
        </div>

        <button 
          onClick={() => go(page + 1)} 
          disabled={page === TOTAL - 1}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          Next &rarr;
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#0d2a4a] flex-shrink-0 z-50">
        <motion.div
          className="h-full"
          style={{ background: '#00d4ff' }}
          animate={{ width: `${((page + 1) / TOTAL) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
