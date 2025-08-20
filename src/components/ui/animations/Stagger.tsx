import { FC, ReactNode } from "react";

const Stagger: FC<{ children: ReactNode; gap?: number }> = ({
  children,
  gap = 0.06,
}) => <div data-stagger-gap={gap}>{children}</div>;

export default Stagger;

/**
 * Stagger — helper to wrap a group of children and stagger their delay.
 * Example:
 *   {items.map((item, i) => (
 *     <Reveal key={i} delay={i * 0.06}>{item}</Reveal>
 *   ))}
 */
