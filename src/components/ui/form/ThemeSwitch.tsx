"use client";
import { Switch } from "@components";
import { useTheme } from "@hooks";
import { useEffect, useState, type FC } from "react";

/**
 * ThemeSwitch — toggles Tailwind light/dark using our useTheme() hook.
 * Uses the Switch you provided; styles the control based on the *resolved* mode.
 */
const ThemeSwitch: FC = () => {
  const { isDark, setTheme, isHydrated } = useTheme("dark");

  // Extra guard so the first client render matches the server
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 1) On server: renders the placeholder below (since mounted=false)
  // 2) On client's first render: still renders the same placeholder (mounted=false)
  // 3) After effect: mounted=true -> real switch renders (now safe)
  if (!mounted || !isHydrated) {
    return <div className="h-6 w-20 rounded-full bg-white/10" aria-hidden />;
  }

  return (
    <div className="row-centered gap-2">
      <p className="text-xs">Light</p>
      <Switch
        checked={isDark}
        onCheckedChange={(on: boolean) => setTheme(on ? "dark" : "light")}
        mode={isDark ? "dark" : "light"}
        aria-label="Toggle dark mode"
        className="select-none"
      />
      <p className="text-xs">Dark</p>
    </div>
  );
};

export default ThemeSwitch;
