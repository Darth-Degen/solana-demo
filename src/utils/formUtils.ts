// formUtils.ts
import { Mode } from "@types";

/**
 * Simple conditional className combiner.
 */
export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tailwind class mappings for light/dark modes.
 * Uses template tokens if present.
 */
export function stylesFor(mode: Mode) {
  const isDark = mode === "dark";
  return {
    label: cn("text-sm font-medium", isDark ? "text-template-white" : "text-template-black"),
    description: cn("text-xs", isDark ? "text-template-white/80" : "text-template-black/40"),
    inputBase: cn(
      "w-full rounded px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-offset-0",
      isDark
        ? cn(
            "bg-template-black text-template-white placeholder:text-template-white/60",
            "border-white/20 focus:ring-template-yellow focus:border-template-yellow"
          )
        : cn(
            "bg-template-white text-template-black placeholder:text-template-black/50",
            "border-black/10 focus:ring-template-yellow focus:border-template-yellow"
          )
    ),
    checkbox: cn(
      "h-4 w-4 rounded border inline-block align-middle",
      isDark ? "border-white/30 bg-template-black" : "border-black/20 bg-template-white",
      "focus:outline-none focus:ring-2 focus:ring-template-yellow"
    ),
    checkboxLabel: cn("text-sm", isDark ? "text-template-white" : "text-template-black"),
    disabled: "opacity-60 cursor-not-allowed",
  } as const;
}
