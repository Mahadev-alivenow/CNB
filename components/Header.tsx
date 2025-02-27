"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation links - replace with your actual links
  const navLinks = [
    { href: "/", label: "" },
    { href: "/understanding-influence", label: "Understanding Influence" },
    { href: "/navigating-influence", label: "Navigating Influence" },
    { href: "/truth-about-drugs", label: "Truth About Drugs" },
    { href: "/events", label: "Events" },
  ];






  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#03000A] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button - hidden on medium and larger screens */}
            <button
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Logo - centered on mobile, left-aligned on larger screens */}
            <Link href="/" className="text-xl font-bold text-white md:ml-0">
              UNINFLUENCED
            </Link>

            {/* Navigation for medium and desktop screens */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Spacer for mobile, hidden on larger screens */}
            <div className="w-6 md:hidden" />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
