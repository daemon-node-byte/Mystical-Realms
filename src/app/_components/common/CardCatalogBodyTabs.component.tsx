/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { Tabs, Tab } from "@nextui-org/react";
import TarotCardImg from "./TarotCardImg.component";
import type { TarotCard, CardKeywords } from "@prisma/client";

import clsx from "clsx";
import useIsMobile from '../../../lib/hooks/useIsMobile';


type Props = {
  tarotCard: TarotCard | null;
  keywords: CardKeywords | null;
};

export default function CardCatalogBodyTabs({ tarotCard, keywords }: Props) {
  const isMobile = useIsMobile();
  return (
    tarotCard !== null && keywords !== null && (
    <Tabs className={clsx('mx-auto')}>
      <Tab key="images" title="Images">
        <div className={clsx('flex justify-center items-center w-full')}>
          <TarotCardImg
            deck="original"
            fileName={tarotCard?.image_file ?? ""}
            alt={tarotCard?.title ?? ""}
            height={500}
            width={300}
          />
        </div>
      </Tab>
      <Tab key="summary" title="Summary">
        <div>
          <p>{tarotCard?.summary ?? ""}</p>
        </div>
      </Tab>
      <Tab key="keywords" title="Keywords">
        <div>
          {keywords?.upright && keywords?.reversed && 
          <CardKeywordsList
            keywords={keywords}
          />
}
        </div>
      </Tab>
    </Tabs>)
  );
}

function CardKeywordsList({
  keywords,
}: {
  keywords: { upright: string[]; reversed: string[] };
}) {
  return (
    <div>
      <ul>
        {keywords.upright.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
      <ul>
        {keywords.reversed.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}
