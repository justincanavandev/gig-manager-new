import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod"

export const gigRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        startTime: z.date(),
        endTime: z.date(),
        // venue: z.object({
        //   name: z.string(),
        //   location: z.object({
        //     address: z.string(),
        //     city: z.string(),
        //     state: z.string(),
        //     zipCode: z.string(),
        //   }),
        // }),
        venue: z.string(),
        musicianIds: z.string().array(),
        instruments: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, startTime, endTime, venue, musicianIds, instruments } =
        input;

      // const { location } = venue;

      try {
        const gig = await ctx.db.gig.create({
          data: {
            name,
            startTime,
            endTime,
            // venue: {
            //   connectOrCreate: {
            //     where: {
            //       name,
            //     },
            //     create: {
            //       name
            //       location: {
            //         create: {
            //           address: location.address,
            //           city: location.city,
            //           state: location.state,
            //           zipCode: location.zipCode,
            //         },
            //       },
            //     },
            //   },
            // },
            venue: {
              connect: {
                name: venue

              }
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
            message: "Unable to create gig",
            // cause: ""
          });
        }

        return gig;
      } catch (e) {
        console.error("Unable to create gig", e);
      }
    }),
});
