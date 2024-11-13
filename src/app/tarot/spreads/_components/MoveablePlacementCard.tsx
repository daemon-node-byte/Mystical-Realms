"use client";

import { type RefObject, useRef } from "react";
import Moveable from "react-moveable";
import { calculateGridLines } from "@/lib/utils/calculateGridLines";
import type { PlacementCardDimensions } from "@/types/TarotCard";
import type { Position } from "./SpreadLayoutEditor";

type Props = Readonly<{
  element: HTMLElement | SVGElement;
  refObj: RefObject<HTMLDivElement>;
  cardDimensions: PlacementCardDimensions;
  setSelection: (el: HTMLElement) => void;
  update: (el: HTMLElement | SVGElement, id: string, trans: string, pos: Position) => void;
  select?: boolean
}>;

const directions = { left: true, top: true, right: true, bottom: true, middle: true, center: true };

export default function MoveablePlacementCards({
  element,
  select,
  refObj,
  cardDimensions,
  setSelection,
  update,
}: Props) {
  const container = refObj.current;
  const moveableRef = useRef<Moveable | null>(null);
  if (container && element instanceof HTMLElement) {
    const vertLines = calculateGridLines(container.clientHeight, 15);
    const horzLines = calculateGridLines(container.clientWidth, 15);
    
    return (
      <Moveable
        ref={moveableRef}
        target={element}
        draggable={true}
        snappable={true}
        elementGuidelines={Array.from(container.children) as HTMLElement[]}
        snapDirections={directions}
        elementSnapDirections={directions}
        maxSnapElementGuidelineDistance={100}
        maxSnapElementGapDistance={80}
        onClick={({ target }) => {
          setSelection(target as HTMLElement);
        }}
        onDrag={({ target, top, left, transform }) => {
          target.style.transform = transform
          update(target, element.id, target.style.transform, { top, left, rotation: 0});
        }}
        onDragEnd={(arg) => {
          console.log("onDragEnd", arg);
        }}
        bounds={{
          left: 0,
          top: 0,
          right: container.clientWidth,
          bottom: container.clientHeight,
        }}
        snapGridWidth={cardDimensions.width * 2}
        snapGridHeight={cardDimensions.height * 2}
        snapThreshold={5}
        verticalGuidelines={vertLines}
        horizontalGuidelines={horzLines}
        isDisplayInnerSnapDigit={true}
        isDisplayGridGuidelines={true}
        isDisplaySnapDigit={true}
        snapGap={true}
      />
    );
  } else {
    return <div>Error</div>;
  }
}
