import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { genericErrorHandler } from "~/server/utils/errorHandling";

export const venueRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const allVenues = await ctx.db.venue.findMany({
        include: {
          location: true,
        },
      });

      if (!allVenues) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to fetch venues",
          cause: `allVenues: ${!!allVenues}`,
        });
      } else {
        return allVenues;
      }
    } catch (e) {
      throw genericErrorHandler(e);
    }
  }),
});
