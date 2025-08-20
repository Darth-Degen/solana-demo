// pages/api/products/index.ts
import { rateLimit, listProducts, getSessionEmail, createProduct, ProductCreateSchema } from "@lib";
import type { NextApiRequest, NextApiResponse } from "next"; 
import { ApiOk, ApiError } from "@types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiOk<any> | ApiError>
) => {
  const ip =
    (req.headers["x-forwarded-for"] as string) ??
    req.socket.remoteAddress ??
    "unknown";
  const { allowed, remaining } = rateLimit(`products:${ip}`);
  res.setHeader("X-RateLimit-Remaining", String(remaining));
  if (!allowed) return res.status(429).json({ error: "Rate limit exceeded" });

  if (req.method === "GET") {
    const data = await listProducts();
    return res.status(200).json({ ok: true, items: data });
  }

  if (req.method === "POST") {
    const user = getSessionEmail(req.headers.cookie ?? null);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const parse = ProductCreateSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.message });

    const created = await createProduct(parse.data);
    return res.status(201).json({ ok: true, product: created });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method Not Allowed" });
};

export default handler;
