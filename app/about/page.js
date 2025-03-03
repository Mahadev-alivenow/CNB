"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { motion } from "framer-motion";

export default function Page() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="fixed top-0 bg-tint w-[120%] h-[120%]"></div>

      <main>
        <motion.div
          className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px]"
          variants={slideUp}
        >
          <div className="flex justify-center items-center mx-auto">
            <Image
              src={"/bg-images/about-us-bg.png"}
              alt={"about bg image"}
              width={400}
              height={200}
              className="w-full object-cover md:w-[500px] md:h-full mx-auto"
              priority
            />
          </div>
          <motion.h1
            className="absolute z-10 bg-gradient-text text-center text-[2.4rem] leading-[2.75rem] md:text-5xl md:leading-[3.5rem] font-medium italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]"
            variants={slideUp}
          >
            BE AWARE.
            <br />
            BE IN CONTROL.
            <br />
            BE UNINFLUENCED.
          </motion.h1>
        </motion.div>

        <motion.div
          className="flex justify-center items-center mb-8 pt-24"
          variants={fadeIn}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowDown className="bounce" />
        </motion.div>

        <motion.div
          className="container mx-auto px-4 pb-8 lg:px-0 lg:pb-12"
          variants={staggerChildren}
        >
          <motion.div
            className="relative px-6 text-center mb-12"
            variants={slideUp}
          >
            <motion.p
              className="text-[1.45rem] leading-[1.45rem] font-medium mb-8 text-[#ebebee]"
              variants={fadeIn}
            >
              This isn't about saying no for the sake of it.
            </motion.p>

            <motion.p
              className="text-[1.45rem] leading-[1.45rem] font-medium mb-8 text-[#ebebee]"
              variants={fadeIn}
            >
              It's about knowing what's shaping your choices—so you can make
              them for yourself.
            </motion.p>

            <motion.p
              className="text-[1.45rem] leading-[1.45rem] font-medium mb-8 text-[#ebebee]"
              variants={fadeIn}
            >
              From peer pressure to social media hype, pop-culture to viral
              trends, influence is everywhere. But not all influence has your
              best interest in mind.
            </motion.p>

            <motion.p
              className="text-sm leading-[1.45rem]  mb-8 text-[#b6b3bd]"
              variants={fadeIn}
            >
              We help you uncover these forces that are steering you towards
              drugs, so you can see them for what they really are.
            </motion.p>

            {/* <motion.div className="hidden md:flex" variants={fadeIn}>
              <div className="flex-col w-3/4 justify-center items-center text-center mx-auto">
                <motion.h2
                  className="text-3xl text-[#ebebee] md:text-2xl lg:text-3xl text-center"
                  variants={slideUp}
                >
                  The world around you shapes your views on drugs. By
                  recognising these influences, you can make decisions that
                  truly reflect your values.
                </motion.h2>
                <motion.p
                  className="text-md font-thin mb-8 text-gray-400"
                  variants={fadeIn}
                >
                  Tap each icon to discover how peers, pop culture, and your
                  surroundings can subtly push you towards drugs.
                </motion.p>
              </div>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
