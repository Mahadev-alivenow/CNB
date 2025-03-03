import Image from "next/image";
import Link from "next/link";
import { fetchPostById, fetchPostsByCategories } from "@/actions/wp.action";
import { decodeHTML } from "@/lib/decode-html-server";

// import { decodeHTML } from "./decode-html-server";

export default async function PostContent({ postId }) {
  const desiredCategories = ["Types of Influences", "Ways to Protect"];

  const post = await fetchPostById(postId);
  const posts = await fetchPostsByCategories(desiredCategories);

  // console.log(posts)

  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <article className="max-w-3xl mx-auto lg:mx-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 lg:mb-12 font-bold">
        {decodeHTML(post.title.rendered)}
      </h1>

      <div
        className="prose prose-invert max-w-none prose-img:rounded-lg prose-headings:mt-8 prose-headings:mb-4 prose-p:text-base md:prose-p:text-lg"
        dangerouslySetInnerHTML={{ __html: decodeHTML(post.content.rendered) }}
      />

      {/* Pagination */}
      <div className="flex justify-between mt-8 md:mt-10 lg:mt-12">
        {prevPost ? (
          <Link
            href={`/posts/${prevPost.id}`}
            className="text-[#ffffff] py-2 opacity-50 underline text-sm md:text-base"
          >
            Previous
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/posts/${nextPost.id}`}
            className="text-[#ffffff] py-2 opacity-50 underline text-sm md:text-base"
          >
            Next
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
