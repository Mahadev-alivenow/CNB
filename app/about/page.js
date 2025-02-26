import { Menu, ChevronDown,ArrowDown, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Hero Section */}

        <div className="relative text-center mb-12 lg:mb-16">
          <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center lg:h-[500px]">
            <div className="flex justify-center items-center absolute">
              <Image
                src={"/bg-images/about-bg.png"}
                alt={"about bg image"}
                width={400}
                height={200}
                className="w-full object-cover lg:w-auto lg:h-full"
              />
            </div>
            <h1 className="bg-gradient-text text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
              BE AWARE.
              <br />
              BE IN CONTROL.
              <br />
              BE UNINFLUENCED.
            </h1>
          </div>
          <div className="flex justify-center items-center pt-24">
            <ArrowDown className="bounce" />
          </div>
        </div>
      </main>
      <div className="flex-1 flex flex-col custom-bg">
        {/* Main Content */}
        <div className="px-6 py-12 space-y-12 ">
          <div className="max-w-2xl mx-auto text-center text-2xl font-medium leading-none space-y-8 px-4 ">
            <p className="">This isn't about saying no for the sake of it.</p>

            <p className="">
              It's about knowing what's shaping your choices—so you can make
              them for yourself.
            </p>

            <p className="">
              From peer pressure to social media hype, pop-culture to viral
              trends, influence is everywhere. But not all influence has your
              best interest in mind.
            </p>

            <p className="text-base text-[#b6b3bd]">
              We help you uncover these forces that are steering you towards
              drugs, so you can see them for what they really are.
            </p>
          </div>
        </div>

        {/* <div className="container w-full h-full mx-auto px-4 py-8 relative min-h-[600px] overflow-hidden"> */}
        {/* <div
          className="z-111 relative animate-gradient bg-[radial-gradient(circle_at_bottom,#000000_0%,transparent_65%),linear-gradient(45deg,#ff6b4a_0%,#ff1493_25%,#9400d3_50%,#0066ff_75%,#00bfff_100%)] bg-[length:200%_200%]"
          style={{
            backgroundBlendMode: "normal",
          }}
        >HIEASD</div> */}

        {/* </div> */}
      </div>
    </>
  );
}
