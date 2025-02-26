"use client";

import Link from "next/link";
import { InfluenceCarousel } from "./influence-carousel";
import { Menu } from "lucide-react";
import Image from "next/image";
import { ChevronDown, ArrowDown } from "lucide-react";
import CarouselPage  from "./carousel-influence";
import DragContent from "./drag-content";


const influences = [
  {
    id: 1,
    title: "Peers",
    description:
      "If your friends view drug use as normal or acceptable, you may be more likely to adopt a similar mindset. The desire to fit in can further reinforce this influence, pushing you toward or away from drugs depending on the group’s attitudes.",
    icon: "/carousels/item1.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 2,
    title: "Partner",
    description:
      "Relationships are deeply personal, and a partner’s influence can be even stronger than that of peers. A partner who firmly opposes or supports drug use can significantly shape your perspective over time.",
    icon: "/carousels/item2.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 3,
    title: "Movies/TV",
    description:
      "Movies and TV often depict drug use as glamourous, rebellious, or a symbol of success, sometimes ignoring addiction or consequences. These portrayals can subconsciously make drug use seem more acceptable or desirable.",
    icon: "/carousels/item3.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 4,
    title: "Music",
    description:
      "The excitement of being overseas can increase the temptation to experiment with drugs, especially in places where drug use is more socially accepted. A new environment, the desire to escape stress, and the anonymity of being in a foreign country can all shift how you view drugs.",
    icon: "/carousels/item4.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 5,
    title: "Social Media",
    description:
      "The excitement of being overseas can increase the temptation to experiment with drugs, especially in places where drug use is more socially accepted. A new environment, the desire to escape stress, and the anonymity of being in a foreign country can all shift how you view drugs.",
    icon: "/carousels/item5.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 6,
    title: "Books",
    description:
      "The excitement of being overseas can increase the temptation to experiment with drugs, especially in places where drug use is more socially accepted. A new environment, the desire to escape stress, and the anonymity of being in a foreign country can all shift how you view drugs.",
    icon: "/carousels/item6.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 7,
    title: "Overseas",
    description:
      "The excitement of being overseas can increase the temptation to experiment with drugs, especially in places where drug use is more socially accepted. A new environment, the desire to escape stress, and the anonymity of being in a foreign country can all shift how you view drugs.",
    icon: "/carousels/item7.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 8,
    title: "Nightlife",
    description:
      "The nightlife culture can heighten the likelihood of experimenting with drugs. The atmosphere of clubs, bars, and parties, often fueled by alcohol, lowers inhibitions and fosters a desire to escape reality. Peer pressure to fit in can also drive people to try drugs, especially when others are using to enhance the experience.",
    icon: "/carousels/item8.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 9,
    title: "Music Festival",
    description:
      "The high-energy atmosphere of festivals, with loud music and vibrant visuals, can make drugs seem like a way to enhance the experience and boost feelings of connection. The sense of freedom at festivals may also encourage experimentation as a way to escape stress or bond with others.",
    icon: "/carousels/item9.png?height=80&width=80",
    color: "#FF4D4D",
  },
];
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
            <h1 className=" bg-gradient-text text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
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
        {/* <InfluenceCarousel /> */}
        <div className="w-full h-[300px] mb-6 p-6">
          {/* <CarouselPage /> */}

          <DragContent />

        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 mb-16 ">
          <Link
            href="/navigating-influence"
            className="bg-button-gradient inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#0085FF] text-white text-sm font-medium"
          >
            Learn how to navigate influence
          </Link>
        </div>
      </main>
    </div>
  );
}
