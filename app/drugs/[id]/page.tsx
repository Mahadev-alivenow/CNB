import { fetchPostById, fetchPostsByCategories } from "@/actions/wp.action";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

import DrugPostContent from "./DrugPostContent";
import DrugRelatedPost from "./DrugRelatedPost";

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPostById(params.id);
  return {
    title: post?.title?.rendered,
    description: post?.excerpt?.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim(),
  };
}

export default async function DrugPostPage({ params }) {
  const post = await fetchPostById(params.id);

  const desiredCategories = [
    "Anyone Can Be Vulnerable",
    "Real Impact of Drugs",
    "Drugs Facts",
  ];

  const posts = await fetchPostsByCategories(desiredCategories);

  if (!posts.length) return <div>No posts available</div>;

  // Extract post IDs dynamically
  const postIds = posts.map((p) => p.id);
  const currentIndex = postIds.indexOf(Number(params.id));

  // Ensure circular navigation
  const nextIndex = (currentIndex + 1) % postIds.length;
  const relatedPostId = postIds[nextIndex];

  // console.log("currentIndex", currentIndex);
  // console.log("nextIndex", nextIndex);
  // console.log("postIds", postIds);
  // console.log("relatedPostId", relatedPostId);
  return (
    // <div className="min-h-screen bg-[#03000A] text-white p-4">
    //   <header className="flex items-center p-4 bg-[#03000A] ">
    //     <Link
    //       href="/truth-about-drugs"
    //       className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
    //     >
    //       Back
    //     </Link>
    //   </header>

    //   <main className="container mx-auto px-4 py-8">
    //     <Suspense fallback={<PostSkeleton />}>
    //       <DrugPostContent postId={params.id} />
    //     </Suspense>

    //     <Suspense fallback={<RelatedPostSkeleton />}>
    //       <DrugRelatedPost postId={relatedPostId} />
    //     </Suspense>
    //   </main>
    // </div>

    <div className="min-h-screen bg-[#03000A] text-white p-4">
      <header className="flex items-center p-4 bg-[#03000A] max-w-7xl mx-auto">
        <Link
          href="/truth-about-drugs"
          className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
        >
          Back
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="lg:w-2/3">
            <Suspense fallback={<PostSkeleton />}>
              <DrugPostContent postId={params.id} />
            </Suspense>
          </div>

          <div className="lg:w-1/3 mt-12 lg:mt-0">
            <Suspense fallback={<RelatedPostSkeleton />}>
              {relatedPostId && (
                <DrugRelatedPost
                  postId={relatedPostId}
                  relatedPostId={params.id}
                />
              )}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto lg:mx-0 animate-pulse">
      <div className="h-8 md:h-10 lg:h-12 bg-gray-700 rounded w-3/4 mb-6 md:mb-8"></div>
      <div className="h-48 md:h-56 lg:h-64 bg-gray-700 rounded mb-6 md:mb-8"></div>
      <div className="space-y-3 md:space-y-4">
        <div className="h-3 md:h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-3 md:h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 md:h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}

function RelatedPostSkeleton() {
  return (
    <div className="mt-8 md:mt-12 lg:mt-0 animate-pulse">
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
    </div>
  );
}
