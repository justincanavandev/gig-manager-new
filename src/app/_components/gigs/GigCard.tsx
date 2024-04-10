"use client";

import { parseDate } from "~/server/utils/helpers";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
// import type { RouterOutputs } from "~/trpc/react";
import type { SingleGig } from "~/server/types/gigTypes";

/** @todo look into fixing this getAll RouterOutput. right now there's an issue w/ returning undefined and not accessing index[0] properly */

// type SingleGig = RouterOutputs["gig"]["getAll"][0]

type GigCardProps = {
  gig: SingleGig;
  index: number;
};

const GigCard = ({ gig, index }: GigCardProps) => {
  const [eventTargetIndexArr, setEventTargetIndexArr] = useState<number[]>([]);
  const { value: viewMusicians, setTrue: openViewMusicians } =
    useBoolean(false);

  const { musicians } = gig;

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
    <div className="flex flex-col" key={gig.id}>
      <h2>{gig.name}</h2>
      <span>Start Time: {parseDate(gig.startTime).parsedDate}</span>
      <span>End Time: {parseDate(gig.endTime).parsedDate}</span>
      {gig.venue && <span>Location: {gig.venue?.name}</span>}
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
    </div>
  );
};

export default GigCard;
