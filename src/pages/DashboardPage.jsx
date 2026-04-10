import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashCard from '../components/DashCard';

const NORMAL_CARDS = [
  { label: 'System Status', value: 'NORMAL',      color: 'green',  large: true },
  { label: 'Active Leaks',  value: '0',           color: 'dim',    large: true },
  { label: 'Risk Level',    value: 'LOW',         color: 'green' },
  { label: 'Impact (JOD)',  value: '0 / hr',      color: 'cyan' },
  { label: 'Confidence',    value: '—',           color: 'dim' },
  { label: 'Hot Channel',   value: 'None',        color: 'dim' },
];

const ALERT_CARDS = [
  { label: 'System Status', value: 'ALERT',      color: 'red',    large: true },
  { label: 'Active Leaks',  value: '1',          color: 'red',    large: true },
  { label: 'Risk Level',    value: 'HIGH',       color: 'red' },
  { label: 'Impact (JOD)',  value: '~5.73 / hr', color: 'amber' },
  { label: 'Confidence',    value: '92%',        color: 'orange' },
  { label: 'Hot Channel',   value: 'CH2',        color: 'purple' },
];

const TABLE = [
  ['System health', 'All sensors OK', '⚠ Possible pipe break'],
  ['Leak decision', 'No Leak', 'LEAK – CH2'],
  ['Confidence', '< 20%', '92%'],
  ['Estimated loss', '0 L / hr', '~103 L / hr'],
  ['Action required', 'None', 'Dispatch field crew'],
  ['Risk rating', 'Low', 'High'],
  ['Alert sent', 'No', 'Yes – SMS + Dashboard'],
];

export default function DashboardPage() {
  const [alert, setAlert] = useState(false);
  const cards = alert ? ALERT_CARDS : NORMAL_CARDS;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-6 max-w-3xl">
        The web dashboard shows the live AI result and lets the operator understand,
        at a glance, whether water is being lost right now.
      </p>

      {/* Toggle */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setAlert(false)}
          className={`px-6 py-2.5 rounded-xl font-black text-base transition-all ${
            !alert
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-[#0d2a4a] text-slate-400 hover:bg-[#122f50]'
          }`}
        >
          Normal Mode
        </button>
        <button
          onClick={() => setAlert(true)}
          className={`px-6 py-2.5 rounded-xl font-black text-base transition-all ${
            alert
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
              : 'bg-[#0d2a4a] text-slate-400 hover:bg-[#122f50]'
          }`}
        >
          Alert Mode
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={alert ? 'alert' : 'normal'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Card grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map((c) => (
              <DashCard
                key={c.label}
                label={c.label}
                value={c.value}
                color={c.color}
                large={c.large}
                wide={c.wide}
              />
            ))}
          </div>

          {/* Confidence bar */}
          {alert && (
            <div className="p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a] mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-slate-400 font-bold">Leak Confidence</span>
                <span className="text-orange-400 font-black">92%</span>
              </div>
              <div className="h-4 rounded-full bg-[#0d2a4a] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          )}

          {/* Location card */}
          <div className="p-5 rounded-xl bg-[#040f1f] border border-[#0d2a4a] mb-6">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">
              Monitored location
            </div>
            <div className="text-xl font-black text-slate-200">
              {alert ? 'Pipe segment ▸ CH2 — Possible hidden leak' : 'All pipe segments — No anomaly'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparison table */}
      <div className="rounded-xl border border-[#0d2a4a] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#040f1f]">
              <th className="text-left p-3 text-slate-500 font-bold uppercase text-xs tracking-widest">Metric</th>
              <th className="text-left p-3 text-emerald-400 font-bold uppercase text-xs tracking-widest">Normal</th>
              <th className="text-left p-3 text-red-400 font-bold uppercase text-xs tracking-widest">Alert</th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map(([metric, norm, alrt], i) => (
              <tr key={metric} className={i % 2 === 0 ? 'bg-[#050d1a]' : 'bg-[#040f1f]'}>
                <td className="p-3 text-slate-400 font-semibold">{metric}</td>
                <td className="p-3 text-emerald-300">{norm}</td>
                <td className="p-3 text-red-300 font-bold">{alrt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
