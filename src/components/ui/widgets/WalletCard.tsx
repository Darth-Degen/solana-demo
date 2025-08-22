"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useBalanceQuery, shortAddress, formatSOL } from "@domains-solana";

const WalletCard = () => {
  // read the currently connected wallet
  const { publicKey, connected } = useWallet();
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  // fetch SOL balance using React Query + your RPC fetcher
  const { data, isLoading, isFetching, isError, refetch } =
    useBalanceQuery(address);

  return (
    <div className="rounded-2xl border p-4 shadow-sm flex items-center justify-between w-[260px]">
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-fg/70">Wallet</div>
        <div className="text-lg font-medium truncate">
          {connected && address ? shortAddress(address) : "Not connected"}
        </div>

        {/* balance row */}
        {connected && (
          <div className="mt-1 text-sm text-fg/50">
            {isLoading
              ? "Loading SOL…"
              : isError
              ? "Error loading balance"
              : formatSOL(data?.sol)}
          </div>
        )}
      </div>

      {/* manual refresh keeps UI snappy without over-polling */}
      <button
        className="text-sm rounded-xl border px-3 py-1 disabled:opacity-60 w-[100px]"
        onClick={() => refetch()}
        disabled={isFetching || !connected}
      >
        {isFetching ? "Refreshing…" : "Refresh"}
      </button>
    </div>
  );
};

export default WalletCard;
