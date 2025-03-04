"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Log the search query for debugging
      console.log(`Searching for: ${searchQuery.trim()}`);

      // Navigate to the search page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

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
              <div className=" p-4 flex justify-center items-center">
                <Image
                  src={`/Logo.png`}
                  alt={"UNINFLUENED image"}
                  width={300}
                  height={70}
                  // fill
                  className=" object-contain bg-transparent"
                  priority
                />
                {/* <h1 className="text-white font-bold text-[5.5vw] sm:text-lg  uppercase tracking-wider space-x-1">
                  <span className="inline-block transform skew-x-12">UN</span>
                  <span className="inline-block transform -skew-x-12">
                    INFLUENCED
                  </span>
                </h1> */}
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

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative ml-4 flex-1 md:max-w-xs hidden md:block"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-gray-800 py-2 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <motion.button
                  type="submit"
                  className="absolute right-3 text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="h-4 w-4" />
                </motion.button>
              </div>
            </form>

            {/* Spacer for mobile, hidden on larger screens */}
            {/* <div className="w-6 md:hidden" /> */}
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
