"use client";
import React, { Suspense } from "react";
import { Spinner } from "@nextui-org/spinner";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { whisper } from "@/global/fonts";

import NavigationBar from "@/components/custom/NavigationBar";

export default function Page() {
  const hoverEffect = clsx(
    "hover:text-primary-500 transition-all duration-300 ease-in-out"
  );
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <Suspense fallback={<Spinner />}>
          <motion.section
            className={clsx(
              "flex justify-center items-center overflow-hidden border-t-1 border-b-1 border-zinc-200 absolute"
            )}
            initial={{ height: 0 }}
            animate={{ height: "min-content" }}
            transition={{ duration: 3, delay: 0.5, type: "spring" }}
          >
            <div
              className={clsx(whisper.className, "text-center text-5xl px-4")}
            >
              <Link
                className={clsx(hoverEffect, "block mb-8 mt-6")}
                href="/cards/major"
              >
                Major Arcana
              </Link>
              <div className="text-4xl pb-4 pt-6 border-t-1 border-white">
                Minor Arcana
              </div>
              <ul className="space-y-4 my-4">
                <li className={hoverEffect}>
                  <Link href="/cards/cups">Cups</Link>
                </li>
                <li className={hoverEffect}>
                  <Link href="/cards/pentacles">Pentacles</Link>
                </li>
                <li className={hoverEffect}>
                  <Link href="/cards/swords">Swords</Link>
                </li>
                <li className={hoverEffect}>
                  <Link href="/cards/wands">Wands</Link>
                </li>
              </ul>
            </div>
          </motion.section>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
