"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Search } from 'lucide-react';

export default function SearchBarMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
            <form
              onSubmit={handleSearch}
              className="relative ml-4 flex-1 mb-4 md:max-w-xs  md:hidden"
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
  )
}
