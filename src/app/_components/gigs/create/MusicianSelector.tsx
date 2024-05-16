"use client";

import type {
  GigForm,
  GigFormInstrument,
  GigFormMusician,
} from "~/server/types/gigTypes";
import { type Dispatch, type SetStateAction } from "react";
import type { MusicianSelect } from "~/server/types/instrumentTypes";
import BaseCombobox from "../../base/BaseCombobox";
import { isInstrumentValid } from "~/server/utils/typeGuards";

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
  instsWithoutMusician: GigFormInstrument[];
  deleteInst: (inst: GigFormInstrument) => void
};

const MusicianSelector = ({
  currentMusicians,
  instrumentation,
  updateMusicians,
  isSelectorOpen,
  toggleInstSelect,
  instsWithoutMusician,
  deleteInst
}: MusicianSelectorProps) => {
  
  const isInstOpen = (inst: GigFormInstrument) => {
    if (isInstrumentValid(inst?.name)) {
      const isInstValid = isSelectorOpen[`${inst.name}`];
      return isInstValid;
    }
  };

  const closeInstSelector = (inst: GigFormInstrument) => {
    if (isInstrumentValid(inst.name))
      deleteInst(inst)
      toggleInstSelect((prev) => {
        return {
          ...prev,
          [`${inst.name}`]: false,
        };
      });
  };

  const handleAddMusician = (musician: GigFormMusician) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */
    if (musician?.instrument) {
      updateMusicians("musicians", musician, "add");

      closeInstSelector(musician.instrument);
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
            <div
              className="flex items-end gap-4"
              key={
                isInstOpen(instrument)
                  ? `musicianSelector-${instrument.name}`
                  : `selectorHidden-${instrument.name}`
              }
            >
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
              <span
                onClick={() => closeInstSelector(instrument)}
                className="mb-[5px]"
              >
                X
              </span>
            </div>
          ),
      )}
      {instsWithoutMusician?.map((inst) => (
        <div key={`instSelector, ${inst.name}`}>
          <span>
            {inst.name} - <span className="text-red-500">Add {inst.name}</span>
          </span>
        </div>
      ))}

      {currentMusicians.map((mus) => (
        <div className="flex gap-4" key={`currentMusicians-${mus.id}`}>
          <span>{`${mus.instrument.name} - ${mus.name}`}</span>
          <span onClick={() => deleteMusician(mus)}>x</span>
        </div>
      ))}
    </>
  );
};

export default MusicianSelector;
