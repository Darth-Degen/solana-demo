// pages/products/[id].tsx
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NumberInput, Textarea, TextInput, withPageShell } from "@components";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  qk,
  fetchProductById,
  patchProduct,
  destroyProduct,
  ProductUpdateSchema,
} from "@lib";
import { Product } from "@types";
import toast from "react-hot-toast";

type Props = { id: string };

const View: NextPage<Props> = ({ id }) => {
  const qc = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: qk.product(id),
    queryFn: () => fetchProductById(id),
  });

  const [draft, setDraft] = useState<Product | null>(product ?? null);

  useEffect(() => {
    if (product) setDraft(product);
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: (patch: Partial<Omit<Product, "id">>) =>
      patchProduct(id, patch),
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: qk.product(id) });
      const prev = qc.getQueryData<Product | null>(qk.product(id)) ?? null;
      if (prev)
        qc.setQueryData<Product | null>(qk.product(id), { ...prev, ...patch });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk.product(id), ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.product(id) });
      qc.invalidateQueries({ queryKey: qk.products });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => destroyProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.products });
      setDraft(null);
    },
  });

  if (isLoading)
    return <div className="container mx-auto max-w-2xl py-12">Loading…</div>;
  if (error)
    return (
      <div className="container mx-auto max-w-2xl py-12 text-red-500">
        {(error as Error).message}
      </div>
    );

  if (!product || !draft) {
    // Inline not-found UI (no global 404)
    return (
      <div className="container mx-auto max-w-2xl py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 opacity-80">It may have been removed.</p>
        <div className="mt-6">
          <Link href="/products" className="underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const onSave = async () => {
    // validate with zod before mutating
    const parsed = ProductUpdateSchema.safeParse({
      name: draft.name,
      price: draft.price,
      description: draft.description,
    });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid input";
      toast.error(msg);
      return;
    }

    await toast.promise(updateMutation.mutateAsync(parsed.data), {
      loading: "Saving…",
      success: "Saved ✓",
      error: (e) => (e as Error)?.message ?? "Failed to save",
    });
  };

  const onDelete = async () => {
    // optional confirm()
    // if (!confirm("Delete this product?")) return;

    await toast.promise(deleteMutation.mutateAsync(), {
      loading: "Deleting…",
      success: "Deleted ✓",
      error: (e) => (e as Error)?.message ?? "Failed to delete",
    });
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 space-y-6">
      <Link href="/products" className="text-sm underline opacity-80">
        ← Back to Products
      </Link>

      <h1 className="text-3xl font-semibold">Edit product</h1>

      {/* Name */}
      <TextInput
        label="Name"
        placeholder="e.g. Atlas Hoodie"
        value={draft.name}
        onValueChange={(v) => setDraft({ ...draft, name: v })}
        debounceMs={150}
        mode="dark"
      />

      {/* Price */}
      <NumberInput
        label="Price"
        description="Enter a non-negative amount"
        min={0}
        value={draft.price}
        onValueChange={(n) =>
          setDraft({ ...draft, price: typeof n === "number" ? n : 0 })
        }
        clamp
        debounceMs={100}
        mode="dark"
      />

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Describe the product…"
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        autoResize
        debounceMs={150}
        rows={4}
        mode="dark"
      />

      <div className="flex gap-3 pt-2">
        <button
          onClick={onSave}
          disabled={updateMutation.isPending}
          className="w-[75px]rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {updateMutation.isPending ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onDelete}
          disabled={deleteMutation.isPending}
          className="w-[90px] rounded border px-4 py-2 disabled:opacity-60"
        >
          {deleteMutation.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const id = String(params?.id ?? "");
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: qk.product(id),
    queryFn: async () => {
      const { getProduct } = await import("@lib");
      return (await getProduct(id)) ?? null;
    },
  });

  return { props: { id, dehydratedState: dehydrate(qc) } as any };
};

export default withPageShell(
  View,
  {},
  {
    header: "sticky",
    seo: {
      title: `Product`,
      description: "Product detail",
    },
  }
);
