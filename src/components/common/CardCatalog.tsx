"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
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
import { useIsMobile } from "@/lib/hooks";
import { Button } from "@nextui-org/button";

const getTarotImgURL = (deck: string, card: TarotCard) =>
  `/assets/images/tarot/${deck.toLowerCase()}/${card.suit.toLowerCase()}/${
    card.image_file_name
  }`;

type DataT = {
  keywords: CardKeywords;
  card_extra: TarotCardExtra;
  interpretations: Interpretations;
};
const CardKeywordsTabContent = ({
  upright,
  reversed,
}: {
  upright: string[];
  reversed: string[];
}) => {
  return (
    <Card>
      <CardBody>
        <Tabs color="primary" variant="underlined">
          <Tab key="upright" title="Upright">
            <Card>
              <CardBody>
                <ListJoin list={upright} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reversed" title="Reversed">
            <Card>
              <CardBody>
                <ListJoin list={reversed} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

const CardTarotImageContent = ({
  imgUrl,
  title,
}: {
  imgUrl: string;
  title: string;
}) => {
  return (
    <Card>
      <CardBody>
        <Image
          className="mx-auto"
          src={imgUrl}
          alt={title}
          width={350}
          height={150}
        />
      </CardBody>
    </Card>
  );
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

const TarotCardDisplay = ({ card }: { card: TarotCard }) => {
  const cardInfo = useSwr(`/api/tarot/cards/more?id=${card.id}`, fetcher);
  const imageUrl = getTarotImgURL("art", card);
  const isMobile = useIsMobile();
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
      <Card className="max-w-screen min-h-[700px]">
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
          <Tabs color='primary' variant="light" placement={isMobile ? "top" : "start"}>
            <Tab key="Image" title="Image">
              <CardTarotImageContent imgUrl={imageUrl} title={card.title} />
            </Tab>

            <Tab key="Keywords" title="Keywords">
              <CardKeywordsTabContent
                upright={data?.keywords.upright}
                reversed={data?.keywords.reversed}
              />
            </Tab>
            <Tab key="summary" title="Summary">
              <Card>
                <CardBody>
                  <p>{data?.card_extra.summary}</p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Interpretations" title="Interpretations">
              <Card>
                <CardBody></CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="space-x-4">
          {[
            { label: "Prev", icon: "bxs:left-arrow" },
            { label: "Next", icon: "bxs:right-arrow" },
          ].map((item, index) => (
            <Button
              key={`${item.label}-${index * 24}`}
              className="w-1/2"
              variant="ghost"
              color="primary"
              startContent={item.label === 'Prev' && <Icon icon={item.icon} />}
              endContent={item.label === 'Next' && <Icon icon={item.icon} />}
              
            >
              {item.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    );
  } else {
    return <Spinner />;
  }
};

export default function CardCatalog({ cards }: { cards: TarotCard[] }) {
  return (
    <section className="flex flex-row flex-wrap justify-around relative max-w-[1000px] space-y-40 snap-mandatory mx-auto">
      <TarotCardCarousel cards={cards} />
    </section>
  );
}

function TarotCardCarousel({ cards }: { cards: TarotCard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const nextCard = () => setCurrentIndex(currentIndex + 1);
  const prevCard = () => setCurrentIndex(currentIndex - 1);
  useEffect(() => {
    if (cards && cards.length > 0) {
      setCurrentCard(cards[currentIndex]);
    }
  }, [currentIndex, currentCard, cards]);
  const btnStyle = clsx("absolute z-10 text-[40px]");
  if (currentCard !== null) {
    return (
      <div className="flex flex-row justify-center items-center space-x-4 relative">
        <TarotCardDisplay card={currentCard} />
      </div>
    );
  } else {
    return <Spinner color="default" size="lg" />;
  }
}
