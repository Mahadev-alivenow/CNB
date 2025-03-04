import { directSearch } from "@/actions/wp.action";
import Link from "next/link";
import Image from "next/image";

export default async function TestSearchPage({ searchParams }) {
  const query = searchParams.q || "spot";
  const posts = await directSearch(query);

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
          Test Search: "{query}"
        </h1>

        <div className="space-y-6">
          <p className="text-lg">Results found: {posts.length}</p>

          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Featured Image</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-800">
                    <td className="p-2">{post.id}</td>
                    <td className="p-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {post.title?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") ||
                          "No title"}
                      </Link>
                    </td>
                    <td className="p-2">
                      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                        <div className="w-20 h-20 relative">
                          <Image
                            src={
                              post._embedded["wp:featuredmedia"][0]
                                .source_url || "/placeholder.svg"
                            }
                            alt="Thumbnail"
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ) : (
                        <span className="text-red-500">No image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Try other search terms:</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/search/test?q=manipulation`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                manipulation
              </Link>
              <Link
                href={`/search/test?q=signs`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                signs
              </Link>
              <Link
                href={`/search/test?q=recognise`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                recognise
              </Link>
              <Link
                href={`/search/test?q=pressure`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                pressure
              </Link>
              <Link
                href={`/search/test?q=hidden`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                hidden
              </Link>
              <Link
                href={`/search/test?q=power`}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                power
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
