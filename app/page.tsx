"use client";
import React, { useEffect, useState } from "react";
import { Menu, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { Roboto } from "next/font/google";
import { roboto700 } from "@/lib/fonts";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Central Narcotics Bureau</title>
        <meta
          name="description"
          content="An initiative by the Central Narcotics Bureau to educate about the influence of drugs."
        />
      </Head>
      <div className="fixed top-0 bg-tint w-[120%] h-[120%]"></div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-transparent text-white min-h-[200vh] relative ">
            {/* Main Content */}
            <div className="relative">
              {/* Hero Section with Sticky Text */}
              <div className="min-h-screen">
                <div className="max-w-2xl mx-auto text-center pt-12">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={` ${roboto700.className} italic md:hidden visible bg-gradient-text-home font-bold text-[5vw] leading-[5vw]  md:text-4xl  fixed left-0 -translate-x-1/2 top-20 w-full max-w-2xl px-4`}
                    style={{
                      position: scrollY > 100 ? "fixed" : "relative",
                    }}

                    // className={` ${roboto.className} italic md:hidden visible bg-gradient-text-home font-bold text-[5vw] leading-[5vw]  md:text-4xl  fixed left-1/2 -translate-x-1/2 top-20 w-full max-w-2xl px-4`}
                    // style={{
                    //   position: scrollY > 100 ? "fixed" : "relative",
                    // }}
                  >
                    if you love tv shows,
                    <br />
                    you've probably seen
                    <br />
                    squid game. or breaking bad.
                    <br />
                    or peaky blinders.
                    <br />
                    these are just a few
                    <br />
                    series out there where
                    <br />
                    using drugs casually,
                    <br />
                    often without consequences.
                    <br />
                    watching is one thing,
                    <br />
                    but could also lead
                    <br />
                    you to think,
                    <br />
                    "that's okay for me too."
                    <br />
                    <br />
                    <span
                      className={`text-white text-[5vw] md:text-5xl font-bold ${roboto700.className}`}
                    >
                      but is it really?
                    </span>
                  </motion.p>
                  <p
                    className={` ${roboto700.className} italic invisible md:visible  bg-gradient-text font-bold md:text-5xl  leading-relaxed fixed left-1/2 -translate-x-1/2 top-20 w-full max-w-2xl px-4`}
                    // className={` ${roboto700.className} italic md:visible invisible bg-gradient-text-home font-bold text-[5vw] leading-[5vw]  md:text-4xl  fixed left-0 -translate-x-1/2 top-20 w-full max-w-2xl px-4`}
                    style={{
                      position: scrollY > 100 ? "fixed" : "relative",
                    }}
                  >
                    Think drugs are a
                    <br />
                    world away from
                    <br />
                    you? Their influence
                    <br />
                    is all around you.
                    <br />
                    <span className="text-white text-3xl md:text-5xl font-bold  md:invisible">
                      but is it really?
                    </span>
                  </p>
                </div>
              </div>

              {/* Parallax Images */}
              <div className="h-[100vh] ">
                <div className=" w-full h-full ">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    src="/home-elements/home-1.png"
                    alt="Gas mask icon"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "0%",
                      left: "0%",
                      transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                  />
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    src="/home-elements/home-2.png"
                    alt="Marijuana leaf"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "20%",
                      right: "0%",
                      transform: `translateY(${scrollY * 0.2}px)`,
                    }}
                  />
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    src="/home-elements/home-3.png"
                    alt="Umbrella coin"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "40%",
                      left: "0%",
                      transform: `translateY(${scrollY * 0.175}px)`,
                    }}
                  />
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    src="/home-elements/home-4.png"
                    alt="Umbrella coin"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "55%",
                      right: "10%",
                      transform: `translateY(${scrollY * 0.15}px)`,
                    }}
                  />
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    src="/home-elements/home-5.png"
                    alt="Umbrella coin"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "70%",
                      left: "0%",
                      transform: `translateY(${scrollY * 0.125}px)`,
                    }}
                  />
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    src="/home-elements/home-6.png"
                    alt="Umbrella coin"
                    className="absolute w-48 h-48 md:w-80 md:h-80 object-cover"
                    style={{
                      top: "90%",
                      right: "0%",
                      transform: `translateY(${scrollY * 0.05}px)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="cta-action mt-24 pt-12 "
            // style={{
            //   bottom: "50%",
            //   right: "0%",
            //   transform: `translateY(${scrollY * 0.3}px)`,
            // }}
          >
            {/* CTA Section */}
            <div
              className="custom-inverted-bg relative w-full overflow-hidden rounded-t-3xl "
              // style={{
              //   background:
              //     "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(147, 51, 234) 50%, rgb(236, 72, 153) 100%)",
              // }}
            >
              <div className=" py-1 px-4 md:p-16 text-center rounded-lg mx-4 my-8">
                <div className="max-w-xl mx-auto">
                  <p className="md:hidden text-2xl md:text-2xl font-light leading-none mb-8 opacity-90">
                    The world around
                    <br />
                    you shapes your thoughts,
                    <br />
                    choices, and even
                    <br />
                    your views on drugs—
                    <br />
                    often without you realising it.
                  </p>
                  <p className="md:block hidden text-xl  font-medium leading-none mb-6 opacity-90">
                    The world around you shapes your thoughts, choices, and even
                    your views on drugs— often without you realising it.
                  </p>
                  <p className="text-base font-medium text-gray-500 mb-6 opacity-90">
                    Understand the influences that shape who you are.
                  </p>
                  <Link
                    href="/understanding-influence"
                    className="bg-button-gradient relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium  text-white transition-all rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 border-2 border-white/20 backdrop-blur-sm hover:opacity-90"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
