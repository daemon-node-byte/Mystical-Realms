"use client";

import { type RefObject } from "react";
import Moveable from "react-moveable";

import { calculateGridLines } from "@/lib/utils/calculateGridLines";
import { onDragCallback } from "@/lib/utils/onDragCallback";
import type { PlacementCardDimensions } from "@/types/TarotCard";
import type { SaveElementType } from "./SpreadLayoutEditor";

type Props = Readonly<{
  element: HTMLElement | SVGElement;
  index: number;
  refObj: RefObject<HTMLDivElement>;
  cardDimensions: PlacementCardDimensions;
  setSelection: (el: HTMLElement) => void;
  updateElements: ({...arg}: SaveElementType) => void;
  // setElements: Dispatch<SetStateAction<MoveElementState[]>>;
}>;

export default function MoveablePlacementCards({
  element,
  index,
  refObj,
  cardDimensions,
  setSelection,
  updateElements
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
          updateElements({ element: target, top, left });
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
