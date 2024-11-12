import db from "./dbConnection";
import { seedTarotDeck, CARDS_DATA } from "./deckSeed";


  const deck = await db.tarotCard.findMany({
    select: {
      cardId: true,
      number: true,
    }
  })

if (deck.length < 78) {
  seedTarotDeck(CARDS_DATA);
} else {
  console.log('Deck already seeded')
}

