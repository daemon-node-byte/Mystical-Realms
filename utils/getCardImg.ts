import { tarotCardImgs } from "@/constants/tarot";
import { TarotCardId, TarotCardImgFileName } from "@/types/tarot.types";
import { DeckFileFolder } from "@/enums/tarot.enums";
import { LocalStorageKeys } from "@/enums/storage.enums";

/**
 * Retrieves the image path for a specified tarot card or card back.
 *
 * @param namespace - The identifier for the tarot card or "card_back" for the card back image.
 * @returns The full path to the image file for the specified card or card back.
 */
export const getCardImgPath = (namespace: TarotCardId | "card_back") => {
  let deck = localStorage.getItem(
    LocalStorageKeys.selectedDeck,
  ) as DeckFileFolder;
  const fileName: TarotCardImgFileName = `${namespace}.webp`;

  if (deck === null) {
    deck = DeckFileFolder.inspired;
  }

  return `${tarotCardImgs.ROOT_PATH}/${deck}/${fileName}`;
};
