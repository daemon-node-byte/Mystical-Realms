"use server";
import { HydrateClient, api } from "@/trpc/server";
import PageWrapper from "@/app/_components/common/PageWrapper";
import clsx from "clsx";
import { themeFont1, themeFont2 } from "@/styles/fonts";
// import NextLink from "next/link";
import NextImage from "next/image";
import { Divider, Image, Link } from "@nextui-org/react";
import { Suspense } from "react";

// const links = [
//   {
//     label: "Cards Viewer",
//     href: (suit: string) => `/tarot/cards/${suit}`,
//   },
//   {
//     label: "Spread Catalog",
//     href: "/tarot/spread",
//   },
//   {
//     label: "Online Reading",
//     href: "/tarot/reading/",
//   },
//   {
//     label: "Tarot Journal",
//     href: "/tarot/journal/",
//   },
// ];

export default async function Page() {
  // const suits = ["wands", "cups", "swords", "pentacles", "major"];
  const todayDate = new Date();
  const cardOfTheDay = await api.cards.randomCard({ number: 1 });
  return (
    <HydrateClient>
      <PageWrapper>
        <header
          className={clsx(
            "mx-auto mt-4 w-3/4 border-b-1 pb-2 text-center",
            "sm:w-1/2",
          )}
        >
          <h1 className={clsx("text-6xl", themeFont1.className)}>Tarot</h1>
          <p className={clsx("text-md mb-4 text-center")}>
            Welcome to the Tarot section. Here you can find links to Tarot
            related features.
          </p>
        </header>

        <main
          className={clsx(
            "item-center mx-auto flex min-w-max max-w-[1000px] flex-col justify-center",
            "md:mt-6 md:flex-row-reverse md:items-start md:justify-around",
          )}
        >
          {/*  */}

          <section
            className={clsx("flex flex-col items-center justify-center")}
          >
            <h2
              className={clsx(
                themeFont2.className,
                "text-center text-lg",
                "md:inline-flex",
              )}
            >
              Card of the day
            </h2>
            <h3 className={clsx("pb-2 text-center", "md:inline-flex")}>
              {todayDate.toDateString()}
            </h3>
            <Suspense fallback={<div>Loading...</div>}>
              {cardOfTheDay.length > 0 && (
                <div className="space-y-4">
                  <h3
                    className={clsx(
                      "text-center text-4xl",
                      themeFont1.className,
                    )}
                  >
                    {cardOfTheDay[0]?.title}
                  </h3>
                  <Image
                    className="mx-auto items-center"
                    as={NextImage}
                    src={`/assets/images/tarot/original/${cardOfTheDay[0]?.tarot_card_id}.webp`}
                    alt={cardOfTheDay[0]?.title}
                    width={280}
                    height={440}
                  />
                </div>
              )}
            </Suspense>
          </section>
          <section id="links" className={clsx("w-3/4 text-center px-2 border-t-1 mt-4 pt-4 mx-auto")}>
            <h3 className={clsx("text-xl")}>The Cards in the Deck</h3>
            <Divider className={clsx('my-3')} />
            <div className={clsx("text-xl text-zinc-400 flex space-x-2 justify-around items-center")}>
              
                <Link href="/tarot/cards/MAJOR?rank=1">Major Arcana</Link>
                <Divider orientation="vertical" />

                <Link href="/tarot/cards/WANDS?rank=1">Wands</Link>
                <Divider orientation="vertical" />
                <Link href="/tarot/cards/CUPS?rank=1">Cups</Link>
                <Divider orientation="vertical" />
                <Link href="/tarot/cards/SWORDS?rank=1">Swords</Link>
                <Divider orientation="vertical" />
                <Link href="/tarot/cards/PENTACLES?rank=1">Pentacles</Link>
              
            </div>
          </section>
        </main>
      </PageWrapper>
    </HydrateClient>
  );
}
