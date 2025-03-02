import Image from "next/image"
import Link from "next/link"
import { ArrowDown, MapPin, Phone } from "lucide-react"

const organizations = [
  { id: 1, name: "Organization 1", link: "#" },
  { id: 2, name: "Organization 2", link: "#" },
  { id: 3, name: "Organization 3", link: "#" },
  { id: 4, name: "Organization 4", link: "#" },
  { id: 5, name: "Organization 5", link: "#" },
  { id: 6, name: "Organization 6", link: "#" },
]

export default function HelpPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12 ">
        {/* Hero Section */}
        <div className="relative text-center mb-12 lg:mb-16">
          <div className="relative w-full h-96 mx-auto mb-8 flex justify-center items-center lg:h-[500px]">
            {/* <div className="flex justify-center items-center absolute mx-auto"> */}
            <div className="absolute w-full md:w-1/2 h-96 mx-auto mb-8 flex justify-center items-center md:h-[400px] lg:h-[500px] bg-[url('/bg-images/help-bg.png')] bg-cover bg-center">
              {/* <Image
                src={"/bg-images/help-bg.png"}
                alt={"help bg image"}
                width={400}
                height={200}
                className="w-full object-cover lg:w-auto lg:h-full"
              /> */}
            </div>
            <h1 className="bg-gradient-text text-[2.4rem] leading-[2.75rem] md:text-5xl font-bold italic bg-gradient-to-r from-[#EEFF00] to-[#00FF85] bg-clip-text text-transparent mt-8 tracking-wider uppercase lg:text-6xl lg:leading-[4rem]">
              FIND
              <br />
              SUPPORT
            </h1>
          </div>
          <div className="flex justify-center items-center pt-24">
            <ArrowDown className="bounce" />
          </div>
        </div>
        {/* <div className="relative h-[50vh] flex items-center justify-center">
        <div className="relative w-64 h-64">
          <Image
            src="/placeholder.svg?height=256&width=256&text=Support"
            alt="Find Support"
            width={256}
            height={256}
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-[#EEFF00] text-center leading-tight">
              FIND
              <br />
              SUPPORT
            </h1>
          </div>
        </div>
      </div> */}
      </main>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 custom-bg">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
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
        </div>

        {/* Location Section */}
        <div className="max-w-md mx-auto space-y-12 mb-12">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#313144] rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold">Buangkok Green Medical Park</h3>
              <p className="text-[#b6b3bd] text-sm">
                Blk 9 (Level 1) 10 Buangkok View
                <br />
                Singapore 539747
              </p>
            </div>
          </div>

          {/* Helpline Section */}
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#313144] rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold">Helpline</h3>
              <p className="text-xl font-bold">6732 6837</p>
              <p className="text-[#b6b3bd] text-sm">8:30am – 9pm</p>
              <p className="text-[#b6b3bd] text-sm">
                Mon – Sun, including public holidays
              </p>
            </div>
          </div>
        </div>
        <hr />
        {/* Organizations Grid */}
        <div className="relative max-w-4xl mx-auto py-12 px-4">
          {/* Background Gradient */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/20 to-[#DB2777]/20 rounded-lg" /> */}

          <h3 className="text-xl font-bold text-center mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h3>

          <div className="relative grid grid-cols-3 md:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <Link
                key={org.id}
                href={org.link}
                className="bg-[#ffffff]/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center hover:bg-[#ffffff]/20 transition-colors"
              >
                <Image
                  src={`/placeholder.svg?height=60&width=60&text=${org.name}`}
                  alt={org.name}
                  width={60}
                  height={60}
                  className="w-12 h-12 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

