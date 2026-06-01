"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-32 bg-dark-section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-blue/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[100px]" />
      </div>

      <div className="max-w-[800px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to leave{" "}
            <span className="gradient-text">slow, biased arbitration</span> behind?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-[560px] mx-auto">
            Join the waitlist for early access. Be first in line when
            FairDeal.ai launches on GenLayer mainnet.
          </p>

          {submitted ? (
            <div className="glass-card p-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-semibold mb-2">You&apos;re on the list!</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll reach out when early access opens.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all active:scale-95"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
