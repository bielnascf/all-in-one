"use client";

import Link from "next/link";
import { useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function HeaderDesktop() {
  const pathname = usePathname();
  const isAuthPageOrContactPage = pathname == "/Login" || pathname == "/SignUp" || pathname == "/contact";

  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`hidden md:flex fixed top-0 left-0 w-full z-50 py-5 transition-colors duration-300 ${
        isScrolled ? "bg-[#09090b]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between w-full items-center xl:px-5 sm:px-10">
        <Link href="/">
          <div className="text-xl">
            <span className="text-primary">A</span>
            <span className="text-white">I</span>
            <span className="text-primary">O</span>
          </div>
        </Link>
        {!isAuthPageOrContactPage && (
          <>
            <nav>
              <ul className="flex gap-12 md:text-sm lg:text-base">
                <li>
                  <Link href="/" className="relative group">
                    <span className="transition duration-300">Home</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="relative group">
                    <span className="transition duration-300">Features</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="relative group">
                    <span className="transition duration-300">About</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                  </Link>
                </li>
                <li>
                  <Link href="#techStack" className="relative group">
                    <span className="transition duration-300">Tech Stack</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                  </Link>
                </li>
                <li>
                  <Link href="#contactUs" className="relative group">
                    <span className="transition duration-300">Contact Us</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex gap-4">
          <Link
            href="#"
            className="bg-secondary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 rounded-xl text-center hover:opacity-80 border border-primary md:px-3 md:py-2 sm:py-2 sm:px-2"
          >
            Login
          </Link>
          <Link
            href="#"
            className="bg-primary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 md:px-3 md:py-2 sm:py-2 sm:px-2 rounded-xl text-center hover:opacity-80"
          >
            Sign Up
          </Link>
        </div>
          </>
        )}
      </div>
    </header>
  );
}
