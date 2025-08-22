
export type HeliusClient = {
  rpcUrl: string;
  restBase: string;
  jsonRpc: <T>(method: string, params: unknown[] | object) => Promise<T>;
  rest: <T>(
    path: string,
    search?: Record<string, string | number | boolean | undefined>
  ) => Promise<T>;
  getBalance: (address: string) => Promise<number>;
  getTokenBalances: (address: string) => Promise<{
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
  getAssetsByOwner: (ownerAddress: string, limit?: number) => Promise<any[]>;
  getParsedTransactions: (address: string, before?: string) => Promise<any[]>;
};