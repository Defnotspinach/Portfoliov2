import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
function Header({ isDarkMode }) {
  return (
    <motion.header
      className="h-[calc(100vh-64px)] flex flex-col items-center justify-center animate-fadeIn w-full px-4 relative overflow-hidden"
      initial={false}
      animate={{
        color: isDarkMode ? "#ddd" : "#000000",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-2">
        <motion.div
          className="text-[3rem] sm:text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[11rem] font-bold whitespace-nowrap"
          style={{
            WebkitTextStroke: isDarkMode ? '.2px #ffffff' : '.5px #292727',
            color: 'transparent',
            transform: 'rotate(-15deg)',
            opacity: 0.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Full-Stack/Frontend Dev
        </motion.div>
      </div>

      <motion.div
        className="text-center max-w-5xl relative z-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          className="
        text-[4rem]
        sm:text-[5rem]
        md:text-[6rem]
        lg:text-[8rem]
        xl:text-[10rem]
        font-bold
        mb-2
        tracking-tighter
        leading-none
      "
        >
          <span className="header-name">Marc Aedrian</span>
          <br />
          <span
            className="
        block
        header-name
      "
          >
            Andres.
          </span>
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 text-xs sm:text-sm justify-center"
          animate={{
            color: isDarkMode ? "#bbb" : "#555",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <span className="flex items-center gap-1 justify-center">
            <MapPin size={16} /> Cauayan, Isabela
          </span>
          <span className="flex items-center gap-1 justify-center">
            <Mail size={16} /> hed-maandres@smu.edu.ph
          </span>
        </motion.div>
        <motion.p
          className="text-sm sm:text-base leading-relaxed max-w-2xl font-light mx-auto"
          animate={{
            color: isDarkMode ? "#bbb" : "#555",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          I am an Information Technology student specializing in full-stack web
          and mobile development. I enjoy building clean, functional, and scalable
          applications using modern technologies.
        </motion.p>
      </motion.div>
    </motion.header>
  );
}

export default Header;
