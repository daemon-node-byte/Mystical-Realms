import { PrismaClient } from "@prisma/client";
import { getRank, convertSuit, convertReadingType, getRoman } from "./func";
import { jsonData } from "./parseJson";

const db = new PrismaClient();

async function main(){
jsonData.forEach(async (card) =>{
  const tarotCard = await db.tarotCard.create({
    data: {
      title: card.title,
      suit: convertSuit(card.suit),
      rank: card.suit !== 'major' ? getRank(card.rank) : null,
      rank_int: card.rank,
      image_file_name: `${card.tarot_card_id}.webp`,
      keywords: {
        create: {
          upright: card.keywords.upright,
          reversed: card.keywords.reversed,
        }
      },
      interpretations: {
        createMany: {
          data: Object.entries(card.interpretation).map(([key, value]) => ({
            reading_type: convertReadingType(key),
            upright: value.upright,
            reversed: value.reversed,
          }))
          }
        },
        card_extra: {
          create: {
            element: card.element,
            astrological_sign: card.astrological_sign,
            visual_desc: card.visual_description,
            symbolism: card.symbolism.map((arr) => ({[arr[0]] : arr[1]})),
            fools_journey: card.journey_story,
            summary: card.summary,
            roman_numeral: getRoman(card.rank),
          }
        }
      }
    }
  )
  console.log('created: ', { tarotCard });
})
}

main().then(async () => await db.$disconnect()).catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
