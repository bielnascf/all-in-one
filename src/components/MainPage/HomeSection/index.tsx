import { MousePointerClick } from "lucide-react";
import Link from "next/link";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="h-full md:py-20 px-6 sm:p-0 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-24 mb-16 lg:mb-0">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-center leading-snug">
            Let me help you <br /> with{" "}
            <span className="font-bold">whatever</span> you need
          </h1>
        </div>
        <div className="text-center">
          <p className="text-zinc-400 sm:text-base text-sm">
            Perfect for organized people
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="#"
            className="text-white flex gap-2 items-center py-3 px-10 bg-primary rounded-2xl hover:opacity-80 transition-all duration-300"
          >
            <MousePointerClick />
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
