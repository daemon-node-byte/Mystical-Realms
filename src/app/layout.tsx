import type { Metadata } from "next";
import clsx from "clsx";
import { didactGothic } from "@/global/fonts";
import { Analytics } from '@vercel/analytics/react';
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
      <body className={clsx(didactGothic.className, 'text-md md:text-xl')}>
        {children}
        
        <Analytics />
      </body>
    </html>
  );
}
