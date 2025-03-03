import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white w-full z-10">
      <div className="container mx-auto">
        {/* Mobile footer (displays on small screens) */}
        <div className="md:hidden py-8">
          <hr className="bg-gray-500 border-0 h-px mb-12" />
          <div className="text-center space-y-6 px-4">
            <div className="space-y-0">
              <p className="text-xl font-bold">BE</p>
              {/* <p className="text-xl font-bold">UNINFLUENCED</p> */}
              <div className="flex justify-center items-center mt-0">
                <Image
                  src={`/Logo.png`}
                  alt={"UNINFLUENED image"}
                  width={300}
                  height={70}
                  // fill
                  className=" object-contain bg-transparent"
                  priority
                />
                {/* <h1 className="text-white font-bold text-xl  uppercase tracking-wider space-x-1">
                  <span className="inline-block transform skew-x-12">UN</span>
                  <span className="inline-block transform -skew-x-12">
                    INFLUENCED
                  </span>
                </h1> */}
              </div>
              <p className="text-xs text-gray-400">
                An initiative by the Central Narcotics Bureau
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center gap-4 text-sm">
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About us
                </Link>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Need Help?
                </Link>
              </div>

              <p className="text-xs text-gray-400">
                © Copyright 2025. All Rights Reserved
              </p>

              <div className="flex justify-center gap-4 text-gray-100">
                Follow us
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop footer (displays on medium screens and up) */}
        <div className="hidden md:flex justify-between items-center py-7 px-4 ">
          <div className="flex flex-col">
            <span className="text-xl font-bold italic text-center">BE</span>
            {/* <span className="text-xl font-bold -mt-1">UNINFLUENCED</span> */}
            <div className="flex justify-center items-center">
              <Image
                src={`/Logo.png`}
                alt={"UNINFLUENED image"}
                width={300}
                height={70}
                // fill
                className=" object-contain bg-transparent"
                priority
              />
              {/* <h1 className="text-white font-bold text-2xl  uppercase tracking-wider space-x-1">
                <span className="inline-block transform skew-x-12">UN</span>
                <span className="inline-block transform -skew-x-12">
                  INFLUENCED
                </span>
              </h1> */}
            </div>
          </div>

          <div className="text-xs text-gray-400">
            An initiative by the Central Narcotics Bureau
          </div>

          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              About us
            </Link>
            <Link
              href="/help"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Need Help?
            </Link>
          </div>

          <div className="flex-col space-y-2 ">
            <div className="text-xs text-gray-400">
              © Copyright 2025, All Rights Reserved
            </div>

            <div className="flex items-center gap-3 justify-center">
              <span className="text-sm">Follow us</span>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
