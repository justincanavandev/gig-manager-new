import type { typeToFlattenedError } from "zod";
import type { DefaultErrorData } from "@trpc/server/unstable-core-do-not-import";

type FieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export type TypeOrNullable<T> = T | null | undefined;

export interface TRPCClientErrorZod<T> extends DefaultErrorData {
  zodError: typeToFlattenedError<T, string> | null;
}

export const displayTRPCError = <T> (
  e: TypeOrNullable<TRPCClientErrorZod<T>>,
  message: string,
) => {
  if (e) {
    const zodError = e.zodError;
    console.log('message', message)

    if (zodError) {
      const errMessage = displayZodError(
        zodError.fieldErrors
      );
      return errMessage;
    } else {
      const httpStatus = e.httpStatus;
      const displayMsg = `${httpStatus} error: ${e.code} \n\n ${message}`;
      return displayMsg;
    }
  } else {
    return message
  }
};

export const displayZodError = (fieldErrors: FieldErrors) => {

    const errorArr = Object.entries(fieldErrors);

    const errMessageArr = errorArr.map(
      (err) => `${err[0]}: ${Array.isArray(err[1]) && err[1][0]}`,
    );

    const errMessages = errMessageArr.join("\n\n");
    return errMessages;

};
