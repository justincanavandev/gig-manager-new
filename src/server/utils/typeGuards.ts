import type { InstrumentName } from "../types/instrumentTypes";
import { instruments } from "prisma/seedData";

export const isInstrumentValid = (inst: string): inst is InstrumentName => {
    return instruments.includes(inst)

}