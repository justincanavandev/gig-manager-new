"use client";

import { useMusicians } from "~/lib/features/musicians/musicianSlice";
import type { GigForm, GigFormMusician } from "~/server/types/gigTypes";

type MusicianSelectorProps = {
  form: GigForm
  setForm: (state: GigForm) => void
}

const MusicianSelector = ({ form, setForm }: MusicianSelectorProps) => {

  const musicians = useMusicians();



  const handleAddMusician = (e: React.ChangeEvent<HTMLSelectElement>) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */

    const addedMusician = JSON.parse(e.target.value) as GigFormMusician;

    const currentMusicians = [...form.musicians];
    setForm({
      ...form,
      musicians: [...currentMusicians, addedMusician],
    });
  };

  const doesInstrumentHaveMusician = (inst: string) => {
    const musicians = form.musicians.map((mus) => mus);
    const result = musicians.find((mus) => mus.instrument.name === inst);
    return !!result;
  };

  return (
    <>
      {form.instrumentation.map((instrument, instIndex) => (
        <div key={`gigForm, ${instrument.id}, ${instIndex}`}>
          {!doesInstrumentHaveMusician(instrument.name) && (
            <>
              <label>Add {instrument.name}</label>
              <select
                className="border border-black"
                onChange={(e) => handleAddMusician(e)}
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
    </>
  );
};

export default MusicianSelector;
