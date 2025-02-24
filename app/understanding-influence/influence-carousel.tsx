"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

export function InfluenceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-sm mx-auto overflow-hidden">
      <div ref={containerRef} className="relative h-[280px] mb-6">
        {influences.map((influence, index) => (
          <div
            key={influence.id}
            className={cn(
              "absolute inset-0 w-full transition-all duration-300",
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            )}
          >
            <div className="relative p-6 rounded-3xl overflow-hidden h-full ">
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

              {/* Content */}
              <div className="relative flex flex-col items-center">
                {/* Icon with colored background */}
                <div
                  className=" mb-4 rounded-2xl flex items-center justify-center "
                  // style={{ backgroundColor: influence.color }}
                >
                  <Image
                    src={influence.icon || "/carousels/item1.png"}
                    alt={influence.title}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl font-medium mb-3 text-left w-full">{influence.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed text-left">
                  {influence.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2">
        {influences.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentIndex ? "w-4 bg-white" : "w-2 bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
