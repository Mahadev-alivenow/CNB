import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#03000A] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow custom-bg">{children}</main>
        <Footer />
      </body>
    </html>
  );
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
