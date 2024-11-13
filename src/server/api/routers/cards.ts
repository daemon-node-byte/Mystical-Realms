import { z } from 'zod';
import {
	createTRPCRouter,
	// protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';
import { db } from '@/server/db';




export const cardsRouter = createTRPCRouter({
	getCardsBySuit: publicProcedure.input(z.object({ suit: z.string() })).query(async({ input }) => {
    const cards = await db.tarotCard.findMany({ 
    relationLoadStrategy: 'join',
    where: { arcana: input.suit !== 'major' ? 'Minor' : 'Major' },
    select: {
      id: true,
      cardId: true,
      name: true,
      number: true,
      suit: true,
      arcana: true,
      element: true,
      uprightDescription: true,
      reversedDescription: true,
      uprightKeywords: true,
      reversedKeywords: true,
      astrologicalRulership: true,
      themes: true,
      numerology: true,
      coreEmotions: true,
      practicalAdvice: true,
      foolsJourney: true,
      reflectionPrompts: true,
      symbolism: true
    },
    orderBy: {
      number: 'asc'
    }
   })

    if (input.suit === 'major') {
      return cards
    } else {
      return cards.filter(card => card.suit === input.suit)
    }
  }
),

});


// function getRandomItems<T>(array: T[], num: number): T[] {
// 	if (num >= array.length || num <= 0 ) {
// 		throw new Error('Invalid number of items requested');
// 	}
		
// 		const result: T[] = [];
// 		const arrayCopy = [...array];
		
// 		for (let i = 0; i < num; i++) {
// 			const randomIndex = Math.floor(Math.random() * arrayCopy.length);
// 			const item = arrayCopy[randomIndex];
// 			if (item !== undefined) {
// 				result.push(item);
// 			}
// 			arrayCopy.splice(randomIndex, 1); // Remove the selected item to avoid repetition
// 	}

// 	return result;
// }