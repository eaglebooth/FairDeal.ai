"use client";

import { motion } from "framer-motion";

const USE_CASES = [
  {
    icon: "🛒",
    title: "E-Commerce Disputes",
    desc: "Buyer claims 'item not as described'. AI reads product listing, delivery proof, communication. Verdict in seconds.",
    example: '{"breach_by":"DEFENDANT","remedy":"FULL_REFUND","confidence":9}',
  },
  {
    icon: "💼",
    title: "Freelance Contract Breach",
    desc: "Client vs freelancer over scope, quality, or delivery. AI reads project brief, submitted work URL, git history.",
    example: '{"breach_by":"PLAINTIFF","remedy":"PARTIAL_REFUND","refund_percentage":40}',
  },
  {
    icon: "☁️",
    title: "SaaS SLA Violations",
    desc: "Downtime disputes, feature delivery misses. AI reads SLA terms, monitoring data, support tickets.",
    example: '{"breach_by":"DEFENDANT","remedy":"PARTIAL_REFUND","refund_percentage":25}',
  },
  {
    icon: "🏢",
    title: "B2B Invoice Disputes",
    desc: "Payment disputes between businesses. AI reads contracts, invoices, delivery confirmations, correspondence.",
    example: '{"breach_by":"BOTH","remedy":"PENALTY_DAMAGES","refund_percentage":15}',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-32 bg-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            Use Cases
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Any Dispute, Any Contract,{" "}
            <span className="gradient-text">Anywhere</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="glass-card glass-card-hover p-7 h-full">
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{uc.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {uc.desc}
                    </p>
                    <div className="code-block p-3 text-xs text-gray-500 overflow-x-auto">
                      {uc.example}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
