import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import Architecture from "@/components/Architecture";
import Comparison from "@/components/Comparison";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <UseCases />
      <Architecture />
      <Comparison />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
