import type { RouterOutputs } from "~/trpc/react";

export type GetAllInstruments = RouterOutputs["instrument"]["getAll"]
export type OneInstrument = RouterOutputs["instrument"]["getAll"][0]