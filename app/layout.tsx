import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import NavigationBar from "@/components/navigationbar";
import { siteConfig } from "@/config/site";
import { fontGothic } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("bg-background antialiased", fontGothic.className)}>
        <Providers
          themeProps={{ attribute: "class", defaultTheme: "new-dark" }}
        >
          <NavigationBar />
          <main className="container mx-auto max-w-7xl px-2 md:px-6 flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
