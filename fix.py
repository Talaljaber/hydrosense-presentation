import re
with open('src/pages/Slide2.jsx', 'r', encoding='utf-8') as f: code = f.read()

sIdx = code.find('<div className=\"p-6 max-w-[100rem] mx-auto\">')
eIdx = code.find('{/* \xe2\x94\x80\xe2\x94\x80\xe2\x94\x80 Active Layer Highlight \xe2\x94\x80\xe2\x94\x80\xe2\x94\x80 */}')
if eIdx == -1: eIdx = code.find('Active Layer Highlight') - 11

if sIdx != -1 and eIdx != -1:
    repl = '''    <div className="p-4 md:p-8 max-w-[100rem] mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        
        {/* Left Side */}
        <div className="flex-shrink-0 w-full lg:w-1/3 xl:w-1/4 space-y-6">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-2">HydroSense Shared Hub</h1>
            <p className="text-lg text-slate-300 mb-4">One low-cost hub monitors multiple pipe channels.</p>
          </div>
          <div className="space-y-4">
            {[ 
              {id:1, t:'1. Pipe Sensors', d:'Vibration sensor wakes system; accelerometer captures signal.'},
              {id:2, t:'2. Channel Switching', d:'Multiplexer scans channels sequentially.'},
              {id:3, t:'3. ESP32 Hub', d:'Only one signal reaches ESP32 at a time.'},
              {id:4, t:'4. AI Dashboard', d:'Signals processed and classified as normal/leak.'}
            ].map(step => (
              <div key={step.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="text-[#00d4ff] font-bold text-sm mb-1">{step.t}</div>
                <div className="text-slate-400 text-xs">{step.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Animation Description and controls */}
        <div className="flex-1 w-full bg-[#0a0f1c] rounded-2xl p-4 border border-[#1e293b] shadow-2xl relative self-stretch flex flex-col justify-center">
          <div className="mt-8 bg-blue-950/20 border border-blue-900/50 p-4 rounded-xl text-blue-200 text-sm mb-4">
            <strong className="block text-blue-300 mb-1">Core message:</strong>
            Instead of putting a full processor on every pipe, HydroSense centralizes intelligence in one shared hub.
          </div>
          
          <div className="flex justify-between mb-4 pb-2 border-b border-[#1e293b]">
            <button onClick={() => setPlaying(!playing)} className={\px-4 py-1.5 rounded text-xs font-bold transition-all \\}>
              {playing ? 'Pause' : 'Play Sequence'}
            </button>
            <div className="text-slate-500 font-mono text-xs flex items-center">Stage {s}/9</div>
          </div>
          <div className="text-slate-400 text-sm mb-4 min-h-[40px]">
            {LEAK_STAGES[s-1].desc}
          </div>
'''
    code = code[:sIdx] + repl + code[eIdx:]
    code = code.replace('export default function LiveLeakAnimationPage', 'export default function Slide2')
    with open('src/pages/Slide2.jsx', 'w', encoding='utf-8') as f: f.write(code)
    print('Slide2 rewritten')
else:
    print('Indexes not found', sIdx, eIdx)
