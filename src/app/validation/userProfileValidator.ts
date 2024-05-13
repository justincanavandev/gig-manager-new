import { type ZodType, z } from "zod";
import type { DefaultUserProfile } from "../_components/user/edit/UserProfileEdit";
import { instruments } from "prisma/seedData";


export const UserProfileSchema: ZodType<DefaultUserProfile> = z.object({
  name: z.string().min(3),
  phoneNumber: z.string().min(10),
  email: z.string().email(),
  instrumentation: z
    .object({
      name: z.string().refine(
        (val) => instruments.includes(val),
        (val) => ({ message: `${val} is not a valid instrument!` }),
      ),
      id: z.string().cuid(),
    })
    .array(),
});
