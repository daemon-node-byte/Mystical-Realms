import "@/styles/globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { TRPCReactProvider } from "@/trpc/react";
import clsx from "clsx";
import { themeFont2 } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Mystical Realms",
  description: "Explore the mystical realms with in you",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html suppressHydrationWarning lang="en">
      <body className={clsx(themeFont2.className, 'text-foreground bg-background')}>
        <Providers>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}


