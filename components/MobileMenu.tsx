"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
    // You could navigate to search results page or filter content

    if (searchQuery.trim()) {
      // Log the search query for debugging
      console.log(`Searching for: ${searchQuery.trim()}`);

      // Navigate to the search page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      console.log(isOpen);
      console.log(onClose);
      isOpen = false;
      setSearchQuery("");
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-[#03000A]/90 backdrop-blur-sm transition-all duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-between p-6 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-white p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-[#03000A]" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
          <Link
            href="/"
            className="text-2xl text-white hover:text-gray-200 transition-colors italic"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/understanding-influence"
            className="text-2xl text-white hover:text-gray-200 transition-colors italic"
            onClick={onClose}
          >
            Understanding Influence
          </Link>
          <Link
            href="/navigating-influence"
            className="text-2xl text-white hover:text-gray-200 transition-colors italic"
            onClick={onClose}
          >
            Navigating Influence
          </Link>
          <Link
            href="/truth-about-drugs"
            className="text-2xl text-white hover:text-gray-200 transition-colors italic"
            onClick={onClose}
          >
            Truth About Drugs
          </Link>
          <Link
            href="/events"
            className="text-2xl text-white hover:text-gray-200 transition-colors italic"
            onClick={onClose}
          >
            Events
          </Link>
        </nav>

        <div className="w-full space-y-8">
          <div className="relative w-full">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
                <motion.button
                  type="submit"
                  className="absolute right-0 bottom-2 text-white/50 hover:text-white/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="h-6 w-6" onClick={onClose} />
                  <span className="sr-only">Search Article</span>
                </motion.button>
              </div>
            </form>
          </div>

          <div className="flex justify-center gap-8">
            <Link
              href="/about"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
              onClick={onClose}
            >
              About us
            </Link>
            <Link
              href="/help"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
              onClick={onClose}
            >
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

