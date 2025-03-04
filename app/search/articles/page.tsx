import { getPosts } from "@/actions/wp.action";
import Link from "next/link";
import { Suspense } from "react";
import PostsGridAll from "./PostGridAll";


export default async function DebugPage() {
  // Fetch all posts with embedded data
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#03000A] text-white p-4">
      <header className="flex items-center p-4 bg-[#03000A] max-w-7xl mx-auto">
        <Link
          href="/search"
          className="back-link text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium opacity-50 underline"
        >
          Back to Search
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 lg:mb-12 font-bold">
          Articles: Available Posts
        </h1> */}

        <div className="space-y-6">
          {/* <p className="text-lg">Total posts available: {posts.length}</p> */}

          <Suspense fallback={<div>Loading posts...</div>}>
            <PostsGridAll initialPosts={posts} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
