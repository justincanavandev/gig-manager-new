// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { instrumentRouter } from "./routers/instrument";
import { musicianRouter } from "./routers/musician";
import { gigRouter } from "./routers/gig";
import { venueRouter } from "./routers/venue";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  musician: musicianRouter,
  user: userRouter,
  instrument: instrumentRouter,
  gig: gigRouter,
  venue: venueRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
