"use client";

import { motion } from "framer-motion";

const CODE_SNIPPET = `@gl.public.write
def arbitrate_dispute(self, contract_url, evidence_urls):
  def evaluate() -> str:
    # Fetch evidence from URLs on-chain
    contract = gl.nondet.web.get(contract_url)
    evidence = [gl.nondet.web.get(u) for u in evidence_urls]

    # Build arbitration prompt
    prompt = build_arbitration_prompt(contract, evidence)
    return gl.nondet.exec_prompt(prompt)

  # Consensus: all validators must agree
  verdict = gl.eq_principle.strict_eq(evaluate)
  return json.loads(verdict)`;

export default function Architecture() {
  return (
    <section id="architecture" className="py-32 bg-dark-section">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            Under The Hood
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Powered by{" "}
            <span className="gradient-text">GenLayer&apos;s Intelligent Contracts</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: description */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              FairDeal.ai runs as a{" "}
              <span className="text-white font-medium">
                GenLayer Intelligent Contract
              </span>{" "}
              - a smart contract with native access to the internet and LLM
              reasoning.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Unlike traditional smart contracts that only manipulate on-chain
              state, GenLayer contracts can call <code className="text-accent-blue">web.get()</code> to
              fetch evidence from any URL, then run an LLM arbitrator via{" "}
              <code className="text-accent-blue">exec_prompt()</code>. The
              verdict is produced by multiple validator nodes that must reach
              byte-identical consensus via{" "}
              <code className="text-accent-blue">strict_eq</code>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              The result: an arbitration process that is faster than court,
              cheaper than lawyers, and more trustworthy than any centralized
              platform - enforced by immutable smart contract code.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-3">
              {["GenVM Runtime", "Python Contracts", "AI Validator Network"].map(
                (b, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-xs font-mono text-gray-400"
                  >
                    {b}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: code display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="code-block p-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-600 font-mono">
                  FairDeal.py
                </span>
              </div>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                <code>{CODE_SNIPPET}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
