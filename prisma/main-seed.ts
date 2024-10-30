/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import type { TarotDataSeed } from './data/types'
import { type $Enums, PrismaClient } from '@prisma/client';

const CARDS_FILE_PATH = path.join(process.cwd(), 'prisma' ,'/data/CARDS.yaml')

const READ_STREAM = fs.readFileSync(CARDS_FILE_PATH, 'utf8');

const CARDS_DATA = yaml.parse(READ_STREAM) as TarotDataSeed[];
const db = new PrismaClient();

function main (DATA_ARRAY: TarotDataSeed[]) {
 let deckCount = 0;
  DATA_ARRAY.forEach((CARD, idx) => {
    (async () => {
      await db.tarotCard.create({
        data: {
          cardId: CARD.id,
          name: CARD.name,
          arcana: CARD.arcana,
          suit: CARD.arcana.toUpperCase() !== 'MAJOR' ? CARD.suit : null,
          number: CARD.number,
          uprightDescription: CARD.description.upright,
          reversedDescription: CARD.description.reversed,
          uprightKeywords: CARD.upright_keywords,
          reversedKeywords: CARD.reversed_keywords,
          element: CARD.element.toUpperCase() as $Enums.Element,
          astrologicalRulership: CARD.astrological_rulership,
          themes: [...CARD.themes],
          symbolism: {
            createMany: {
              data: [...CARD.symbolism.map((obj) => {
                return { symbol: obj.symbol, meaning: obj.meaning }
              }) ]
              
            }
          },
          numerology: CARD.numerology,
          coreEmotions: CARD.core_emotions,
          reflectionPrompts: CARD.reflection_prompts,
          practicalAdvice: CARD.practical_advice,
          foolsJourney: CARD.arcana.toLowerCase() === 'major' && CARD?.fools_journey ? CARD.fools_journey : null,
        }
      })
      console.log(`success! #${idx + 1} Card ${CARD.name} created`)
      deckCount++;
    })().catch((error) => console.error(error));
    console.log(`Deck Count Total: ${deckCount}`)
  })
}

// main(CARDS_DATA)

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const results = await db.tarotCard.findMany({
  select: {
    cardId: true,
    name: true,
    arcana: true,
    suit: true,
    number: true,
    uprightDescription: true,
    reversedDescription: true,
    uprightKeywords: true,
    reversedKeywords: true,
    element: true,
    astrologicalRulership: true,
    themes: true,
    symbolism: {
      select: {
        symbol: true,
        meaning: true
      }
    },
    numerology: true,
    coreEmotions: true,
    reflectionPrompts: true,
    practicalAdvice: true,
    foolsJourney: true
  }
})
console.log("🚀 ~ results:", results.length)

