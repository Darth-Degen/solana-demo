"use client";
import type { NextPageWithOptions, PageOptions } from "@types";
import { PageShell } from "@components";
import type { PageShellProps } from "@types";
const withPageShell = <P extends Record<string, unknown>>(
  View: NextPageWithOptions<P>,
  shellProps: Partial<PageShellProps> = {},
  pageOptions: Partial<PageOptions> = {}
) => {
  const Wrapped: NextPageWithOptions<P> = (props: P) => {
    const header = pageOptions.header ?? View.header ?? "sticky";
    const footer = pageOptions.footer ?? View.footer ?? true;
    const seo = pageOptions.seo ?? View.seo;

    const padForHeader = shellProps.padForHeader ?? header === "animate";

    return (
      <PageShell
        footer={footer}
        seo={seo}
        padForHeader={padForHeader}
        className={shellProps.className}
        mainClassName={shellProps.mainClassName}
      >
        <View {...props} />
      </PageShell>
    );
  };

  Wrapped.displayName = `withPageShell(${
    (View as any).displayName || (View as any).name || "Page"
  })`;

  // Surface/override static page options (_app can still read these)
  Wrapped.seo = pageOptions.seo ?? View.seo;
  Wrapped.header = pageOptions.header ?? View.header;
  Wrapped.footer = pageOptions.footer ?? View.footer;

  return Wrapped;
};

export default withPageShell;
