"use client";
import React, { useMemo, useEffect } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import type { Umi } from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";

const UmiContext = React.createContext<Umi | null>(null);
export const useUmi = () => {
  const ctx = React.useContext(UmiContext);
  if (!ctx) throw new Error("useUmi must be used within <UmiProvider>");
  return ctx;
};

export function UmiProvider({
  endpoint,
  children,
}: {
  endpoint: string;
  children: React.ReactNode;
}) {
  const wallet = useWallet();
  const umi = useMemo(() => createUmi(endpoint), [endpoint]);

  useEffect(() => {
    // Attach the connected Wallet Adapter to Umi as identity & payer.
    umi.use(walletAdapterIdentity(wallet));
  }, [wallet, umi]);

  return <UmiContext.Provider value={umi}>{children}</UmiContext.Provider>;
}
