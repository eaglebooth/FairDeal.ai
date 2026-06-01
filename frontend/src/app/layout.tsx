import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FairDeal.ai -Autonomous AI Arbitration on GenLayer",
  description:
    "Smart contracts that read the internet, analyze evidence with AI, and automatically resolve disputes -no lawyers, no middlemen, no waiting 30 days for a chargeback.",
  keywords: [
    "AI arbitration",
    "GenLayer",
    "smart contract",
    "dispute resolution",
    "e-commerce",
    "freelance",
    "blockchain",
    "autonomous",
    "web3",
  ],
  openGraph: {
    title: "FairDeal.ai -Autonomous AI Arbitration on GenLayer",
    description:
      "Lock funds in escrow. Submit evidence URLs. AI validators reach consensus verdict. Smart contract auto-executes. Fair, fast, immutable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
