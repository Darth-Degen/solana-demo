// pages/products/index.tsx
import type { GetServerSideProps, NextPage } from "next";
import { withPageShell, ProductsView } from "@components";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { qk, fetchProducts } from "@lib";

type Props = {};

const View: NextPage<Props> = () => {
  return <ProductsView />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: qk.products, queryFn: fetchProducts });
  return { props: { dehydratedState: dehydrate(qc) } as any };
};

export default withPageShell(
  View,
  {},
  {
    header: "sticky",
    seo: {
      title: "Products - Sandbox",
      description: "Browse products",
      url: "https://your-site.com/products",
    },
  }
);
