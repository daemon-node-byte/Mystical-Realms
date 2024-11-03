"use client";
import {
  useRef,
  useState,
  useEffect,
  type RefObject,
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
  position?: number;
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
  
  const cardDimensions = { width: 65, height: 100 };

  const addCard = () => {
    const card = createCard(cardDimensions);
    const top = 50;
    const left = 50;
    const container = containerRef.current;

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
  const updateElements = (elem: HTMLDivElement, refObj: RefObject<HTMLDivElement>) => {
     const container = refObj.current; 
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const topPercent  =  elem.style.top.split('').includes('%') ? elem.style.top : `${(elem.offsetTop / containerRect.height) * 100}%`;

    }
  }
  const handleSelection = (target: HTMLElement) => {
   const elems = document.getElementsByClassName('target')
    if (elems) {
      for (const elem of elems) {
        elem.classList.remove('selected')
      }
      target.classList.add('selected');
    }

  };

  // const updateElements = ({ element: newEle, top, left }: SaveElementType) => {
  //   const container = containerRef.current;
  //   if (container) {
  //
  //     setElements((prevElements) => {
  //       const mutate = prevElements.map(({ element, top, left }) => {
  //         element.style.top = `${top}px`;
  //         element.style.left = `${left}px`;
  //         return { element, top, left };
  //
  //       })
  //       mutate.push({ element: newEle, top, left });
  //       return mutate
  //     });
  //   }
  // }

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
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;

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
          "relative border-slate-500 bg-slate-800 mx-auto border w-5/6 h-[700px]",
        )}
        ref={containerRef}
      >
        {elements.map(
          ({ element }, index: number) => {


            element.classList.add(`target`, `target-${index}`)
            return (
              <MoveablePlacementCards
                key={`target-${index}`}
                element={element}
                refObj={containerRef}
                index={index}
                cardDimensions={cardDimensions}
                setSelection={handleSelection}
                // updateElements={updateElements}
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
