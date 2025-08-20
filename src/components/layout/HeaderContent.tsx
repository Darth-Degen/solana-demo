"use client";
import { FC } from "react";
import { Logo, Menu, ThemeSwitch } from "@components";
import { PAGES } from "@constants";
import Link from "next/link";
import { ConnectWalletButton } from "@domains-solana";

const HeaderContent: FC = () => {
  return (
    <div className="h-[80px] md:h-[100px] w-full flex items-center justify-between px-4 md:px-10 py-4 z-20 bg-bg">
      <Logo />
      <div className="flex items-center justify-end gap-4 md:gap-8 w-full">
        <div className="hidden md:flex items-center gap-6">
          {/* Desktop-only menu items can be added here */}
          {PAGES.filter((p) => p.showInHeader).map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="text-fg hover:text-gray-300 transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </div>
        <ConnectWalletButton />
        <ThemeSwitch />
        {/* Only renders on mobile */}
        <Menu />
      </div>
    </div>
  );
};

export default HeaderContent;
