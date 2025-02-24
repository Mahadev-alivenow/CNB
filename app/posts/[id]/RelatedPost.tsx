import Image from "next/image";
import Link from "next/link";
import { fetchPostsByCategories } from "@/actions/wp.action";

export default async function RelatedPost({ postId }) {
    const desiredCategories = ["Types of Influences", "Ways to Protect"];   
  const posts = await fetchPostsByCategories(desiredCategories);
  const currentIndex = posts.findIndex((p) => p.id === postId);
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const relatedPost = nextPost || prevPost;

  if (!relatedPost) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="bg-transparent border border-[#F8F9FA33] rounded-lg overflow-hidden p-6">
        <Image
          src={
            relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder.svg" ||
            "/placeholder.svg"
          }
          alt={relatedPost.title.rendered}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="pt-6">
          <h3 className="text-xl font-bold mb-2 text-[#ffffff] lg:text-2xl">
            {relatedPost.title.rendered}
          </h3>
          <div
            className="text-[#b6b3bd] mb-4 line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: relatedPost.excerpt?.rendered || "",
            }}
          />

          <div className="flex justify-center items-center">
            <Link
              href={`/posts/${relatedPost.id}`}
              className="inline-block bg-[#B6B3BD1A] text-white px-8 py-3 rounded-full border border-gray-500 shadow-inner-white hover:bg-[#B6B3BD33] transition-colors"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
