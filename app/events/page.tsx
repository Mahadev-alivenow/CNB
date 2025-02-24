"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Dummy event data
const events = [
  {
    id: 1,
    title: "The Trip: An Escape Room Experience",
    image: "/placeholder.svg?height=200&width=400&text=Escape+Room",
    upcoming: true,
  },
  {
    id: 2,
    title: "Event 1",
    image: "/placeholder.svg?height=200&width=400&text=Event+1",
    upcoming: true,
  },
  {
    id: 3,
    title: "Event 2",
    image: "/placeholder.svg?height=200&width=400&text=Event+2",
    upcoming: false,
  },
  {
    id: 4,
    title: "Event 3",
    image: "/placeholder.svg?height=200&width=400&text=Event+3",
    upcoming: false,
  },
]

export default function EventsPage() {
  const [showUpcoming, setShowUpcoming] = useState(true)

  const filteredEvents = events.filter((event) => event.upcoming === showUpcoming)

  return (
    <div className="min-h-screen bg-[#03000a] text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="relative w-64 h-64">
          <Image
            src="/placeholder.svg?height=256&width=256&text=Events"
            alt="Events"
            width={256}
            height={256}
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-[#EEFF00]">EVENTS</h1>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Join us at our events</h2>

        {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#313144] rounded-full p-1">
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                showUpcoming ? "bg-[#ff1e5e] text-white" : "text-[#b6b3bd]",
              )}
              onClick={() => setShowUpcoming(true)}
            >
              Upcoming
            </button>
            <button
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                !showUpcoming ? "bg-[#ff1e5e] text-white" : "text-[#b6b3bd]",
              )}
              onClick={() => setShowUpcoming(false)}
            >
              Past
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-[#313144] rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block bg-[#ff1e5e] text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

