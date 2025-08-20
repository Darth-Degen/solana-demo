// lib/client/products.ts
import type { ApiOk, ApiError } from "@types";

export type Product = { id: string; name: string; price: number; description: string };

export const qk = {
  products: ["products"] as const,
  product: (id: string) => ["product", id] as const,
};

// GET /api/products -> { ok: true, items }
export const fetchProducts = async (): Promise<Product[]> => {
  const r = await fetch("/api/products", { cache: "no-store" });
  const json: ApiOk<{ items: Product[] }> | ApiError = await r.json();
  if ("ok" in json) return json.items;
  throw new Error(json.error ?? "Failed to load products");
};

// GET /api/products/:id -> { ok: true, product } | 404
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const r = await fetch(`/api/products/${id}`, { cache: "no-store" });
  if (r.status === 404) return null; // inline not-found UI
  const json: ApiOk<{ product: Product }> | ApiError = await r.json();
  if ("ok" in json) return json.product;
  throw new Error(json.error ?? "Failed to load product");
};

// POST /api/products
export const postProduct = async (body: Omit<Product, "id">): Promise<Product> => {
  const r = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json: ApiOk<{ product: Product }> | ApiError = await r.json();
  if ("ok" in json) return json.product;
  throw new Error(json.error ?? "Failed to create product");
};

// PATCH /api/products/:id
export const patchProduct = async (id: string, patch: Partial<Omit<Product, "id">>) => {
  const r = await fetch(`/api/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const json = await r.json();
  if ("ok" in json) return json.product as Product;
  throw new Error(json.error ?? "Failed to update product");
};

// DELETE /api/products/:id
export const destroyProduct = async (id: string) => {
  const r = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (r.status === 204) return true;
  const json = await r.json();
  throw new Error(json?.error ?? "Failed to delete product");
};
