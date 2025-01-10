"use client";

import { useRef, type ReactNode } from "react";

export default function PlacementArea({ children }: { children: ReactNode }) {
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={boundsRef}
      className="bounds relative h-[400px] border mt-4 mx-auto "
    >
      {children}
    </div>
  );
}
