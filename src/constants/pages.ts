import { NavPage } from "@types";

export const PAGES: NavPage[] = [
  { name: "Home", path: "/", showInFooter: true },
  { name: "About", path: "/about", showInHeader: true, showInFooter: true },
  { name: "Products", path: "/products", showInHeader: true, showInFooter: true },
  { name: "SSR Example", path: "/ssr-example", showInHeader: false, showInFooter: false },
  { name: "Form", path: "/form", showInHeader: true, showInFooter: true },
  { name: "Privacy", path: "/privacy", showInFooter: true },
];