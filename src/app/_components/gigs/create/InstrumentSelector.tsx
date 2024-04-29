"use client";

import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type { ChangeEvent } from "react";
import type { GigFormInstrument } from "~/server/types/gigTypes";

type InstrumentSelectProps = {
  addInst: (e: ChangeEvent<HTMLSelectElement>) => void;
  deleteInst: (inst: GigFormInstrument) => void
  currentInsts: {
    id: string;
    name: string;
  }[];
};

const InstrumentSelector = ({
  addInst,
  deleteInst,
  currentInsts,
}: InstrumentSelectProps) => {
  const instruments = useInstruments();

  const currentInstNames = currentInsts.map((current)=> current.name)
  const filteredInsts = instruments.filter((inst)=> !currentInstNames.includes(inst.name))

  return (
    <>
      <label className="flex flex-col">
        Instrumentation:
        <select
          className="w-48 border border-black"
          name="instrumentIds"
          onChange={(e) => addInst(e)}
        >
          <option value="">Select an instrument</option>
          {filteredInsts?.map((instrument) => (
            <option
              key={`${instrument.name}-select`}
              value={JSON.stringify({
                id: instrument.id,
                name: instrument.name,
              })}
            >
              {instrument.name}
            </option>
          ))}
        </select>
      </label>
      {currentInsts.map((inst) => (
        <div className="flex gap-6" key={`inst-selector-${inst.name}`}>
          <span>{inst.name}</span>
          <span onClick={() => deleteInst(inst)}>x</span>
        </div>
      ))}
    </>
  );
};

export default InstrumentSelector;
