import { NavPage } from "@types";

export const PAGES: NavPage[] = [
  { name: "Home", path: "/", showInFooter: true },
  // hidden pages
  { name: "About", path: "/about", showInHeader: false, showInFooter: false },
  { name: "Products", path: "/products", showInHeader: false, showInFooter: false },
  { name: "SSR Example", path: "/ssr-example", showInHeader: false, showInFooter: false },
  { name: "Privacy", path: "/privacy", showInFooter: false },
];