import { z } from 'zod';
import { TAROT_DATA } from '../../data/tarotCardData'
import {
	createTRPCRouter,
	// protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';



export const cardsRouter = createTRPCRouter({
	getCardsBySuit: publicProcedure.input(z.object({ text: z.string()}))
	.query(async ({ input }) => {
		return TAROT_DATA.filter((card) => card.suit === input.text)
	}),
	randomCard: publicProcedure.input(z.object({ number: z.number() })).query(async ({ input }) => {
		return getRandomItems(TAROT_DATA, input.number)
	})
	// prefix: t.procedure.input(callable).query(async (args) => handler(args)),
});
function getRandomItems<T>(array: T[], num: number): T[] {
	if (num >= array.length || num <= 0 ) {
		throw new Error('Invalid number of items requested');
	}
		
		const result: T[] = [];
		const arrayCopy = [...array];
		
		for (let i = 0; i < num; i++) {
			const randomIndex = Math.floor(Math.random() * arrayCopy.length);
			const item = arrayCopy[randomIndex];
			if (item !== undefined) {
				result.push(item);
			}
			arrayCopy.splice(randomIndex, 1); // Remove the selected item to avoid repetition
	}

	return result;
}