"use client";
import { useEffect } from "react";

import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Spinner } from "@nextui-org/spinner";
import { whisper } from "@/global/fonts";
import clsx from "clsx";
import useSwr from "swr";
import { fetcher } from "@/lib/fetcher";
import type {
  TarotCard,
  TarotCardExtra,
  Interpretations,
  CardKeywords,
} from "@prisma/client";

const getTarotImgURL = (deck: string, card: TarotCard) =>
  `/assets/images/tarot/${deck.toLowerCase()}/${card.suit.toLowerCase()}/${
    card.image_file_name
  }`;

type DataT = {
  keywords: CardKeywords;
  card_extra: TarotCardExtra;
  interpretations: Interpretations;
};

const ListJoin = ({ list }: { list: string[] }) => {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
};

const TarotCard = ({ card }: { card: TarotCard }) => {
  const cardInfo = useSwr(`/api/tarot/cards/more?id=${card.id}`, fetcher);
  const imageUrl = getTarotImgURL("art", card);
  const {
    data,
    error,
    isLoading,
  }: { data: DataT; error: unknown; isLoading: boolean } = cardInfo;
  useEffect(() => {
    if (error) {
      throw new Error("error tarot card", error);
    }
  }, [isLoading, error]);
  if (isLoading && data === undefined) {
    return <Spinner />;
  } else if (data !== undefined && !isLoading) {
    return (
      <Card className="max-w-content min-h-screen">
        <CardHeader className="w-full">
          <span
            className={clsx(
              whisper.className,
              "text-[1.75rem] w-full justify-center"
            )}
          >
            {card.title}
          </span>
          <span className="float-right">{data?.card_extra.roman_numeral}</span>
        </CardHeader>
        <CardBody className="snap-center">
          <Image
            className="mx-auto"
            src={imageUrl}
            alt={card.title}
            width={350}
            height={150}
          />
          <p>Keywords</p>
          <Tabs>
            <Tab key="upright" title="upright">
              <Card>
                <CardBody>
                  <ListJoin list={data.keywords.upright} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="reverse" title="reverse">
              <Card>
                <CardBody>
                  <ListJoin list={data?.keywords.reversed} />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  } else {
    return <Spinner />;
  }
};

export default function CardCatalog({ cards }: { cards: TarotCard[] }) {
  return (
    <section className="flex flex-row flex-wrap justify-around relative max-w-[1000px] space-y-40 snap-mandatory">
      {cards.map((card, index) => (
        <TarotCard key={`${index}${card.suit}`} card={card} />
      ))}
    </section>
  );
}
