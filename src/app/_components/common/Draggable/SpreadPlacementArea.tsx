'use client'
import React, { useState, useRef } from 'react';
import Moveable from 'react-moveable';
import clsx from 'clsx';
import { calculateGridLines } from '@/lib/utils/calculateGridLines';


const SpreadPlacementArea: React.FC = () => {
  const [targets, setTargets] = useState<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTarget = () => {
    const newTarget = document.createElement('div');
    newTarget.className = 'draggable';
    newTarget.style.width = '45px';
    newTarget.style.height = '80px';
    newTarget.style.background = 'lightblue';
    newTarget.style.position = 'absolute';
    newTarget.style.top = '50px';
    newTarget.style.left = '50px';
    containerRef.current?.appendChild(newTarget);
    setTargets([...targets, newTarget]);
  };

  return (
    <div>
      <button onClick={addTarget}>Add Draggable Element</button>
      <div
        ref={containerRef}
       
        className={clsx('relative mx-auto w-11/12 h-[500px] border bg-slate-700')}
      >
        {targets.map((target, index) => (
          <Moveable
            key={index}
            target={target}
            draggable={true}
            onDrag={({ target, left, top }) => {
              const container = containerRef.current;
              if (container) {
                const containerRect = container.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const newLeft = Math.max(0, Math.min(left, containerRect.width - targetRect.width));
                const newTop = Math.max(0, Math.min(top, containerRect.height - targetRect.height));
                target.style.left = `${newLeft}px`;
                target.style.top = `${newTop}px`;
              }
            }}
            bounds={{
              left: 0,
              top: 0,
              right: containerRef.current?.clientWidth,
              bottom: containerRef.current?.clientHeight,
            }}
            snappable={true}
            snapThreshold={5}
            snapGridWidth={50}
            snapGridHeight={50}
            snapDirections={{ left: true, top: true, right: true, bottom: true, center: true, middle: true }}
            verticalGuidelines={calculateGridLines(500, 10, 50)}
            horizontalGuidelines={calculateGridLines(500, 7, 50)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpreadPlacementArea;

const gridLines = calculateGridLines(500, 10, 50);
console.log("🚀 ~ gridLines:", gridLines)