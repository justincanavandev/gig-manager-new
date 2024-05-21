"use client";

import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import BaseButton from "../base/BaseButton";
import { type MusicianGetAllGigs } from "~/server/types/musicianTypes";

type MusiciansModalProps = {
  musicians: MusicianGetAllGigs
  index: number;
};

const MusiciansModal = ({ musicians, index }: MusiciansModalProps) => {
  const [eventTargetIndexArr, setEventTargetIndexArr] = useState<number[]>([]);
  const { value: viewMusicians, setTrue: openViewMusicians } =
    useBoolean(false);

  const showHideMusicians = (index: number): void => {
    if (eventTargetIndexArr.length === 0) {
      setEventTargetIndexArr([...eventTargetIndexArr, index]);
      if (!viewMusicians) {
        openViewMusicians();
      }
    }

    if (!eventTargetIndexArr.includes(index)) {
      setEventTargetIndexArr([...eventTargetIndexArr, index]);
    }

    if (eventTargetIndexArr.includes(index)) {
      const filteredArr = eventTargetIndexArr.filter(
        (target) => target !== index,
      );
      setEventTargetIndexArr(filteredArr);
    }
  };

  return (
    <>
      <BaseButton
        as="button"
        onClick={() => showHideMusicians(index)}
        className="w-[8rem] border"
      >
        {viewMusicians && eventTargetIndexArr?.includes(index)
          ? "Hide Musician List"
          : "View Musician List"}
      </BaseButton>
      {viewMusicians && eventTargetIndexArr?.includes(index) && (
        <div className="">
          {musicians.map((m) => (
            <div key={`musicianModal, ${m.musicianId}`} className="flex">
              <p>{m.musician.name}</p>
              <p>{m.instrument.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MusiciansModal;
