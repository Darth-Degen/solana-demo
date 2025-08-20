// In-memory “DB” for demos; swap with real DB
export type Product = { id: string; name: string; price: number; description: string };
const store = new Map<string, Product>();

// seed a few
["101","102","103"].forEach((id, i) =>
  store.set(id, { id, name: `Item ${id}`, price: 25 + i * 10, description: "Demo product" })
);

export const listProducts = async (): Promise<Product[]> => Array.from(store.values());
export const getProduct = async (id: string): Promise<Product | null> => store.get(id) ?? null;
export const createProduct = async (p: Omit<Product, "id">): Promise<Product> => {
  const id = String(Date.now());
  const prod: Product = { id, ...p };
  store.set(id, prod);
  return prod;
};
export const updateProduct = async (id: string, patch: Partial<Omit<Product, "id">>): Promise<Product | null> => {
  const cur = store.get(id);
  if (!cur) return null;
  const next = { ...cur, ...patch };
  store.set(id, next);
  return next;
};
export const deleteProduct = async (id: string): Promise<boolean> => store.delete(id);
