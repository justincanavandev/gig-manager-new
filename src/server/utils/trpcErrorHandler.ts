import { TRPCError } from "@trpc/server";

export const returnDataOrError = (data: unknown, action: string, dataTitle: string) => {
  if (!data) {
    throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Unable to ${action} ${dataTitle}`,

      });
  } else {
    return data
  }
};
