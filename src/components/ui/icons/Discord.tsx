"use client";
import { FC, SVGProps } from "react";
import { FaDiscord } from "react-icons/fa";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  url?: string;
}
const DiscordIcon: FC<Props> = (props: Props) => {
  const { color = "white", size = 30, url = "" } = props;
  return (
    <a
      href="https://discord.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discord"
      className="hover:text-white transition-colors"
    >
      <FaDiscord className="w-5 h-5" />
    </a>
  );
};

export default DiscordIcon;
