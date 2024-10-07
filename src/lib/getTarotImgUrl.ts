import { TarotCard } from "@prisma/client";

export const getTarotImgURL = (deck: string, card: TarotCard) =>
  `/assets/images/tarot/${deck.toLowerCase()}/${card.suit.toLowerCase()}/${
    card.image_file_name}`;