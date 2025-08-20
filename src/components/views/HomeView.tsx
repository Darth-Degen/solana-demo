"use client";

import { SimpleReveal } from "@ui/animations";
import { CardWidget } from "@widgets";
import { FC } from "react";

interface Props {}

const LandingView: FC<Props> = (props: Props) => {
  const {} = props;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-24 gap-10">
      <SimpleReveal as="section">
        <div className="bg-bg text-fg border border-border rounded-xl p-6">
          <h1 className="text-2xl font-semibold">Home</h1>
          <p className="text-fg/70">This text dims correctly in both themes.</p>
          <SimpleReveal delay={0.05}>
            <button className="mt-3 inline-flex items-center rounded-lg bg-template-yellow/90 hover:bg-template-yellow px-3 py-2 text-template-black">
              Action
            </button>
          </SimpleReveal>
        </div>
      </SimpleReveal>

      <SimpleReveal delay={0.25} as="section">
        <div className="p-8">
          <CardWidget title="Sandbox Card">
            <p>This is inside the body of the card.</p>
          </CardWidget>
        </div>
      </SimpleReveal>
    </div>
  );
};

export default LandingView;
