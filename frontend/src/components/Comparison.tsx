"use client";

import { motion } from "framer-motion";

const ROWS = [
  { label: "Arbitration Time", traditional: "30–90 days", fairdeal: "< 30 seconds" },
  { label: "Cost", traditional: "$200–$5,000+", fairdeal: "$0–$50 flat fee" },
  { label: "Bias Risk", traditional: "Human / institutional", fairdeal: "Deterministic AI consensus" },
  { label: "Enforcement", traditional: "Court judgment required", fairdeal: "Smart contract auto-executes" },
  { label: "Evidence Handling", traditional: "Paper / PDF upload", fairdeal: "Any URL fetched on-chain" },
  { label: "Transparency", traditional: "Sealed proceedings", fairdeal: "Fully on-chain immutable" },
  { label: "Appeal Path", traditional: "Years of appeals", fairdeal: "7-day challenge window" },
  { label: "Jurisdiction", traditional: "Single country", fairdeal: "Borderless, global" },
  { label: "Availability", traditional: "Business hours", fairdeal: "24/7/365" },
];

export default function Comparison() {
  return (
    <section id="comparison" className="py-32 bg-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            Comparison
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Traditional Arbitration vs{" "}
            <span className="gradient-text">FairDeal.ai</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-5 px-4 text-sm font-medium text-gray-400 w-1/3" />
                <th className="py-5 px-4 text-sm font-semibold text-gray-500 w-1/3">
                  Traditional
                </th>
                <th className="py-5 px-4 text-sm font-semibold gradient-text w-1/3">
                  FairDeal.ai
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-b border-white/5"
                >
                  <td className="py-5 px-4 text-sm text-gray-400">{r.label}</td>
                  <td className="py-5 px-4 text-sm text-gray-500 text-center">
                    {r.traditional}
                  </td>
                  <td className="py-5 px-4 text-sm text-white text-center font-medium">
                    {r.fairdeal}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
