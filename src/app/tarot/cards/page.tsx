import { Suspense } from "react";
import NextLink from "next/link";
import { LoadingDotsCSS } from "@/app/_components/ui/LoadingDots.component";
import clsx from "clsx";
import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient } from "@/trpc/server";
import { themeFont1 } from "@/styles/fonts";

export default function Page() {
  return (
    <HydrateClient>
      <PageWrapper>
        <Suspense fallback={<LoadingDotsCSS />}>
          <main
            className={clsx("mx-auto max-w-[1000px]", "pt-6", "text-center")}
          >
            <div>
              <h1 className={clsx("text-3xl")}>Tarot Card Catalog</h1>
              <p className={clsx("text-lg")}>
                Welcome to the Tarot Card Catalog. Here you can find information
                about each card in the Tarot deck.
              </p>
              <p className={clsx("text-lg")}>
                To get started, select a suit from the list below.
              </p>
            </div>
            <div className={clsx("w-full", "relative", "mt-4")}>
              <ul
                className={clsx(
                  "relative",
                  themeFont1.className,
                  "space-y-4 pt-6 text-4xl",
                )}
              >
                <li>
                  <NextLink
                    className="hover:text-primary"
                    href="/tarot/cards/major"
                    passHref
                  >
                    Major Arcana
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="hover:text-primary"
                    href="/tarot/cards/wands"
                    passHref
                  >
                    Wands
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="hover:text-primary"
                    href="/tarot/cards/cups"
                    passHref
                  >
                    Cups
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="hover:text-primary"
                    href="/tarot/cards/swords"
                    passHref
                  >
                    Swords
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    className="hover:text-primary"
                    href="/tarot/cards/pentacles"
                    passHref
                  >
                    Pentacles
                  </NextLink>
                </li>
              </ul>
            </div>
          </main>
        </Suspense>
      </PageWrapper>
    </HydrateClient>
  );
}
