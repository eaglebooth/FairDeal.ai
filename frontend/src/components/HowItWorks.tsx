"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Submit Dispute",
    desc: "Lock funds in smart escrow. Upload contract text, communication logs, and evidence URLs. Both parties agree to AI arbitration.",
    note: "gl.Contract.create_dispute()",
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "GenLayer validators fetch all evidence via web.get(). AI reads contracts, analyzes evidence, applies commercial law standards, and reaches consensus verdict.",
    note: "gl.eq_principle.strict_eq(run_evaluation)",
  },
  {
    num: "03",
    title: "Auto-Execute",
    desc: "Smart contract automatically releases funds per verdict. No appeals to human courts. No waiting. The blockchain enforces the outcome.",
    note: "execute_verdict() → treasury ledger",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            From Dispute to Verdict{" "}
            <span className="gradient-text">in 3 Steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="glass-card glass-card-hover p-8 h-full">
                {/* Step number */}
                <div className="text-6xl font-bold gradient-text opacity-40 mb-6 leading-none">
                  {step.num}
                </div>
                {/* Icon placeholder */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mb-5 text-xl">
                  {["📝", "🧠", "⚡"][i]}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-4">{step.desc}</p>
                <code className="block text-xs font-mono text-accent-blue/70 bg-white/5 rounded-lg px-3 py-2">
                  {step.note}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
