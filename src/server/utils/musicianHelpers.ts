import type { GigFormInstrument, GigFormMusician } from "../types/gigTypes";

export const doesInstrumentHaveMusician = (
  musicians: GigFormMusician[],
  instrumentation: GigFormInstrument[],
) => {
  const instrumentWithMusician = musicians.map((mus) => mus.instrument.name);
  const setOfInstWithMusician = [...new Set(instrumentWithMusician)];

  const instsWithoutMusician = instrumentation.filter(
    (inst) => !setOfInstWithMusician.includes(inst.name),
  );

  return instsWithoutMusician;
};

export const displayMusicianNames = (insts: GigFormInstrument[]) => {
  const neededMusicianInsts = insts.map((inst) => inst.name).join(", ");
  return neededMusicianInsts;
};
