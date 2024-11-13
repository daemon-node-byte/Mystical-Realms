"use client";
import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import MoveablePlacementCards from "./MoveablePlacementCard";
import { Button, ButtonGroup, Switch, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import type { PlacementCardDimensions } from "@/types/TarotCard";
import "./moveable_override.css";
import { v4 as uuidv4 } from "uuid";

export type Position = {
  top: number;
  left: number;
  rotation: number;
}
export interface SaveElementType {
  element: HTMLElement | SVGElement;
  top: number;
  left: number;
  position?: number;
}

const createCard = (cardDimensions: PlacementCardDimensions) => {
  const card = document.createElement("div");
  card.className = "draggable bg-slate-200 rounded cursor-pointer absolute focus:outline-purple-300";
  card.style.width = `${cardDimensions.width}px`;
  const img = document.createElement("img");
  img.src = "/assets/images/tarot/neon/card_back.webp";
  img.alt = "Card Back";
  card.appendChild(img);
  return card;
};

interface PlacementCard {
  id: string;
  top: number;
  left: number;
  topPercent: number;
  leftPercent: number;
  element: HTMLElement | SVGElement;
  rotation: number;
  sequence: number;
  meaning?: string;
}

// Main Parent Component
export default function SpreadLayoutEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState<boolean>(false);
  const [cards, setCards] = useState<PlacementCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const cardDimensions = { width: 40, height: 100 };


  const addCard = () => {
    const card = createCard(cardDimensions);
    const left = 5 + cards.length * 5;
    const top = 5 + cards.length * 5;
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const topPercent = (top / containerRect.height) * 100;
      const leftPercent = (left / containerRect.width) * 100;
      card.style.top = `${topPercent}%`;
      card.style.left = `${leftPercent}%`;
      const cardId = uuidv4();
      card.id = cardId;
      containerRef.current?.appendChild(card);
      setCards((prev) => [
        ...prev,
        {
          id: cardId,
          top,
          left,
          topPercent,
          leftPercent,
          rotation: 0,
          sequence: prev.length + 1,
          element: card,
        },
      ]);
    }
  };
  const handleSelection = (target: HTMLElement) => {
    target.focus();
    if (grouping) {
    if (target.classList.contains("selected")) {
      target.classList.remove("selected");
      setSelectedCardId(null);
      return;
    }
    const elems = document.getElementsByClassName("target");
    if (elems) {
      for (const elem of elems) {
        elem.classList.remove("selected");
      }
      target.classList.add("selected");
      setSelectedCardId(target.id);
    }
  } else {
    return;
  }
  };

  const rotateCard = (id: string) => {
    const regExp = /rotate\((\d*)deg\)/gm;
    const mutatedCards = cards.map((card) => {
      if (card.id === id) {
        card.rotation = card.rotation > 0 ? 0 : 90;
        const rotateVal = `rotate(${card.rotation}deg)`;
        if (!regExp.test(card.element.style.transform)) {
          card.element.style.transform += (' ' + rotateVal);
        } else {
          card.element.style.transform.replace(regExp, () => rotateVal);
        }
      }
      return card;
    })
    setCards(mutatedCards);
  }

  const changeCardOrder = (id: string, direction: 'up' | 'down') => {
    let swapIndex = -1;
    const mutatedCards = cards.map((card, index) => {
      if (card.id === id) {
        swapIndex = index;
        if (direction === 'up') {
          card.sequence = card.sequence - 1;
          if (index > 0 && cards[index - 1] !== undefined) {
            cards[index - 1]!.sequence = cards[index - 1]!.sequence + 1;
          }
        } else {
          card.sequence = card.sequence + 1;
          if (index < cards.length - 1 && cards[index + 1] !== undefined) {
            cards[index + 1]!.sequence = cards[index + 1]!.sequence - 1;
          }
        }
      }
    })
    const swapCopy = [...mutatedCards];
    if (swapIndex >= 0) {
      if (direction === 'up') {
        swapCopy[swapIndex - 1] = mutatedCards[swapIndex];
        swapCopy[swapIndex] = mutatedCards[swapIndex - 1];
      }
      
    } 
  }

  const mapToElementsState = (element: HTMLElement | SVGElement, id: string, transform: string, position: Position) => {
    setCards((prevState) => {
      return prevState.map((card) => {
        const container = containerRef.current!;
        if (card.id === id) {
          return {
            ...card,
            id,
            element,
            top: position.top,
            left: position.left,
            topPercent: (position.top / container.clientHeight) * 100,
            leftPercent: (position.left / container.clientWidth) * 100,
            sequence: card.sequence,
            rotation: position.rotation,
          } 
        } else {
          return {
            ...card
        }
      }
      })
    })
  }

  useEffect(() => {
    if (!grouping) {
      const cardElements = document.querySelectorAll('.draggable');
      cardElements.forEach((elem) => {
        if (elem.classList.contains('selected')) {
          elem.classList.remove('selected');
        }
    });
  }
  }, [grouping]);

  return (
    <div>
      <div className="mx-auto my-4 w-5/6 md:w-1/2">
        <div className="flex justify-around mx-auto w-[100%]">
          <ButtonGroup>
            <Tooltip content="Add Card">
              <Button onClick={addCard} size="sm">
                <Icon className="text-2xl" icon="basil:add-outline" />
              </Button>
            </Tooltip>

          </ButtonGroup>
          <Switch
            size="sm"
            checked={false}
            onChange={() => setGrouping(!grouping)}>Select</Switch>
          <ButtonGroup>
            <Tooltip content="Move Card Order Sequence Up">
              <Button size='sm' onClick={() => changeCardOrder(selectedCardId?? '', 'up')} isDisabled={selectedCardId === null}>
                <Icon className="text-2xl" icon="solar:arrow-up-bold" />
              </Button>
            </Tooltip>
            <Tooltip content="Move Card Order Sequence Down">
              <Button size="sm" onClick={() => changeCardOrder(selectedCardId?? '', 'down')} isDisabled={selectedCardId === null}>
                <Icon className="text-2xl" icon="solar:arrow-down-bold" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Rotate Card">
            <Button size="sm" onClick={() => rotateCard(selectedCardId ?? '')} isDisabled={selectedCardId === null}>
              <Icon
                className="text-2xl"
                icon="ph:arrows-clockwise-fill"
              />
            </Button>
          </Tooltip>
          <Tooltip content="Remove Card">
              <Button size='sm' isDisabled={selectedCardId === null}>
                <Icon className="text-2xl" icon="ion:trash" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
      <div
        className={clsx(
          "relative border-slate-500 bg-slate-800 mx-auto border w-5/6 md:w-1/2 h-[500px]",
          "layout-container"
        )}
        ref={containerRef}
      >
        {cards.map(({ element }, index: number) => {
          return (
            <MoveablePlacementCards
              key={`target-${index}`}
              element={element}
              refObj={containerRef}
              select={grouping}
              cardDimensions={cardDimensions}
              setSelection={handleSelection}
              update={mapToElementsState}
            />
          );
        })}
      </div>
    </div>
  );
}
