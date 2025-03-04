import Image from "next/image";
import Link from "next/link";
import { directSearch, getAllPosts } from "@/actions/wp.action";
import { decodeHTML } from "@/lib/decode-html-server";

export default async function SearchResults({ query }) {
  // If no query, show all posts
  if (!query) {
    const allPosts = await getAllPosts();

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            Browse all articles
          </h2>
          <p className="text-[#b6b3bd] max-w-lg">
            Enter a search term above to filter these articles.
          </p>
        </div>

        <PostGrid posts={allPosts} />
      </div>
    );
  }

  console.log(`Searching for: "${query}"`);
  const posts = await directSearch(query);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl md:text-2xl font-medium mb-4">
          No results found for "{query}"
        </h2>
        <p className="text-[#b6b3bd] max-w-lg mx-auto">
          Try searching for different keywords or browse our categories.
        </p>
        <div className="mt-8">
          <Link href="/search/articles" className="text-blue-400 hover:underline">
            View all available articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#b6b3bd]">
          Found {posts.length} result{posts.length !== 1 ? "s" : ""} for "
          {query}"
        </p>
      </div>

      <PostGrid posts={posts} />
    </div>
  );
}

// Extract the post grid to a separate component for reuse
function PostGrid({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map((post) => {
        // Handle both data structures - original API response and formatted posts
        // Check if this is a formatted post (with featured_media_url) or raw API response
        const isFormattedPost = post.hasOwnProperty("featured_media_url");

        // Get the image source based on the post structure
        let imageSource;
        if (isFormattedPost) {
          // For formatted posts from getPosts()
          imageSource = post.featured_media_url || "/placeholder.svg";
          console.log(
            `Post ID ${post.id} - Using formatted post structure - Image: ${
              imageSource || "No image"
            }`
          );
        } else {
          // For raw API response from getAllPosts()
          imageSource =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder.svg";
          console.log(
            `Post ID ${post.id} - Using raw API structure - Image: ${
              imageSource || "No image"
            }`
          );
        }

        return (
          <article
            key={post.id}
            className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={imageSource || "/placeholder.svg"}
              alt={
                decodeHTML(
                  isFormattedPost ? post.title.rendered : post.title?.rendered
                ) || "Article thumbnail"
              }
              width={400}
              height={200}
              className="w-full h-40 md:h-48 object-cover"
            />
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-2 text-[#ffffff]">
                {decodeHTML(
                  isFormattedPost ? post.title.rendered : post.title?.rendered
                )}
              </h3>
              <div
                className="text-[#b6b3bd] mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    decodeHTML(
                      isFormattedPost
                        ? post.excerpt.rendered
                        : post.excerpt?.rendered
                    ) || "",
                }}
              />
              <div className="flex justify-center items-center">
                <Link
                  href={`/posts/${post.id}`}
                  className="inline-block bg-[#B6B3BD1A] text-white px-6 md:px-8 py-2 md:py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors text-sm md:text-base"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
