"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { useInView } from "framer-motion";
import { Link } from "@nextui-org/link";

import ServiceCards from "@/components/service-cards";
import TestimonialsCarousel from "@/components/testimonials";
import { fontWhisper } from "@/config/fonts";

export default function Home() {
  const serviceRef = useRef<HTMLElement>(null);
  const isInServiceView = useInView(serviceRef);

  const handleGetStarted = () => {
    serviceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <section className="flex flex-col h-dvh items-center justify-center">
        <div className="text-center mb-6">
          <h1 className={clsx("font-bold text-3xl md:text-5xl")}>
            Explore Your Destiny
          </h1>
          <h2 className="font-bold md:text-2xl">
            Discover the mystical realm in you.
          </h2>
        </div>
        <Button
          className="theme-gradient"
          radius="full"
          size="md"
          onPress={handleGetStarted}
        >
          Get Started
        </Button>
      </section>
      <section
        ref={serviceRef}
        className="flex flex-col items-center min-h-[60dvh] pt-16"
        id="services"
      >
        <h3 className="text-3xl md:text-5xl font-bold">Our Services</h3>
        <ServiceCards inView={isInServiceView} />
      </section>
      <section className="py-16 min-h-[60dvh] max-w-dvh" id="testimonials">
        <h3 className="text-2xl text-center mt-4 mb-14">
          What our users are saying...
        </h3>
        <TestimonialsCarousel />
        <div className="mt-24 text-center">
          <h3 className="text-3xl mb-10">
            Ready to explore the Mystical Realms?
          </h3>
          <Button className="theme-gradient" radius="full" size="lg">
            Start your journey
          </Button>
        </div>
      </section>
      <footer className="bg-neutral-800 border-t border-neutral-500">
        <p className="text-center py-4">
          <span className={clsx(fontWhisper.className, "text-2xl")}>
            Mystical Realms
          </span>{" "}
          &copy; {new Date().getFullYear()}
        </p>
        <div className="text-center pb-8 space-x-6">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </footer>
    </React.Fragment>
  );
}
