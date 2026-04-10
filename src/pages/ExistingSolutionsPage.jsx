export default function ExistingSolutionsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <p className="text-lg text-slate-300 mb-8 max-w-3xl">
        Many available systems were mainly developed for metal-pipe conditions.
        Jordan mostly uses plastic pipes — which changes everything.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Existing solutions */}
        <div className="rounded-2xl border border-[#3a1a00] bg-[#0f0800] p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <h3 className="text-2xl font-black text-orange-400">Typical Existing Solutions</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: '🔩',
                title: 'Metal-pipe oriented',
                desc: 'Designed and tested mainly on metal infrastructure where acoustic signals travel well',
              },
              {
                icon: '💰',
                title: 'Expensive imported devices',
                desc: 'High unit cost makes it hard to deploy at many sensing points without large budgets',
              },
              {
                icon: '📍',
                title: 'One unit per sensing point',
                desc: 'Each location typically needs its own standalone device, limiting dense coverage',
              },
              {
                icon: '🚚',
                title: 'Harder to deploy densely',
                desc: 'The cost per point makes wide-area coverage economically difficult for many utilities',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#1a0800] border border-[#3a1500]"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-bold text-orange-300 text-base">{item.title}</div>
                  <div className="text-slate-400 text-sm mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jordan reality */}
        <div className="rounded-2xl border border-[#003a20] bg-[#00100a] p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <h3 className="text-2xl font-black text-emerald-400">Jordan's Reality</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: '🧪',
                title: 'Plastic pipes',
                desc: "Most of Jordan's distribution network uses plastic pipe, which is common in the region",
              },
              {
                icon: '📉',
                title: 'More signal damping',
                desc: 'Plastic absorbs and scatters acoustic energy far more than metal, making sound harder to detect',
              },
              {
                icon: '🗺️',
                title: 'Need multiple sensing points',
                desc: 'Good coverage requires many points in the network, making per-unit cost critical',
              },
              {
                icon: '🏗️',
                title: 'Need local hub monitoring',
                desc: 'A shared-hub approach that covers several channels at once is far more practical here',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#001a0a] border border-[#003a20]"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-bold text-emerald-300 text-base">{item.title}</div>
                  <div className="text-slate-400 text-sm mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap summary */}
      <div className="rounded-2xl border border-[#0d2a4a] bg-[#040f1f] p-7">
        <h3 className="text-xl font-bold text-[#00d4ff] mb-5">The Key Gap</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: 'Acoustic damping',
              detail: 'Plastic pipes absorb leak sounds faster than metal — sensors must work harder',
              color: '#f97316',
            },
            {
              label: 'Cost per point',
              detail: 'Dense deployment of single-device systems becomes too expensive at scale',
              color: '#fbbf24',
            },
            {
              label: 'Local conditions',
              detail: "Systems designed for other markets may not match Jordan's pipe materials and network layout",
              color: '#a78bfa',
            },
          ].map((g) => (
            <div key={g.label} className="p-5 rounded-xl bg-[#071525] border border-[#0d2a4a]">
              <div className="text-xl font-black mb-2" style={{ color: g.color }}>{g.label}</div>
              <div className="text-sm text-slate-400 leading-relaxed">{g.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
