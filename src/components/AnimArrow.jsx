import { motion } from 'framer-motion';

export default function AnimArrow({ active, color, label }) {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 w-14">
      <div className="text-xs text-slate-500 text-center leading-tight">{label}</div>
      <motion.div
        className="w-full flex items-center justify-center"
        animate={{ opacity: active ? 1 : 0.2 }}
      >
        <svg viewBox="0 0 40 20" className="w-full h-5">
          <motion.line
            x1="2" y1="10" x2="32" y2="10"
            stroke={active ? color : '#1a3a5a'}
            strokeWidth="2.5"
            strokeDasharray="6"
            animate={active ? { strokeDashoffset: [12, 0] } : {}}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <polygon points="30,5 38,10 30,15" fill={active ? color : '#1a3a5a'} />
        </svg>
      </motion.div>
    </div>
  );
}
