import { MotionProps } from "framer-motion";
import { JSX, ReactNode } from "react";

export type Mode = "light" | "dark";
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type Tag = keyof JSX.IntrinsicElements;

export type RevealProps<T extends Tag = "div"> = {
  children: ReactNode;
  as?: T;
  y?: number; // Y offset in px
  duration?: number; // animation duration
  delay?: number; // animation delay
  opacityOnly?: boolean; // if true, ignores Y motion
  ease?: MotionProps["transition"] extends infer TTx
    ? TTx extends { ease?: infer E }
      ? E
      : never
    : never;
} & Omit<React.ComponentPropsWithoutRef<T>, "children">;

export type WIVProps<T extends Tag = "div"> = {
  children: React.ReactNode;
  as?: T;
  y?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  margin?: string; // rootMargin
} & Omit<React.ComponentPropsWithoutRef<T>, "children">;

export type BaseProps<T extends Tag = "div"> = {
  children: React.ReactNode;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "children">;