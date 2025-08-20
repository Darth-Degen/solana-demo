import { PAGES } from "@constants";
import { DiscordIcon, TwitterIcon } from "@ui/icons";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-6 py-12 md:px-8 w-full bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <span className="text-sm">
            © {new Date().getFullYear()} Sandbox Studio
          </span>
        </div>

        {/* Middle: navigation links from config */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          {PAGES.filter((p) => p.showInFooter).map((page) => (
            <Link key={page.path} href={page.path}>
              {page.name}
            </Link>
          ))}
        </nav>

        {/* Right side: social icons */}
        <div className="flex items-center gap-3">
          <DiscordIcon />
          <TwitterIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
