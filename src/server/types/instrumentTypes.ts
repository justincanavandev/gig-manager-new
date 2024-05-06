import type { RouterOutputs } from "~/trpc/react";

export type GetAllInstruments = RouterOutputs["instrument"]["getAll"]
export type OneInstrument = RouterOutputs["instrument"]["getAll"][0]

export type InstrumentName = "Electric Guitar" | "Acoustic Guitar" | "Bass" | "Drums" | "Percussion" | "Vocals" | "Keyboards" | "Saxophone" | "Trumpet" | "Trombone";

export type MusicianSelect = Record<InstrumentName, boolean>;