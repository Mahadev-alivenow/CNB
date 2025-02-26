import { influences } from '@/lib/utils';
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image';
import React, { useState } from 'react'


const DRAG_BUFFER = 50;

export default function DragContent() {
  const [dragging,setDragging] = useState(false)
  const [contentIndex, setContentIndex] = useState(0);
  const dragX = useMotionValue(0)
  const scrollY = useTransform(dragX, [-100, 100], [100, -100]);


  const onDragStart = () => {
    console.log("start")
    setDragging(true)
  }
  const onDragEnd = () => {
    console.log("end",contentIndex);
    console.log("end", dragX.get());

    setDragging(false);

    const x = dragX.get()
    if(x <= -DRAG_BUFFER && contentIndex < influences.length -1){
      setContentIndex((pv) => pv+1)
    }
    else if (x >= DRAG_BUFFER && contentIndex > 0) {
      setContentIndex((pv) => pv - 1);
    }
  };
  return (
    <>
      <div className="relative flex-col  bg-transparent border border-[#F8F9FA33] rounded-lg  w-full h-[300px]">
        <div className="w-full h-[30%]  relative ">
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
            className="relative flex cursor-grab  items-center active:cursor-pointer mb-[30%]"
          >
            {influences.map((influence) => (
              <div
                className=" relative w-full shrink-0 flex  justify-center items-center"
                key={influence.id}
              >
                <Image
                  src={influence.icon || "/carousels/item1.png"}
                  alt={influence.title}
                  width={350}
                  height={350}
                  className=" absolute object-contain  aspect-video  rounded-xl"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="w-full flex-col overflow-hidden h-[65%]  relative ">
          <motion.div
            // drag="x"
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            style={{
              y: dragX,
            
            }}
            animate={{
              translateY: `-${contentIndex *11}%`,
              
            }}
            
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="relative flex-col cursor-grab  items-center active:cursor-pointer"
          >
            {influences.map((influence) => (
              <div
                className="w-full px-6 pt-3 h-[200px] relative flex-col shrink-0 flex  justify-center items-center "
                key={influence.id}
              >
                <h3 className="text-xl font-medium mb-2 text-left w-full">
                  {influence.title}
                </h3>
                <p className="text-xs text-gray-300 leading-tight text-left ">
                  {influence.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        {/* <div className="relative flex-col overflow-hidden bg-transparent rounded-lg w-full h-[60%]">
          <motion.div
            className="relative overflow-hidden "
            // style={{ y: dragX }} // Apply horizontal drag directly
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            style={{
              y: dragX,
            }}
            animate={{
              translateY: `-${contentIndex * 14}%`,
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {influences.map((influence) => (
              <div
                key={influence.id}
                
                className=" relative w-full shrink-0 flex-col  justify-center items-center "
              >
                <h3 className="text-xl font-medium mb-3 text-left w-full">
                  {influence.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed text-left">
                  {influence.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div> */}
      </div>
    </>
  );
}
