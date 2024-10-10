"use client";
import { type ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

export default function Providers({
  children,
}: {
  readonly children: ReactNode;
}) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={(href) => router.push(href)}>
      <NextThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}
