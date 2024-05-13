import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { genericErrorHandler } from "~/server/utils/errorHandling";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.db.user.findMany();
      if (!users) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to fetch users",
        });
      }
      return users;
    } catch (e) {
      throw genericErrorHandler(e);
    }
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
        musician: z
          .object({
            instrumentIds: z.string().array(),
            phoneNumber: z.string().min(10),
            musicianId: z.string(),
          })
          .nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, musician } = input;

      try {
        if (musician) {
          const { instrumentIds, phoneNumber, musicianId } = musician;
            const instrumentMusicianJoin = instrumentIds.map(async (id) => {
              await ctx.db.musiciansOnInstruments.upsert({
                where: {
                  musicianId_instrumentId: {
                    musicianId,
                    instrumentId: id,
                  },
                },
                update: {},
                create: {
                  instrument: {
                    connect: {
                      id,
                    },
                  },
                  musician: {
                    connect: {
                      id: musicianId,
                      phoneNumber,
                      name,
                      email
                    },
                
                  },
                },
              });
            });
            // await ctx.db.musiciansOnInstruments.deleteMany({
            //   where: {
            //     instrumentId: {
            //       notIn: instrumentIds.map((id) => id),
            //     },
            //   },
            // });
            await Promise.all(instrumentMusicianJoin);

        }

        const updatedUser = await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name,
            email,
            musician: musician
              ? {
                  update: {
                    data: {
                      name,
                      phoneNumber: musician.phoneNumber,
                      email,
                    },
                  },
                }
              : undefined,
          },
        });

        if (!updatedUser) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User unable to be updated",
          });
        }

        return updatedUser;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
  connectMusician: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        phoneNumber: z.string().min(1),
        instrumentIds: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { phoneNumber, instrumentIds, name, email } = input;

      try {
        const musician = await ctx.db.musician.create({
          data: {
            name,
            email,
            phoneNumber,
          },
        });

        const musicianId = musician.id;

        const musicianInstJoin = instrumentIds.map(async (id: string) => {
          await ctx.db.musiciansOnInstruments.create({
            data: {
              musician: {
                connect: {
                  id: musicianId,
                },
              },
              instrument: {
                connect: {
                  id,
                },
              },
            },
          });
        });
        await Promise.all(musicianInstJoin);

        const updatedUser = await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name,
            email,
            musician: {
              connect: {
                id: musicianId,
              },
            },
          },
        });

        if (!updatedUser) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User unable to be updated",
          });
        }
        return updatedUser;
      } catch (e) {
        throw genericErrorHandler(e);
      }
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            id,
          },
          include: {
            musician: {
              select: {
                name: true,
                phoneNumber: true,
                email: true,
                instruments: {
                  select: {
                    instrument: true,
                  },
                },
                gigs: {
                  include: {
                    gig: {
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
                    },
                  },
                },
              },
            },
          },
        });
        if (!user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User unable to be fetched",
          });
        }
        return user;
      } catch (e) {
        genericErrorHandler(e);
      }
    }),
});
