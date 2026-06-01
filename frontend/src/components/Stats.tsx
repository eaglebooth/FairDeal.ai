const STATS = [
  { value: "99.7%", label: "Consensus Accuracy" },
  { value: "< 30s", label: "Average Resolution Time" },
  { value: "$0", label: "No Middleman Fees" },
  { value: "100%", label: "On-Chain Immutable" },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-dark-section border-y border-white/8">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-mono gradient-text mb-2">
                {s.value}
              </div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
