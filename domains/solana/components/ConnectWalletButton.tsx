"use client";

import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";

const short = (pk?: PublicKey | string | null) => {
  if (!pk) return "";
  const address = typeof pk === "string" ? pk : pk.toBase58();
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
};

type Props = {
  className?: string; // optional Tailwind/CSS overrides
  connectedClassName?: string;
};

const ConnectWalletButton = ({
  className = "bg-purple-600 hover:bg-purple-700 transition-200 text-white w-[160px] h-[42px] rounded font-semibold transition disabled:opacity-60 text-sm",
  connectedClassName = "bg-zinc-800 hover:bg-zinc-700 transition-200 text-white w-[160px] h-[42px] rounded font-medium text-sm",
}: Props) => {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const onClick = useCallback(() => {
    if (connected) {
      void disconnect();
    } else {
      // Open the built-in modal to choose a wallet
      setVisible(true);
    }
  }, [connected, disconnect, setVisible]);

  const label = connecting
    ? "Connecting…"
    : connected
    ? short(publicKey || undefined)
    : "Connect Wallet";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={connecting}
      aria-label="Connect Solana wallet"
      className={connected ? connectedClassName : className}
    >
      {label}
    </button>
  );
};

export default ConnectWalletButton;
