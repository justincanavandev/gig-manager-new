import { TRPCError } from "@trpc/server"

export function isTRPCError(err: unknown): err is TRPCError {
  return err instanceof TRPCError
}

function isError(err: unknown): err is Error {
  return err instanceof Error
}

function throwGenericTRPCError(e: unknown) {
  if (isError(e)) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Unexpected error:
${e.name}: ${e.message}`,
    })
  } else {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Unexpected error. Check console logs for
more details.`,
    })
  }
}

/**
 * If we get an error that isn't a TRPCError, we want to throw a generic
 * TRPCError with a generic message
 *
 * @note Let's make sure we're throwing TRPCErrors instead of regular Errors
 * as much as possible. Use this as a fallback for unexpected errors.
 */

export function genericErrorHandler(e: unknown): TRPCError {
  console.error(e)
  if (isTRPCError(e)) {
    return e
  } else {
    return throwGenericTRPCError(e)
  }
}
