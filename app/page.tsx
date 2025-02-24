import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* TV Shows Section */}
      <section className="space-y-4 mb-12">
        <div className="relative w-20 h-20 mx-auto"></div>
        <div className="text-center space-y-6">
          <p
            className="text-lg font-medium uppercase tracking-wide bg-gradient-to-r from-[#EEFF00] via-[#00FF85] via-[#00D1FF] via-[#B32BF7] to-[#FF2E92] bg-clip-text text-transparent italic leading-relaxed"
            style={{
              backgroundSize: "400% 100%",
              animation: "gradientMove 10s ease infinite",
            }}
          >
            IF YOU LOVE TV SHOWS,
            <br />
            YOU'VE PROBABLY SEEN
            <br />
            SQUID GAME. OR BREAKING BAD.
            <br />
            OR PEAKY BLINDERS.
            <br />
            THESE ARE JUST A FEW
            <br />
            SERIES OUT THERE WHERE
            <br />
            USING DRUGS CASUALLY,
            <br />
            OFTEN WITHOUT CONSEQUENCES.
            <br />
            WATCHING IS ONE THING,
            <br />
            BUT COULD ALSO LEAD
            <br />
            YOU TO THINK,
            <br />
            "THAT'S OKAY FOR ME TOO."
          </p>
          <p className="text-lg font-medium uppercase tracking-wide text-white italic mt-6">
            BUT IS IT REALLY?
          </p>
        </div>
      </section>

      {/* Icons Section */}
      <div className="space-y-8 mb-12">
        <Image
          src="/home-elements/home-1.png"
          alt="Gas mask icon"
          width={80}
          height={80}
          className="object-contain"
        />
        <Image
          src="/home-elements/home-2.png"
          alt="Marijuana leaf"
          width={60}
          height={60}
          className="mx-auto"
        />
        <Image
          src="/home-elements/home-3.png"
          alt="Umbrella coin"
          width={60}
          height={60}
          className="mx-auto"
        />
        <Image
          src="/home-elements/home-4.png"
          alt="Umbrella coin"
          width={60}
          height={60}
          className="mx-auto"
        />
        <Image
          src="/home-elements/home-5.png"
          alt="Umbrella coin"
          width={60}
          height={60}
          className="mx-auto"
        />
        <Image
          src="/home-elements/home-6.png"
          alt="Umbrella coin"
          width={60}
          height={60}
          className="mx-auto"
        />
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#DB2777] p-6 text-center rounded-lg mb-12">
        <p className="text-base leading-relaxed mb-6">
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
        <Link
          href="/understanding-influence"
          className="inline-block bg-white text-[#2563EB] px-8 py-2.5 rounded-full text-sm hover:bg-gray-100 transition-colors"
        >
          Learn more
        </Link>
      </section>
    </div>
  );
}

