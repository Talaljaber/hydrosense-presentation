import { motion } from 'framer-motion';

export function MiniWave({ noisy, color }) {
  const noisyPath =
    'M0,10 Q5,3 10,14 T20,6 T30,16 T40,4 T50,14 T60,6 T70,16 T80,8 T90,14 T100,10';
  const cleanPath =
    'M0,10 Q15,4 25,10 T50,10 T75,10 T100,10';
  return (
    <svg viewBox="0 0 100 20" className="w-full h-8" fill="none">
      <motion.path
        d={noisy ? noisyPath : cleanPath}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}

export function MiniHeatmap() {
  return (
    <div className="grid grid-cols-8 grid-rows-3 gap-0.5 rounded overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => {
        const seed = ((i * 7 + 3) % 10) / 10;
        return (
          <motion.div
            key={i}
            className="aspect-square rounded-sm"
            animate={{ backgroundColor: `rgba(168,85,247,${0.2 + seed * 0.8})` }}
            transition={{ duration: 1.5 + seed, repeat: Infinity, repeatType: 'reverse' }}
          />
        );
      })}
    </div>
  );
}

export function FeatureMapViz() {
  return (
    <div className="w-full">
      <div
        className="grid grid-rows-4 gap-0.5 rounded overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}
      >
        {Array.from({ length: 64 }).map((_, i) => {
          const seed = ((i * 13 + 7) % 17) / 17;
          return (
            <motion.div
              key={i}
              className="h-5 rounded-sm"
              animate={{
                backgroundColor: `hsl(${270 + seed * 80}, 70%, ${20 + seed * 50}%)`,
              }}
              transition={{ duration: 2 + seed * 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
        <span>Low Freq</span>
        <span>Feature Map (MFCC-style)</span>
        <span>High Freq</span>
      </div>
    </div>
  );
}
