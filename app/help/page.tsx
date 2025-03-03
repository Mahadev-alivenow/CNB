"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const organizations = [
  { id: 1, name: "Organization 1", link: "#" },
  { id: 2, name: "Organization 2", link: "#" },
  { id: 3, name: "Organization 3", link: "#" },
  { id: 4, name: "Organization 4", link: "#" },
  { id: 5, name: "Organization 5", link: "#" },
  { id: 6, name: "Organization 6", link: "#" },
];

export default function HelpPage() {
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });

  const locationRef = useRef(null);
  const isLocationInView = useInView(locationRef, { once: true, amount: 0.5 });

  const helplineRef = useRef(null);
  const isHelplineInView = useInView(helplineRef, { once: true, amount: 0.5 });

  const orgsRef = useRef(null);
  const isOrgsInView = useInView(orgsRef, { once: true, amount: 0.2 });

  return (
    <>
      <div className="fixed top-0 bg-tint w-[120%] h-[120%]"></div>

      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-center mb-12 lg:mb-16"
        >
          <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center lg:h-[500px]">
            <div className="flex justify-center items-center mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Image
                  src={"/bg-images/help-bg.png"}
                  alt={"help bg image"}
                  width={400}
                  height={200}
                  className="w-full object-cover md:w-[500px] md:h-full mx-auto"
                  priority
                />
              </motion.div>
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute z-10 bg-gradient-text text-[2.4rem] leading-[2.75rem] md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]"
            >
              FIND
              <br />
              SUPPORT
            </motion.h1>
          </div>
          <motion.div
            className="flex justify-center items-center pt-24"
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
        </motion.div>
      </main>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 ">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center space-y-4 mb-12"
        >
          <h2 className="text-2xl font-bold">
            Let's call it what it is—
            <br />
            drugs are addictive.
          </h2>
          <p className="text-[#b6b3bd]">
            And if you find yourself needing help, know that support is out
            there. You can reach out to these groups that understand what you're
            going through.
          </p>
        </motion.div>

        {/* Location Section */}
        <div className="max-w-md mx-auto space-y-12 mb-12">
          <motion.div
            ref={locationRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isLocationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isLocationInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 mx-auto bg-[#313144] rounded-full flex items-center justify-center"
            >
              <MapPin className="w-6 h-6" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="font-bold">Buangkok Green Medical Park</h3>
              <p className="text-[#b6b3bd] text-sm">
                Blk 9 (Level 1) 10 Buangkok View
                <br />
                Singapore 539747
              </p>
            </div>
          </motion.div>

          {/* Helpline Section */}
          <motion.div
            ref={helplineRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHelplineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isHelplineInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 mx-auto bg-[#313144] rounded-full flex items-center justify-center"
            >
              <Phone className="w-6 h-6" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="font-bold">Helpline</h3>
              <motion.p
                initial={{ scale: 0.95 }}
                animate={isHelplineInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="text-xl font-bold"
              >
                6732 6837
              </motion.p>
              <p className="text-[#b6b3bd] text-sm">8:30am – 9pm</p>
              <p className="text-[#b6b3bd] text-sm">
                Mon – Sun, including public holidays
              </p>
            </div>
          </motion.div>
        </div>

        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isHelplineInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Organizations Grid */}
        <div className="relative max-w-4xl mx-auto py-12 px-4">
          <motion.h3
            ref={orgsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isOrgsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold text-center mb-8"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isOrgsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative grid grid-cols-3 md:grid-cols-3 gap-4"
          >
            {organizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isOrgsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.2 },
                }}
                className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center transition-all"
              >
                <Link
                  href={org.link}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={`/placeholder.svg?height=60&width=60&text=${org.name}`}
                    alt={org.name}
                    width={60}
                    height={60}
                    className="w-12 h-12 object-contain"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
