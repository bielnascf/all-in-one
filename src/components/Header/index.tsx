"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useRouter } from "next/navigation";
import { LayoutGridIcon, LogIn, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const isContactPage = pathname.startsWith("/contact");
  const isAuthPageOrDashboardPage = pathname.startsWith("/dashboard") || pathname.startsWith("/auth");
  const isScrolled = useScrollPosition();
  const router = useRouter();

  if (isAuthPageOrDashboardPage) {
    return null;
  }

  return (
    <>
      <header
        className={`hidden lg:flex fixed top-0 left-0 w-full z-50 py-5 transition-colors duration-300 ${
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
          {!isContactPage && (
            <>
              <nav className="xl:ms-36 md:ms-16">
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
                      <span className="transition duration-300">
                        Tech Stack
                      </span>
                      <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#contactUs" className="relative group">
                      <span className="transition duration-300">
                        Contact Us
                      </span>
                      <span className="absolute left-0 -bottom-1 w-0 h-[0.025rem] bg-[#3EAC91] transition-all duration-300 group-hover:w-10/12"></span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/auth?tab=login")}
                  className="bg-secondary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 rounded-xl text-center hover:opacity-80 border border-primary md:px-3 md:py-2 sm:py-2 sm:px-2"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth?tab=signup")}
                  className="bg-primary transition duration-300 dark:text-white text-background lg:px-5 lg:py-2 md:px-3 md:py-2 sm:py-2 sm:px-2 rounded-xl text-center hover:opacity-80"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      <header
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-[#09090b]" : "bg-transparent"
        }`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <span className="sr-only">Toggle menu</span>
              <MenuIcon color="#fff" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex dark:bg-background flex-col justify-between"
          >
            <div className="flex flex-col gap-16">
              <SheetHeader className="text-left">
                <div className="flex items-center gap-4">
                  <LayoutGridIcon size={24} />
                  <SheetTitle>Menu</SheetTitle>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <Link
                  href="/auth"
                  className="flex justify-center items-center gap-2 bg-secondary dark:text-white text-background p-3 rounded-xl text-center hover:opacity-80 transition-all duration-300"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  href="/auth?tab=signup"
                  className="flex justify-center items-center gap-2 bg-primary dark:text-white text-background p-3 rounded-xl text-center hover:opacity-80 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>

              <div className="flex justify-center gap-6 mt-16">
                <Link
                  href="https://www.github.com/bielnascf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={40} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gabriel-nascimento-484450255/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={40} />
                </Link>
                <Link href="/contact">
                  <FaEnvelope size={40} />
                </Link>
              </div>
            </div>

            <div>
              <Link href="/">
                <div className="w-full flex justify-center">
                  <div className="text-3xl pb-24">
                    <span className="text-primary">A</span>
                    <span className="text-white">I</span>
                    <span className="text-primary">O</span>
                  </div>
                </div>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
