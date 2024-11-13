"use server";
import { HydrateClient, 
  // api 
} from "@/trpc/server";
import PageWrapper from "@/app/_components/common/PageWrapper";
import clsx from "clsx";
import { themeFont1, themeFont2 } from "@/styles/fonts";
// import NextLink from "next/link";
// import NextImage from "next/image";
import { Divider, 
  // Image, 
  Link } from "@nextui-org/react";
// import { Suspense } from "react";



export default async function Page() {
  // const suits = ["wands", "cups", "swords", "pentacles", "major"];
  // const todayDate = new Date();
  // const cardOfTheDay = await api.cards.randomCard({ number: 1 });
  return (
    <HydrateClient>
      <PageWrapper>
        <header
          className={clsx(
            "mx-auto mt-4 pb-2 border-b-1 w-3/4 text-center",
            "sm:w-1/2",
          )}
        >
          <h1 className={clsx("text-6xl", themeFont1.className)}>Tarot</h1>
          <p className={clsx("mb-4 text-center text-md")}>
            Welcome to the Tarot section. Here you can find links to Tarot
            related features.
          </p>
        </header>

        <main
          className={clsx(
            "flex flex-col justify-center item-center mx-auto min-w-max max-w-[1000px]",
            "md:mt-6 md:flex-row-reverse md:items-start md:justify-around",
          )}
        >
          {/*  */}

          <section
            className={clsx("flex flex-col justify-center items-center")}
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
            {/* <h3 className={clsx("pb-2 text-center", "md:inline-flex")}>
              {todayDate.toDateString()}
            </h3>
            <Suspense fallback={<div>Loading...</div>}>
              {cardOfTheDay.length > 0 && (
                <div className="space-y-4">
                  <h3
                    className={clsx(
                      "text-4xl text-center",
                      themeFont1.className,
                    )}
                  >
                    {cardOfTheDay[0]?.title}
                  </h3>
                  <Image
                    className="items-center mx-auto"
                    as={NextImage}
                    src={`/assets/images/tarot/original/${cardOfTheDay[0]?.tarot_card_id}.webp`}
                    alt={cardOfTheDay[0]?.title}
                    width={280}
                    height={440}
                  />
                </div>
              )}
            </Suspense> */}
          </section>
          <section id="links" className={clsx("mx-auto mt-4 px-2 pt-4 border-t-1 w-3/4 text-center")}>
            <h3 className={clsx("text-xl")}>The Cards in the Deck</h3>
            <Divider className={clsx('my-3')} />
            <div className={clsx("flex justify-around items-center space-x-2 text-xl text-zinc-400")}>
              
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
