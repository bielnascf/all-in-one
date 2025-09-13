"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function FooterSection() {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState("");
  const date = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-[#1f1f1f] text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2 text-sm">
          <p>
            Built with <span className="text-white font-medium">Next.js</span>,{" "}
            <span className="text-white font-medium">TypeScript</span>, and
            zombie nights 🛌😵
          </p>
          <p className="text-xs text-gray-500">
            © {date} Gabriel Nascimento
          </p>
          <p className="text-xs text-gray-500">Current time: {currentTime}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-white font-medium">Want to join our community on Discord?</p>
          <div className="flex gap-2">
            <Input
              placeholder="your@email.com"
              className="bg-[#1c1c1e] text-white placeholder:text-gray-500"
            />
            <Button
              variant="secondary"
              onClick={() => {
                toast({
                  title: "⏳ Coming Soon...",
                  description: "We are working this feature.",
                  duration: 3000,
                });
              }}
            >
              Join
            </Button>
          </div>
          <p className="text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          This project is part of my personal portfolio to demonstrate skills in
          <br />full-stack web development using modern technologies.
        </p>
      </div>
      <div className="text-center mt-8 text-xs text-gray-500 italic">
        Open to collaboration and freelance opportunities.
      </div>
    </footer>
  );
}
