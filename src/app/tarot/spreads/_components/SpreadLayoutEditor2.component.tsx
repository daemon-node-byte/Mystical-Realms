/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, ButtonGroup } from "@nextui-org/react";
import clsx from "clsx";
import "./moveable_override.css";

interface SaveElementType {
  element: HTMLElement | SVGElement;
  top: number;
  left: number;
  rotation: number;
}

const createCard = (cardDimensions: { width: number; height: number }) => {
  const card = document.createElement("div");
  card.className = "draggable bg-slate-200 rounded cursor-pointer absolute";
  card.style.width = `${cardDimensions.width}px`;
  card.style.height = `${cardDimensions.height}px`;
  const img = document.createElement("img");
  img.src = "/assets/images/tarot/neon/card_back.webp";
  img.alt = "Card Back";
  card.appendChild(img);
  return card;
};

export default function SpreadLayoutEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<SaveElementType[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | string[] | null>(
    null
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
        { element: card, top: topPercent, left: leftPercent, rotation: 0 },
      ]);
    }
  };

  const handleSelection = (target: HTMLElement | SVGElement) => {
    if (target.classList.contains("draggable")) {
      setSelectedCard(target.id);
    } else {
      setSelectedCard(null);
    }
  };

  const updateElements = ({ element: newEle, top, left, rotation }: SaveElementType) => {
    const container = containerRef.current;
    if (container) {
      setElements((prevElements) => {
        const mutate = prevElements.map(({ element, top, left, rotation }) => {
          element.style.top = `${top}%`;
          element.style.left = `${left}%`;
          element.style.transform = `rotate(${rotation}deg)`;
          return { element, top, left, rotation };
        });
        mutate.push({ element: newEle, top, left, rotation });
        return mutate;
      });
    }
  };

  const rotateCard = (index: number) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      if (newElements[index]) {
        newElements[index].rotation = (newElements[index].rotation + 90) % 360;
        if (newElements[index].element) {
          newElements[index].element.style.transform = `rotate(${newElements[index].rotation}deg)`;
        }
      }
      return newElements;
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("tarotSpread", JSON.stringify(elements));
  };

  const saveToDatabase = async () => {
    // Implement the API call to save the layout to the database
  };

  useEffect(() => {
    const savedElements = localStorage.getItem("tarotSpread");
    if (savedElements) {
      setElements(JSON.parse(savedElements));
    }
  }, []);

  useEffect(() => {
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
      prevElements.map(({ element, top, left, rotation }) => {
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.transform = `rotate(${rotation}deg)`;
        return { element, top, left, rotation };
      })
    );
  };

  return (
    <div className="p-6">
      <h2>Spread Layout Editor</h2>
      <ButtonGroup>
        <Button onClick={addCard} className="w-full sm:w-auto">
          Add Card
        </Button>
        <Button onClick={saveToLocalStorage} className="w-full sm:w-auto">
          Save to Local Storage
        </Button>
        <Button onClick={saveToDatabase} className="w-full sm:w-auto">
          Save to Database
        </Button>
      </ButtonGroup>
      <div ref={containerRef} className="relative bg-gray-100 mt-4 w-full h-[500px]">
        {elements.map((el, index) => (
          <Draggable key={index}>
            <div
              className="draggable"
              style={{
                top: `${el.top}%`,
                left: `${el.left}%`,
                transform: `rotate(${el.rotation}deg)`,
              }}
              onClick={() => handleSelection(el.element)}
            >
              
              <Button onClick={() => rotateCard(index)}>Rotate</Button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}