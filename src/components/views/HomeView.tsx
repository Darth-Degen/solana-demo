"use client";

import { SimpleReveal, Reveal } from "@ui/animations";
import { CardWidget, PortfolioList, WalletCard } from "@widgets";
import { FC } from "react";

interface Props {}

const LandingView: FC<Props> = (props: Props) => {
  const {} = props;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5 lg:p-16 gap-10">
      <Reveal
        as="section"
        y={14}
        duration={0.5}
        className="w-full flex flex-col-reverse lg:flex-row justify-between gap-10"
      >
        <PortfolioList />
        <WalletCard />
      </Reveal>
    </div>
  );
};

export default LandingView;
