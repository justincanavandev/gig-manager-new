import type { typeToFlattenedError, z } from "zod";
// import type { DefaultErrorData } from "@trpc/server/unstable-core-do-not-import";
/** @todo Check why you cannot import these types */


type DefaultEData<Data> = {
  code:
    | "PARSE_ERROR"
    | "BAD_REQUEST"
    | "INTERNAL_SERVER_ERROR"
    | "NOT_IMPLEMENTED"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "METHOD_NOT_SUPPORTED"
    | "TIMEOUT"
    | "CONFLICT"
    | "PRECONDITION_FAILED"
    | "UNSUPPORTED_MEDIA_TYPE"
    | "PAYLOAD_TOO_LARGE"
    | "UNPROCESSABLE_CONTENT"
    | "TOO_MANY_REQUESTS"
    | "CLIENT_CLOSED_REQUEST";
  zodError: typeToFlattenedError<Data, string> | null;
  httpStatus: number;
  path?: string;
  stack?: string;
};

export type FieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export type TypeOrNullable<T> = T | null | undefined;

export const displayTRPCError = <Data>(
  e: TypeOrNullable<DefaultEData<Data>>,
  message: string,
) => {
  if (e) {
    const zodError = e.zodError;

    if (zodError) {
      const errMessage = displayZodError(zodError.fieldErrors);
      return errMessage;
    } else {
      const httpStatus = e.httpStatus;
      const displayMsg = `${httpStatus} error: ${e.code} \n\n ${message}`;
      return displayMsg;
    }
  } else {
    return message;
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

export const getZodErrMsg = (err: z.ZodError) => {
  const flattenedErrs = err.flatten();
  const errorFields = Object.keys(flattenedErrs.fieldErrors);
  const errString = errorFields.join(", ")

  const message =
  errorFields.length > 0
    ? `Errors in ${errString} ${errorFields.length === 1 ? "field" : "fields"}`
    : "There was an error with your form submission!";
  
    return message
}
