/* eslint-disable @typescript-eslint/no-unsafe-argument */
// pages/index.tsx
"use client"
import { useState, useEffect, useRef } from 'react';
import Moveable from 'react-moveable';
import clsx from 'clsx';



interface Card {
  id: number;
  position: { x: number; y: number };
  description: string;
  sequence: number;

}

export default function ClientSidePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Load from localStorage if available
    // const savedCards = localStorage.getItem('tarotCards');
    // if (savedCards) {
    //   setCards(JSON.parse(savedCards));
    // } else {
      // Initialize with default cards
      setCards([
        { id: 1, position: { x: 0, y: 0 }, description: '', sequence: 1 },
        { id: 2, position: { x: 100, y: 0 }, description: '', sequence: 2 },
        // Add more cards as needed
      ]);
    // }
  }, []);

  const updateCardPosition = (id: number, position: { x: number; y: number }) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, position } : card
      )
    );
  };

  const updateSequence = (id: number, sequence: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, sequence } : card
      )
    );
  };

  const updateDescription = (id: number, description: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, description } : card
      )
    );
  };

  useEffect(() => {
    // Autosave to localStorage
    localStorage.setItem('tarotCards', JSON.stringify(cards));
  }, [cards]);

  const saveToDatabase = async () => {
    try {
      const response = await fetch('/api/saveSpread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cards })
      });
      console.log('Response:', response);
      // const data = await response.json();
      // Display shareable link
      // alert(`Spread saved! Shareable link: /spread/${data.id}`);
    } catch (error) {
      console.error('Error saving spread:', error);
    }
  };
  // const container = document.getElementById('placementBounds');
  return (
<main>
  <div ref={elementRef} id="container relative" className='bg-zinc-600 w-4/5 h-80'>
    {cards.map((card) => {


      return (
<>
          <div key={`card-${card.id}`} className={clsx('target', `target${card.sequence}`, 'w-10 h-12', 'bg-zinc-400 border border-zinc-200', 'absolute',
            `top-[${card.position.y}%]`, `left-[${card.position.x}]%`, 'z-10')} ></div>

    <Moveable
                        target={".target"}
                        individualGroupable={true}
                        draggable={true}
                        throttleDrag={1}
                        edgeDraggable={false}
                        startDragRotate={0}
                        throttleDragRotate={0}
                        scalable={true}
                        keepRatio={false}
                        throttleScale={0}
                        renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                        rotatable={true}
                        throttleRotate={0}
                        rotationPosition={"top"}
                        onDrag={e => {
                            e.target.style.transform = e.transform;
                        }}
                        onScale={e => {
                           e.target.style.transform = e.drag.transform;
                        }}
                        onRotate={e => {
                            e.target.style.transform = e.drag.transform;
                        }}
                 />
</>

    )
    })}
  </div>
</main>
  )
}
