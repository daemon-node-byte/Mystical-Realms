"use client";

import { useRef, Fragment } from "react";
import Moveable from "react-moveable";
import { Image } from "@nextui-org/image";

type CardProps = {
  label: string;
  targetId: string;
  idList: string[];
};

const PlacementCard = ({ label, targetId, idList }: CardProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const snapGuidelines = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    center: true,
    middle: true,
  };

  return (
    <Fragment>
      <Moveable
        bounds={{ top: 0, left: 0, right: 0, bottom: 0, position: "css" }}
        draggable={true}
        elementGuidelines={[...idList]}
        isDisplayGridGuidelines={true}
        isDisplayInnerSnapDigit={true}
        snapDirections={snapGuidelines}
        snapGridHeight={10}
        snapGridWidth={10}
        snappable={true}
        target={`.${targetId}`}
        throttleDrag={1}
        onDrag={({ target, transform }) => {
          target.style.transform = transform;
        }}
      />
      <div
        ref={targetRef}
        className={`target ${targetId} w-[40px] bg-primary hover:bg-primary-200 cursor-pointer transition-colors duration-300 ease-in-out`}
      >
        <Image alt="card" src="/images/tarot/decks/art/card_back.webp" />
        <p className="text-xs text-center">{label}</p>
      </div>
    </Fragment>
  );
};

export default PlacementCard;
