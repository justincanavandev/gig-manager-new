import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

export const gigRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const gigs = await ctx.db.gig.findMany({
        orderBy: {
          startTime: "asc",
        },

        include: {
          venue: {
            select: {
              name: true
            }
          },
          musicians: {
            include: {
              musician: {
                select: {
                  name: true,
                  instruments: {
                    select: { 
                      instrument: true
                    }
                  }
                }
              },
            },
          },
          instrumentation: {
            include: {
              instrument: {
                select: {
                  name: true
                }
              }
            }
          },
        },
      });

      if (!gigs) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Unable to fetch gigs`,
        });
      }

      return gigs;
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
        venueId: z.string(),
        musicianIds: z.string().array(),
        instruments: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, startTime, endTime, venueId, musicianIds, instruments } =
        input;

      try {
        const gig = await ctx.db.gig.create({
          data: {
            name,
            startTime,
            endTime,
            venue: {
              connect: {
                id: venueId,
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

        if (!gig) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Unable to fetch gigs`,
          });
        }
        return gig;
      } catch (e) {
        console.error("Unable to create gig", e);
      }
    }),
});
