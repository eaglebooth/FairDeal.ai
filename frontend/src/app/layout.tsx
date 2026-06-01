import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { config } from "@/lib/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Web3Provider";
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
  title: "FairDeal.ai - Autonomous AI Arbitration on GenLayer",
  description:
    "Smart contracts that read the internet, analyze evidence with AI, and automatically resolve disputes - no lawyers, no middlemen, no waiting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <Web3Provider>
          <Navbar />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
