/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import useIsMobile from '@/lib/hooks/useIsMobile';

const DraggableArea = () => {
  const [positions, setPositions] = useState<{ [key: string]: { x: number, y: number } }>({});
  const parentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const savedPositions: { [key: string]: { x: number, y: number } } = JSON.parse(localStorage.getItem('positions') ?? '{}');
    setPositions(savedPositions);
  }, []);

  const handleStop = (e: DraggableEvent, data: DraggableData, id: string) => {
    const newPositions = {
      ...positions,
      [id]: { x: data.x, y: data.y }
    };
    setPositions(newPositions);
    localStorage.setItem('positions', JSON.stringify(newPositions));
  };

  const elements = [
    { id: 'element1', content: 'Element 1' },
    { id: 'element2', content: 'Element 2' },
    { id: 'element3', content: 'Element 3' },

    // Add more elements as needed
  ];
  const areaStyle = isMobile ? 'h-[500px] w-11/12' : 'h-[800px]';
  const cardStyle = isMobile ? 'w-[40px] h-[75px]' : 'w-[100px] h-[230px]';

  return (
    <div ref={parentRef} className={clsx("draggable-area relative", 'border bg-slate-900 w-11/12 mx-auto', areaStyle)}>
      {elements.map(element => (
        <Draggable
          bounds="parent"
          key={element.id}
          position={positions[element.id] ?? { x: 0, y: 0 }}
          onStop={(e, data) => handleStop(e, data, element.id)}
          offsetParent={parentRef?.current ?? undefined}
          grid={[24, 24]}
        >
          <div className={clsx("draggable-element", "bg-slate-200 border border-primary rounded cursor-pointer", cardStyle)}>
            {element.content}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableArea;