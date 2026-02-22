import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

export function Header() {
  return (
    <header className="relative flex h-20 items-center justify-center border-b border-gray-200 px-6 bg-white shrink-0">
      
      {/* Título centrado */}
      <div className="flex items-center gap-2">
        <motion.h1
          className="
            font-title
            text-3xl md:text-6xl font-extrabold tracking-tight
            bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
            bg-[length:300%_300%]
            bg-clip-text text-transparent
          "
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Background Clash
        </motion.h1>
      </div>

      {/* Iconos derecha */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
        <a
          href="https://github.com/JhonLayton21/background-clash"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="
            text-purple-500
            hover:text-purple-600
            transition
            hover:scale-110
            active:scale-95
          "
        >
          <Github size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/jhon-layton/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="
            text-purple-500
            hover:text-purple-600
            transition
            hover:scale-110
            active:scale-95
          "
        >
          <Linkedin size={24} />
        </a>
      </div>
    </header>
  );
}