"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Grid3x3,
  Server,
  Code2,
  Database,
  ShieldCheck,
  Palette,
  Braces,
  Type,
  Brain,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  Framework: "bg-blue-600 text-white",
  Authentication: "bg-green-600 text-white",
  ORM: "bg-purple-600 text-white",
  Database: "bg-yellow-600 text-white",
  UI: "bg-pink-600 text-white",
  Styling: "bg-indigo-600 text-white",
  Validation: "bg-red-600 text-white",
  Language: "bg-gray-600 text-white",
  Intelligence: "bg-teal-500 text-white",
};

const technologies = [
  {
    name: "Next.js",
    category: "Framework",
    icon: <Server className="w-6 h-6 text-white" />,
    description:
      "Used as the core framework for both frontend and backend, leveraging Server Components and API Routes.",
  },
  {
    name: "NextAuth.js",
    category: "Authentication",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    description:
      "Handles user authentication securely and integrates seamlessly with Next.js.",
  },
  {
    name: "Prisma ORM",
    category: "ORM",
    icon: <Braces className="w-6 h-6 text-white" />,
    description:
      "Simplifies database access with a modern, type-safe ORM connected to PostgreSQL.",
  },
  {
    name: "Supabase",
    category: "Database",
    icon: <Database className="w-6 h-6 text-white" />,
    description:
      "Provides PostgreSQL database hosting, authentication, and file storage services.",
  },
  {
    name: "Shadcn UI",
    category: "UI",
    icon: <Grid3x3 className="w-6 h-6 text-white" />,
    description:
      "A set of accessible and customizable UI components used to build the interface.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: <Palette className="w-6 h-6 text-white" />,
    description:
      "Used for styling the entire app with utility-first CSS classes in a responsive way.",
  },
  {
    name: "Zod",
    category: "Validation",
    icon: <Code2 className="w-6 h-6 text-white" />,
    description:
      "Validates and types data safely on both frontend and backend.",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: <Type className="w-6 h-6 text-white" />,
    description:
      "Adds static typing to JavaScript, improving code quality and development experience.",
  },
  {
    name: "AI Integration",
    category: "Intelligence",
    icon: <Brain className="w-6 h-6 text-white" />,
    description:
      "Incorporated AI capabilities to enhance user interaction, such as smart task suggestions and personalized insights.",
  },
];

export default function TechStackSection() {
  return (
    <section id="techStack" className="pt-24 px-10 bg-[#0a0a0a] text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <span className="text-primary">Tech</span> Stack
      </h2>
      <p className="text-center text-zinc-200 mb-8 max-w-2xl mx-auto text-sm md:text-base">
        A brief overview of the main technologies used to build and power this
        project — from UI components to backend services.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech) => (
          <Card
            key={tech.name}
            className="bg-[#1c1c1e] border-none hover:shadow-lg transition"
          >
            <CardContent className="p-6 flex flex-col gap-2">
              <Badge
                variant="secondary"
                className={`self-start ${categoryColors[tech.category]}`}
              >
                {tech.category}
              </Badge>
              <div className="flex items-start gap-4 mt-2">
                <div className="bg-[#2a2a2d] p-2 rounded-full">{tech.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-300">{tech.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
