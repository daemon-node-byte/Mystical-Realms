"use client";

import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/config/site";

export default function ServiceCards({ inView }: { inView: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-16"
      id="service-card-wrapper"
    >
      <AnimatePresence>
        {show &&
          siteConfig.services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index + service.title}
                animate={{ opacity: 1, rotateX: 0 }}
                className="flex gap-4 bg-neutral-800 p-4 md:p-6 items-center rounded-lg transition-all cursor-pointer border hover:border-primary"
                initial={{ opacity: 0, rotateX: 90 }}
                role="listitem"
                aria-label="${service.title} service card"
                tabIndex={index}
                transition={{ duration: 0.5, delay: Math.min(index * 0.2, 0.8) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === '') {
                    //handler function / ;ogic
                  }
                }}
              >
                <div>
                  <Icon size={56} />
                </div>
                <div>
                  <h3 className="inline-block mr-3 font-bold text-xl text-primary">
                    {service.title}
                  </h3>
                  <Chip
                    className={clsx(
                      service.disabled
                        ? "bg-secondary"
                        : "bg-gradient-to-br from-purple-500 to-blue-500",
                    )}
                    size="sm"
                  >
                    {service.disabled ? "Coming soon" : "New"}
                  </Chip>
                  <p className="text-sm md:text-md">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
