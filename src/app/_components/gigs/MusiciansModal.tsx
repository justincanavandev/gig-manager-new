"use client";

import { useBoolean } from "usehooks-ts";
import BaseButton from "../base/BaseButton";
import { type MusicianGetAllGigs } from "~/server/types/musicianTypes";
import BaseDialog from "../base/BaseDialog";
import MusInstRow from "../base/MusInstRow";

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
        className="w-[8rem] border"
      >
        View Musicians
      </BaseButton>
        <BaseDialog
          open={viewMusicians}
          message="Musicians"
          closeModal={closeViewMusicians}
        >
          <div className="flex h-fit flex-col sm:w-[400px] rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg ">
            <div className="flex">
              <div className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
                Instrument
                <h3 className="absolute right-[-60px] top-0 pb-0.5 pl-1 ">
                  Musician
                </h3>
              </div>
            </div>
            {musicians.map((m, i) => (
              <MusInstRow
                key={`musicianModal, ${m.musicianId}`}
                name={m.musician.name}
                instName={m.instrument.name}
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
