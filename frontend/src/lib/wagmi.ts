import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_GENLAYER_RPC || "https://rpc.genlayer.com"
    ),
  },
});

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x6dcf80A443656511df3c78819CA951DA4AA24f46";
