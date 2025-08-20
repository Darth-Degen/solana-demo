import { Variants, easeInOut } from "framer-motion"; 

//template animations 
export const pageVariants = (prefersReducedMotion: boolean | null): Variants => ({
  initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0, y: prefersReducedMotion ? 0 : -6,
    transition: { duration: 0.2, ease: "easeIn" },
  },
});

export const staggerParent: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

//click animations
export const largeClickAnimation = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 1 },
};
export const midClickAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 1 },
  transition: { duration: 0.25, ease: [easeInOut] },
};
export const smallClickAnimation = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
};

export const linkClickAnimation = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 1 },
};

//tap animations
export const tapAnimation = {
  whileTap: { scale: 0.97 },
};

//opacity animations
export const exitAnimation = {
  initial: { opacity: 0 }, 
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.7, ease: [easeInOut] },
};
export const midExitAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [easeInOut] },
};
export const fastExitAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [easeInOut] },
};
export const vFastExitAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.05, ease: [easeInOut] },
};

export const enterAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.4, ease: [easeInOut] },
};

export const midEnterAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, ease: [easeInOut] },
};
export const fastEnterAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: [easeInOut] },
};

export const scaleExitAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.4, ease: [easeInOut] },
};
//variants
export const arrowVariants: Variants = {
  start: {
    rotate: 0,
    transition: {
      duration: 0.4,
    },
  },
  end: {
    rotate: 180,
    transition: {
      duration: 0.4,
    },
  },
};

//background
export const backgroundAnimations = {
  whileHover: { backgroundColor: "#f87171" },
  whileTap: { backgroundColor: "#f87171" },
  transition: { duration: 0.4, ease: [easeInOut] },
};

//dropdown
export const dropdownAnimations: Variants = {
  hidden: { y: -25, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      // delay: 0.5,
      staggerChildren: 0.1,
      ease: [easeInOut],
    },
  },
};
export const dropdownItemsAnimations = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
  transition: {
    duration: 0.4,
    ease: [easeInOut],
    type: "spring",
    stiffness: 300,
    damping: 24,
  },
};

export const fadeVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  open: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
};

export const menuAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [easeInOut] },
  whileHover: { scale: 1.06 },
  whileTap: { scale: 1 },
};

export const slideDown = (animate: boolean) => ({
  initial: { y: -300, opacity: 0 },
  animate: { y: animate ? 0 : -300, opacity: animate ? 1 : 0 },
  transition: { duration: 1.5, ease: [easeInOut] },
});

export const slideUp = (animate: boolean) => ({
  initial: { y: 300, opacity: 0 },
  animate: { y: animate ? 0 : 300, opacity: animate ? 1 : 0 },
  transition: { duration: 1.5, ease: [easeInOut] },
});
export const slideLeft = (animate: boolean) => ({
  initial: { x: 300, opacity: 0 },
  animate: { x: animate ? 0 : 300, opacity: animate ? 1 : 0 },
  transition: { duration: 1.5, ease: [easeInOut] },
});
export const slideRight = (animate: boolean) => ({
  initial: { x: -300, opacity: 0 },
  animate: { x: animate ? 0 : -300, opacity: animate ? 1 : 0 },
  transition: { duration: 1.5, ease: [easeInOut] },
});

export const imageLoadAnimation = (animate: boolean) => ({
  initial: { opacity: 0 },
  animate: { opacity: animate ? 1 : 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [easeInOut] },
})

export const imageSlideAnimation = (
  animate: boolean,
  delay?: number,
  direction?: string
) => ({
  initial: { x: direction === "right" ? -0 : 0, opacity: 0.75 },
  animate: { x: animate ? 0 : 0, opacity: 1 },
  exit: { x: -40 },
  transition: { duration: 0.15, ease: [easeInOut], delay: delay ?? 0 },
});

export const imageDropAnimation = (
  animate: boolean,
  delay?: number,
) => ({
  initial: { y: -40, opacity: 0.25 },
  animate: { y: animate ? -20 : 0, opacity: 1 },
  eyit: { x: -40 },
  transition: { duration: 0.45, ease: [easeInOut], delay: delay ?? 0 },
});