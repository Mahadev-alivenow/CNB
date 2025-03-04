"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "./SearchResults";
import "@/styles/animations.css";
import SearchBarMobile from "./SearchBarMobile";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 0.5,
      x: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="custom-bg">

        <motion.div
        className="min-h-screen bg-[#03000A] text-white p-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <motion.header
            className="flex items-center justify-between p-4 bg-[#03000A] max-w-7xl mx-auto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div variants={itemVariants}>
            <Link href="/">
                <motion.span
                className="back-link text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                >
                Back
                </motion.span>
            </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
            <Link href="/search/articles">
                <motion.span
                className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                >
                View All Articles
                </motion.span>
            </Link>
            </motion.div>
        </motion.header>

        <motion.main
            className="max-w-7xl mx-auto px-4 py-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div variants={itemVariants} className="mb-6">
            <SearchBarMobile />
            </motion.div>

            <AnimatePresence mode="wait">
            <motion.h1
                key={query}
                className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 lg:mb-12 font-bold"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: -20 }}
            >
                {query ? (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    Search results for "
                    <motion.span
                    className="text-[#b6b3bd]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                        delay: 0.7,
                        type: "spring",
                        stiffness: 200,
                        },
                    }}
                    >
                    {query}
                    </motion.span>
                    "
                </motion.span>
                ) : (
                "Browse Articles"
                )}
            </motion.h1>
            </AnimatePresence>

            <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            >
            <Suspense fallback={<SearchSkeleton />}>
                <SearchResults query={query} />
            </Suspense>
            </motion.div>
        </motion.main>
        </motion.div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <motion.div
          key={item}
          className="animate-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: item * 0.1,
              duration: 0.5,
            },
          }}
        >
          <motion.div
            className="bg-[#313144] rounded-lg overflow-hidden"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="h-40 md:h-48 bg-gray-700 skeleton-item"></div>
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="h-5 md:h-6 bg-gray-700 rounded w-3/4 skeleton-item"></div>
              <div className="h-3 md:h-4 bg-gray-700 rounded w-full skeleton-item"></div>
              <div className="h-3 md:h-4 bg-gray-700 rounded w-5/6 skeleton-item"></div>
              <div className="h-8 md:h-10 bg-gray-700 rounded w-1/3 mx-auto skeleton-item"></div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
