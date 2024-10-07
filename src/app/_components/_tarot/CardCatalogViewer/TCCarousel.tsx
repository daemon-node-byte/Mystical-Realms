'use client';
import { useState, useEffect, MouseEvent } from "react";
import { Spinner } from '@nextui-org/spinner'
import TCDisplayCard from "./TCDisplayCard";
import { TarotCard } from "@prisma/client";

export default function TCCarousel ({ cards }: { cards: TarotCard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const nextCard = () => setCurrentIndex(currentIndex + 1);
  const prevCard = () => setCurrentIndex(currentIndex - 1);
  const navigateCarousel = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.innerText === 'Next') {
      if (currentIndex + 1 < cards.length && currentIndex >= 0) {
        nextCard()
      }
    }
    if (event.currentTarget.innerText === 'Prev') {
      if (currentIndex + 1 <= cards.length && currentIndex > 0) {
        prevCard()
      }
    }
  }
  console.log(`CanNavPrev: ${(currentIndex + 1 <= cards.length && currentIndex > 0)}`, `\nCanGoForward: ${(currentIndex + 1 < cards.length && currentIndex >= 0)}`)
  useEffect(() => {
    if (cards && cards.length > 0) {
      setCurrentCard(cards[currentIndex]);
    }
  }, [currentIndex, currentCard, cards]);
  if (currentCard !== null) {
    return (
      <div className="flex flex-row justify-center items-center space-x-4 relative">
        <TCDisplayCard handleClick={navigateCarousel} card={currentCard} />
      </div>
    );
  } else {
    return <Spinner color="default" size="lg" />;
  }
}