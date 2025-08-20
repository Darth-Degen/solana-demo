"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC, ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
  href: string;
  disabled?: boolean;
  isExternal?: boolean; // optional override; will be inferred if omitted
  delayMs?: number; // default 300ms
  onClick?: (e: MouseEvent<HTMLElement>) => void; // typically used to close the menu
}

const isExternalHref = (href: string) =>
  /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

const NavItem: FC<Props> = ({
  children,
  href,
  disabled = false,
  isExternal,
  delayMs = 300,
  onClick,
}) => {
  const router = useRouter();
  const external = isExternal ?? isExternalHref(href);
  const isCurrent = router.pathname === href;

  if (disabled) {
    return (
      <div className="flex gap-2 justify-center items-center">
        <div className="opacity-0">
          <Image src="/images/arrow.png" alt="arrow" width={14} height={22} />
        </div>
        <div className="py-5 opacity-10 cursor-default">{children}</div>
      </div>
    );
  }

  // External link: call onClick (to close menu), then let the browser navigate immediately
  if (external) {
    return (
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        onClick={(e) => {
          onClick?.(e as any);
        }}
      >
        <Item isCurrent={isCurrent}>{children}</Item>
      </a>
    );
  }

  // Internal link: call onClick FIRST (close menu), then after delay route via router.push
  const handleInternalClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let the parent close the menu first
    onClick?.(e as any);

    // Respect modified clicks (new tab/window) or non-left clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return; // allow default behavior
    }

    // If the parent prevented default, respect it
    if (e.defaultPrevented) return;

    // Otherwise prevent the immediate navigation and delay it
    e.preventDefault();

    // Avoid pushing if we're already on this route
    if (router.pathname === href) return;

    window.setTimeout(() => {
      router.push(href);
    }, delayMs);
  };

  return (
    <Link href={href} onClick={handleInternalClick} prefetch>
      <Item isCurrent={isCurrent}>{children}</Item>
    </Link>
  );
};

interface ItemProps {
  children: ReactNode;
  isCurrent: boolean;
}
const Item: FC<ItemProps> = ({ children, isCurrent }) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div
        className={[
          "transition-colors duration-300 my-5 p-0 font-bold",
          isCurrent
            ? "text-gray-600 cursor-default"
            : "text-gray-400 hover:text-white cursor-pointer",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
};

export default NavItem;
