"use client";

import Link from "next/link";
import { InfluenceCarousel } from "./influence-carousel";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ChevronDown, ArrowDown } from "lucide-react";
import CarouselPage  from "./carousel-influence";
import DragContent from "./drag-content";
import { influences } from "@/lib/utils";
import Carousel from "./CarouselDesktop";

export default function UnderstandingInfluence() {
  return (
    // <div className="min-h-screen z-10 bg-[#03000A] text-white custom-bg">
    <div>
      {/* Main content */}
      <main>
        {/* <main className=" container mx-auto px-4 py-2 lg:px-8 lg:py-12 "> */}

        <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px]">
          <div className="flex justify-center items-center  mx-auto">
            {/* <div className="absolute w-full md:w-1/2 h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px] bg-[url('/bg-images/understanding-influnce-bg.png')] bg-cover bg-center"> */}
            <Image
              src={"/bg-images/understanding-influnce-bg.png"}
              alt={"truth-about-drugs bg image"}
              width={400}
              height={200}
              className="w-full object-cover md:w-[500px] md:h-full mx-auto"
              priority
            />
          </div>
          <h1 className="absolute z-10  bg-gradient-text text-center text-[2.4rem] leading-[2.75rem] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
            Understanding
            <br />
            influence
          </h1>
        </div>

        <div className="flex justify-center items-center mb-8 pt-24 md:hidden">
          <ArrowDown className="bounce" />
        </div>
        <div className="container mx-auto px-4 pb-8 lg:px-0 lg:pb-12">
          <div className="relative text-center mb-12">
            <p className="text-[1.45rem] leading-[1.45rem] font-bold mb-8 text-[#ebebee] md:hidden">
              Discover what shapes your views on drugs
            </p>

            <div className="hidden md:flex ">
              <div className="flex-col w-3/4 justify-center items-center text-center mx-auto">
                <h2 className="text-3xl text-[#ebebee] md:text-2xl lg:text-3xl  text-center">
                  The world around you shapes your views on drugs. By
                  recognising these influences, you can make decisions that
                  truly reflect your values.
                </h2>
                <p className="text-md font-thin mb-8 text-gray-400  ">
                  Tap each icon to discover how peers, pop culture, and your
                  surroundings can subtly push you towards drugs.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile - Carousel Section */}
        <div className="w-full h-[300px] mt-12 mb-6 p-6 z-20 md:hidden">
          <DragContent />
        </div>

        {/* Desktop - Carousel Section */}
        <section className="mb-16 hidden md:block">
          <Carousel items={influences} />
        </section>

        {/* CTA Button */}
        <div className="text-center mt-16 mb-16  ">
          <Link
            href="/navigating-influence"
            className="bg-button-gradient z-20 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0085FF] text-white text-sm font-medium"
          >
            Learn how to navigate influence
          </Link>
        </div>
      </main>
    </div>
  );
}
