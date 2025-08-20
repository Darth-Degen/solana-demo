import { ReactNode } from "react";

export const CardBody = ({ children }: { children: ReactNode }) => (
  <div className="col-centered p-4 text-fg min-h-[100px]">{children}</div>
);
