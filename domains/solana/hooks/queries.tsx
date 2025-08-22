// Lightweight React Query wrappers around your fetchers.
// No setup/initialization shown — assumes QueryClientProvider is already wired.

import { useQuery } from "@tanstack/react-query";
import { getBalance, heliusBalances } from "@domains-solana";

// Get SOL balance (lamports + derived SOL) for a wallet address.
export const useBalanceQuery = (address?: string) =>
  useQuery({
    queryKey: ["balance", address], // cache key: one per address
    enabled: !!address, // don't run until we have an address
    // call your RPC helper; throws if network error
    queryFn: async () => {
      if (!address) throw new Error("no address");
      const lamports = await getBalance(address);
      return {
        lamports,
        sol: lamports / 1_000_000_000, // convert to SOL for display
      };
    },
    staleTime: 15_000, // balance can be a little fresh
    refetchOnWindowFocus: false,
  });

// Get SPL token balances via Helius REST (through your server proxy).
export const useTokensQuery = (address?: string) =>
  useQuery({
    queryKey: ["tokens", address],
    enabled: !!address,
    queryFn: async () => {
      if (!address) throw new Error("no address");
      const r = await heliusBalances(address);
      console.log("[Hook] token array length:", r.tokens?.length);
      // Helius Enhanced returns decimal-adjusted `amount`
      return r.tokens;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
