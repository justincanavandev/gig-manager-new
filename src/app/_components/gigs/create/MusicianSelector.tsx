"use client";

import { useMusicians } from "~/lib/features/musicians/musicianSlice";
import type { GigForm, GigFormInstrument, GigFormMusician } from "~/server/types/gigTypes";

type MusicianSelectorProps = {
  currentMusicians: GigFormMusician[]
  instrumentation: GigFormInstrument[]
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
  const musicians = useMusicians();

  const handleAddMusician = (e: React.ChangeEvent<HTMLSelectElement>) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */

    const addedMusician = JSON.parse(e.target.value) as GigFormMusician;

    updateMusicians("musicians", addedMusician, "add");
  };

  const deleteMusician = (musician: GigFormMusician) => {
    updateMusicians("musicians", musician, "delete");

  };

  const doesInstrumentHaveMusician = (inst: string) => {
    const musicians = currentMusicians.map((mus) => mus);
    const result = musicians.find((mus) => mus?.instrument?.name === inst);
    return !!result;
  };


  return (
    <div>
      {instrumentation.map((instrument, instIndex) => (
        <div key={`gigForm, ${instrument.id}, ${instIndex}`}>
          {!doesInstrumentHaveMusician(instrument.name) && (
            <>
              <label>Add {instrument.name}</label>
              <select
                className="border border-black"
                onChange={(e) => handleAddMusician(e)}
                name="musicians"
              >
                {" "}
                <option>Select {instrument.name}</option>
                {musicians.map(
                  (musician, index) =>
                    musician.instruments[0]?.instrument.name ===
                      instrument.name && (
                      <option
                        key={index}
                        value={JSON.stringify({
                          name: musician.name,
                          instrument: {
                            name: instrument.name,
                            id: instrument.id,
                          },
                          id: musician.id,
                        })}
                      >
                        {musician.name}
                      </option>
                    ),
                )}
              </select>
            </>
          )}
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
