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
      const users = await ctx.db.user.findMany({
        include: {
          instruments: {
            select: {
              instrument: {
                select: {
                  name: true,
                },
              },
            },
          },
          gigs: true,
        },
      });
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
  update: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().min(1),
        instrumentIds: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { phoneNumber, instrumentIds } = input;

      try {
        const updatedUser = await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            phoneNumber,
            instruments: {
              upsert: instrumentIds.map((instrumentId) => ({
                where: {
                  userId_instrumentId: {
                    userId: ctx.session.user.id,
                    instrumentId: instrumentId,
                  },
                },
                create: {
                  instrumentId: instrumentId,
                },
                update: {
                  instrumentId: instrumentId,
                },
              })),
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
  getById: protectedProcedure
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
            instruments: {
              select: {
                instrument: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            gigs: true,
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
