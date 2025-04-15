import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ContactUsSection() {
  return (
    <section id="contactUs" className="hidden md:block py-10 md:py-24">
      <div className="sm:text-center text-justify sm:px-32 px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-6">
          <span className="text-primary">Contact</span> Us
        </h2>
        <p className="text-zinc-200 text-center">
          This project is part of my <span className="text-primary">portfolio</span>, showcasing my <span className="text-primary">skills</span> and <span className="text-primary">creativity</span>. If you&apos;re interested in collaborating or learning more about our work, feel free to connect with me through social media or get in touch directly!
        </p>
      </div>
      <section>
        <div className="flex justify-center items-center gap-6 mt-10">
          <a href="https://github.com/bielnascf" target="_blank" className="hover:scale-110 transition-all duration-300">
            <FaGithub size={40}/>
          </a>
          <a href="https://www.linkedin.com/in/gabriel-nascimento-484450255/" target="_blank" className="hover:scale-110 transition-all duration-300">
            <FaLinkedin size={40}/>
          </a>
          <Link href="/contact" className="hover:scale-110 transition-all duration-300">
            <FaEnvelope size={40}/>
          </Link>
        </div>
      </section>
    </section>
  );
}
