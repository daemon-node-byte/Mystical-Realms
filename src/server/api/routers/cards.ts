import { z } from 'zod';
// import { TAROT_DATA } from '../../data/tarotCardData'
import {
	createTRPCRouter,
	// protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';
import { db } from '@/server/db';
import type { Suit } from '@/types/TarotCard';



export const cardsRouter = createTRPCRouter({
	getCardsBySuit: publicProcedure.input(z.object({ suit: z.string()}))
	.query(async ({ input }) => {
    return await db.tarotCard.findMany({ where: { suit: input.suit as Suit }, select: {
			id: true,
			rank: true,
			title: true,
			rank_int: true,
			suit: true,
			keywords: true,
			card_extra: true,
			summary: true,
			image_file: true,
		}})
	}),
	// randomCard: publicProcedure.input(z.object({ number: z.number() })).query(async ({ input }) => {
	// 	return getRandomItems(TAROT_DATA, input.number)
	// }),
	getCardBySuitAndRank: publicProcedure.input(z.object({ suit: z.string(), rank: z.number() }))
	  .query(async ({ input }) => {
		return await db.tarotCard.findFirst({
				where: {
					AND: [
						{ suit: input.suit as Suit },
						{ rank_int: input.rank }
					],
				},
					select: {
						id: true,
						rank: true,
						title: true,
						rank_int: true,
						suit: true,
						keywords: true,
						card_extra: true,
						summary: true,
						image_file: true,
					}
				
			})
		}),
		getCardKeyWords: publicProcedure.input(z.object({ cardId: z.string() })).query(async ({ input }) => {
			return await db.cardKeywords.findFirst({
				where: {
					card_id: parseInt(input.cardId)
				}
			})
		}),
		getCardExtra: publicProcedure.input(z.object({ cardId: z.string() })).query(async ({ input }) => {
			return await db.tarotCardExtra.findFirst({
				where: {
					card_id: parseInt(input.cardId)
				}
			})
		})
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