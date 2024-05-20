import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { genericErrorHandler } from "~/server/utils/errorHandling";
import { instruments } from "prisma/seedData";
import { instNameValidation } from "~/app/validation/validationHelpers";
import {
  doesInstrumentHaveMusician,
  displayMusicianNames,
} from "~/server/utils/musicianHelpers";

export const gigRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const gigs = await ctx.db.gig.findMany({
        orderBy: {
          startTime: "asc",
        },

        include: {
          organizer: {
            select: {
              id: true,
            },
          },
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
        venueId: z.string().cuid(),
        pay: z.number().nonnegative(),
        musicians: z
          .object({
            name: z.string(),
            instrument: instNameValidation,
            id: z.string().cuid(),
          })
          .array(),
        instrumentation: z
          .string()
          .refine(
            (val) => instruments.includes(val),
            (val) => ({ message: `${val} is not a valid instrument!` }),
          )
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        startTime,
        endTime,
        venueId,
        musicians,
        instrumentation,
        pay,
      } = input;

      try {
        const gig = await ctx.db.gig.create({
          data: {
            name,
            startTime,
            endTime,
            pay,
            organizer: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            venue: {
              connect: {
                id: venueId,
              },
            },
            musicians: {
              create: musicians.map((mus) => ({
                musician: {
                  connect: {
                    id: mus.id,
                  },
                },
                instrument: {
                  connect: {
                    name: mus.instrument,
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
        throw genericErrorHandler(e);
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
                id: true,
              },
            },
            // organizer: {
            //   select: {
            //     id: true,
            //   },
            // },
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
                instrument: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            instrumentation: {
              include: {
                instrument: {
                  include: {
                    musicians: {
                      include: {
                        musician: {
                          select: {
                            name: true,
                            id: true,
                          },
                        },
                      },
                    },
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
        venueId: z.string().cuid(),
        pay: z.number().nonnegative(),
        musicians: z
          .object({
            name: z.string(),
            instrument: z.object({
              id: z.string().cuid(),
              name: instNameValidation,
            }),
            id: z.string().cuid(),
          })
          .array(),
        instrumentation: z
          .object({
            name: z.string().refine(
              (val) => instruments.includes(val),
              (val) => ({ message: `${val} is not a valid instrument!` }),
            ),
            id: z.string().cuid(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        name,
        startTime,
        endTime,
        venueId,
        musicians,
        instrumentation,
        pay
      } = input;

      console.log('pay', pay)

      try {
        const instsWithoutMusician = doesInstrumentHaveMusician(
          musicians,
          instrumentation,
        );

        if (instsWithoutMusician.length > 0) {
          const message = displayMusicianNames(instsWithoutMusician);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Musician needs to be added at ${message}`,
          });
        }

        const musicianGigJoin = musicians.map(async (mus) => {
          await ctx.db.gigsOnMusiciansOnInstrument.upsert({
            where: {
              musicianId_gigId_instrumentId: {
                musicianId: mus.id,
                gigId: id,
                instrumentId: mus.instrument.id,
              },
            },

            update: {},
            create: {
              musician: {
                connect: {
                  id: mus.id,
                },
              },
              gig: {
                connect: {
                  id,
                },
              },
              instrument: {
                connect: {
                  name: mus.instrument.name,
                },
              },
            },
          });
          await ctx.db.gigsOnMusiciansOnInstrument.deleteMany({
            where: {
              musicianId: {
                notIn: musicians.map((mus) => mus.id),
              },
              gigId: id,
            },
          });
        });

        const addInstrumentation = instrumentation.map(async (inst) => {
          await ctx.db.gigsOnInstrument.upsert({
            where: {
              gigId_instrumentId: {
                gigId: id,
                instrumentId: inst.id,
              },
            },
            update: {},
            create: {
              instrument: {
                connect: {
                  id: inst.id,
                },
              },
              gig: {
                connect: {
                  id,
                },
              },
            },
          });
          await ctx.db.gigsOnInstrument.deleteMany({
            where: {
              instrumentId: {
                notIn: instrumentation.map((inst) => inst.id),
              },
              gigId: id,
            },
          });
        });
        await Promise.all(addInstrumentation);
        await Promise.all(musicianGigJoin);

        const updatedGig = await ctx.db.gig.update({
          where: {
            id,
          },
          data: {
            name,
            startTime,
            endTime,
            pay,
            venueId,
          },
        });

        if (!updatedGig) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Gig unable to be updated",
          });
        }
        return updatedGig;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
});
