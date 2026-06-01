"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Stats", href: "#stats" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold gradient-text tracking-tight"
        >
          FairDeal.ai
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("#cta")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/25 transition-shadow"
          >
            Launch App
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-section/95 backdrop-blur-xl border-b border-white/8">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-base text-gray-300 hover:text-white py-2"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#cta")}
              className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-accent-blue to-accent-purple text-white"
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
