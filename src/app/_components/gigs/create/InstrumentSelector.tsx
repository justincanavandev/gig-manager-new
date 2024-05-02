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
  // currentInsts,
}: InstrumentSelectProps) => {
  const instruments = useInstruments();

  const instrumentsToPass = instruments.map((inst)=> { return  {
    name: inst.name,
    id: inst.id,
    musicians: inst.musicians.map((mus)=> { return {
      id: mus.musician.id,
      name: mus.musician.name }
    })
  }})

  // const currentInstNames = currentInsts.map((current) => current.name);
  // const filteredInsts = instrumentsToPass.filter((inst) =>
  //   currentInstNames.includes(inst.name),
  // );

  const instToString = (inst: GigFormInstrument) => inst.name;

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst) {
      updateInstruments("instrumentation", inst, "add");
    }
  };

  return (
    <BaseCombobox
      data={instrumentsToPass}
      // disabledData={filteredInsts}
      disabledData={[]}
      dataToString={instToString}
      label="Instrumentation"
      action={addInstrument}
      action2={deleteInst}
    />
  );
};

export default InstrumentSelector;
