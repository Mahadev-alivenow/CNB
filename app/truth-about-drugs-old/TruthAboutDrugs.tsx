"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface DrugPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

interface TruthAboutDrugsProps {
  drugPosts: DrugPost[];
}

const categories = [
  "View all",
  "Anyone Can Be Vulnerable",
  "Real Impact of Drugs",
  "Drugs Facts",
];

export default function TruthAboutDrugs({ drugPosts }: TruthAboutDrugsProps) {
  const [selectedCategory, setSelectedCategory] = useState("View all");

  const filteredPosts =
    selectedCategory === "View all"
      ? drugPosts
      : drugPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#03000A]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1200&text=Mountain+Background')`,
          }}
        >
          <div className="absolute inset-0 bg-[#03000A]/70" />
        </div>

        <div className="relative text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent">
            TRUTH ABOUT
            <br />
            DRUGS
          </h1>
          <p className="text-xl text-white">
            Uncover the real truth
            <br />
            about drugs
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full md:w-auto bg-[#313144] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center justify-between">
            {selectedCategory}
            <ChevronDown className="ml-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onSelect={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Posts Grid */}
        <div className="mt-8 space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#313144] rounded-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-[#b6b3bd] mb-4">{post.excerpt}</p>
                <Link
                  href={`/truth-about-drugs/${post.id}`}
                  className="inline-block bg-[#020009] text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
