import { fetchPostById } from "@/actions/wp.action";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import PostContent from "./PostContent";
import RelatedPost from "./RelatedPost";

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPostById(params.id);
  return {
    title: post?.title?.rendered,
    description: post?.excerpt?.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim(),
  };
}

export default async function PostPage({ params }) {
  return (
    <div className="min-h-screen bg-[#03000A] text-white p-4">
      <header className="flex items-center p-4 bg-[#03000A] ">
        <Link
          href="/navigating-influence"
          className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
        >
          Back
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent postId={params.id} />
        </Suspense>

        <Suspense fallback={<RelatedPostSkeleton />}>
          <RelatedPost postId={params.id} />
        </Suspense>
      </main>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
      <div className="h-64 bg-gray-700 rounded mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}

function RelatedPostSkeleton() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
      <div className="bg-[#313144] rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-700"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-10 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}
