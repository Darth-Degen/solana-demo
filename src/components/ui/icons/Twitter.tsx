"use client";
import { FC, SVGProps } from "react";
import { FaTwitter } from "react-icons/fa";
interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
  url?: string;
}

const TwitterIcon: FC<Props> = (props: Props) => {
  const { color = "white", size = 35, url = "" } = props;
  return (
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="hover:text-white transition-colors"
    >
      <FaTwitter className="w-5 h-5" />
    </a>
  );
};

export default TwitterIcon;
