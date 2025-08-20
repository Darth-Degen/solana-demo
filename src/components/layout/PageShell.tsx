"use client";
import { useLayoutEffect, useRef, type CSSProperties, type FC } from "react";
import { Footer, SeoHead } from "@components";
import type { PageShellProps } from "@types";
import { pageVariants } from "@constants";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";

const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

// Small helper: observe an element and call onSize() on changes
function observeSize(el: Element, onSize: () => void) {
  const ro = new ResizeObserver(() => onSize());
  ro.observe(el);
  return () => ro.disconnect();
}

type VarStyle = CSSProperties & {
  ["--header-h"]?: string;
  ["--footer-h"]?: string;
  ["--header-pad"]?: string;
};

const PageShell: FC<PageShellProps> = ({
  children,
  footer = true,
  seo,
  padForHeader,
  mainClassName,
  className,
}) => {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const footerBoxRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();

  // Measure #site-header + footer wrapper and set CSS vars on the shell
  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const header = document.getElementById("site-header");
    const footerBox = footerBoxRef.current;

    const apply = () => {
      const headerH = header?.getBoundingClientRect().height ?? 0;
      const footerH = footerBox?.getBoundingClientRect().height ?? 0;

      shell.style.setProperty("--header-h", `${Math.round(headerH)}px`);
      shell.style.setProperty("--footer-h", `${Math.round(footerH)}px`);
      shell.style.setProperty(
        "--header-pad",
        padForHeader ? `${Math.round(headerH)}px` : "0px"
      );
    };

    // initial
    apply();

    // watch size changes
    const cleanups: Array<() => void> = [];
    if (header) cleanups.push(observeSize(header, apply));
    if (footerBox) cleanups.push(observeSize(footerBox, apply));

    // also react to window resizes
    const onResize = () => apply();
    window.addEventListener("resize", onResize);

    // fonts/images can shift layout a bit after mount
    const t1 = setTimeout(apply, 0);
    const t2 = setTimeout(apply, 250);

    return () => {
      cleanups.forEach((fn) => fn());
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [padForHeader, footer]);

  return (
    <>
      {seo ? <SeoHead {...seo} /> : null}
      {/* App shell */}
      <div
        ref={shellRef}
        style={
          {
            // safe defaults to avoid flash on first paint
            "--header-h": "0px",
            "--footer-h": "0px",
            "--header-pad": "0px",
          } as VarStyle
        }
        className="w-full"
      >
        <main
          id="page-main"
          className={cx(
            // key part: fill viewport minus header & footer; can shrink after tall pages
            "flex w-full flex-1 min-h-0 flex-col overflow-x-clip bg-page",
            "min-h-[calc(100dvh-var(--header-h)-var(--footer-h))]",
            // if header overlays content (absolute / animate), push content down
            "pt-[var(--header-pad)]",
            className,
            mainClassName
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={router.asPath}
              variants={pageVariants(prefersReducedMotion)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Wrap footer so we can measure its box without modifying the Footer component */}
        <div ref={footerBoxRef}>{footer !== false && <Footer />}</div>
      </div>
    </>
  );
};

export default PageShell;
