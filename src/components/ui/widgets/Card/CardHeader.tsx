import { ReactNode } from "react";

export const CardHeader = ({ children }: { children: ReactNode }) => (
  <div className="px-4 py-2 border-b border-border bg-card font-semibold text-accent">
    {children}
  </div>
);
