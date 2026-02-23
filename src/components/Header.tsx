import { motion } from "framer-motion";
import { Github, Linkedin, Heart } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shrink-0">
      
      {/* 🔹 Barra superior */}
      <div className="flex items-center justify-between px-4 md:px-6 py-2">
        
        {/* Texto izquierda */}
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
          <span>Hecho con</span>

          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />

          <span>por</span>

          <a
            href="https://github.com/JhonLayton21"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-medium
              text-purple-500
              hover:text-purple-600
              hover:underline
              transition
            "
          >
            Jhon Brandon Layton Rodriguez
          </a>
        </div>

        {/* Iconos derecha */}
        <div className="flex items-center gap-2 md:gap-4">
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
            <Github className="w-5 h-5 md:w-6 md:h-6" />
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
            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>
      </div>

      {/* 🔹 Título */}
      <div className="flex items-center justify-center h-16 md:h-24 px-4">
        <motion.h1
          className="
            font-title
            text-2xl sm:text-3xl md:text-6xl
            font-extrabold tracking-tight
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

    </header>
  );
}