"use client";

// import { useMusicians } from "~/lib/features/musicians/musicianSlice";
import type {
  GigForm,
  GigFormInstrument,
  GigFormMusician,
} from "~/server/types/gigTypes";
// import type { GetAllMusicians } from "~/server/types/musicianTypes";
import BaseCombobox from "../../base/BaseCombobox";

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
  const handleAddMusician = (musician: GigFormMusician) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */

    updateMusicians("musicians", musician, "add");
  };

  const deleteMusician = (musician: GigFormMusician) => {
    updateMusicians("musicians", musician, "delete");
  };

  // const doesInstrumentHaveMusician = (inst: string) => {
  //   const musicians = currentMusicians.map((mus) => mus);
  //   const result = musicians.find((mus) => mus?.instrument?.name === inst);

  //   return !!result;
  // };

  const musicianToString = (musician: GigFormMusician) => musician.name;

  return (
    <div>
      {instrumentation.map((instrument, instIndex) => (
        <div key={`gigForm, ${instrument.id}, ${instIndex}`}>
          {/* {!doesInstrumentHaveMusician(instrument.name) && ( */}
          <>
            <BaseCombobox
              data={
                instrument.musicians
                  ? instrument.musicians
                      .filter((mus) =>
                        !currentMusicians.map((m) => m.id).includes(mus.id),
                      )
                      .map((mus) => {
                        return {
                          ...mus,
                          instrument: {
                            name: instrument.name,
                            id: instrument.id,
                          },
                        };
                      })
                  : []
              }
              disabledData={currentMusicians.filter(
                (mus) => mus.instrument.name === instrument.name,
              )}
              dataToString={musicianToString}
              label={`Add ${instrument.name}`}
              action={handleAddMusician}
              action2={deleteMusician}
            />
          </>

          {/* )} */}
        </div>
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
