"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const slides = [
    {
      title: "Slide One",
      description: "This is the first slide of the carousel.",
      color: "bg-blue-100",
    },
    {
      title: "Slide Two",
      description: "This is the second slide of the carousel.",
      color: "bg-green-100",
    },
    {
      title: "Slide Three",
      description: "This is the third slide of the carousel.",
      color: "bg-purple-100",
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="relative w-full h-full max-w-md mx-auto">
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden ${slides[currentIndex].color}`}
      >
        <div className="absolute inset-0 flex-col items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              // transition={{
              //   y: { type: "spring", stiffness: 300, damping: 30 },
              //   opacity: { duration: 0.2 },
              // }}
              drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full  flex-col items-center justify-center px-12"
            >
              <h2 className="text-2xl font-bold mb-4">
                {slides[currentIndex].title}
              </h2>
              <p className="text-center text-gray-600">
                {slides[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-y-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
