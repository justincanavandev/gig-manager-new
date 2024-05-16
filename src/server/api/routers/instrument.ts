import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { genericErrorHandler } from "~/server/utils/errorHandling";
import z from "zod";

export const instrumentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const allInstruments = await ctx.db.instrument.findMany({
        select: {
          name: true,
          id: true,
          musicians: {
            select: {
              musician: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });

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
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      try {
        const instrument = await ctx.db.instrument.findUnique({
          where: {
            name,
          },
          include: {
            musicians: {
              select: {
                musicianId: true,
              },
            },
          },
        });
        return instrument;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
});
