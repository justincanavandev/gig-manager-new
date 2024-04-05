import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const musicianRouter = createTRPCRouter({
  // getAll: protectedProcedure.query(async ({ ctx }) => {
  //   try {
  //     return await ctx.db.musician.findMany();
  //   } catch (e) {
  //     throw e;
  //   }
  // }),
  create: protectedProcedure

    .input(
      z.object({
        name: z.string().min(4),
        instrument: z.string().min(1),
        phoneNumber: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, instrument, phoneNumber, email } = input;

      try {
        const musician = await ctx.db.musician.create({
          data: {
            name,
            email,
            phoneNumber,
            instruments: {
              create: [
                {
                  instrument: {
                    connectOrCreate: {
                      where: {
                        name: instrument,
                      },
                      create: {
                        name: instrument,
                      },
                    },
                  },
                },
              ],
            },
          },
        });
        if (!musician) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Unable to fetch instruments",
          });
        } else {
          return musician;
        }
      } catch (e) {
        console.error("Unable to fetch instruments", e);
      }
    }),
  // delete: protectedProcedure
  // .input(
  //   z.object({
  //     id: z.string()
  //   }),
  // )
  // .mutation(async ({ ctx, input }) => {
  //   try {
  //     return await ctx.db.musician.delete({
  //       where: {
  //         id: input.id
  //       }
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // }),
});
