"use client";

import { AlignJustify, ArrowRightIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { inter } from "../assets/fonts/fonts";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className={`flex items-center justify-between w-full px-5 lg:px-8 py-5 bg-transparent ${inter.className}`}
    >
      {/* Logo */}
      <Link
        href={"/"}
        className={`flex items-center gap-2.5 group`}
      >
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
          <BookOpenIcon
            className="text-white group-hover:scale-110 transition-transform duration-300"
            size={30}
          />
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          MyNotebook
        </h1>
      </Link>
      <button className="lg:hidden">
        <AlignJustify color="white" size={30} />
      </button>
      {!pathname.includes("/auth") && (
        <>
          <div className="hidden lg:flex items-center gap-2.5">
            <Link className="nav-link" href={"#"}>
              Home
            </Link>
            <Link className="nav-link" href={"#"}>
              Features
            </Link>
            <Link className="nav-link" href={"#"}>
              Pricing
            </Link>
            <Link className="nav-link" href={"#"}>
              About
            </Link>
            <Link className="nav-link" href={"#"}>
              Contact
            </Link>
          </div>
          <div className="lg:flex items-center gap-4 hidden">
            <Link
              href={"/auth/login"}
              className="px-7 py-2.5 text-white rounded-full border border-white/40 hover:bg-white/10 transition font-semibold text-base"
            >
              Login
            </Link>
            <Link
              className="flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-white text-surface-800 font-semibold transition-all hover:bg-white/90 text-base"
              href={"/auth/get-started"}
            >
              <h1>Get Started</h1>
              <ArrowRightIcon size={20} />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
