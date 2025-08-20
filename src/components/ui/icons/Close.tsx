"use client";
import type { ComponentProps } from "react";
import { FiX } from "react-icons/fi"; // Feather (react-icons)

// Props match react-icons' IconBaseProps (accepts size, title, etc.)
export type CloseIconProps = ComponentProps<typeof FiX>;

const CloseIcon = ({ className, ...rest }: CloseIconProps) => {
  return (
    <FiX
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

export default CloseIcon;
