import React from "react";
import { MacbookScroll } from "../ui/macbook-scroll";
import Link from "next/link";
import Image from "next/image";

export function Macbook() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={<span></span>}
        badge={
          <Link href="https://peerlist.io/manuarora">
            <Image alt="logo" src="/logo.svg" height={50} width={50} />
          </Link>
        }
        src={`/macbook.svg`}
        showGradient={false}
      />
    </div>
  );
}
