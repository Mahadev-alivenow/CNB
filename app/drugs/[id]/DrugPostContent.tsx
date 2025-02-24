import Image from "next/image";
import Link from "next/link";
import { fetchPostById, fetchPostsByCategories } from "@/actions/wp.action";


export default async function DrugPostContent({ postId }) {

    const desiredCategories = ["Anyone Can Be Vulnerable","Real Impact of Drugs","Drugs Facts"];   

  const post = await fetchPostById(postId);
  const posts = await fetchPostsByCategories(desiredCategories);
  console.log(posts);

  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl  mb-12">{post?.title.rendered}</h1>

      {/* {post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <Image
          src={
            post?._embedded["wp:featuredmedia"][0].source_url ||
            "/placeholder.svg"
          }
          alt={post?.title.rendered}
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-lg"
        />
      )} */}

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Pagination */}
      <div className="flex justify-between mt-12">
        {prevPost ? (
          <Link
            href={`/drugs/${prevPost.id}`}
            className=" text-[#ffffff] py-2 opacity-50 underline"
          >
            Previous
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/drugs/${nextPost.id}`}
            className=" text-[#ffffff]  py-2 opacity-50 underline"
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
