import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="flex h-20 items-center justify-center border-b border-gray-200 px-6 bg-white shrink-0">
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
    </header>
  );
}
