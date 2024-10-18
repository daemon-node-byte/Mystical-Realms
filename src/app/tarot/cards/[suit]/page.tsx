"use client";
import { Suspense, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { themeFont1, themeFont2 } from "@/styles/fonts";
import type { TarotCardFinal } from "@/types/TarotCard"; // Ensure this import is correct and TarotCardFinal is properly defined in the types file

import CardCatalogBodyTabs from "@/app/_components/common/CardCatalogBodyTabs.component";
import { isNotNull } from "@/lib/utils/isNotNull";



interface Props {
  params: {
    suit: string;
  };
  searchParams: {
    rank: string;
  };
	cards: TarotCardFinal[];
}


export default function Page({ params, searchParams, cards }: Props) {
  const { suit } = params;
  const { rank } = searchParams;
  const [currentIndex, setCurrentIndex] = useState(0);
const [currentCard, setCurrentCard] = useState<TarotCardFinal | null>(null);

  const btnStyle = clsx(
    "p-2",
    "m-2",
    "w-1/2",
    "text-center",
    clsx("p-2", "m-2", "w-1/2", "text-center"),
  );

    return (
      <main className={clsx("mx-auto max-w-[1000px]")}>
        <Card className={clsx("w-full sm:w-3/4 md:w-1/2 lg:w-1/2", "mx-auto")}>
          <CardHeader className={clsx("relative w-full")}>
						<h2>{}</h2>
					</CardHeader>
          <CardBody>
            <Suspense fallback={<div>Loading...</div>}>
              <CardCatalogBodyTabs />
            </Suspense>
          </CardBody>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Button
                as={NextLink}
                variant="ghost"
                className={btnStyle}
                href={`/tarot/cards/${suit.toUpperCase()}?rank=${+rank + 1}`}
              >
                Previous Card
              </Button>
              <Button
                as={NextLink}
                variant="ghost"
                className={btnStyle}
                href={`/tarot/cards/${suit.toUpperCase()}?rank=${+rank + 1}`}
              >
                Next Card
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    );
  }
