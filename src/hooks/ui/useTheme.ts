"use client";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "@hooks";

export type Theme = "light" | "dark";
const THEME_KEY = "theme";

/**
 * Minimal light/dark theme hook using Tailwind's `dark` class and localStorage.
 * - Persists the user's choice in localStorage
 * - Applies/removes the `dark` class on <html>
 * - Exposes `isHydrated` to avoid SSR mismatch flashes
 */
export function useTheme(defaultTheme: Theme = "dark") {
  const { value: theme, set: setTheme, isHydrated } = useLocalStorage<Theme>(THEME_KEY, defaultTheme);
  const isDark = theme === "dark";

  // Apply Tailwind dark class
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Helper to toggle between light/dark
  const toggle = useMemo(() => () => setTheme((t) => (t === "dark" ? "light" : "dark")), [setTheme]);

  return { theme, setTheme, isDark, toggle, isHydrated } as const;
}
