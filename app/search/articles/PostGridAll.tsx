"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { decodeHTML } from "@/lib/decode-html-server";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export default function PostsGridAll({ initialPosts }) {
  const [filter, setFilter] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Filter posts by title
  const filteredPosts = initialPosts.filter((post) => {
    if (!filter) return true;
    const title = post.title?.rendered || "";
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  // Set initial render to false after component mounts
  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const countVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={filteredPosts.length}
            className="text-lg"
            initial={countVariants.initial}
            animate={countVariants.animate}
            exit={countVariants.exit}
          >
            {/* Showing: {filteredPosts.length} of {initialPosts.length} posts */}
          </motion.p>
        </AnimatePresence>

        <motion.div
          className="relative w-full md:w-64"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Filter by title..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-full bg-gray-800 py-2 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
          />
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Grid layout for posts */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => {
            // Handle both data structures - original API response and formatted posts
            const isFormattedPost = post.hasOwnProperty("featured_media_url");

            // Get the image source based on the post structure
            let imageSource;
            if (isFormattedPost) {
              imageSource = post.featured_media_url || "/placeholder.svg";
            } else {
              imageSource =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/placeholder.svg";
            }

            return (
              <motion.article
                key={post.id}
                className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
                variants={itemVariants}
                layout
                initial={isInitialRender ? "hidden" : { opacity: 0, y: 20 }}
                animate="visible"
                exit="exit"
                transition={{
                  delay: isInitialRender ? index * 0.1 : 0,
                  duration: 0.3,
                }}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className=" p-6 rounded-lg"
                  >
                    <Image
                      src={imageSource || "/placeholder.svg"}
                      alt={
                        decodeHTML(post.title?.rendered) || "Article thumbnail"
                      }
                      width={400}
                      height={200}
                      className="w-full rounded-lg h-40 md:h-48 object-cover transition-transform duration-500"
                    />
                  </motion.div>
                  {/* <motion.div
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    ID: {post.id}
                  </motion.div> */}
                </div>
                <div className="p-4 md:p-6">
                  <motion.h3
                    className="text-lg md:text-xl font-bold mb-2 text-[#ffffff]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {decodeHTML(post.title?.rendered)}
                  </motion.h3>
                  <motion.div
                    className="text-[#b6b3bd] mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(post.excerpt?.rendered) || "",
                    }}
                  />
                  <motion.div
                    className="flex justify-center items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link href={`/posts/${post.id}`}>
                      <motion.span
                        className="inline-block bg-[#B6B3BD1A] text-white px-6 md:px-8 py-2 md:py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors text-sm md:text-base"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View post
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-xl text-gray-400"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              No posts match your filter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
