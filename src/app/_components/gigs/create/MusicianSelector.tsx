"use client";

import type {
  GigForm,
  GigFormInstrument,
  GigFormMusician,
} from "~/server/types/gigTypes";
import { type Dispatch, type SetStateAction } from "react";
import type {
  InstrumentName,
  MusicianSelect,
} from "~/server/types/instrumentTypes";
import BaseCombobox from "../../base/BaseCombobox";

type MusicianSelectorProps = {
  currentMusicians: GigFormMusician[];
  instrumentation: GigFormInstrument[];
  updateMusicians: <Value>(
    key: keyof GigForm,
    addedValue: Value,
    action: "add" | "delete",
  ) => void;
  isSelectorOpen: Partial<MusicianSelect>;
  toggleInstSelect: Dispatch<SetStateAction<Partial<MusicianSelect>>>;
};

const MusicianSelector = ({
  currentMusicians,
  instrumentation,
  updateMusicians,
  isSelectorOpen,
  toggleInstSelect,
}: MusicianSelectorProps) => {
  const isInstOpen = (inst: GigFormInstrument) => {
    const isInstValid = isSelectorOpen[`${inst.name}` as InstrumentName];
    return isInstValid;
  };

  const handleAddMusician = (musician: GigFormMusician) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */
    if (musician?.instrument) {
      updateMusicians("musicians", musician, "add");

      toggleInstSelect((prev) => {
        return {
          ...prev,
          [`${musician.instrument.name}`]: false,
        };
      });
    }
  };

  const deleteMusician = (musician: GigFormMusician) => {
    updateMusicians("musicians", musician, "delete");
  };
  const musicianToString = (musician: GigFormMusician) => musician.name;

  return (
    <>
      {instrumentation.map(
        (instrument) =>
          isInstOpen(instrument) && (
            <div key={`musicianSelector-${instrument.name}`}>
              <BaseCombobox
                data={
                  instrument.musicians
                    ? instrument.musicians
                        .filter(
                          (mus) =>
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
            </div>
          ),
      )}
      {currentMusicians.map((mus) => (
        <div className="flex gap-4" key={`currentMusicians-${mus.id}`}>
          <span>{`${mus.name} - ${mus.instrument.name}`}</span>
          <span onClick={() => deleteMusician(mus)}>x</span>
        </div>
      ))}
    </>
  );
};

export default MusicianSelector;
