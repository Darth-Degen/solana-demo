import { BaseProps, Tag } from "@types";
import { motion } from "framer-motion";

const FadeIn = <T extends Tag = "div">({
  children,
  as,
  duration = 0.35,
  delay = 0,
  ease = "easeOut",
  ...rest
}: BaseProps<T> & { duration?: number; delay?: number; ease?: any }) => {
  const Component: any = motion(as ?? "div");

  return (
    <Component
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
