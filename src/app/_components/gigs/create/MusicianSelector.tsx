"use client";

// import { useMusicians } from "~/lib/features/musicians/musicianSlice";
import type {
  GigForm,
  GigFormInstrument,
  GigFormMusician,
} from "~/server/types/gigTypes";

// import BaseCombobox from "../../base/BaseCombobox";
import MusicianSelect from "./MusicianSelect";

type MusicianSelectorProps = {
  currentMusicians: GigFormMusician[];
  instrumentation: GigFormInstrument[];
  updateMusicians: <Value>(
    key: keyof GigForm,
    addedValue: Value,
    action: "add" | "delete",
  ) => void;
};

const MusicianSelector = ({
  currentMusicians,
  instrumentation,
  updateMusicians,
  
}: MusicianSelectorProps) => {


  const deleteMusician = (musician: GigFormMusician) => {
    updateMusicians("musicians", musician, "delete");
  };

  return (
    <div>
      {instrumentation.map((instrument) => (
        <>
          <MusicianSelect
            currentMusicians={currentMusicians}
            instrument={instrument}
            updateMusicians={updateMusicians}
            instrumentation={instrumentation}
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
  );
};

export default MusicianSelector;
