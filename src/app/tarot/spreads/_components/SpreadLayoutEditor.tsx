"use client";
import {
  useRef,
  useState,
  useEffect,
} from "react";
import MoveablePlacementCards from "./MoveablePlacementCard";
import PlacementAreaControls from './PlacementAreaControls'
import clsx from "clsx";
import type { PlacementCardDimensions } from "@/types/TarotCard";
import "./moveable_override.css";

export interface SaveElementType {
  element: HTMLElement | SVGElement;
  top: number;
  left: number;
}


const createCard = (cardDimensions: PlacementCardDimensions) => {
  const card = document.createElement("div");
  card.className = "draggable bg-slate-200 rounded cursor-pointer absolute";
  card.style.width = `${cardDimensions.width}px`;
  // card.style.height = `${cardDimensions.height}px`;
  const img = document.createElement("img");
  img.src = "/assets/images/tarot/neon/card_back.webp";
  img.alt = "Card Back";
  card.appendChild(img);
  return card;
};

// Main Parent Component
export default function SpreadLayoutEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<SaveElementType[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | string[] | null>(
    null,
  );
  const cardDimensions = { width: 65, height: 100 };

  const addCard = () => {
    const card = createCard(cardDimensions);
    const top = 50;
    const left = 50;
    const container = containerRef.current;
    console.log("🚀 ~ SpreadLayoutEditor ~ selectedCard:", selectedCard)
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const topPercent = (top / containerRect.height) * 100;
      const leftPercent = (left / containerRect.width) * 100;
      card.style.top = `${topPercent}%`;
      card.style.left = `${leftPercent}%`;
      containerRef.current?.appendChild(card);
      setElements((prevElements) => [

        ...prevElements,
        { element: card, top: topPercent, left: leftPercent },
      ]);
    }
  };
  const handleSelection = (target: HTMLElement) => {
    if (target.classList.contains("draggable")) {
      setSelectedCard(target.id);
    } else {
      setSelectedCard(null);
    }
  };

  const updateElements = ({ element: newEle, top, left }: SaveElementType) => {
    const container = containerRef.current;
    if (container) { 

      setElements((prevElements) => {
        const mutate = prevElements.map(({ element, top, left }) => {
          element.style.top = `${top}%`;
          element.style.left = `${left}%`;
          return { element, top, left };

        })
        mutate.push({ element: newEle, top, left });
        return mutate      
      });
    }
  }

  useEffect(() => {
    console.log("useEffect", elements);

    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        updateElementStyles();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elements]);

  const updateElementStyles = () => {
    setElements((prevElements) =>
      prevElements.map(({ element, top, left }) => {
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;

        console.log("🚀 ~ setElements ~ { element, top, left }:", {
          element,
          top,
          left,
        });
        return { element, top, left };
      }),
    );
  };

  return (
    <div>
      <h1>Spread Layout Editor</h1>
      <div
        className={clsx(
          "relative mx-auto h-[700px] w-5/6 border border-slate-500 bg-slate-800",
        )}
        ref={containerRef}
      >
        {elements.map(
          ({ element }, index: number) => {
            const uniqueId = element.id || `element-${Date.now()}-${index}`;
            element.id = uniqueId;
            return (
              <MoveablePlacementCards
                key={uniqueId}
                element={element}
                refObj={containerRef}
                index={index}
                cardDimensions={cardDimensions}
                setSelection={handleSelection}
                updateElements={updateElements}
                // setElements={setElements}
              />
            );
          },
        )}
      </div>
      <div className="mt-4">
        <PlacementAreaControls addCard={addCard} />
      </div>
    </div>
  );
}
