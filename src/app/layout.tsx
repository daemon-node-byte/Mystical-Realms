import type { Metadata } from "next";
import clsx from "clsx";
import { Analytics } from '@vercel/analytics/react';

import { didactGothic } from "@/global/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "Mystical Realms",
  description: "Explore Mystical Realms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(didactGothic.className, 'text-md md:text-xl', 'dark text-foreground bg-background')}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
