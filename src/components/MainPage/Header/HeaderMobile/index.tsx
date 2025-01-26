"use client";

import { LayoutGridIcon, LogIn, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetFooter,
  SheetHeader,
} from "../../../ui/sheet";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderMobile() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`md:hidden fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#09090b]" : "bg-transparent"
      }`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <span className="sr-only">toggle menu</span>
            <MenuIcon color="#ffff" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
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
                href="#"
                className="flex justify-center items-center gap-2 bg-secondary dark:text-white text-background p-3 rounded-xl text-center hover:opacity-80 transition-all duration-300"
              >
                <LogIn size={18} />
                Login
              </Link>
              <Link
                href="#"
                className="flex justify-center items-center gap-2 bg-primary dark:text-white text-background p-3 rounded-xl text-center hover:opacity-80 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <SheetFooter>
            <div className="text-3xl text-center pb-24">
              <span className="text-primary">A</span>
              <span className="text-white">I</span>
              <span className="text-primary">O</span>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
