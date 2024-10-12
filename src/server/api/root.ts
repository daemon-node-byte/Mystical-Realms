import { postRouter } from "@/server/api/routers/post";
import { cardsRouter } from '@/server/api/routers/cards'
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  cards: cardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type CardRouter = typeof appRouter.cards
export type GetBySuitAndRank = typeof appRouter.cards.getCardBySuitAndRank
/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
