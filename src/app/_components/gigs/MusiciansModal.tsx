"use client";

import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import type { MusiciansFromAllGigs } from "~/server/types/gigTypes";

type MusiciansModalProps = {
  musicians: MusiciansFromAllGigs;
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
      <button
        onClick={() => showHideMusicians(index)}
        className="w-[8rem] border"
      >
        {viewMusicians && eventTargetIndexArr?.includes(index)
          ? "Hide Musician List"
          : "View Musician List"}
      </button>
      {viewMusicians && eventTargetIndexArr?.includes(index) && (
        <div className="">
          {musicians.map((musician) => (
            <div key={musician.musicianId} className="flex">
              <p>{musician.musician.name}</p>
              <p>{musician.musician.instruments[0]?.instrument.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MusiciansModal;
