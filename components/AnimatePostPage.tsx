"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

import PostContent from "@/app/posts/[id]/PostContent";
import RelatedPost from "@/app/posts/[id]/RelatedPost";
// import PostContent from "./PostContent";

// import RelatedPost from "./RelatedPost";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AnimatedPostPage({ params, relatedPostId }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="min-h-screen bg-[#03000A] text-white p-4"
    >
      <motion.header
        variants={fadeInUp}
        className="flex items-center p-4 bg-[#03000A] max-w-7xl mx-auto"
      >
        <Link
          href="/navigating-influence"
          className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
        >
          Back
        </Link>
      </motion.header>

      <motion.main variants={fadeInUp} className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <motion.div variants={fadeInUp} className="lg:w-2/3">
            <Suspense fallback={<PostSkeleton />}>
              <PostContent postId={params.id} />
            </Suspense>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:w-1/3 mt-12 lg:mt-0">
            <Suspense fallback={<RelatedPostSkeleton />}>
              {relatedPostId && (
                <RelatedPost postId={relatedPostId} relatedPostId={params.id} />
              )}
            </Suspense>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
}

function PostSkeleton() {
  return (
    <motion.div
      variants={fadeInUp}
      className="max-w-3xl mx-auto lg:mx-0 animate-pulse"
    >
      <div className="h-8 md:h-10 lg:h-12 bg-gray-700 rounded w-3/4 mb-6 md:mb-8"></div>
      <div className="h-48 md:h-56 lg:h-64 bg-gray-700 rounded mb-6 md:mb-8"></div>
      <div className="space-y-3 md:space-y-4">
        <div className="h-3 md:h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-3 md:h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 md:h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
    </motion.div>
  );
}

function RelatedPostSkeleton() {
  return (
    <motion.div
      variants={fadeInUp}
      className="mt-8 md:mt-12 lg:mt-0 animate-pulse"
    >
      <div className="h-6 md:h-8 bg-gray-700 rounded w-1/2 md:w-1/3 mb-4 md:mb-6"></div>
      <div className="bg-[#313144] rounded-lg overflow-hidden">
        <div className="h-40 md:h-48 bg-gray-700"></div>
        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div className="h-5 md:h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 md:h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-8 md:h-10 bg-gray-700 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    </motion.div>
  );
}
