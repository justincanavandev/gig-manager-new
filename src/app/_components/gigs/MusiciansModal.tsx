"use client";

import { useBoolean } from "usehooks-ts";
import BaseButton from "../base/BaseButton";
import { type MusicianGetAllGigs } from "~/server/types/musicianTypes";
import BaseDialog from "../base/BaseDialog";
import BaseRow from "../base/BaseRow";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

type MusiciansModalProps = {
  musicians: MusicianGetAllGigs;
  index?: number;
};

const MusiciansModal = ({ musicians }: MusiciansModalProps) => {
  const {
    value: viewMusicians,
    setTrue: openViewMusicians,
    setFalse: closeViewMusicians,
  } = useBoolean(false);

  return (
    <>
      <BaseButton
        as="button"
        onClick={() => openViewMusicians()}
        className="h-5 w-5"
      >
        <MusicalNoteIcon className="h-5 w-5" />
      </BaseButton>
      <BaseDialog
        open={viewMusicians}
        message="Musicians"
        closeModal={closeViewMusicians}
      >
        <div className="flex h-fit flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg sm:w-[400px] ">
          <div className="flex">
            <div className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
              Instrument
              <h3 className="absolute right-[-60px] top-0 pb-0.5 pl-1 ">
                Musician
              </h3>
            </div>
          </div>
          {musicians.map((m, i) => (
            <BaseRow
              key={`musicianModal, ${m.musicianId}`}
              optionalName={m.musician.name}
              requiredName={m.instrument.name}
              condition1={i === 0}
              condition2={i + 1 === musicians.length}
            />
          ))}
        </div>
      </BaseDialog>
    </>
  );
};

export default MusiciansModal;
