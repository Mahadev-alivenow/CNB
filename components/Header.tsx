"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { MobileMenu } from "./MobileMenu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#03000A] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="p-2" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6 text-white" />
            </button>
            <Link href="/" className="text-xl font-bold text-white">
              UNINFLUENCED
            </Link>
            <div className="w-6" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

