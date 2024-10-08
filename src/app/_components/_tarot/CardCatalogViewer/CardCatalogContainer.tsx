'use Client';

import TCCarousel from "./TCCarousel";
import { TarotCard } from "@prisma/client";

export default function CardCatalogContainer({ cards }: { cards: TarotCard[] }) {
  return (
    <section className="flex flex-row flex-wrap justify-center items-center relative max-w-[1000px] space-y-40 mx-auto h-screen">
      <TCCarousel cards={cards} />
    </section>
  );
}