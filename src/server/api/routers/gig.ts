import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { returnDataOrError } from "~/server/utils/trpcErrorHandler";

export const gigRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const gigs = await ctx.db.gig.findMany({
        orderBy: {
          startTime: "asc"
        },
        include: {
          venue: true,
          musicians: true,
          instrumentation: true,
        },
      });
      // return returnDataOrError(gigs, "fetch", "gigs");
      return gigs
    } catch (e) {
      console.error("Unable to fetch gigs");
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        startTime: z.date(),
        endTime: z.date(),
        venue: z.string(),
        musicianIds: z.string().array(),
        instruments: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, startTime, endTime, venue, musicianIds, instruments } =
        input;

      try {
        const gig = await ctx.db.gig.create({
          data: {
            name,
            startTime,
            endTime,
            venue: {
              connect: {
                name: venue,
              },
            },
            musicians: {
              create: musicianIds.map((id) => ({
                musician: {
                  connect: {
                    id,
                  },
                },
              })),
            },
            instrumentation: {
              create: instruments.map((name) => ({
                instrument: {
                  connect: {
                    name,
                  },
                },
              })),
            },
          },
        });

  
        // returnDataOrError(gig, "create", "gig");
        return gig

        return gig;
      } catch (e) {
        console.error("Unable to create gig", e);
      }
    }),
});
