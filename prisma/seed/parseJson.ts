import path from "path";
import fs from "fs";

type TarotCard = {
  tarot_card_id: string;
  title: string;
  rank: number;
  suit: string;
  astrological_sign: string;
  element: string;
  visual_description: string;
  symbolism: [string, string][];
  keywords: {
    upright: string[];
    reversed: string[];
  };
  interpretation: {
    general: { upright: string; reversed: string };
    love: { upright: string; reversed: string };
    career: { upright: string; reversed: string };
    health: { upright: string; reversed: string };
    finance: { upright: string; reversed: string };
    spirituality: { upright: string; reversed: string };
  };
  journey_story: string;
  summary: string;
};

const ROOT = process.cwd();

const rawFile = fs.readFileSync(path.join(ROOT, "prisma/seed/tarot_card.json"), "utf-8");

export const jsonData: TarotCard[] = JSON.parse(rawFile) as TarotCard[];

