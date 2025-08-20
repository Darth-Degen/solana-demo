"use client";
import React, { FC, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, Reveal, WhileInViewReveal } from "@animations";
import { staggerChild, staggerParent } from "@constants";

/* ------------------------------------------------
 * Demo View
 * ------------------------------------------------ */
const AnimationsDemo: FC = () => {
  const [filter, setFilter] = useState<"all" | "odd" | "even">("all");
  const cards = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);
  const filtered = useMemo(() => {
    if (filter === "all") return cards;
    if (filter === "odd") return cards.filter((n) => n % 2 === 1);
    return cards.filter((n) => n % 2 === 0);
  }, [cards, filter]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-14">
      {/* Page header */}
      <Reveal as="header" y={14} duration={0.5} className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Animation Templates Demo
        </h1>
        <p className="text-muted-foreground">
          A grab - bag of reusable Framer Motion patterns for Next.js +
          TypeScript.
        </p>
      </Reveal>

      {/* Section: Reveal controls */}
      <section className="space-y-6">
        <FadeIn as="h2" className="text-xl font-semibold">
          1) Reveal with adjustable y & duration
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal
            className="rounded-2xl border p-4 shadow-sm bg-white/70"
            y={24}
            duration={0.6}
          >
            <strong>Card A</strong>
            <p className="text-sm text-muted-foreground">y=24, duration=0.6</p>
          </Reveal>
          <Reveal
            className="rounded-2xl border p-4 shadow-sm bg-white/70"
            y={-18}
            duration={0.4}
          >
            <strong>Card B</strong>
            <p className="text-sm text-muted-foreground">
              y=-18 (slides down), duration=0.4
            </p>
          </Reveal>
          <Reveal
            className="rounded-2xl border p-4 shadow-sm bg-white/70"
            y={0}
            duration={0.35}
            opacityOnly
          >
            <strong>Card C</strong>
            <p className="text-sm text-muted-foreground">opacityOnly</p>
          </Reveal>
        </div>
      </section>

      {/* Section: FadeIn only */}
      <section className="space-y-4">
        <FadeIn as="h2" className="text-xl font-semibold">
          2) FadeIn (opacity only)
        </FadeIn>
        <FadeIn className="rounded-2xl border p-6 shadow-sm bg-white/70">
          <p>Clean, minimal fade with adjustable duration and delay.</p>
        </FadeIn>
      </section>

      {/* Section: WhileInViewReveal */}
      <section className="space-y-4">
        <FadeIn as="h2" className="text-xl font-semibold">
          3) WhileInViewReveal (scroll into view)
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2">
          <WhileInViewReveal
            className="rounded-2xl border p-6 bg-white/70 shadow-sm"
            y={24}
          >
            <p>Animates once when scrolled into view (y=24).</p>
          </WhileInViewReveal>
          <WhileInViewReveal
            className="rounded-2xl border p-6 bg-white/70 shadow-sm"
            y={-24}
            duration={0.55}
          >
            <p>Also supports negative y and custom duration.</p>
          </WhileInViewReveal>
        </div>
      </section>

      {/* Section: Staggered list */}
      <section className="space-y-4">
        <FadeIn as="h2" className="text-xl font-semibold">
          4) Staggered list/grid
        </FadeIn>
        <motion.ul
          variants={staggerParent}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map(
            (label) => (
              <motion.li
                key={label}
                variants={staggerChild}
                className="rounded-xl border p-3 bg-white/70 shadow-sm text-center"
              >
                {label}
              </motion.li>
            )
          )}
        </motion.ul>
      </section>

      {/* Section: Hover/Tap (micro‑interactions) + Spring card */}
      <section className="space-y-4">
        <FadeIn as="h2" className="text-xl font-semibold">
          5) Hover/Tap + Spring
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="rounded-xl border px-5 py-3 bg-white shadow-sm text-left"
          >
            <div className="font-medium">Interactive Button</div>
            <div className="text-sm text-muted-foreground">
              Hover grows, tap compresses.
            </div>
          </motion.button>

          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="rounded-xl border p-4 bg-white/70 shadow-sm"
          >
            <div className="font-medium">Spring Card</div>
            <p className="text-sm text-muted-foreground">
              Uses spring physics for a slightly bouncy entrance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section: Layout animations (auto‑animate on reflow) */}
      <section className="space-y-4">
        <FadeIn as="h2" className="text-xl font-semibold">
          6) Layout animations
        </FadeIn>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border px-3 py-1 text-sm ${
              filter === "all" ? "bg-black text-white" : "bg-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("odd")}
            className={`rounded-full border px-3 py-1 text-sm ${
              filter === "odd" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Odd
          </button>
          <button
            onClick={() => setFilter("even")}
            className={`rounded-full border px-3 py-1 text-sm ${
              filter === "even" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Even
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
        >
          {filtered.map((n) => (
            <motion.div
              key={n}
              layout
              className="rounded-xl border p-4 bg-white/70 shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              Card {n}
            </motion.div>
          ))}
        </motion.div>

        <p className="text-sm text-muted-foreground">
          Click the filters to see items reflow smoothly via <code>layout</code>
          .
        </p>
      </section>
    </div>
  );
};

export default AnimationsDemo;
