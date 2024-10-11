import { $Enums } from "@prisma/client";
import type { Archtype, MajorArcanaCard, MinorArcanaCard } from "./types";

export const getExtraData = (data: Archtype, query: { suit: string, rank_int: number }) => {
  const { suit, rank_int } = query;

}

export const getRank = (rank: number) => {
  switch (rank) {
    case 1:
      return $Enums.Rank.ACE;
    case 2:
      return $Enums.Rank.TWO;
    case 3:
      return $Enums.Rank.THREE;
    case 4:
      return $Enums.Rank.FOUR;
    case 5:
      return $Enums.Rank.FIVE;
    case 6:
      return $Enums.Rank.SIX;
    case 7:
      return $Enums.Rank.SEVEN;
    case 8:
      return $Enums.Rank.EIGHT;
    case 9:
      return $Enums.Rank.NINE;
    case 10:
      return $Enums.Rank.TEN;
    case 11:
      return $Enums.Rank.PAGE;
    case 12:
      return $Enums.Rank.KNIGHT;
    case 13:
      return $Enums.Rank.QUEEN;
    case 14:
      return $Enums.Rank.KING;
    default:
      return null;
  }
};


export const getRoman = (rank: number) => {
  switch (rank) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
    case 7:
      return "VII";
    case 8:
      return "VIII";
    case 9:
      return "IX";
    case 10:
      return "X";
    case 11:
      return "XI";
    case 12:
      return "XII";
    case 13:
      return "XIII";
    case 14:
      return "XIV";
    case 15:
      return "XV";
    case 16:
      return "XVI";
    case 17:
      return "XVII";
    case 18:
      return "XVIII";
    case 19:
      return "XIX";
    case 20:
      return "XX";
    case 21:
      return "XXI";
    default:
      return "ZERO";
  }
};