import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#03000A] text-white pb-8">
      <hr className="bg-gray-500 border-0 h-px mb-12" />

      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm">BE</p>
            <p className="text-xl font-bold">UNINFLUENCED</p>
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

            <div className="flex justify-center gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

