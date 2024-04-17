import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { genericErrorHandler } from "~/server/utils/errorHandling";

export const instrumentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const allInstruments = await ctx.db.instrument.findMany();

      if (!allInstruments) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to fetch instruments",
          cause: `allInstruments: ${!!allInstruments}`,
        });
      } else {
        return allInstruments;
      }
    } catch (e) {
      throw genericErrorHandler(e);
    }
  }),
});
