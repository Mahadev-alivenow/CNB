import { fetchPostsByCategories } from "@/actions/wp.action";
import Image from "next/image";
import Link from "next/link";
import { decodeHTML } from "@/lib/decode-html-server";

export default async function DebugImagesPage() {
  // Fetch posts using the working function
  const desiredCategories = ["Types of Influences", "Ways to Protect"];
  const posts = await fetchPostsByCategories(desiredCategories);

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 lg:mb-12 font-bold">
          Debug: Featured Images
        </h1>

        <div className="space-y-12">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-700 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                {decodeHTML(post.title?.rendered)}
              </h2>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Post ID: {post.id}</p>
                <p className="text-sm text-gray-400 mb-2">
                  Has _embedded: {post._embedded ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Has featured media:{" "}
                  {post._embedded?.["wp:featuredmedia"] ? "Yes" : "No"}
                </p>
                {post._embedded?.["wp:featuredmedia"] && (
                  <p className="text-sm text-gray-400 mb-2">
                    Featured media URL:{" "}
                    {post._embedded["wp:featuredmedia"][0]?.source_url ||
                      "None"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Using Direct URL:
                  </h3>
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <Image
                      src={
                        post._embedded["wp:featuredmedia"][0].source_url ||
                        "/placeholder.svg"
                      }
                      alt="Featured image"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                      No featured image URL
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Using Fallback:
                  </h3>
                  <Image
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/placeholder.svg"
                    }
                    alt="Featured image with fallback"
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
