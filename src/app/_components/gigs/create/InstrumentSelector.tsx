"use client";

import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type {
  GigFormInstrument,
  GigForm,
  // GigFormMusician,
} from "~/server/types/gigTypes";
import BaseCombobox from "../../base/BaseCombobox";
import type { DefaultUserProfile } from "../../user/UserProfileEdit";
// import type { DefaultUserProfile } from "../../user/UserProfileEdit";

type InstrumentSelectProps = {
  // musicians?: GigFormMusician[];
  deleteInst: (inst: GigFormInstrument) => void;
  currentInsts: GigFormInstrument[];
  updateInstruments: <Value>(
    key: keyof (GigForm | DefaultUserProfile),
    value: Value,
    action: "add" | "delete",
  ) => void;
};

const InstrumentSelector = ({
  updateInstruments,
  deleteInst,

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

  const instToString = (inst: GigFormInstrument) => inst.name;

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst) {
      updateInstruments("instrumentation", inst, "add");
    }
  };

  return (
    // <>
    <BaseCombobox
      data={instrumentsToPass}
      disabledData={[]}
      dataToString={instToString}
      label="Instrumentation"
      action={addInstrument}
      action2={deleteInst}
    />
    /* <div>
    {instrumentation.map((instrument) => (
      <>
        <MusicianSelect
          currentMusicians={currentMusicians}
          instrument={instrument}
          updateMusicians={updateMusicians}
        />
      </>
    ))}
    <>
      {currentMusicians.map((mus) => (
        <div className="flex gap-4" key={`currentMusicians-${mus.id}`}>
          <span>{`${mus.name} - ${mus.instrument.name}`}</span>
          <span onClick={() => deleteMusician(mus)}>x</span>
        </div>
      ))}
    </>
  </div>
  </> */
  )
}

export default InstrumentSelector;
