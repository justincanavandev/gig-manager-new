import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
// import type { Instrument } from "@prisma/client";
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
      const allInstruments = await ctx.db.instrument.findMany();
    //   const dupInst = allInstruments.find(
    //     (inst: Instrument) => inst.name === instrument,
    //   );

      try {
        // if (!dupInst) {
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
                      // create: {
                      //   name: instrument
                      // }
                    },
                  },
                ],
              },
              //   gigs: {
              //     create: [
              //         {
              //             gig: {
              //                 connect: {

              //                 }
              //             }
              //         }
              //     ]
              //   }
            //   gigs: {
            //     create: [],
            //   },
            },
          });
          if (!musician) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Unable to fetch instruments",
              cause: `allInstruments: ${!!allInstruments}`,
            });
          } else {
            return musician;
          }
        // } 
        // else {
        //   const musician = await ctx.db.musician.create({
        //     data: {
        //       name,
        //       email,
        //       phoneNumber,
        //       instruments: {
        //         create: {
        //           instrument: {
        //             connect: {
        //               id: dupInst.id,
        //             },
        //           },
        //         },
        //       },
        //     },
        //   });
        //   if (!musician) {
        //     throw new TRPCError({
        //       code: "BAD_REQUEST",
        //       message: "Unable to fetch instruments",
        //       cause: `allInstruments: ${!!allInstruments}`,
        //     });
        //   } else {
        //     return musician;
        //   }
        // }
      } catch (e) {
        throw e;
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
