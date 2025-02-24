"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Dummy blog posts data
const drugPosts = [
  {
    id: 1,
    title: "Think You're Safe? Think Again.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec pulvinar nec ultrices ac egestas vitae tortor. Praesent et cursus sem tempor lorem, et euismod mauris. Vestibulum vitae erat turpis. Sed venenatis suscipit pharetra. Aenean vero urna, porta ac lacus id, mattis consectetur metus. Mauris et commodo lacus.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec pulvinar nec ultrices ac egestas vitae tortor. Praesent et cursus sem tempor lorem, et euismod mauris. Vestibulum vitae erat turpis. Sed venenatis suscipit pharetra. Aenean vero urna, porta ac lacus id, mattis consectetur metus. Mauris et commodo lacus.</p>

      <p>Nunc venenatis accumsan tortor. Donec sagittis ipsum elit, ac pulvinar massa tempor ut. Integer purus mauris, mattis ut odio quis, imperdiet semper mauris. In hac habitasse platea dictumst. Donec et fermentum enim.</p>
    `,
    images: [
      "/placeholder.svg?height=400&width=800&text=Neon+Purple+1",
      "/placeholder.svg?height=400&width=800&text=Neon+Purple+2",
    ],
    category: "Anyone Can Be Vulnerable",
  },
  {
    id: 2,
    title: "Inside Ben's Brain: What Lamspura Taught Me About Drug Addiction",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non nulla name sit amet velit maximus blandit. Sed venenatis suscipit pharetra. Aenean vero urna, porta ac lacus id, mattis consectetur metus.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec pulvinar nec ultrices ac egestas vitae tortor. Praesent et cursus sem tempor lorem, et euismod mauris.</p>
    `,
    images: [
      "/placeholder.svg?height=400&width=800&text=Wavy+Lines+1",
      "/placeholder.svg?height=400&width=800&text=Wavy+Lines+2",
    ],
    category: "Real Impact of Drugs",
  },
  {
    id: 3,
    title: "The Slippery Slope: How Drug Permissiveness Leads to Crisis",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec pulvinar nec ultrices ac egestas vitae tortor. Praesent et cursus sem tempor lorem, et euismod mauris.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non nulla name sit amet velit maximus blandit.</p>
    `,
    images: [
      "/placeholder.svg?height=400&width=800&text=Bokeh+Effect+1",
      "/placeholder.svg?height=400&width=800&text=Bokeh+Effect+2",
    ],
    category: "Anyone Can Be Vulnerable",
  },
  {
    id: 4,
    title: "The Real Cost of Drugs: More Than Just Dollars and Cents",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec pulvinar nec ultrices ac egestas vitae tortor. Praesent et cursus sem tempor lorem, et euismod mauris.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non nulla name sit amet velit maximus blandit.</p>
    `,
    images: [
      "/placeholder.svg?height=400&width=800&text=Holographic+1",
      "/placeholder.svg?height=400&width=800&text=Holographic+2",
    ],
    category: "Real Impact of Drugs",
  },
]

export default function DrugPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const currentId = Number.parseInt(params.id)
  const currentPost = drugPosts.find((post) => post.id === currentId)
  const currentIndex = drugPosts.findIndex((post) => post.id === currentId)

  const prevPost = currentIndex > 0 ? drugPosts[currentIndex - 1] : null
  const nextPost = currentIndex < drugPosts.length - 1 ? drugPosts[currentIndex + 1] : null

  if (!currentPost) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-[#03000A] text-white">
      {/* Header */}
      <header className="flex items-center p-4 bg-[#03000A] border-b border-[#313144]">
        <Link
          href="/truth-about-drugs"
          className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors text-sm font-medium"
        >
          Back
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{currentPost.title}</h1>

          <Image
            src={currentPost.images[0] || "/placeholder.svg"}
            alt={currentPost.title}
            width={800}
            height={400}
            className="w-full h-auto mb-8 rounded-lg"
          />

          <div
            className="prose prose-invert max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />

          {currentPost.images[1] && (
            <Image
              src={currentPost.images[1] || "/placeholder.svg"}
              alt={`${currentPost.title} secondary image`}
              width={800}
              height={400}
              className="w-full h-auto my-8 rounded-lg"
            />
          )}
        </article>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          {prevPost ? (
            <Link
              href={`/truth-about-drugs/${prevPost.id}`}
              className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors"
            >
              Previous
            </Link>
          ) : (
            <div /> // Empty div for spacing
          )}

          {nextPost ? (
            <Link
              href={`/truth-about-drugs/${nextPost.id}`}
              className="text-[#ffffff] hover:text-[#b6b3bd] transition-colors"
            >
              Next
            </Link>
          ) : (
            <div /> // Empty div for spacing
          )}
        </div>

        {/* You may also like */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">You may also like</h2>
          <div className="bg-[#313144] rounded-lg overflow-hidden">
            <Image
              src={nextPost?.images[0] || prevPost?.images[0]}
              alt={nextPost?.title || prevPost?.title || "Related post"}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{nextPost?.title || prevPost?.title}</h3>
              <p className="text-[#b6b3bd] mb-4">
                {nextPost?.content.substring(0, 150) || prevPost?.content.substring(0, 150)}...
              </p>
              <Link
                href={`/truth-about-drugs/${nextPost?.id || prevPost?.id}`}
                className="inline-block bg-[#020009] text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#03000A] text-[#ffffff] py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-2xl font-bold">BE UNINFLUENCED</p>
            <p className="text-sm">An initiative by the Central Narcotics Bureau</p>
            <div className="flex justify-center space-x-4">
              <Link href="/about" className="hover:underline">
                About us
              </Link>
              <Link href="/help" className="hover:underline">
                Need Help?
              </Link>
            </div>
            <p className="text-sm">© Copyright 2025. All Rights Reserved</p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="hover:text-[#b6b3bd] transition-colors">
                Facebook
              </Link>
              <Link href="#" className="hover:text-[#b6b3bd] transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

