// pages/index.tsx
import { HomeView, withPageShell } from "@components";

export default withPageShell(
  HomeView,
  /* shellProps */ {
    /* mainClassName?: "..." */
  },
  /* pageOptions */ {
    header: "sticky",
    seo: {
      title: "Home - Sandbox Portfolio",
      description: "A demo by Sandbox.",
      url: "https://addurl.xyz/about",
    },
  }
);
