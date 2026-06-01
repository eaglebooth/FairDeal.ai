"use client";

import { motion } from "framer-motion";

const LINKS = [
  {
    title: "Product",
    items: ["How It Works", "Features", "Use Cases", "Pricing"],
  },
  {
    title: "Resources",
    items: ["Documentation", "API Reference", "Smart Contract", "Audit Report"],
  },
  {
    title: "Legal",
    items: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  },
];

const SOCIALS = ["𝕏", "⌘ Discord", "💬 Telegram", "📺 YouTube"];

export default function Footer() {
  return (
    <footer className="py-16 bg-dark-section border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold gradient-text mb-3">FairDeal.ai</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Autonomous AI arbitration on GenLayer. Fair, fast, immutable.
            </p>
          </div>
          {LINKS.map((group, gi) => (
            <div key={gi}>
              <h4 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FairDeal.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
