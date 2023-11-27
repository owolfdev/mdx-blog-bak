"use client";
import { useState } from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const NavComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo and Nav elements */}
      <div className="sm:flex gap-6 items-center hidden">
        <div className="font-bold text-2xl tracking-tight">
          <Link href="/">MDX Blog</Link>
        </div>
        <nav>
          <Link href="/about">about</Link>
        </nav>
      </div>

      {/* Hamburger Menu Icon */}
      <button onClick={toggleMenu} className="sm:hidden">
        <HamburgerMenuIcon className="w-[32px] h-[32px]" />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-4 items-start sm:hidden">
          <Link href="/about">about</Link>
          {/* Add other mobile navigation links here */}
        </nav>
      )}
    </div>
  );
};

export default NavComponent;
