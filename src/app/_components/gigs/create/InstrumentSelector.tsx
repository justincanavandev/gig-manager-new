"use client";

import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type {
  GigFormInstrument,
  GigForm,
  GigFormMusician,
} from "~/server/types/gigTypes";
import BaseCombobox from "../../base/BaseCombobox";

type InstrumentSelectProps = {
  musicians: GigFormMusician[];
  deleteInst: (inst: GigFormInstrument) => void;
  currentInsts: GigFormInstrument[];
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
  const filteredInsts = instruments.filter((inst) =>
    currentInstNames.includes(inst.name),
  );

  const instToString = (inst: GigFormInstrument) => inst.name;

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst) { 
      updateInstruments("instrumentation", inst, "add");
    }
  };

  return (
    <>

      <BaseCombobox
        data={instruments}
        disabledData={filteredInsts}
        dataToString={instToString}
        label="Instrumentation"
        action={addInstrument}
        action2={deleteInst}
      />
    </>
  );
};

export default InstrumentSelector;
