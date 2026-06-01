"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-[100px] animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-blue/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue" />
          </span>
          <span className="text-xs font-medium text-gray-300 tracking-wide">
            Powered by GenLayer Blockchain
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="block text-white">Autonomous AI Arbitration</span>
          <span className="block gradient-text mt-2">On Every Dispute.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-10"
        >
          Smart contracts that read the internet, analyze evidence with AI, and
          automatically resolve disputes - no lawyers, no middlemen, no waiting
          30 days for a chargeback.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="#cta"
            className="px-8 py-3.5 rounded-xl text-base font-semibold bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/30 transition-all"
          >
            Start Resolving
          </a>
          <a
            href="#architecture"
            className="px-8 py-3.5 rounded-xl text-base font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors"
          >
            Read Docs
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm text-gray-500"
        >
          Trusted by GenLayer validators &nbsp;·&nbsp;
          <span className="text-gray-400">50+ AI Validators</span> &nbsp;·&nbsp;
          <span className="text-gray-400">Sub-second Consensus</span> &nbsp;·&nbsp;
          <span className="text-gray-400">Immutable Verdicts</span>
        </motion.p>

        {/* Mockup card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="glass-card p-6 md:p-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-500">DISPUTE #0042</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/20">
                VERDICT: RELEASE
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="text-white font-medium">VERDICT_REACHED</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full w-full" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Confidence</span>
                <span className="text-white font-mono">9/10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Escrow</span>
                <span className="text-white font-mono">2,500 USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Remedy</span>
                <span className="text-green-400 font-medium">RELEASE_TO_DEFENDANT</span>
              </div>
            </div>
            <div className="mt-5 p-3 rounded-lg bg-white/5 border border-white/8 font-mono text-xs text-gray-400">
              &gt; AI verdict: &quot;Defendant delivered product per contract §3.2.
              Plaintiff claim unfounded.&quot;
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
