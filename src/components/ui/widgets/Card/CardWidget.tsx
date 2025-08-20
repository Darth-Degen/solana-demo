import { ReactNode } from "react";
import { CardHeader, CardBody } from "@widgets";

export type CardWidgetProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function CardWidget({ title, children, className }: CardWidgetProps) {
  return (
    <div
      className={`rounded-2xl border border-border shadow-sm bg-card ${
        className ?? ""
      }`}
    >
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
    </div>
  );
}
