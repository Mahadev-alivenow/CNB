import { InfluenceItem } from "@/lib/utils";
import Image from "next/image";
import React from "react";


interface CarouselCardProps {
  item: InfluenceItem;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
  return (
    <div className="relative h-[65%]">
      <div className="h-[150px] flex items-center p-4 justify-center">
        <Image
          src={item.icon}
          alt={item.title}
          className=" object-cover image-drop-shadow  translate-y-[60px] z-20 absolute  brightness-110 "
          //   style={{
          //     transform: "perspective(800px) rotateX(10deg)",
          //     animation: "float 6s ease-in-out infinite",
          //   }}
          width={150}
          height={150}
          //   className="w-full object-cover lg:w-auto lg:h-full"
        />
      </div>
      <div className="bg-transparent border border-[#F8F9FA33] rounded-2xl backdrop-blur-sm  overflow-hidden h-full flex flex-col w-full relative z-0">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl bg " />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        {/* Card Image */}
        <div className="h-20 ">
          {/* <img
            src={item.icon}
            alt={item.title}
            className="h-28 object-contain drop-shadow-lg"
            /> */}
        </div>

        {/* Card Content */}
        <div className="px-5 py-3 flex-grow">
          <h3 className="italic text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-xs text-gray-300 ">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
