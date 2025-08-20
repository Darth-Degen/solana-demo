"use client";
import type { ComponentProps } from "react";
import { FiMenu } from "react-icons/fi"; // Feather (react-icons)

// Props match react-icons' IconBaseProps, allowing size, title, etc.
export type MenuIconProps = ComponentProps<typeof FiMenu>;

const MenuIcon = ({ className, ...rest }: MenuIconProps) => {
  return (
    <FiMenu
      aria-hidden
      className={[
        "w-8 h-8 text-gray-300 hover:text-white transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
};

export default MenuIcon;
