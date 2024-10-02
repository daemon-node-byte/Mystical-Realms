"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { whisper } from "@/global/fonts";
import IconLink from "@/components/common/IconLink";
import UnderConstruction from "@/components/custom/UnderConstrution";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[1200px] mx-auto">
      <motion.h1
        className={clsx(
          whisper.className,
          "text-5xl md:text-7xl xl:text-8xl mb-2 md:mb-4"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mystical Realms
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
      >
        Discover the mystic in the realm of you
      </motion.p>
      <motion.p
        className="mt-8 text-orange-400"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, type: "spring" }}
      >
        Coming Soon
      </motion.p>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
      >
        <IconLink name="Github" size={64} />
      </motion.div>
      <UnderConstruction />
    </div>
  );
}
