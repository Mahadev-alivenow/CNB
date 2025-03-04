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

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TruthAboutDrugs() {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  // const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update trigger width on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTriggerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Animation variants
  const dropdownVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariantsDP = {
    closed: {
      y: -10,
      opacity: 0,
    },
    open: {
      y: 0,
      opacity: 1,
    },
  };
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
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="fixed top-0 bg-tint w-[120%] h-[120%]"></div>

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

          {/* <DropdownMenu>
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
          </DropdownMenu> */}

          <motion.div
            animate={{
              marginBottom: isOpen ? "1.5rem" : "0rem",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="relative flex justify-center items-center sm:w-2/6 md:w-2/6"
          >
            <DropdownMenu onOpenChange={setIsOpen}>
              <motion.div
                ref={containerRef}
                animate={{
                  backgroundColor: isOpen ? "#FFFFFF" : "#313144",
                  color: isOpen ? "#313144" : "#FFFFFF",
                }}
                transition={{ duration: 0.3 }}
                className="w-9/12 sm:w-2/6 md:w-2/6 lg:w-3/6 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <DropdownMenuTrigger className="flex w-full justify-between items-center px-6 py-3">
                  <span>{selectedCategory}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </motion.div>
                </DropdownMenuTrigger>
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <DropdownMenuContent
                    forceMount
                    align="start"
                    sideOffset={4}
                    className="p-0 overflow-hidden bg-[#313144] border-none text-white"
                    style={{ width: `${triggerWidth}px` }}
                    asChild
                  >
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                    >
                      <motion.div variants={itemVariants}>
                        <DropdownMenuItem
                          className="px-6 py-3 cursor-pointer hover:bg-[#414156] transition-colors w-full text-white"
                          onSelect={() => {
                            setSelectedCategory("View all");
                            setIsOpen(false);
                          }}
                        >
                          View all
                        </DropdownMenuItem>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <DropdownMenuItem
                          className="px-6 py-3 cursor-pointer hover:bg-[#414156] transition-colors w-full text-white"
                          onSelect={() => {
                            setSelectedCategory("Anyone Can Be Vulnerable");
                            setIsOpen(false);
                          }}
                        >
                          Anyone Can Be Vulnerable
                        </DropdownMenuItem>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <DropdownMenuItem
                          className="px-6 py-3 cursor-pointer hover:bg-[#414156] transition-colors w-full text-white"
                          onSelect={() => {
                            setSelectedCategory("Real Impact of Drugs");
                            setIsOpen(false);
                          }}
                        >
                          Real Impact of Drugs
                        </DropdownMenuItem>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <DropdownMenuItem
                          className="px-6 py-3 cursor-pointer hover:bg-[#414156] transition-colors w-full text-white"
                          onSelect={() => {
                            setSelectedCategory("Drugs Facts");
                            setIsOpen(false);
                          }}
                        >
                          Drugs Facts
                        </DropdownMenuItem>
                      </motion.div>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Blog Posts */}
      <motion.div
        animate={{
          marginTop: isOpen ? "4.5rem" : "0rem",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`container mx-auto px-4 py-8 lg:px-0  `}
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
