import type { typeToFlattenedError } from "zod";
import type { DefaultErrorData } from "@trpc/server/unstable-core-do-not-import";

type FieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export type TypeOrNullable<T> = T | null | undefined;

export interface TRPCClientErrorZod extends DefaultErrorData {
  zodError: typeToFlattenedError<unknown, string> | null;
}

export const displayTRPCError = (
  e: TypeOrNullable<TRPCClientErrorZod>,
  message: string,
) => {
  if (e) {
    const zodError = e.zodError;

    if (zodError) {
      const errMessage = displayZodError(
        zodError.fieldErrors,
        "There was an error editing gig!",
      );
      return errMessage;
    } else {
      const httpStatus = e.httpStatus;
      const displayMsg = `${httpStatus} error: ${e.code} \n\n ${message}`;
      return displayMsg;
    }
  } else {
    return "There was an error with your action"
  }
};

export const displayZodError = (fieldErrors: FieldErrors, message: string) => {
  if (fieldErrors) {
    const errorArr = Object.entries(fieldErrors);

    const errMessageArr = errorArr.map(
      (err) => `${err[0]}: ${Array.isArray(err[1]) && err[1][0]}`,
    );

    const errMessages = errMessageArr.join("\n\n");
    return errMessages;
  } else {
    return message;
  }
};
