"use client";

import Image from "next/image";
import { FC, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { formatAmount, shortAddress, useTokensQuery } from "@domains-solana";

const PortfolioList: FC = () => {
  const { publicKey, connected } = useWallet();
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  // fetch token balances via your server-proxied Helius REST
  const { data: tokens, isLoading, isError } = useTokensQuery(address);

  if (!connected)
    return (
      <div className="text-sm text-gray-500">
        Connect a wallet to see tokens.
      </div>
    );
  if (isLoading) return <div className="text-sm">Loading tokens…</div>;
  if (isError)
    return <div className="text-sm text-red-600">Error loading tokens.</div>;
  if (!tokens?.length)
    return <div className="text-sm text-gray-500">No tokens found.</div>;

  return (
    <div className="rounded-2xl border overflow-hidden">
      <div className="p-3 text-sm text-gray-500">Tokens</div>
      <ul className="divide-y">
        {tokens.map((t) => (
          <li key={t.mint} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {/* token icon or placeholder */}
              {t.icon ? (
                <Image
                  src={t.icon}
                  alt={t.symbol ?? t.mint}
                  width={24}
                  height={24}
                  className="rounded"
                />
              ) : (
                <div className="w-6 h-6 rounded bg-gray-200" />
              )}

              {/* symbol / name */}
              <div className="text-sm font-medium truncate">
                {t.symbol ?? "Unknown"}{" "}
                <span className="text-gray-400">{`(${shortAddress(
                  t.mint,
                  4
                )})`}</span>
              </div>
            </div>

            {/* amount (already decimal-adjusted) */}
            <div className="text-sm tabular-nums">{formatAmount(t.amount)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;
