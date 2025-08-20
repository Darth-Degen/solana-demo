// pages/api/products/[id].ts
import {
  deleteProduct,
  getProduct,
  getSessionEmail,
  rateLimit,
  updateProduct,
  ProductUpdateSchema
} from "@lib";
import type { NextApiRequest, NextApiResponse } from "next"; 
import { ApiOk, ApiError } from "@types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiOk<any> | ApiError>
) => {
  const id = String(req.query.id ?? "");
  if (!id) return res.status(400).json({ error: "Missing id" });

  const ip =
    (req.headers["x-forwarded-for"] as string) ??
    req.socket.remoteAddress ??
    "unknown";
  const { allowed } = rateLimit(`product:${id}:${ip}`);
  if (!allowed) return res.status(429).json({ error: "Rate limit exceeded" });

  if (req.method === "GET") {
    const product = await getProduct(id);
    if (!product) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ ok: true, product });
  }

  if (req.method === "PATCH") {
    const user = getSessionEmail(req.headers.cookie ?? null);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const parse = ProductUpdateSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.message });

    const updated = await updateProduct(id, parse.data);
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ ok: true, product: updated });
  }

  if (req.method === "DELETE") {
    const user = getSessionEmail(req.headers.cookie ?? null);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const ok = await deleteProduct(id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PATCH, DELETE");
  return res.status(405).json({ error: "Method Not Allowed" });
};

export default handler;
