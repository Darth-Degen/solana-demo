import { Tag, WIVProps } from "@types";
import { useReducedMotion, motion } from "framer-motion";

/** WhileInViewReveal — animates when the element enters the viewport */
const WhileInViewReveal = <T extends Tag = "div">({
  children,
  as,
  y = 16,
  duration = 0.45,
  delay = 0,
  once = true,
  margin = "-10% 0px -10% 0px",
  ...rest
}: WIVProps<T>) => {
  const reduced = useReducedMotion();
  const Component: any = motion(as ?? "div");
  return (
    <Component
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default WhileInViewReveal;
