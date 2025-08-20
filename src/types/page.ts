// Shared app types
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { PropsWithChildren } from "react";

// --------------------------------------------------
// Unions
// --------------------------------------------------
export type HeaderMode = "sticky" | "animate" | "hidden"; 

// --------------------------------------------------
// SEO payload for <SeoHead />
// --------------------------------------------------
export interface PageSEO {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}

// --------------------------------------------------
// Per-page static options (attached to page components)
// --------------------------------------------------
export type PageOptions = {
  /** Show footer (default: true) */
  footer?: boolean;
  /** Header behavior (default: 'absolute') */
  header?: HeaderMode; 
  /** Optional SEO config for this page */
  seo?: PageSEO;
};

// Next.js page type extended with our options
export type NextPageWithOptions<P = {}, IP = P> = NextPage<P, IP> & PageOptions;

// AppProps where Component carries our options
export type AppPropsWithOptions = AppProps & { Component: NextPageWithOptions };

// --------------------------------------------------
// Navigation config
// --------------------------------------------------
export type NavPage = {
  name: string;
  path: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
};

// --------------------------------------------------
// Page shell props (Header → Main → Footer wrapper)
// --------------------------------------------------
export type PageShellProps = PropsWithChildren<{
  /** Header behavior for this page (default: 'sticky') */
  header?: HeaderMode;
  /** Show footer (default: true). Set false to hide */
  footer?: boolean;
  /** If provided, renders <SeoHead /> */
  seo?: PageSEO;
  /** Add top padding when header overlays content (absolute / animate) */
  padForHeader?: boolean;
  /** Extra classes for outer wrapper */
  className?: string;
  /** Extra classes for <main> */
  mainClassName?: string;
}>;
