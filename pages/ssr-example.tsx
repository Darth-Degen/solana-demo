// pages/ssr-time.tsx
import type { GetServerSideProps, NextPage } from "next";
import { withPageShell } from "@components";

type Props = { time: string };

const View: NextPage<Props> = ({ time }) => (
  <div className="container mx-auto max-w-xl py-12">
    <h1 className="text-2xl font-semibold">SSR Time</h1>
    <p className="mt-2">Rendered at: {time}</p>
  </div>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: { time: new Date().toISOString() },
});

export default withPageShell(
  View,
  /* shellProps */ {},
  /* pageOptions */ {
    header: "sticky",
    seo: { title: "SSR Time", description: "Server-rendered timestamp." },
  }
);
