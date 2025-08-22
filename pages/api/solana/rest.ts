// GET /api/solana/rest?path=/addresses/:address/balances&qs=key=val
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.HELIUS_API_KEY!;
const REST_BASE = "https://api.helius.xyz/v0";
const ALLOWED_PREFIXES = ["/addresses/", "/transactions", "/nft-events"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[API] /api/solana/rest hit with query:", req.query);


  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!API_KEY)
    return res.status(500).json({ error: "Missing HELIUS_API_KEY" });

  const path = req.query.path as string | undefined;
  console.log("[API] path =", path);

  if (!path || !ALLOWED_PREFIXES.some((p) => path.startsWith(p))) {
    return res.status(400).json({ error: "path not allowed" });
  }

  // Collect any qs parameters (each qs is "key=val")
  const passthrough = new URLSearchParams();
  const qs = req.query.qs;
  const qsList = Array.isArray(qs) ? qs : qs ? [qs] : [];
  for (const kv of qsList) {
    const [k, v] = (kv as string).split("=");
    if (k && v) passthrough.append(k, v);
  }
  passthrough.set("api-key", API_KEY);

  const upstreamUrl = `${REST_BASE}${path}?${passthrough.toString()}`;
  console.log("[API] forwarding to Helius:", upstreamUrl);

  const upstream = await fetch(upstreamUrl, { cache: "no-store" });
  const data = await upstream.json();

  console.log("[API] response status:", upstream.status);
  console.log("[API] response body:", JSON.stringify(data, null, 2).slice(0, 500)); 
  // log first 500 chars so your console isn't spammed

  return res.status(upstream.status).json(data);
}
