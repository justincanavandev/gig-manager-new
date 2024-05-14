import { z, type ZodType } from "zod";
import type { GigForm } from "~/server/types/gigTypes";
import { instruments } from "prisma/seedData";


export const GigFormSchema: ZodType<GigForm> = z.object({
  name: z.string().min(3),
  venue: z
    .object({
      name: z.string(),
      id: z.string().cuid(),
    })
    .nullable(),
  startTime: z.date(),
  endTime: z.date(),
  instrumentation: z
    .object({
      name: z.string().refine(
        (val) => instruments.includes(val),
        (val) => ({ message: `${val} is not a valid instrument!` }),
      ),
      id: z.string().cuid(),
    })
    .array(),
  musicians: z
    .object({
      name: z.string().min(3),
      id: z.string().cuid(),
      instrument: z.object({
        name: z.string().refine(
          (val) => instruments.includes(val),
          (val) => ({ message: `${val} is not a valid instrument!` }),
        ),
        id: z.string().cuid(),
      }),
    })
    .array(),
});
