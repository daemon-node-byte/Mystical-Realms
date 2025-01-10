import type { NumRange } from "./utility.types";

import { tarotCardImgs } from "@/constants/tarot";
import { Arcana, Suits, DeckFileFolder } from "@/enums/tarot.enums";

/**
 * Represents the type of the tarot card images data.
 * 
 * This type is derived from the structure of the `tarotCardImgs` object.
 */
export type CardImgData = typeof tarotCardImgs;

type MajorRank = NumRange<0, 21>;
type MinorRank = NumRange<1, 14>;

/**
 * Represents the unique identifier for a Tarot card.
 *
 * A Tarot card ID can be one of the following:
 * - A combination of a major arcana and the numeric value.
 * - A combination of a suit and a minor the numeric value.
 *
 * Example:
 * - "major0" for The Fool in the major arcana.
 * - "cups1" for Ace of Cups in the minor arcana.
 */
export type TarotCardId =
  | `${Arcana.major}${MajorRank}`
  | `${Suits}${MinorRank}`;

/**
 * Represents the file name of a tarot card image.
 *
 * The file name can either be a specific tarot card ID with a `.webp` extension
 * or the string `"card_back.webp"` which represents the back of a tarot card.
 *
 * @example
 * const cardImage: TarotCardImgFileName = "major0.webp";
 *
 * @example
 * const cardBackImage: TarotCardImgFileName = "card_back.webp";
 */
export type TarotCardImgFileName = `${TarotCardId}.webp` | "card_back.webp";

export type TarotImgPath = `${string}/${DeckFileFolder}/
  ${TarotCardImgFileName}`;
