"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn, events } from "@/lib/utils";
import { ArrowDown } from "lucide-react";



export default function EventsPage() {
  const [showUpcoming, setShowUpcoming] = useState(true);

  const filteredEvents = events.filter(
    (event) => event.upcoming === showUpcoming
  );

  return (
    <main className="min-h-screen bg-[#03000A] text-white">
      {/* Hero Section */}
      <div className="relative w-full h-96 mx-auto flex justify-center items-center md:h-[400px] lg:h-[500px]">
        <div className=" inset-0 flex justify-center items-center mx-auto">
          {/* <div className="absolute w-full md:w-1/2 h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px] bg-[url('/events-images/events-bg.png')] bg-cover bg-center"> */}
          <Image
            src={"/events-images/events-bg.png"}
            alt={"event background"}
            width={600}
            height={600}
            className="w-full object-cover md:w-[500px] md:h-full mx-auto"
            priority
          />
        </div>
        <h1 className=" absolute bg-gradient-text relative z-10 text-[2.75rem] leading-[2.75rem] md:text-5xl md:leading-[3.5rem] font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
          EVENTS
        </h1>
      </div>

      <div className="flex justify-center items-center pt-12 md:hidden">
        <ArrowDown className="bounce" />
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h2 className="text-2xl font-bold mb-6 md:mb-0 text-center md:text-left">
            Join us at our events
          </h2>

          {/* Toggle Button */}
          <div className="flex justify-center mb-4 md:mb-0">
            <div className="bg-[#313144] rounded-full p-1">
              <button
                className={cn(
                  "px-6 py-2 rounded-full transition-colors",
                  showUpcoming ? "bg-[#00CDF9] text-white" : "text-[#b6b3bd]"
                )}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full transition-colors",
                  !showUpcoming ? "bg-[#00CDF9] text-white" : "text-[#b6b3bd]"
                )}
                onClick={() => setShowUpcoming(false)}
              >
                Past
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
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
                  <h3 className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

