import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageNav, { TITLES } from './components/PageNav';
import ProblemPage from './pages/ProblemPage';
import ExistingSolutionsPage from './pages/ExistingSolutionsPage';
import HubArchitecturePage from './pages/HubArchitecturePage';
import LiveLeakAnimationPage from './pages/LiveLeakAnimationPage';
import FinalValuePage from './pages/FinalValuePage';

const PAGES = [
  <ProblemPage />,
  <ExistingSolutionsPage />,
  <HubArchitecturePage />,
  <LiveLeakAnimationPage />,
  <FinalValuePage />,
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
    setDir(clamped > page ? 1 : -1);
    setPage(clamped);
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{
        background: '#050d1a',
        color: '#e2e8f0',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <PageNav page={page} total={TOTAL} onGo={go} title={TITLES[page]} />

      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {PAGES[page]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#0d2a4a] flex-shrink-0">
        <motion.div
          className="h-full rounded-r-full"
          style={{ background: '#00d4ff' }}
          animate={{ width: `${((page + 1) / TOTAL) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
