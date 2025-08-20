"use client";
import React from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { Tag, RevealProps } from "@types";

/**
 * Reveal — flexible enter animation for any HTML tag.
 */
const Reveal = <T extends Tag = "div">({
  children,
  as,
  y = 8,
  duration = 0.35,
  delay = 0,
  opacityOnly = false,
  ease = "easeOut",
  ...rest
}: RevealProps<T>) => {
  const reduced = useReducedMotion();
  const Component: any = motion(as ?? "div");

  const initial = {
    opacity: 0,
    y: reduced || opacityOnly ? 0 : y,
  };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration, ease, delay } as MotionProps["transition"];

  return (
    <Component
      initial={initial}
      animate={animate}
      transition={transition}
      {...rest}
    >
      {children}
    </Component>
  );
};
export default Reveal;
