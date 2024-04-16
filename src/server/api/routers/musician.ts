// import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
// import { TRPCError } from "@trpc/server";
// import z from "zod";
// import { genericErrorHandler } from "~/server/utils/errorHandling";

// export const musicianRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     try {
//       const musicians = await ctx.db.musician.findMany({
//         include: {
//           instruments: {
//             select: {
//               instrument: {
//                 select: {
//                   name: true,
//                 },
//               },
//             },
//           },
//         },
//       });
//       if (!musicians) {
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: "Unable to create musicians",
//         });
//       } else {
//         return musicians;
//       }
//     } catch (e) {
//       throw genericErrorHandler(e)
//     }
//   }),
//   create: protectedProcedure

//     .input(
//       z.object({
//         name: z.string().min(4),
//         instrument: z.string().min(1),
//         phoneNumber: z.string().min(1),
//         email: z.string().email(),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { name, instrument, phoneNumber, email } = input;

//       try {
//         const musician = await ctx.db.musician.create({
//           data: {
//             name,
//             email,
//             phoneNumber,
//             instruments: {
//               create: [
//                 {
//                   instrument: {
//                     connectOrCreate: {
//                       where: {
//                         name: instrument,
//                       },
//                       create: {
//                         name: instrument,
//                       },
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         });
//         if (!musician) {
//           throw new TRPCError({
//             code: "BAD_REQUEST",
//             message: "Unable to create musicians",
//           });
//         } else {
//           return musician;
//         }
//       } catch (e) {
//         console.error("Unable to create musicians", e);
//       }
//     }),
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
//   // }),
// });
