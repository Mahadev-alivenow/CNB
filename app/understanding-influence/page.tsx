"use client";

import Link from "next/link";
import  {InfluenceCarousel}  from "./influence-carousel";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ChevronDown, ArrowDown } from "lucide-react";

export default function UnderstandingInfluence() {
  return (
    <div className="min-h-screen bg-[#03000A] text-white">
      {/* Main content */}
      <main className="container mx-auto px-4 py-2 lg:px-8 lg:py-12 custom-bg">
        {/* Hero Section */}
        <div className="relative text-center mb-12 lg:mb-16">
          <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center lg:h-[500px]">
            <div className="flex justify-center items-center absolute">
              <Image
                src={"/bg-images/understanding-influnce-bg.png"}
                alt={"truth-about-drugs bg image"}
                width={400}
                height={200}
                className="w-full object-cover lg:w-auto lg:h-full"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
              Understanding influence
            </h1>
          </div>
          <div className="flex justify-center items-center pt-24">
            <ArrowDown className="bounce" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 lg:px-0 lg:py-12">
          <div className="relative text-center mb-12">
            <p className="text-[1.45rem] leading-[1.45rem] font-bold mb-8 text-[#ebebee] lg:text-4xl">
              Discover what shapes your views on drugs
            </p>
          </div>
        </div>

        {/* Carousel */}
        <InfluenceCarousel />

        {/* CTA Button */}
        <div className="text-center mt-12 mb-16 ">
          <Link
            href="/navigating-influence"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0085FF] text-white text-sm font-medium"
          >
            Learn how to navigate influence
          </Link>
        </div>
      </main>
    </div>
  );
}
