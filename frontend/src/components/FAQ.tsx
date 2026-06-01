"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  {
    q: "Is the AI verdict legally binding?",
    a: "Within the scope of the parties&apos; agreement, yes. When both parties sign onto FairDeal.ai arbitration, they enter a binding smart contract. The verdict is enforced automatically by the blockchain -no court order required. Many jurisdictions now recognize smart-contract-arbitrated outcomes under existing arbitration frameworks.",
  },
  {
    q: "What happens if a party refuses to participate?",
    a: "If the defendant ignores the arbitration, the plaintiff can proceed with a default verdict based on the evidence submitted. The escrow is released per the verdict. Non-participation doesn&apos;t stop enforcement -the smart contract executes regardless.",
  },
  {
    q: "How is the AI kept from being biased?",
    a: "FairDeal.ai uses GenLayer&apos;s strict equivalence consensus -multiple independent AI validators must reach byte-identical conclusions. A single biased model is mathematically unable to override the consensus. Verdicts are also challengeable for 7 days, triggering a fresh multi-panel review.",
  },
  {
    q: "Can verdicts be appealed to a human court?",
    a: "Parties can challenge an AI verdict within the 7-day challenge window. After the window closes, the verdict is final and the smart contract auto-executes. For complex cases, a hybrid mode with human oversight is available on enterprise plans.",
  },
  {
    q: "What types of disputes are supported?",
    a: "E-commerce, freelance contracts, SLA violations, B2B invoices, and general contract disputes. Each arbitration program defines its own dispute type classification. The AI adapts its reasoning to the contract category.",
  },
  {
    q: "What are the fees?",
    a: "Far less than traditional arbitration -typically a flat $0–$50 fee per dispute, funded by a small percentage of the escrow amount (set per arbitration program). No hidden costs, no hourly billing.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-dark">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Questions &{" "}
            <span className="gradient-text">Answers</span>
          </h2>
        </div>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="glass-card cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-sm font-medium text-gray-200 pr-4">
                    {item.q}
                  </h3>
                  <span className="text-xl text-gray-500 transition-transform shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
