"use client";

import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type { GigFormInstrument, GigForm, GigFormMusician } from "~/server/types/gigTypes";

type InstrumentSelectProps = {

  musicians: GigFormMusician[]
  deleteInst: (inst: GigFormInstrument) => void;
  currentInsts: GigFormInstrument[]
  updateInstruments: <Value>(
    key: keyof GigForm,
    value: Value,
    action: "add" | "delete",
  ) => void;
};

const InstrumentSelector = ({
  updateInstruments,
  deleteInst,
  currentInsts,
}: InstrumentSelectProps) => {
  const instruments = useInstruments();

  const currentInstNames = currentInsts.map((current) => current.name);
  const filteredInsts = instruments.filter(
    (inst) => !currentInstNames.includes(inst.name),
  );

  return (
    <>
      <label className="flex flex-col">
        Instrumentation:
        <select
          className="w-48 border border-black"
          name="instrumentIds"
          onChange={(e) => {
            const instrument = JSON.parse(e.target.value) as GigFormInstrument;
            return updateInstruments("instrumentation", instrument, "add");
          }}
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
        {currentInsts.map((inst) => (
          <div className="flex gap-6" key={`inst-selector-${inst.name}`}>
            <span>{inst.name}</span>
            <span onClick={() => deleteInst(inst)}>x</span>
          </div>
        ))}
      </label>
    </>
  );
};

export default InstrumentSelector;
