import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { genericErrorHandler } from "~/server/utils/errorHandling";

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
              name: true,
              id: true,
            },
          },
          musicians: {
            include: {
              musician: {
                select: {
                  name: true,
                  id: true,
                  instruments: {
                    select: {
                      instrument: true,
                    },
                  },
                },
              },
            },
          },
          instrumentation: {
            include: {
              instrument: {
                select: {
                  name: true,
                },
              },
            },
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
      throw genericErrorHandler(e);
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
        instrumentation: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        startTime,
        endTime,
        venueId,
        musicianIds,
        instrumentation,
      } = input;

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
              create: instrumentation.map((name) => ({
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
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const gig = await ctx.db.gig.findUnique({
          where: { id },
          include: {
            venue: {
              select: {
                name: true,
              },
            },
            musicians: {
              include: {
                musician: {
                  select: {
                    name: true,
                    instruments: {
                      select: {
                        instrument: true,
                      },
                    },
                  },
                },
              },
            },
            instrumentation: {
              include: {
                instrument: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        if (!gig) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Gig unable to be fetched",
          });
        }
        return gig;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string().min(3),
        startTime: z.date(),
        endTime: z.date(),
        venueId: z.string(),
        musicianIds: z.string().array(),
        instrumentation: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, startTime, endTime, venueId, musicianIds } = input;

      try {
        const gigById = await ctx.db.gig.findUnique({
          where: {
            id,
          },
          include: {
            musicians: {
              select: {
                musician: true,
              },
            },
            instrumentation: {
              select: {
                instrument: true,
              },
            },
          },
        });
        const musicianIdsInDb = gigById?.musicians.map(
          (mus) => mus.musician.id,
        );

        const addedMusicianIds = musicianIds.filter(
          (id) => !musicianIdsInDb?.includes(id),
        );

        /** @todo Deal with functionality for deleting a musician */

        const musicianGigJoin = addedMusicianIds.map(async (musId: string) => {
          await ctx.db.gigsOnMusicians.create({
            data: {
              musician: {
                connect: {
                  id: musId,
                },
              },
              gig: {
                connect: {
                  id,
                },
              },
            },
          });
        });
        await Promise.all(musicianGigJoin);

        const updatedGig = await ctx.db.gig.update({
          where: {
            id,
          },
          data: {
            name,
            startTime,
            endTime,
            venueId,
          },
        });
        return updatedGig;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
});
