"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { whisper } from "@/global/fonts";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[1200px] mx-auto">
      <motion.h1 
      className={clsx(whisper.className, 'text-5xl md:text-7xl xl:text-8xl mb-2 md:mb-4')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >Mystical Realms</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >Discover the mystic in the realm of you</motion.p>
    </div>
  );
}
