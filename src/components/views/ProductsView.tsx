import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextInput, NumberInput, Textarea } from "@components"; // adjust if your paths differ
import { qk, fetchProducts, postProduct, ProductCreateSchema } from "@lib";
import type { Product } from "@types";
import toast from "react-hot-toast";

const ProductsView = () => {
  const qc = useQueryClient();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: qk.products,
    queryFn: fetchProducts,
  });

  // local draft for new product
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const createMutation = useMutation({
    mutationFn: (input: Omit<Product, "id">) => postProduct(input),
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: qk.products });
      setName("");
      setPrice(null);
      setDescription("");
      toast.success(`Created “${created.name}”`);
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to create product");
    },
  });

  const onCreate = async () => {
    const parsed = ProductCreateSchema.safeParse({ name, price, description });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      toast.error(msg);
      return;
    }

    await toast.promise(createMutation.mutateAsync(parsed.data), {
      loading: "Creating product…",
      success: "Product created",
      error: (e) => (e as Error)?.message ?? "Failed to create product",
    });
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 space-y-10">
      <h1 className="text-3xl font-semibold">Products</h1>

      {/* Create form */}
      <div className="space-y-4 rounded border p-4">
        <h2 className="text-xl font-medium">Create new product</h2>

        <TextInput
          label="Name"
          placeholder="e.g. Atlas Hoodie"
          value={name}
          onValueChange={setName}
          mode="dark"
        />

        <NumberInput
          label="Price"
          description="Enter a non-negative amount"
          min={0}
          value={price ?? ""}
          onValueChange={(n) => setPrice(n)}
          integerOnly
          clamp
          mode="dark"
        />

        <Textarea
          label="Description"
          placeholder="Describe the product…"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // immediate update (works with your Textarea)
          autoResize
          rows={4}
          mode="dark"
        />

        <button
          type="button"
          onClick={onCreate}
          disabled={createMutation.isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {createMutation.isPending ? "Creating…" : "Create"}
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <p>Loading products…</p>
      ) : error ? (
        <p className="text-red-500">{(error as Error).message}</p>
      ) : !products?.length ? (
        <p>No products yet.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded border p-3"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm opacity-80">${p.price}</p>
              </div>
              <Link href={`/products/${p.id}`} className="underline">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsView;
