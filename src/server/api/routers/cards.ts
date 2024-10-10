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
	})
	// prefix: t.procedure.input(callable).query(async (args) => handler(args)),
});
