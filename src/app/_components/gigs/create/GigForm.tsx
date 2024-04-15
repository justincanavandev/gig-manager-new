"use client";

import type { GigForm } from "~/server/types/gigTypes";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";
import VenueSelector from "./VenueSelector";
import MusicianSelector from "./MusicianSelector";
import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { api } from "~/trpc/react";

const GigForm = () => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();

  const { mutate: createGig } = api.gig.create.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, startTime, endTime, venueId, musicianIds, instrumentation } =
      gigForm;

    createGig({
      name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      venueId,
      musicianIds,
      instrumentation,
    });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name
          <input
            onChange={(e) =>
              dispatch(
                setGigForm({
                  ...gigForm,
                  name: e.target.value,
                }),
              )
            }
            value={gigForm.name}
            className="border border-black"
            name="name"
          ></input>
        </label>
        <DateSelector />
        <InstrumentSelector />
        <VenueSelector />
        <MusicianSelector />
        <button className="w-24 border border-black" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default GigForm;
