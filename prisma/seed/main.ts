import { PrismaClient, $Enums } from '../../src/server/generated/client/index';
import CARDS, { ARCH_MAJOR, ARCH_MINOR, ZODIAC, COURT } from './DATA'
import { ReadingTypeEnum, TarotCard as TarotCardType, Zodiac, ZodiacSign } from './types'
import { getRank, getRoman } from './utils'

const db = new PrismaClient()

function main () {
  console.log('Seeding database with Tarot Cards\n\n');
  CARDS.forEach(async (card: TarotCardType) => {
    console.log(`Adding card: ${JSON.stringify(card.title)}\n\n`);;
    const savedCard = await db.tarotCard.create({
      data: {
        title: card.title,
        rank_int: card.rank,
        rank: card.suit !== 'major' ? getRank(card.rank) : null,
        suit: card.suit.toUpperCase() as 'MAJOR' | 'WANDS' | 'PENTACLES' | 'SWORDS' | 'CUPS',
        image_file: `${card.tarot_card_id}.webp`,
        summary: card.summary,
      keywords: {
        create: {
          upright: card.keywords.upright,
          reversed: card.keywords.reversed,
        },
      },
      interpretations: {
        createMany: {
          data: [
            {
              reading_type: ReadingTypeEnum.GENERAL satisfies $Enums.ReadingType,
              upright: card.interpretation.general.upright,
              reversed: card.interpretation.general.reversed,
            },
            {
              reading_type: ReadingTypeEnum.LOVE satisfies $Enums.ReadingType,
              upright: card.interpretation.love.upright,
              reversed: card.interpretation.love.reversed,
            },
            {
              reading_type: ReadingTypeEnum.CAREER satisfies $Enums.ReadingType,
              upright: card.interpretation.career.upright,
              reversed: card.interpretation.career.reversed,
            },
            {
              reading_type: ReadingTypeEnum.HEALTH satisfies $Enums.ReadingType,
              upright: card.interpretation.health.upright,
              reversed: card.interpretation.health.reversed,
            },
            {
              reading_type: ReadingTypeEnum.FINANCE satisfies $Enums.ReadingType,
              upright: card.interpretation.finance.upright,
              reversed: card.interpretation.finance.reversed,
            },
            {
              reading_type: ReadingTypeEnum.SPIRITUAL satisfies $Enums.ReadingType,
              upright: card.interpretation.spirituality.upright,
              reversed: card.interpretation.spirituality.reversed,
            },
          ]
        } 
      },
      card_extra: {
        create: {
          fools_journey: card.journey_story,
          roman_numeral: getRoman(card.rank) as $Enums.RomanNumeral,
          visual_desc: card.visual_description,
          symbolism: Object.entries(card.symbolism).map(([key, value]) => ({ [key]: value })),
          // element: card.element,
          zodiac_sign: card.astrological_sign?? null,
          planet: card.planet?? null
          },
          
        },
    },
    include: {
      keywords: true,
      interpretations: true,
      card_extra: true,
      },
   })
  console.log(`Card added: \n\t${JSON.stringify(savedCard.title)} - success!\n\n updating card with extras next\n\n`);  
  })
  Object.keys(ZODIAC as Zodiac).forEach(async (sign) => {
    console.log(`Adding Zodiac: ${sign}\n\n`);
    const target = ZODIAC[sign as keyof Zodiac] as ZodiacSign
    const savedZodiac = await db.zodiac.create({
      data: {
        name: sign,
        ruleing_planet: target.ruling_planet.toUpperCase() as $Enums.RuleingPlanet,
        date_range: target.date_range,
        cards: target.cards.map(str => str),
        }
      })
    })
  
}

main()