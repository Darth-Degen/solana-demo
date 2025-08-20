"use client";
import { FC, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  Variants,
} from "framer-motion";
import { HeaderContent } from "@components";

export type HeaderMode = "absolute" | "sticky" | "animate" | "hidden";

interface Props {
  header?: HeaderMode;
  height?: number;
  className?: string;
  reserveSpace?: boolean;
}

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const Header: FC<Props> = ({
  header = "sticky",
  height = 104,
  className,
  reserveSpace = true,
}) => {
  const [show, setShow] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef<number | undefined>(undefined);
  const { scrollY, scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const DELTA = 30;
  const TOP_PROGRESS = 0.08;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setAtTop(p < TOP_PROGRESS);
    if (p < TOP_PROGRESS) setShow(true);
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    if (lastYRef.current === undefined) {
      lastYRef.current = y;
      return;
    }
    const last = lastYRef.current;
    if (y > last && y - last > DELTA) {
      setShow(false);
      lastYRef.current = y;
      return;
    }
    if (y < last && last - y > DELTA) {
      setShow(true);
      lastYRef.current = y;
    }
  });

  const variants: Variants = {
    show: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: 0.06, duration: 0.32, ease: "easeInOut" },
    },
    hidden: {
      y: -height,
      opacity: 0.98,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.28, ease: "easeInOut" },
    },
  };

  const positionClasses =
    header === "absolute"
      ? "absolute top-0 left-0 w-full"
      : header === "sticky"
      ? "sticky top-0 w-full"
      : header === "animate"
      ? "fixed top-0 left-0 w-full"
      : "hidden";

  if (header === "hidden") return null;
  return (
    <header
      id="site-header"
      className={cx(
        "z-10 transition-shadow duration-300",
        atTop ? "shadow-none" : "shadow-sm",
        positionClasses,
        className
      )}
    >
      {header === "animate" ? (
        <motion.div
          variants={variants}
          initial="show"
          animate={show ? "show" : "hidden"}
          style={{ willChange: "transform" }}
        >
          <HeaderContent />
        </motion.div>
      ) : (
        <HeaderContent />
      )}
      {/* Spacer for animated header */}
      {header === "animate" && reserveSpace && (
        <div aria-hidden className="w-full" style={{ height }} />
      )}
    </header>
  );
};

export default Header;
