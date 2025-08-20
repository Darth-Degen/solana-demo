"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <div className="my-0 flex items-center gap-2 cursor-pointer">
      <Link href="/">
        <Image
          src="/images/logo.png"
          height={35}
          width={35}
          alt="Logo"
          priority
          className="transition-all duration-300 opacity-80 hover:opacity-100"
        />
      </Link>
    </div>
  );
};
export default Logo;
