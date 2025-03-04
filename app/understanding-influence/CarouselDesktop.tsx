"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CarouselCard from "./CaerouselCardDesktop";
import type { InfluenceItem } from "@/lib/utils";

interface CarouselProps {
  items: InfluenceItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page
  const [visibleItems, setVisibleItems] = useState<InfluenceItem[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  // Create a circular array of items to ensure no empty space
  useEffect(() => {
    // Create a circular array by duplicating items if needed
    const totalNeeded = Math.max(itemsPerPage * 3, items.length);
    let circularItems = [...items];

    while (circularItems.length < totalNeeded) {
      circularItems = [...circularItems, ...items];
    }

    setVisibleItems(circularItems);
  }, [items, itemsPerPage]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        setCarouselWidth(containerWidth);

        // Determine screen size and set items per page
        if (window.innerWidth < 640) {
          // Small mobile
          setItemsPerPage(1);
          setIsMobile(true);
        } else if (window.innerWidth < 768) {
          // Mobile
          setItemsPerPage(2);
          setIsMobile(true);
        } else if (window.innerWidth < 1024) {
          // Tablet
          setItemsPerPage(3);
          setIsMobile(false);
        } else if (window.innerWidth < 1280) {
          // Small desktop
          setItemsPerPage(4);
          setIsMobile(false);
        } else {
          // Large desktop
          setItemsPerPage(5);
          setIsMobile(false);
        }

        // Calculate card width to fill the entire container
        const gap = isMobile ? 8 : 16; // Reduced gap between cards
        const totalGapWidth = gap * (itemsPerPage - 1);
        const newCardWidth = (containerWidth - totalGapWidth) / itemsPerPage;
        setCardWidth(newCardWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isMobile, itemsPerPage]);

  // Trigger re-animation when active index changes
  useEffect(() => {
    // Update animation key to force re-animation of elements
    setAnimationKey((prev) => prev + 1);
  }, []); // Removed activeIndex from dependencies

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setDragOffset(diff);

    // Prevent default to stop scrolling on touch devices
    if ("touches" in e) {
      e.preventDefault();
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Determine if we should navigate based on drag distance
    const threshold = cardWidth * 0.2; // 20% of card width

    if (dragOffset < -threshold) {
      // Dragged left significantly - go to next
      goToNext();
    } else if (dragOffset > threshold) {
      // Dragged right significantly - go to previous
      goToPrev();
    }

    setDragOffset(0);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Go to next slide with looping
  const goToNext = () => {
    if (activeIndex >= items.length - 1) {
      // If at the last slide, loop to the first
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Go to previous slide with looping
  const goToPrev = () => {
    if (activeIndex <= 0) {
      // If at the first slide, loop to the last
      setActiveIndex(items.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Calculate transform based on active index and drag offset
  const getTransform = () => {
    const baseTransform = -activeIndex * cardWidth;
    const spacing = isMobile ? 8 : 16; // Reduced gap between cards
    const offset = -activeIndex * spacing;

    return {
      transform: `translateX(${baseTransform + dragOffset + offset}px)`,
      transition: isDragging
        ? "none"
        : "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    };
  };

  return (
    <div className="relative overflow-hidden" ref={carouselRef}>
      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-r-lg transition-colors"
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-l-lg transition-colors"
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </motion.button>

      {/* Carousel Track */}
      <motion.div
        className="flex w-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={getTransform()}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        }}
      >
        <AnimatePresence mode="wait">
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 px-1 md:px-2"
              style={{ width: `${cardWidth}px` }}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: (index * 0.08) % 0.8, // Limit the delay to avoid too long delays
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 },
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <CarouselCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Indicators */}
      <motion.div
        className="flex justify-center mt-8 space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
            staggerChildren: 0.05,
            delayChildren: 0.6,
          },
        }}
      >
        <AnimatePresence>
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full ${
                index === activeIndex
                  ? "bg-white"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              initial={{
                width: index === activeIndex ? 24 : 8,
                opacity: 0,
                y: 10,
              }}
              animate={{
                width: index === activeIndex ? 24 : 8,
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05,
                },
              }}
              whileHover={{
                scale: 1.2,
                backgroundColor: index === activeIndex ? "#ffffff" : "#9ca3af",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Carousel;
