"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation links - replace with your actual links
  const navLinks = [
    // { href: "/", label: "" },
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
              <div className=" p-8 flex justify-center items-center">
                <h1 className="text-white font-bold text-[5.5vw] sm:text-lg  uppercase tracking-wider space-x-1">
                  <span className="inline-block transform skew-x-12">UN</span>
                  <span className="inline-block transform -skew-x-12">
                    INFLUENCED
                  </span>
                </h1>
              </div>
            </Link>

            {/* Navigation for medium and desktop screens */}
            {/* <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav> */}

            <nav className="hidden md:flex space-x-8 overflow-hidden">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} prefetch>
                  <motion.div
                    className={cn(
                      "relative px-2 py-1",
                      pathname === item.href
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                        layoutId="underline"
                      />
                    )}
                  </motion.div>
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
