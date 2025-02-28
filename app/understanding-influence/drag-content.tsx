"use client";

import { influences } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const DRAG_BUFFER = 20;

export default function DragContent() {
  const [dragging, setDragging] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);
  const dragX = useMotionValue(0);
  const scrollY = useTransform(dragX, [-100, 100], [100, -100]);

  const onDragStart = () => {
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && contentIndex < influences.length - 1) {
      setContentIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && contentIndex > 0) {
      setContentIndex((pv) => pv - 1);
    }
    dragX.set(0); // Reset drag position
  };
  const handleDotClick = (index: number) => {
    setContentIndex(index);
  };


  return (
    <div className="">
      <div className="w-full absolute  mx-auto left-0 ">
        <div className="  flex justify-between  -translate-y-[120px]">
          {contentIndex > 0 ? (
            <Image
              src={`/carousels/item${contentIndex}.png`}
              alt={"carousels"}
              width={80}
              height={80}
              className=" object-cover blur-sm opacity-80 "
            />
          ) : (
            <div></div>
          )}

          {contentIndex < 8 ? (
            <Image
              src={`/carousels/item${contentIndex + 2}.png`}
              alt={"carousels"}
              width={80}
              height={80}
              className=" object-cover blur-sm opacity-80 "
            />
          ) : (
            <div></div>
          )}

          {/* <Image
            src={`/carousels/item${contentIndex + 2}.png`}
            alt={"carousels"}
            width={80}
            height={80}
            className=" object-cover blur-sm opacity-80"
          /> */}
        </div>
      </div>
      <div className="w-full h-[300px] absolute overflow-hidden mx-auto left-0 bottom-80 z-30">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${contentIndex * 100}%`,
          }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className="relative flex cursor-grab items-center active:cursor-grabbing h-full"
        >
          {influences.map((influence) => (
            <div
              className="relative w-full h-full shrink-0 flex justify-center items-center"
              key={influence.id}
            >
              <Image
                src={influence.icon || "/carousels/item1.png"}
                alt={influence.title}
                width={180}
                height={180}
                className="object-contain image-drop-shadow"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="relative z-20 flex flex-col bg-transparent border border-[#F8F9FA33] rounded-2xl w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl bg " />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="w-full h-[40%] relative overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            style={{
              x: dragX,
            }}
            animate={{
              translateX: `-${contentIndex * 100}%`,
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="relative flex cursor-grab items-center active:cursor-grabbing h-full"
          >
            {influences.map((influence) => (
              <div
                className="relative w-full h-full shrink-0 flex justify-center items-center"
                key={influence.id}
              >
                {/* <Image
                src={influence.icon || "/carousels/item1.png"}
                alt={influence.title}
                // fill
                width={300}
                height={300}
                className="object-contain absolute"
              /> */}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="w-full flex-1 overflow-hidden relative">
          <motion.div
            style={{
              y: dragX,
            }}
            animate={{
              translateY: `-${contentIndex * 100}%`,
            }}
            className="relative flex flex-col h-full"
          >
            {influences.map((influence) => (
              <div
                className="w-full px-6 py-2 h-full shrink-0 flex flex-col justify-start"
                key={influence.id}
              >
                <h3 className="text-xl italic font-medium mb-2 text-left w-full">
                  {influence.title}
                </h3>
                <p className="text-sm text-gray-300 leading-tight text-left overflow-y-auto">
                  {influence.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Dots Navigation */}
      <div className="flex justify-center items-center mt-4 gap-2">
        {influences.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: contentIndex === index ? 1 : 0.6,
              scale: contentIndex === index ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                contentIndex === index ? "bg-white" : "bg-white/40"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
