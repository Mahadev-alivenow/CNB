import { getPosts } from "@/actions/wp.api";
import { getAllPosts } from "@/actions/wp.action";
import Link from "next/link";
import Image from "next/image";

export default async function DebugStructurePage() {
  // Fetch posts using both methods
  const formattedPosts = await getPosts();
  const rawPosts = await getAllPosts();

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
          Debug: Post Structure Comparison
        </h1>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Formatted Posts (getPosts)
              </h2>
              <p className="mb-4">Total posts: {formattedPosts.length}</p>

              {formattedPosts.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    First Post Structure:
                  </h3>
                  <pre className="text-xs overflow-auto max-h-60 bg-gray-900 p-2 rounded">
                    {JSON.stringify(formattedPosts[0], null, 2)}
                  </pre>
                </div>
              )}

              {formattedPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-700 rounded-lg p-4 mb-4"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Post ID: {post.id}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Featured Image URL: {post.featured_media_url || "None"}
                  </p>

                  {post.featured_media_url ? (
                    <div className="mb-4">
                      <Image
                        src={post.featured_media_url || "/placeholder.svg"}
                        alt="Featured image"
                        width={200}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-20 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                Raw Posts (getAllPosts)
              </h2>
              <p className="mb-4">Total posts: {rawPosts.length}</p>

              {rawPosts.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    First Post Structure:
                  </h3>
                  <p className="text-sm mb-2">
                    Has _embedded: {rawPosts[0]._embedded ? "Yes" : "No"}
                  </p>
                  <p className="text-sm mb-2">
                    Featured Media URL:{" "}
                    {rawPosts[0]._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url || "None"}
                  </p>
                </div>
              )}

              {rawPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-700 rounded-lg p-4 mb-4"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Post ID: {post.id}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Featured Media URL:{" "}
                    {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "None"}
                  </p>

                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <div className="mb-4">
                      <Image
                        src={
                          post._embedded["wp:featuredmedia"][0].source_url ||
                          "/placeholder.svg"
                        }
                        alt="Featured image"
                        width={200}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-20 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
