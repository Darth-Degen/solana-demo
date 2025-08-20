"use client";
import { JSX, type FC, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements; // e.g., 'div', 'section'
};

const SimpleReveal: FC<Props> = ({ children, delay = 0, as = "div" }) => {
  const Component = motion(as);
  const reduced = useReducedMotion();

  return (
    <Component
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </Component>
  );
};

export default SimpleReveal;
