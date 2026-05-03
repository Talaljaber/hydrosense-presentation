import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Falling raindrop
function Drop({ x, delay, size, duration }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: -20,
        width: size,
        height: size * 2.2,
        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
        background: `radial-gradient(ellipse at 35% 35%, rgba(147,210,255,0.7), rgba(0,140,220,0.25))`,
        boxShadow: '0 0 8px rgba(0,180,255,0.3)',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: '110vh', opacity: [0, 0.7, 0.7, 0] }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity, repeatDelay: Math.random() * 4 }}
    />
  );
}

// Ripple ring on impact
function Ripple({ x, delay }) {
  return (
    <motion.div
      className="absolute rounded-full border border-cyan-400/30"
      style={{ left: `${x}%`, bottom: 40, marginLeft: -30, width: 60, height: 20 }}
      initial={{ scaleX: 0, opacity: 0.6 }}
      animate={{ scaleX: [0, 1.8, 2.5], opacity: [0.5, 0.2, 0] }}
      transition={{ duration: 1.4, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 3 + Math.random() * 3 }}
    />
  );
}

const DROPS = [
  { x: 8,  delay: 0.2,  size: 5,  duration: 4.2 },
  { x: 18, delay: 1.7,  size: 3,  duration: 5.5 },
  { x: 27, delay: 0.8,  size: 7,  duration: 3.8 },
  { x: 36, delay: 2.4,  size: 4,  duration: 4.9 },
  { x: 44, delay: 0.5,  size: 6,  duration: 4.5 },
  { x: 53, delay: 1.2,  size: 3,  duration: 5.1 },
  { x: 62, delay: 3.1,  size: 8,  duration: 4.0 },
  { x: 71, delay: 0.9,  size: 4,  duration: 5.6 },
  { x: 79, delay: 2.0,  size: 5,  duration: 4.3 },
  { x: 88, delay: 1.4,  size: 3,  duration: 5.8 },
  { x: 94, delay: 0.3,  size: 6,  duration: 4.1 },
];

export default function Slide5() {
  const [phase, setPhase] = useState(0);

  // Stagger the text reveal
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #020e1f 0%, #010810 60%, #000508 100%)' }}>

      {/* Animated drops */}
      {DROPS.map((d, i) => (
        <Drop key={i} {...d} />
      ))}
      {DROPS.filter((_, i) => i % 3 === 0).map((d, i) => (
        <Ripple key={i} x={d.x} delay={d.delay + 3.8} />
      ))}

      {/* Subtle radial glow behind text */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 700, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,140,255,0.07) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Water pool at bottom */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 44 }}>
        <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d="M0,22 C120,10 240,34 360,22 C480,10 600,34 720,22 C840,10 960,34 1080,22 C1200,10 1320,34 1440,22 L1440,44 L0,44 Z"
            fill="rgba(0,140,220,0.12)"
            animate={{ d: [
              "M0,22 C120,10 240,34 360,22 C480,10 600,34 720,22 C840,10 960,34 1080,22 C1200,10 1320,34 1440,22 L1440,44 L0,44 Z",
              "M0,28 C120,16 240,40 360,28 C480,16 600,40 720,28 C840,16 960,40 1080,28 C1200,16 1320,40 1440,28 L1440,44 L0,44 Z",
              "M0,22 C120,10 240,34 360,22 C480,10 600,34 720,22 C840,10 960,34 1080,22 C1200,10 1320,34 1440,22 L1440,44 L0,44 Z",
            ]}}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M0,32 C180,20 360,44 540,32 C720,20 900,44 1080,32 C1260,20 1380,38 1440,32 L1440,44 L0,44 Z"
            fill="rgba(0,160,255,0.08)"
            animate={{ d: [
              "M0,32 C180,20 360,44 540,32 C720,20 900,44 1080,32 C1260,20 1380,38 1440,32 L1440,44 L0,44 Z",
              "M0,38 C180,26 360,44 540,36 C720,28 900,44 1080,36 C1260,28 1380,44 1440,38 L1440,44 L0,44 Z",
              "M0,32 C180,20 360,44 540,32 C720,20 900,44 1080,32 C1260,20 1380,38 1440,32 L1440,44 L0,44 Z",
            ]}}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 gap-8 max-w-4xl">

        {/* Big Arabic word */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <motion.span
                className="font-black select-none"
                style={{
                  fontSize: 'clamp(72px, 11vw, 130px)',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 35%, #0ea5e9 65%, #a5f3fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 40px rgba(56,189,248,0.5))',
                  letterSpacing: '-0.03em',
                }}
                animate={{ filter: [
                  'drop-shadow(0 0 30px rgba(56,189,248,0.4))',
                  'drop-shadow(0 0 55px rgba(56,189,248,0.7))',
                  'drop-shadow(0 0 30px rgba(56,189,248,0.4))',
                ]}}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                HydroSense
              </motion.span>
              <span className="text-slate-500 text-sm font-mono tracking-[0.3em] uppercase">every single drop counts</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {phase >= 2 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-48 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)' }}
          />
        )}

        {/* Quote */}
        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-slate-200 leading-relaxed whitespace-nowrap"
            style={{ fontSize: 'clamp(18px, 2.4vw, 28px)', fontWeight: 300, letterSpacing: '0.01em' }}
          >
            In Jordan, every{' '}
            <span style={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #7dd3fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}>drop</span>
            {' '}matters — HydroSense is the solution.
          </motion.p>
        )}

        {/* Brand line — removed, merged into quote */}

        {/* Footer team line */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-1 mt-2"
          >
            <div className="w-16 h-px bg-slate-700 mb-3" />
            <span className="text-slate-500 text-xs font-mono tracking-[0.25em] uppercase">
              Built for Jordan · Ready to Scale
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
