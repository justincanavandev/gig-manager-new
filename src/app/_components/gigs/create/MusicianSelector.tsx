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
import BaseDialog from "../../base/BaseDialog";

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
  deleteInst: (inst: GigFormInstrument) => void;
  deleteMusician: (musician: GigFormMusician) => void;
};

const MusicianSelector = ({
  currentMusicians,
  instrumentation,
  updateMusicians,
  isSelectorOpen,
  toggleInstSelect,
  deleteInst,
  deleteMusician,
}: MusicianSelectorProps) => {
  const isInstOpen = (inst: GigFormInstrument) => {
    if (isInstrumentValid(inst?.name)) {
      const isInstValid = isSelectorOpen[`${inst.name}`];
      return isInstValid;
    }
  };

  const closeInstSelector = (inst: GigFormInstrument) => {
    if (isInstrumentValid(inst.name))
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

  const musicianToString = (musician: GigFormMusician) => musician.name;

  const closeMusicianSelector = (inst: GigFormInstrument) => {
    deleteInst(inst);
    closeInstSelector(inst);
  };

  const currentMusicianNames = currentMusicians.map((mus) => mus.name);

  return (
    <>
      {instrumentation.map((instrument) => (
        <>
          <BaseDialog
            message={`Select ${instrument.name}!`}
            open={!!isInstOpen(instrument)}
            closeModal={() => closeMusicianSelector(instrument)}
            title={instrument.name}
          >
            <div
              className="relative flex items-end gap-4"
              key={
                isInstOpen(instrument)
                  ? `musicianSelector-${instrument.name}`
                  : `selectorHidden-${instrument.name}`
              }
            >
              <BaseCombobox
                data={
                  instrument.musicians
                    ?.filter((mus) => !currentMusicianNames.includes(mus.name))
                    .map((mus) => {
                      return {
                        ...mus,
                        instrument: {
                          name: instrument.name,
                          id: instrument.id,
                        },
                      };
                    }) ?? []
                }
                disabledData={currentMusicians.filter(
                  (mus) => mus.instrument.name === instrument.name,
                )}
                dataToString={musicianToString}
                label={`Add ${instrument.name}`}
                action={handleAddMusician}
                action2={deleteMusician}
              />
              {/* <span
                    onClick={() => closeMusicianSelector(instrument)}
                    className="absolute right-2 top-[-3px] mb-[5px]"
                  >
                    x
                  </span> */}
            </div>
          </BaseDialog>
        </>
      ))}
    </>
  );
};

export default MusicianSelector;
