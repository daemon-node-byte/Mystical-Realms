"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";

import SpreadEditor from "@/components/SpreadEditor";
import { useSupabaseClient } from "@/hooks/useSupabase";

export default function Page() {
  const supabase = useSupabaseClient();

  const [cards, setCards] = useState<
    { id: string; position: string; label: string }[]
  >([]);
  const [targetList, setTargetList] = useState<string[]>([]);

  useEffect(() => {
    const list = cards.map((card) => card.id);

    setTargetList(list);
  }, [cards]);

  const addCard = () => {
    const id = cards.length + 1;

    setCards((prev) => [
      ...prev,
      { id: `card-${id}`, position: "0px, 0px", label: `Card-${id}` },
    ]);
  };

  const handleSave = () => {
    window.alert(
      `save: ${JSON.stringify(cards)}\n\n${JSON.stringify(supabase)}`,
    );
  };

  return (
    <div>
      <Button onPress={addCard}>Add</Button>
      <Button onPress={handleSave}>Save</Button>
      <SpreadEditor.PlacementArea>
        {cards.length > 0 &&
          cards.map((card) => (
            <SpreadEditor.PlacementCard
              key={card.id}
              idList={targetList}
              label={card.label}
              targetId={card.id}
            />
          ))}
      </SpreadEditor.PlacementArea>
    </div>
  );
}
