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
import { getPosts } from "@/actions/wp.action";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TruthAboutDrugs() {
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
            post.categories === "Anyone Can Be Vulnerable" ||
            post.categories === "Real Impact of Drugs" ||
            post.categories === "Drugs Facts"
        )
      : posts.filter((post) => post.categories === selectedCategory);

  // console.log("Filtered Posts", filteredPosts);

  return (
    // <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
    //   {/* Hero Section */}
    //   <div className="relative text-center mb-12 lg:mb-16">
    //     <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center lg:h-[500px]">
    //       <div className="flex justify-center items-center absolute">
    //         <Image
    //           src={"/bg-images/truth-about-drugs-bg.png"}
    //           alt={"truth-about-drugs bg image"}
    //           width={400}
    //           height={200}
    //           className="w-full object-cover lg:w-auto lg:h-full"
    //         />
    //       </div>
    //       <h1 className="bg-gradient-text text-[2.75rem] leading-[2.75rem] md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
    //         truth about drugs
    //       </h1>
    //     </div>
    //     <div className="flex justify-center items-center pt-24">
    //       <ArrowDown className="bounce" />
    //     </div>
    //   </div>
    //   <div className="container mx-auto px-4 py-8 lg:px-0 lg:py-12">
    //     <div className="relative text-center mb-12">
    //       <p className="text-3xl font-bold mb-8 text-[#ebebee] lg:text-4xl">
    //         Uncover the real truth about drugs
    //       </p>

    //       <DropdownMenu>
    //         <DropdownMenuTrigger className="w-11/12 sm:w-1/6 bg-[#313144] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center justify-between lg:w-1/4">
    //           {selectedCategory}
    //           <ChevronDown className="ml-2 h-4 w-4" />
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent>
    //           <DropdownMenuItem
    //             onSelect={() => setSelectedCategory("View all")}
    //           >
    //             View all
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onSelect={() => setSelectedCategory("Anyone Can Be Vulnerable")}
    //           >
    //             Anyone Can Be Vulnerable
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onSelect={() => setSelectedCategory("Real Impact of Drugs")}
    //           >
    //             Real Impact of Drugs
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onSelect={() => setSelectedCategory("Drugs Facts")}
    //           >
    //             Drugs Facts
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //   </div>

    //   {/* Blog Posts */}
    //   <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
    //     {loading ? (
    //       <div className="text-center text-white col-span-3">Loading...</div>
    //     ) : (
    //       filteredPosts.map((post) => (
    //         <div
    //           key={post.id}
    //           className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden p-6"
    //         >
    //           <Image
    //             src={post?.featured_media_url || "/placeholder.svg"}
    //             alt={post.title?.rendered || "Blog post"}
    //             width={400}
    //             height={200}
    //             className="w-full h-48 object-cover rounded-lg"
    //           />
    //           <div className="pt-6">
    //             <h2
    //               className="text-xl font-bold mb-2 text-[#ffffff] lg:text-2xl"
    //               dangerouslySetInnerHTML={{
    //                 __html: post.title?.rendered || "",
    //               }}
    //             />
    //             <div
    //               className="text-[#b6b3bd] mb-4 line-clamp-4"
    //               dangerouslySetInnerHTML={{
    //                 __html: post.excerpt?.rendered || "",
    //               }}
    //             />
    //             <div className="flex justify-center items-center">
    //               <Link
    //                 href={`/drugs/${post.id}`}
    //                 className="inline-block bg-[#B6B3BD1A] text-white px-8 py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors"
    //               >
    //                 Read more
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </main>

    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <motion.div
        className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px]"
        variants={slideUp}
      >
        <div className="flex justify-center items-center ">
          {/* <div className="absolute w-full md:w-1/2 h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px] bg-[url('/bg-images/truth-about-drugs-bg.png')] bg-cover bg-center"> */}
          <Image
            src={"/bg-images/truth-about-drugs-bg.png"}
            alt={"truth-about-drugs bg image"}
            width={400}
            height={200}
            className="w-full object-contain md:object-cover md:w-[500px] md:h-full mx-auto"
            priority
          />
        </div>
        <motion.h1
          className="absolute z-10  bg-gradient-text text-[2.6rem] leading-[2.6rem] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase text-center lg:text-6xl lg:leading-[4rem]"
          variants={slideUp}
        >
          truth about
          <br />
          drugs
        </motion.h1>
      </motion.div>
      <motion.div
        className="flex justify-center items-center pt-24 md:hidden"
        variants={fadeInUp}
      >
        <ArrowDown className="bounce" />
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-8 lg:px-0 md:pb-12 md:pt-0"
        variants={staggerChildren}
      >
        <motion.div
          className="relative text-center mb-12 md:flex md:justify-between md:items-center"
          variants={slideUp}
        >
          <motion.p
            className="text-xl mb-8 text-[#ebebee] md:hidden"
            variants={fadeInUp}
          >
            Learn to resist negative influence with confidence
          </motion.p>

          <motion.div
            className="relative md:flex md:flex-col hidden text-left md:w-2/3 md:pr-4"
            variants={slideUp}
          >
            <motion.h2
              className="text-3xl text-[#ebebee] md:text-2xl lg:text-3xl"
              variants={fadeInUp}
            >
              You may see or hear about drugs differently, but one thing's for
              sure—they come with serious risks to your health and future.
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 md:text-base lg:text-lg"
              variants={fadeInUp}
            >
              Uncover the real truths about drugs so you can make safer, more
              informed choices.
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
                onSelect={() => setSelectedCategory("Anyone Can Be Vulnerable")}
              >
                Anyone Can Be Vulnerable
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelectedCategory("Real Impact of Drugs")}
              >
                Real Impact of Drugs
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelectedCategory("Drugs Facts")}
              >
                Drugs Facts
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
                  className="bg-[#020009] border border-[#F8F9FA33] rounded-lg overflow-hidden p-6"
                  variants={itemVariants}
                  custom={index}
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
                          href={`/drugs/${post.id}`}
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
    </motion.div>
  );
}
