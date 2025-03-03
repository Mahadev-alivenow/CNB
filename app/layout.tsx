import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import PageTransition from "@/components/PageTransition";

import "@/styles/globals.css"
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"], // Specify the weights you intend to use
  subsets: ["latin"], // Specify the subsets you intend to use
  display: "swap", // Optional: Controls font-display behavior
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-[#03000A] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow custom-bg">{children}</main>
        {/* <main className="flex-grow custom-bg">
          <PageTransition>{children}</PageTransition>
        </main> */}
        <Footer />
      </body>
    </html>
  );
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
