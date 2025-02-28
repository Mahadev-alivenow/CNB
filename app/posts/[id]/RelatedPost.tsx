import Image from "next/image";
import Link from "next/link";
import { fetchPostById, fetchPostsByCategories } from "@/actions/wp.action";
import { decodeHTML } from "@/lib/decode-html-server";

export default async function RelatedPost({ postId, relatedPostId }) {
  const desiredCategories = ["Types of Influences", "Ways to Protect"];
  const post = await fetchPostById(postId);
  const relPID = await fetchPostById(relatedPostId);
  const posts = await fetchPostsByCategories(desiredCategories);

  // Filter out the posts with postId and relatedPostId
  const relatedPosts = posts.filter((p) => p.id !== relPID.id);

  // Log the IDs of the remaining related posts
  // relatedPosts.forEach((p) =>
  //   console.log(`Post ID: ${p.id}, Excluded IDs: ${postId}, ${relatedPostId}`)
  // );

  // If there are no related posts, return null
  if (relatedPosts.length === 0) return null;
  // console.log("desktopRelatedPosts",relatedPosts.map())
  // const currentIndex = posts.findIndex((p) => p.id === postId);
  // const nextPost =
  //   currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  // const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // const relatedPost = nextPost || prevPost;

  // if (!relatedPost) return null;

  return (
    <>
      <div className="mt-8 md:mt-12 lg:mt-0 sm:hidden">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          You may also like
        </h2>
        <div className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden p-4 md:p-6">
          <Image
            src={
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.svg" ||
              "/placeholder.svg"
            }
            alt={post.title?.rendered || "Related post"}
            width={400}
            height={200}
            className="w-full h-40 md:h-48 object-cover rounded-lg"
          />
          <div className="pt-4 md:pt-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-[#ffffff]">
              {post.title?.rendered || "Related post"}
            </h3>
            <div
              className="text-[#b6b3bd] mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base"
              dangerouslySetInnerHTML={{
                __html: post.excerpt?.rendered || "",
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
        </div>
      </div>

      {/* Desktop View */}
      <div className="mt-8 md:mt-12 lg:mt-0 hidden sm:block">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          You may also like
        </h2>
        {relatedPosts.map((relatedPost) => (
          <div
            key={relatedPost.id}
            className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden p-4 md:p-6 mb-4"
          >
            <Image
              src={
                relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/placeholder.svg"
              }
              alt={decodeHTML(relatedPost.title?.rendered) || "Related post"}
              width={400}
              height={200}
              className="w-full h-40 md:h-48 object-cover rounded-lg"
            />
            <div className="pt-4 md:pt-6">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-[#ffffff]">
                {decodeHTML(relatedPost.title?.rendered) || "Related post"}
              </h3>
              <div
                className="text-[#b6b3bd] mb-4 line-clamp-3 md:line-clamp-4 text-sm md:text-base"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(relatedPost.excerpt?.rendered) || "",
                }}
              />
              <div className="flex justify-center items-center">
                <Link
                  href={`/posts/${relatedPost.id}`}
                  className="inline-block bg-[#B6B3BD1A] text-white px-6 md:px-8 py-2 md:py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors text-sm md:text-base"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
