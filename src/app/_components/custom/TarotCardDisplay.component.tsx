"use client";
import { useState, useEffect, createContext, useContext } from "react";
import type { TarotCard } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Button
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { themeFont1 } from "@/styles/fonts";
import NextImage from "next/image";


interface CardDetailsContextType extends Partial<TarotCard> {
  deckSet?: string;
}

const CardDetailsContext = createContext<CardDetailsContextType>({});

type Props = {
  cards: Partial<TarotCard>[];
};

const tabLabels = ["Images", "Description", "Keywords", "More"];
// Content: (card: Partial<TarotCard>) => (<div className=""><ul>{card.coreEmotions?.map((emotion, index) => <li key={index}>{emotion}</li>)}</ul></div>)
const more = [
  "Core Emotions",
  "Practical Advice",
  "Reflection Prompt",
  "Extra",
];

const extra = [
  "Astrological Rulership",
  "Themes",
  "Numerology",
  "Fool's Journey",
  "Symbolism",
];

function TarotCardDisplay({ cards }: Props) {
  const [index, setIndex] = useState(0);
  const [viewCard, setViewCard] = useState<Partial<TarotCard>>(cards[index]!);
  const [deckSet] = useState<
    "original" | "neon" | "artistic" | "stained"
  >("original");
  useEffect(() => {
    setViewCard(cards[index]!);
  }, [index, cards]);

  const changeIndex = (currentIndex: number, action: 'prev' | 'next') => {
    if (action=== 'prev' && currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
    if (action === 'next' && currentIndex < cards.length - 1) {
      setIndex(currentIndex + 1);
    }
  }

  return (
    <div className="w-5/6 md:w-1/2 lg:w-2/3">
      <CardDetailsContext.Provider value={{ deckSet, ...viewCard }}>
        <Card className="w-full">
          <CardHeader>
            <h1 className={clsx(themeFont1.className, "text-2xl")}>
              {viewCard.name}
            </h1>
          </CardHeader>
          <CardBody>
            <CardBodyTabs />
          </CardBody>
          <CardFooter>
            <Button startContent={<Icon icon='bxs:left-arrow' />} onClick={() => changeIndex(index, 'prev')} isDisabled={index === 0}>Previous</Button>
            <Button endContent={<Icon icon='bxs:right-arrow' />} onClick={() => changeIndex(index, 'next')} isDisabled={index === cards.length - 1}>Nex</Button>
          </CardFooter>
        </Card>
      </CardDetailsContext.Provider>
    </div>
  );
}

export default TarotCardDisplay;

function TabContent({ tabTitle }: { tabTitle: string }) {
  const card = useContext(CardDetailsContext);
  switch (tabTitle) {
    case "Images":
      return (
        <div className="w-full">
          <NextImage
          className="mx-auto"
            src={`/assets/images/tarot/${card.deckSet}/${card.cardId}.webp`}
            alt={card.name ?? ""}
            width={300}
            height={500}
          />
        </div>
      );
    case "Description":
      return (
        <div>
          <h3>Upright</h3>
          <p>{card.uprightDescription}</p>
          <h3>Reversed</h3>
          <p>{card.reversedDescription}</p>
        </div>
      );
    case "Keywords":
      return (
        <div>
          <ul className="inline">
            <li>Upright</li>
            {card.uprightKeywords?.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
          <ul className="inline">
            <li>Reversed</li>
            {card.reversedKeywords?.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      );
    case "More":
      return (
        <div>
          <Tabs placement="start">
            {more.map((title, index) => (
              <Tab title={title} key={index}>
                <MoreTabContent tabTitle={title} />
              </Tab>
            ))}
          </Tabs>
        </div>
      );
    default:
      return <div>Opps, we seem to have encounter a problem</div>;
  }
}

function MoreTabContent({ tabTitle }: { tabTitle: string }) {
  const card = useContext(CardDetailsContext);
  switch (tabTitle) {
    case "Core Emotions":
      return (
        <div>
          <ul>
            {card.coreEmotions?.map((emotion, index) => (
              <li key={index}>{emotion}</li>
            ))}
          </ul>
        </div>
      );
    case "Practical Advice":
      return (
        <div>
          <p>{card.practicalAdvice}</p>
        </div>
      );
    case "Reflection Prompt":
      return (
        <div>
          <p>{card.reflectionPrompts}</p>
        </div>
      );
    case "Extra":
      return (
        <div>
          <Tabs placement="start">
            {extra.map((title, index) => (
              <Tab title={title} key={index}>
                <ExtraTabContent tabTitle={title} />
              </Tab>
            ))}
          </Tabs>
        </div>
      );
    default:
      return <div>Opps, we seem to have encounter a problem</div>;
  }
}

function ExtraTabContent({ tabTitle }: { tabTitle: string }) {
  const card = useContext(CardDetailsContext);
  switch (tabTitle) {
    case "Astrological Rulership":
      return (
        <div>
          <p>{card.astrologicalRulership}</p>
        </div>
      );
    case "Themes":
      return (
        <div>
          <ul>
            {card.themes?.map((theme, index) => <li key={index}>{theme}</li>)}
          </ul>
        </div>
      );
    case "Numerology":
      return (
        <div>
          <p>{card.numerology}</p>
        </div>
      );
    case "Fool's Journey":
      return (
        <div>
          <p>{card.foolsJourney}</p>
        </div>
      );
    case "Symbolism":
      return (
        <div>
          <p>symbol</p>
        </div>
      );
    default:
      return <div>Opps, we seem to have encounter a problem</div>;
  }
}

function CardBodyTabs() {
  return (
    <Tabs className="mx-auto">
      {tabLabels.map((item) => (
        <Tab className="text-xs md:text-sm" title={item} key={item}>
          <TabContent tabTitle={item} />
        </Tab>
      ))}
    </Tabs>
  );
}
