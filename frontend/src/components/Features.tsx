"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🌐",
    title: "Native Web Access",
    desc: "AI jurors read any URL directly on-chain. No oracles, no off-chain relays. Evidence fetched from the blockchain itself.",
  },
  {
    icon: "🧠",
    title: "Subjective AI Reasoning",
    desc: "LLM-powered analysis understands context, nuance, and commercial intent. Not just binary code - actual reasoning.",
  },
  {
    icon: "⚡",
    title: "Optimistic Democracy",
    desc: "Multiple AI validators reach byte-identical consensus via strict equivalence. Slashing prevents collusion.",
  },
  {
    icon: "🔒",
    title: "Non-Custodial Escrow",
    desc: "Funds locked in smart contract, not controlled by any party. Atomic execution guarantees outcome enforcement.",
  },
  {
    icon: "🚫",
    title: "Zero Bias Mediation",
    desc: "No human arbitrator with conflicts of interest. No platform taking sides to retain customers. Pure algorithmic neutrality.",
  },
  {
    icon: "🔁",
    title: "Challengeable Verdicts",
    desc: "7-day challenge window. Disputed verdicts trigger multi-panel AI re-evaluation. Quality assurance built in.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 bg-dark-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for the{" "}
            <span className="gradient-text">Post-Trust Era</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="glass-card glass-card-hover p-7 h-full">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
