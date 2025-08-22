// Generic JSON-RPC fetcher that calls Helius using the
// "secure" RPC URL (no API key in query string).
// You can safely expose NEXT_PUBLIC_HELIUS_SECURE_RPC to the client
// because it’s already a pre-authorized endpoint from Helius.

export const rpc = async <T,>(
  method: string, // e.g. "getBalance", "sendTransaction"
  params: unknown[] | object // the RPC params array or object
): Promise<T> => {
  const url = process.env.NEXT_PUBLIC_HELIUS_SECURE_RPC!;

  // JSON-RPC 2.0 request body
  const body = {
    jsonrpc: "2.0",
    id: "rq", // arbitrary request id
    method,
    params: Array.isArray(params) ? params : [params], // normalize to array
  };

  // POST the request to Helius RPC
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store", // don't let Next.js cache this
  });

  // Parse the response
  const json = await res.json();

  // Throw on error (HTTP or JSON-RPC error)
  if (!res.ok || json?.error)
    throw new Error(json?.error?.message ?? "rpc error");

  // Return the "result" field typed as T
  return json.result as T;
};

// ---------- convenience wrappers ----------

// Fetch SOL balance (lamports) for a given address.
// Calls `getBalance` with "confirmed" commitment.
export const getBalance = (address: string) =>
  rpc<{ value: number }>("getBalance", [
    address,
    { commitment: "confirmed" },
  ]).then((r) => r.value); // unwrap the .value field

// Broadcast a signed transaction (base64).
// Uses skipPreflight=false and waits for "confirmed" commitment.
export const sendRawTx = (b64: string) =>
  rpc<string>("sendTransaction", [
    b64,
    { skipPreflight: false, preflightCommitment: "confirmed" },
  ]);
