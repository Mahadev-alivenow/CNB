"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn, events } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function EventsPage() {
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredEvents = events.filter(
    (event) => event.upcoming === showUpcoming
  );

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const eventsRef = useRef(null);
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.1 });

  return (
    <main className="min-h-screen bg-[#03000A] text-white">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 mx-auto flex justify-center items-center md:h-[400px] lg:h-[500px]"
      >
        <div className="inset-0 flex justify-center items-center mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={"/events-images/events-bg.png"}
              alt={"event background"}
              width={600}
              height={600}
              className="w-full object-contain md:w-[500px] md:h-full mx-auto"
              priority
            />
          </motion.div>
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bg-gradient-text  z-10 text-[2.75rem] leading-[2.75rem] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent tracking-wider uppercase lg:text-6xl lg:leading-[4rem]"
        >
          EVENTS
        </motion.h1>
      </motion.div>

      <motion.div
        className="flex justify-center items-center pt-12 md:hidden"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>

      {/* Events Section */}
      <motion.div
        ref={eventsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isEventsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold mb-6 md:mb-0 text-center md:text-left"
          >
            Join us at our events
          </motion.h2>

          {/* Toggle Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isEventsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-4 md:mb-0"
          >
            <div className="bg-[#313144] rounded-full p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2 rounded-full transition-colors",
                  showUpcoming ? "bg-[#00CDF9] text-white" : "text-[#b6b3bd]"
                )}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2 rounded-full transition-colors",
                  !showUpcoming ? "bg-[#00CDF9] text-white" : "text-[#b6b3bd]"
                )}
                onClick={() => setShowUpcoming(false)}
              >
                Past
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isEventsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="bg-transparent rounded-lg overflow-hidden"
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={event.image || "/events-images/event-1.png"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
