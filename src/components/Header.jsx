import React from "react";
import { motion } from "framer-motion";

function Header({ isDarkMode }) {
  return (
    <motion.header
      className="mb-12 sm:mb-16 animate-fadeIn w-full"
      initial={false}
      animate={{
        color: isDarkMode ? "#ddd" : "#000000",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <motion.p
        className="
    text-[3.5rem]
    sm:text-[4.5rem]
    md:text-[5.5rem]
    lg:text-[6.5rem]
    xl:text-[7.5rem]
    font-bold
    mb-2
    tracking-tight
  "
      >
        <span className="header-name">Marc Aedrian</span>
        <br />
        <span
          className="
    block
    text-[4.5rem]
    sm:text-[5.5rem]
    md:text-[6.5rem]
    lg:text-[9.5rem]
    xl:text-[10.5rem]
    mt-[-90px]
    header-name
  "
        >
          Andres.
        </span>
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl lg:text-2xl mb-4 font-medium"
        animate={{
          color: isDarkMode ? "#aaa" : "#666",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        Full-Stack / Frontend Developer
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 text-xs sm:text-sm"
        animate={{
          color: isDarkMode ? "#bbb" : "#555",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <span className="flex items-center gap-1">
          📍 Cauayan City, Isabela
        </span>
        <span className="flex items-center gap-1">
          ✉️ hed-maandres@smu.edu.ph
        </span>
      </motion.div>
      <motion.p
        className="text-sm sm:text-base leading-relaxed max-w-2xl font-light"
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
    </motion.header>
  );
}

export default Header;
