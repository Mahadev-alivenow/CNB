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

export default function NavigatingInfluence() {
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

  console.log("Filtered Posts", filteredPosts);

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

    <>
      <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px]">
        <div className="flex justify-center items-center absolute">
          <Image
            src={"/bg-images/truth-about-drugs-bg.png"}
            alt={"truth-about-drugs bg image"}
            width={400}
            height={200}
            className="w-full object-cover md:w-[500px] md:h-full"
          />
        </div>
        <h1 className="bg-gradient-text text-[2.6rem] leading-[2.6rem] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase text-center lg:text-6xl lg:leading-[4rem]">
          truth about
          <br />
          drugs
        </h1>
      </div>
      <div className="flex justify-center items-center pt-24 md:hidden">
        <ArrowDown className="bounce" />
      </div>

      <div className="container mx-auto px-4 py-8 lg:px-0 md:pb-12 md:pt-0">
        <div className="relative text-center mb-12 md:flex md:justify-between md:items-center">
          <p className="text-xl mb-8 text-[#ebebee] md:hidden">
            Learn to resist negative influence with confidence
          </p>

          <div className="relative md:flex md:flex-col hidden text-left md:w-2/3 md:pr-4">
            <h2 className="text-3xl text-[#ebebee] md:text-2xl lg:text-3xl">
              You may see or hear about drugs differently, but one thing's for
              sure—they come with serious risks to your health and future.
            </h2>
            <p className="text-lg text-gray-400 md:text-base lg:text-lg">
              Uncover the real truths about drugs so you can make safer, more
              informed choices.
            </p>
          </div>

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
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:px-0">
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 lg:gap-8">
          {loading ? (
            <div className="text-center text-white col-span-full">
              Loading...
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
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
                    <Link
                      href={`/drugs/${post.id}`}
                      className="inline-block bg-[#B6B3BD1A] text-white px-8 py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
