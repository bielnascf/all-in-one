"use client";

import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function HomeSection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/auth");
  };
  return (
    <section
      id="home"
      className="h-screen md:py-20 px-6 sm:p-0 flex flex-col justify-center items-center"
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
          <Button
            type="button"
            className="text-white items-center py-6 px-10 bg-primary rounded-2xl hover:opacity-80 transition-all duration-300 shadow-lg shadow-primary/40"
            disabled={isLoading}
            onClick={handleClick}
          >
            {isLoading ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              <MousePointerClick />
            )}
            {isLoading
              ? "Getting started..."
              : "Get started"}
          </Button>
        </div>
      </div>
    </section>
  );
}
