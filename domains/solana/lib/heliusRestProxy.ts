// Client-side fetcher that calls your *server proxy*
// to get token + SOL balances from Helius without
// exposing the API key in the browser.

export const heliusBalances = async (address: string) => {
  // Build query string to tell your server proxy
  // which Helius REST path you want to hit.
  // Here: /addresses/{address}/balances
  const sp = new URLSearchParams();
  sp.set("path", `/addresses/${address}/balances`);

  // Call your own Next.js API route.
  // This hits /api/solana/rest on your server,
  // which appends the real Helius API key and
  // forwards the request to https://api.helius.xyz/v0/...
  const res = await fetch(`/api/solana/rest?${sp.toString()}`, { cache: "no-store" });

  // Throw if the server responded with an error status
  if (!res.ok) throw new Error("balances error");

  // Return the parsed JSON. This matches the shape
  // of Helius's balances endpoint response:
  //   - tokens[]: SPL token balances
  //   - nativeBalance: SOL balance (lamports)
  //   - totalUsd: optional USD total if Helius can price it
  return res.json() as Promise<{
    tokens: Array<{
      mint: string;
      amount: number;
      decimals: number;
      symbol?: string | null;
      name?: string | null;
      icon?: string | null;
    }>;
    nativeBalance: number;
    totalUsd?: number | null;
  }>;
};
