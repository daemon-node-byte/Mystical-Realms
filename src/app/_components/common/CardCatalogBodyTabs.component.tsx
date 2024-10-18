/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { Tabs, Tab } from "@nextui-org/react";
import TarotCardImg from "./TarotCardImg.component";

import clsx from "clsx";
// import useIsMobile from '../../../lib/hooks/useIsMobile';
import type { TarotCardFinal } from "@/types/TarotCard";




type Props = {
  tarotCard?: TarotCardFinal;
};



export default function CardCatalogBodyTabs({ tarotCard }: Props) {
  // const isMobile = useIsMobile();
  return (
    tarotCard?.keywords && (
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
          {tarotCard.keywords?.upright && tarotCard.keywords?.reversed && 
          <CardKeywordsList
            keywords={tarotCard.keywords}
          />
}
        </div>
      </Tab>
    </Tabs>)
  );
}

function CardKeywordsList({
  keywords,
}: Readonly<{
  keywords: { upright: string[]; reversed: string[] };
}>) {
  return (
    <div>
      <ul>
        {keywords.upright.map((keyword, index) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <ul>
        {keywords.reversed.map((keyword, index) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}
