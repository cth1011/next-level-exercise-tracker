import Image from "next/image";

import NavBar from "@/components/Navbar";
import Link from "next/link";

const Hero: React.FC = () => (
  <section className="relative h-[100vh] bg-[url('/images/pexels-anush-gorak-1431282.jpg')] bg-cover bg-center bg-no-repeat">
    <div className="absolute inset-x-0 z-10">
      <NavBar />
    </div>

    <div className="sm:to-black/15 absolute inset-0 z-0 bg-black/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/75 sm:opacity-70"></div>

    <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
      <div className="max-w-xl text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
          Achieve your strength goals with{" "}
          <strong className="font-extrabold text-rose-700">NextLevel</strong>.
        </h1>

        <p className="mt-4 max-w-lg text-white sm:text-xl sm:leading-relaxed">
          Track your lifts, set personalized goals, and get expert guidance to
          push through plateaus and achieve your best results.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 text-center">
          <Link
            href="#"
            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
          >
            Get Started
          </Link>

          <Link
            href="#"
            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src={
            "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
          }
          height={1000}
          width={1000}
          alt="app"
        />
      </div>
    </div>
  </section>
);

export default Hero;
