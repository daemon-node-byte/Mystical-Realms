import { Key, MouseEvent, useEffect, useState } from "react";
import { useIsMobile } from "@/lib/hooks";
import useSwr from "swr";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { Tabs, Tab } from "@nextui-org/tabs";
import { fetcher } from "@/lib/fetcher";
import { whisper } from "@/global/fonts";
import TCImageDisplay from "./TCImageTab";
import TCKeywordsLisT from "./TCKeywordsList";
import { getTarotImgURL } from "@/lib/getTarotImgUrl";
import { motion } from 'framer-motion'

import type {
  TarotCard,
  TarotCardExtra,
  Interpretations,
  CardKeywords,
} from "@prisma/client";

type DataT = {
  keywords: CardKeywords;
  card_extra: TarotCardExtra;
  interpretations: Interpretations;
};

export default function TCDisplayCard({
  card,
  handleClick,
}: {
  card: TarotCard;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const cardInfo = useSwr(`/api/tarot/cards/more?id=${card.id}`, fetcher);
  const {
    data,
    error,
    isLoading,
  }: { data: DataT; error: unknown; isLoading: boolean } = cardInfo;
  const [selectedTab, setSelectedTap] = useState<Key>('Image')
  const changeSelected = (key: Key) => setSelectedTap(key)
  useEffect(() => {
    if (error) {
      throw new Error("error tarot card", error);
    }
  }, [isLoading, error]);

  if (isLoading && data === undefined) {
    return <Spinner />;
  } else if (data !== undefined && !isLoading) {
    return (
      <Card className="max-w-screen h-[820px] w-[410px] sm:w-[600px]">
        <CardHeader className="w-full">
          <span
            className={clsx(
              whisper.className,
              "text-[1.75rem] w-full justify-center sm:text-[2.2rem]"
            )}
          >
            {card.title}
          </span>
          <span className="float-right">{data?.card_extra.roman_numeral}</span>
        </CardHeader>
        <CardBody className={clsx("h-full w-full flex", `${selectedTab === 'Image' ? 'items-start justify-between' : 'items-start'}`)}>
          <CardBodyTabs selectedTab={selectedTab} changeSelected={changeSelected} card={card} data={data} />
        </CardBody>
        <CardFooter className="space-x-4">
          {[
            { label: "Prev", icon: "bxs:left-arrow" },
            { label: "Next", icon: "bxs:right-arrow" },
          ].map((item, index) => (
            <Button
              key={`${item.label}-${index * 24}`}
              onClick={handleClick}
              className="w-1/2"
              variant="ghost"
              color="primary"
              startContent={item.label === "Prev" && <Icon icon={item.icon} />}
              endContent={item.label === "Next" && <Icon icon={item.icon} />}
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
}
const CardBodyTabs = ({ card, data, selectedTab, changeSelected }: { card: TarotCard; data: DataT, selectedTab: Key, changeSelected: (key: Key) => void }) => {
  const isMobile = useIsMobile();
  const imageUrl = getTarotImgURL("art", card);



  return (
    <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ duration: 1 }}>
      <Tabs
        color="primary"
        variant="light"
        placement={isMobile ? "top" : "start"}
        selectedKey={selectedTab as string}
        onSelectionChange={changeSelected}
      >
        <Tab className="w-full h-full mx-auto" key="Image" title="Image" >
          <TCImageDisplay imgUrl={imageUrl} title={card.title} />
        </Tab>

        <Tab key="Keywords" title="Keywords">
          <TCKeywordsLisT
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
    </motion.div>
  );
};