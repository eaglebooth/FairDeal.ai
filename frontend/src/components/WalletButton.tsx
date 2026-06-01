"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-xs text-gray-400 font-mono">
          {address.slice(0, 6)}...{address.slice(-4)} · {chain?.name}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 rounded-xl text-xs font-medium border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {connectors.map((c) => (
        <button
          key={c.id}
          onClick={() => connect({ connector: c })}
          disabled={isPending}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/25 transition-all disabled:opacity-50"
        >
          {isPending ? "Connecting..." : c.name}
        </button>
      ))}
    </div>
  );
}
