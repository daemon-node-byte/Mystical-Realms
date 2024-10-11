import { TarotCardExtra } from "@prisma/client";

export interface TarotCard {
  tarot_card_id: string;
  title: string;
  rank: number;
  suit: string;
  astrological_sign: string;
  planet: string | null;
  element: string;
  visual_description: string;
  symbolism: [string, string][];
  keywords: {
    upright: string[];
    reversed: string[];
  };
  interpretation: {
    general: {
      upright: string;
      reversed: string;
    };
    love: {
      upright: string;
      reversed: string;
    };
    career: {
      upright: string;
      reversed: string;
    };
    health: {
      upright: string;
      reversed: string;
    };
    finance: {
      upright: string;
      reversed: string;
    };
    spirituality: {
      upright: string;
      reversed: string;
    };
  };
  journey_story: string;
  summary: string;
}

export interface MajorArcanaCard {
  name: string;
  rank_int: number;
  description: string[];
}

export interface MajorArcana {
  major: {
    cards: MajorArcanaCard[];
  };
}

export interface MinorArcanaCard {
  name: string;
  rank_int: number;
  description: string;
}

export interface MinorArcanaSuit {
  element: string;
  description: string;
  cards: MinorArcanaCard[];
}

export interface MinorArcana {
  wands: MinorArcanaSuit;
  pentacles: MinorArcanaSuit;
  cups: MinorArcanaSuit;
  swords: MinorArcanaSuit;
}

export interface Archtype extends MajorArcana, MinorArcana {}


export interface ZodiacSign {
  date_range: string;
  ruling_planet: string;
  cards: string[];
}


export interface Zodiac {
  Aries: ZodiacSign;
  Taurus: ZodiacSign;
  Gemini: ZodiacSign;
  Cancer: ZodiacSign;
  Leo: ZodiacSign;
  Virgo: ZodiacSign;
  Libra: ZodiacSign;
  Scorpio: ZodiacSign;
  Sagittarius: ZodiacSign;
  Capricorn: ZodiacSign;
  Aquarius: ZodiacSign;
  Pisces: ZodiacSign;
}

export interface CourtCard {
  name: string;
  element: string;
  description: string;
}

export enum ReadingTypeEnum {
  GENERAL = "GENERAL",
  LOVE = "LOVE",
  CAREER = "CAREER",
  HEALTH = "HEALTH",
  FINANCE = "FINANCE",
  SPIRITUAL = "SPIRITUAL",
}