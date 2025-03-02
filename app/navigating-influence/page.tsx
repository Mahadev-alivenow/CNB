"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDown } from "lucide-react";
import {  getPosts } from "@/actions/wp.action";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NavigatingInfluence() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const allPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      if (Array.isArray(res)) {
        setPosts(res);
        console.log(res);
      } else {
        console.error("Unexpected response format:", res);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    allPosts();
  }, [allPosts]);

  const filteredPosts =
    selectedCategory === "View all"
      ? posts.filter(
          (post) =>
            post.categories === "Types of Influences" ||
            post.categories === "Ways to Protect"
        )
      : posts.filter((post) => post.categories === selectedCategory);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <main>
        {/* <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12"> */}
        {/* Hero Section */}
        <motion.div
          className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px]"
          variants={slideUp}
        >
          <div className="flex justify-center items-center ">
            {/* <div className="absolute w-full md:w-1/2 h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px] bg-[url('/bg-images/navigating-influnce-bg.png')] bg-cover bg-center"> */}
            <Image
              src="/bg-images/navigating-influnce-bg.png"
              alt="truth-about-drugs bg image"
              width={400}
              height={200}
              className="w-full object-cover md:w-[500px] md:h-full mx-auto"
              priority
            />
          </div>
          <motion.h1
            variants={slideUp}
            className="absolute z-10  bg-gradient-text text-[2.6rem] leading-[40px] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]"
          >
            NAVIGATING
            <br />
            INFLUENCE
          </motion.h1>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="flex justify-center items-center pt-24 md:hidden"
        >
          <ArrowDown className="bounce" />
        </motion.div>

        <motion.div
          className="container mx-auto px-4 py-8 lg:px-0 md:pb-12 md:pt-0"
          variants={staggerChildren}
        >
          <motion.div
            variants={slideUp}
            className="relative text-center mb-12 md:flex md:justify-between md:items-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xl mb-8 text-[#ebebee] md:hidden"
            >
              Learn to resist negative influence with confidence
            </motion.p>

            <motion.div
              variants={slideUp}
              className="relative md:flex md:flex-col hidden text-left md:w-2/3 md:pr-4"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl text-[#ebebee] md:text-2xl lg:text-3xl"
              >
                The influence of drugs is all around us and no one is immune to
                it.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-400 md:text-base lg:text-lg"
              >
                Learning how to navigate it can empower you to take control of
                your decisions and stay focused on what truly matters to you.
              </motion.p>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-9/12 sm:w-2/6 md:w-2/6 lg:3/6 bg-[#313144] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center justify-between">
                {selectedCategory}
                <ChevronDown className="ml-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => setSelectedCategory("View all")}
                >
                  View all
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSelectedCategory("Types of Influences")}
                >
                  Types of Influences
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSelectedCategory("Ways to Protect")}
                >
                  Ways to Protect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          className="container mx-auto px-4 py-8 lg:px-0"
          variants={staggerContainer}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 lg:gap-8"
            >
              {loading ? (
                <motion.div
                  className="text-center text-white col-span-full"
                  variants={itemVariants}
                >
                  Loading...
                </motion.div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    custom={index}
                    className="bg-[#020009] border border-[#F8F9FA33] rounded-lg overflow-hidden p-6"
                  >
                    <Image
                      src={post?.featured_media_url || "/placeholder.svg"}
                      alt={post.title?.rendered || "Blog post"}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="pt-6">
                      <h2
                        className="text-xl font-bold mb-2 text-[#ffffff] md:text-xl lg:text-2xl"
                        dangerouslySetInnerHTML={{
                          __html: post.title?.rendered || "",
                        }}
                      />
                      <div
                        className="text-[#b6b3bd] mb-4 line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt?.rendered || "",
                        }}
                      />
                      <div className="flex justify-center items-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={`/posts/${post.id}`}
                            className="inline-block bg-[#B6B3BD1A] text-white px-8 py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors"
                          >
                            Read more
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center text-white col-span-full"
                >
                  No posts found.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeInUp} className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/truth-about-drugs"
              className="bg-button-gradient inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-[#ffffff] font-medium hover:opacity-90 transition-opacity"
            >
              Discover more about drugs
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
