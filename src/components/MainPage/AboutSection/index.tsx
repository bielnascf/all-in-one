import EmpathyIcon from "@/components/Icons/EmpathyIcon";
import CardAbout from "./CardAbout";
import PurposeIcon from "@/components/Icons/PurposeIcon";
import SimplicityIcon from "@/components/Icons/SimplicityIcon";
import FreedomIcon from "@/components/Icons/FreedomIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="sm:py-24 py-32 flex flex-col items-center justify-center"
    >
      <div className="sm:text-center text-justify sm:px-32 px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-6">
          <span className="text-primary">About</span> the Project
        </h2>
        <p className="text-zinc-200">
          Our app is built on <span className="text-primary">purpose</span>,{" "}
          <span className="text-primary">empathy</span>,{" "}
          <span className="text-primary">simplicity</span>, and{" "}
          <span className="text-primary">freedom</span>. We aim to empower your
          daily life with tools that are easy to use, designed to understand
          your needs, and give you the freedom to focus on what truly matters.
          <span className="block text-center">
            Organize your day, <span className="text-primary">your way</span>!
          </span>
        </p>
      </div>
      <div className="sm:px-28 px-10 flex flex-col gap-6 mt-14">
        <CardAbout
          icon={EmpathyIcon}
          title="Empathy"
          description="We’re just like you people who’ve struggled to stay organized while managing the chaos of daily life. After countless hours wasted switching between apps and tools to keep our tasks, schedules, and projects in order, we realized something had to change."
        />
        <CardAbout
          icon={PurposeIcon}
          title="Purpose"
          description="That’s why we created this platform: to solve the exact problems we faced. Our mission is to save time, simplify organization, and make life easier for everyone."
        />
        <CardAbout
          icon={SimplicityIcon}
          title="Simplicity"
          description="Built with firsthand experience and a passion for productivity, our platform is designed to bring together all the tools you need into one seamless, intuitive solution. We believe that by making organization effortless."
        />
        <CardAbout
          icon={FreedomIcon}
          title="Freedom"
          description="We’re giving you the freedom to focus on what really matters.  We’ve been there and we’ve built this to help you get through it."
        />
      </div>
    </section>
  );
}
