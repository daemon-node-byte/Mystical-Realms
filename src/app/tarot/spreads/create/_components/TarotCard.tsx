// components/TarotCard.tsx
import React, { useState } from "react";
import Draggable, {
  type DraggableEvent,
  type DraggableData,
} from "react-draggable";

interface TarotCardProps {
  id: number;
  position: { x: number; y: number };
  updateCardPosition: (id: number, position: { x: number; y: number }) => void;
}

const TarotCard: React.FC<TarotCardProps> = ({
  id,
  position,
  updateCardPosition,
}) => {
  const [rotation, setRotation] = useState<number>(0);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 180);
  };

  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    updateCardPosition(id, { x: data.x, y: data.y });
  };

  return (
    <Draggable position={position} onStop={handleStop}>
      <div
        className="absolute flex justify-center items-center bg-blue-500 w-24 h-36 text-white cursor-pointer"
        style={{ transform: `rotate(${rotation}deg)` }}
        onDoubleClick={handleRotate}
      >
        Card {id}
      </div>
    </Draggable>
  );
};

export default TarotCard;
