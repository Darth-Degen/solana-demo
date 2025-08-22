// src/domains/solana/lib/format.ts

/**
 * Shorten a Solana address for display.
 * e.g. short("9xQeWvG816bUx9EP...", 4) -> "9xQe…EP..."
 */
export const shortAddress = (addr: string, n = 4) =>
  `${addr.slice(0, n)}…${addr.slice(-n)}`;

/**
 * Format lamports into human-readable SOL string.
 * Defaults to 4 decimal places, or "—" if null/undefined.
 */
export const formatSOL = (n?: number | null) =>
  n == null ? "—" : `${n.toFixed(4)} SOL`;

/**
 * Generic number formatter for token amounts.
 * Shows more decimals if balance < 1.
 */
export const formatAmount = (amount: number) => {
  const d = Math.abs(amount) < 1 ? 6 : 4;
  return amount.toLocaleString(undefined, { maximumFractionDigits: d });
};

// Convert a raw SPL token amount into display units using decimals
export const toDisplayAmount = (amount: number, decimals: number) =>
  amount / Math.pow(10, decimals);

// Format a token amount nicely (more decimals if < 1)
export const formatTokenAmount = (amount: number) => {
  const d = Math.abs(amount) < 1 ? 6 : 4;
  return amount.toLocaleString(undefined, { maximumFractionDigits: d });
};

