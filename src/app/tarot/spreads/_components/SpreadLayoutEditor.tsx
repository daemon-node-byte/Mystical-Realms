"use client";

import {
  useRef,
  useState,
  useEffect,
  type RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import Moveable from "react-moveable";
import { Button, ButtonGroup } from "@nextui-org/react";
import clsx from "clsx";
import "./moveable_override.css";

// type Props = {}
interface Position {
  top: number;
  left: number;
}

interface TargetCallback extends Position {
  target: HTMLElement | SVGElement;
}
interface MoveElementState extends Position {
  element: HTMLElement | SVGElement;
}

interface CardDimensions {
  width: number;
  height: number;
}

type Props = {
  element: HTMLElement;
  index: number;
  refObj: RefObject<HTMLDivElement>;
  cardDimensions: CardDimensions;
  setSelection: (el: HTMLElement) => void;
  // setElements: Dispatch<SetStateAction<MoveElementState[]>>;
};

const calculateGridLines = (maxLength: number, numOfLines: number) => {
  const halfStep = maxLength / numOfLines / 2,
    results = [];
  let counter = 0;
  while (counter < maxLength) {
    counter += halfStep;
    results.push(counter);
  }
  return results;
};

const onDragCallback = ({
  target,
  top,
  left,
  refObj,
}: {
  target: HTMLElement | SVGElement;
  top: number;
  left: number;
  refObj: HTMLDivElement;
}): void => {
  const containerRect = refObj.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const newTop = Math.max(
    0,
    Math.min(top, containerRect.height - targetRect.height),
  );
  const newLeft = Math.max(
    0,
    Math.min(left, containerRect.width - targetRect.width),
  );
  const topPercent = (newTop / containerRect.height) * 100;
  const leftPercent = (newLeft / containerRect.width) * 100;
  target.style.top = `${topPercent}%`;
  target.style.left = `${leftPercent}%`;
};

const onDragEndCallback = ({ target }: { target: HTMLElement }) => {
  const topPercent = parseFloat(target.style.top);
  console.log("🚀 ~ onDragEndCallback ~ topPercent:", topPercent);
  const leftPercent = parseFloat(target.style.left);
  console.log("🚀 ~ onDragEndCallback ~ leftPercent:", leftPercent);
};

export function MoveablePlacementCards({
  element,
  index,
  refObj,
  cardDimensions,
  setSelection,
}: Props) {
  const container = refObj.current;

  if (container && element instanceof HTMLElement) {
    const vertLines = calculateGridLines(container.clientHeight, 15);
    const horzLines = calculateGridLines(container.clientWidth, 15);
    return (
      <Moveable
        id={`element-${index}`}
        target={element}
        draggable={true}
        onClick={({ target }) => {
          setSelection(target as HTMLElement);
        }}
        onDrag={({ target, top, left }) => {
          console.log("onDrag", target, top, left);
          onDragCallback({ target, top, left, refObj: container });
        }}
        onDragEnd={({ target }) => {
          console.log("onDragEnd", target);
          // onDragEndCallback({ target });
        }}
        bounds={{
          left: 0,
          top: 0,
          right: container.clientWidth,
          bottom: container.clientHeight,
        }}
        snappable={true}
        snapGridWidth={cardDimensions.width}
        snapGridHeight={cardDimensions.height}
        snapThreshold={25}
        snapDirections={{
          left: true,
          top: true,
          right: true,
          bottom: true,
          center: true,
          middle: true,
        }}
        elementSnapDirections={{
          left: true,
          top: true,
          right: true,
          bottom: true,
        }}
        verticalGuidelines={vertLines}
        horizontalGuidelines={horzLines}
        isDisplayInnerSnapDigit={true}
        isDisplayGridGuidelines={true}
      />
    );
  } else {
    return <div>Error</div>;
  }
}

export function PlacementAreaControls({ addCard }: { addCard: () => void }) {
  const btnStyle = "w-full sm:w-auto";
  return (
    <div className="p-6">
      <h2>Controls</h2>
      <ButtonGroup>
        <Button onClick={addCard} className={btnStyle}>
          Add Card
        </Button>
        <Button className={btnStyle}>Remove Card</Button>
        <Button className={btnStyle}>Lock Card</Button>
      </ButtonGroup>
      <h2 className="mt-4">Layout</h2>
      <ButtonGroup>
        <Button className={btnStyle}>Save Layout</Button>
        <Button className={btnStyle}>Load Layout</Button>
        <Button className={btnStyle}>Reset Layout</Button>
      </ButtonGroup>
    </div>
  );
}

const createCard = (cardDimensions: CardDimensions) => {
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
  const [elements, setElements] = useState<
    { element: HTMLElement; top: number; left: number }[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<string | string[] | null>(
    null,
  );
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
  const handleSelection = (target: HTMLElement) => {
    if (target.classList.contains("draggable")) {
      setSelectedCard(target.id);
    } else {
      setSelectedCard(null);
    }
  };

  useEffect(() => {
    console.log("useEffect", elements);
    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
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
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elements]);

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
          ({ element }: { element: HTMLElement }, index: number) => {
            element.id = `element-${index}`;
            return (
              <MoveablePlacementCards
                key={`element-${index}-key`}
                element={element}
                refObj={containerRef}
                index={index}
                cardDimensions={cardDimensions}
                setSelection={handleSelection}
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
