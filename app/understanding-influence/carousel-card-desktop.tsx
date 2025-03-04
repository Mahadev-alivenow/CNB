"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { InfluenceItem } from "@/lib/utils";

interface CarouselCardProps {
  item: InfluenceItem;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
  return (
    <motion.div
      className="bg-[#1A1A2E] rounded-lg overflow-hidden h-full flex flex-col"
      whileHover={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        y: -5,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
          <Image
            src={item.icon || "/placeholder.svg?height=200&width=400"}
            alt={item.title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <motion.h3
          className="text-lg font-bold mb-2 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="text-sm text-gray-300 mb-4 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {item.description}
        </motion.p>

        <motion.div
          className="mt-auto"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.button
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            whileHover={{
              backgroundColor: "#4338ca",
              boxShadow: "0 0 10px rgba(79, 70, 229, 0.5)",
            }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarouselCard;
