"use client";

import type { GigForm, GigFormInstrument } from "~/server/types/gigTypes";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";
import VenueSelector from "./VenueSelector";
import MusicianSelector from "./MusicianSelector";
import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { api } from "~/trpc/react";
import { useEffect, type ChangeEvent } from "react";
import type { GigById } from "~/server/types/gigTypes";

type GigFormProps = {
  gig?: GigById;
};

const GigForm = ({ gig }: GigFormProps) => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();

  useEffect(() => {
    if (gig) {
      const { name, startTime, endTime, instrumentation, musicians, venueId } =
        gig;
      dispatch(
        setGigForm({
          name,
          venueId: venueId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          instrumentation: instrumentation.map((inst) => {
            return { name: inst.instrument.name, id: inst.instrumentId };
          }),
          musicians: musicians.map((mus) => {
            return {
              instrument: mus.instrument,
              id: mus.musicianId,
              name: mus.musician.name,
            };
          }),
        }),
      );
    }
  }, [dispatch, gig]);

  const { mutate: createGig } = api.gig.create.useMutation();
  const { mutate: updateGig } = api.gig.update.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, startTime, endTime, venueId, musicians, instrumentation } =
      gigForm;

    const instrumentNames = instrumentation.map((inst) => inst.name);

    if (gig) {
      const updatedMusicians = musicians.map((mus) => {
        return {
          name: mus.name,
          instrument: { name: mus.instrument.name, id: mus.instrument.id },
          id: mus.id,
        };
      });

      updateGig({
        id: gig.id,
        name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venueId,
        musicians: updatedMusicians,
        instrumentation,
      });
    } else {
      const createMusicians = musicians.map((mus) => {
        return {
          name: mus.name,
          instrument: mus.instrument.name,
          id: mus.id,
        };
      });
      createGig({
        name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venueId,
        musicians: createMusicians,
        instrumentation: instrumentNames,
      });
    }
  };

  const selectInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
    const { instrumentation } = gigForm;
    const parsedObj = JSON.parse(e.target.value) as GigFormInstrument;

    return dispatch(
      setGigForm({
        ...gigForm,
        instrumentation: [...instrumentation, parsedObj],
      }),
    );
  };

  const deleteInstrument = async (inst: GigFormInstrument) => {
    const { instrumentation, musicians } = gigForm;
    const filteredMusicians = musicians.filter(
      (mus) => mus.instrument.name !== inst.name,
    );
    const filteredInsts = instrumentation.filter(
      (instrument) => instrument.name !== inst.name,
    );

    dispatch(
      setGigForm({
        ...gigForm,
        instrumentation: filteredInsts,
        musicians: filteredMusicians,
      }),
    );
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
        <InstrumentSelector action={selectInstrument} />
        <VenueSelector venueId={gig?.venue ? gig.venueId : null } />
        <ul className="flex gap-2">
          {gigForm.instrumentation.map((inst, index) => (
            <div key={`gigForm-${inst.name}-${index}`}>
              <li>{inst.name}</li>
              <span onClick={() => deleteInstrument(inst)}>x</span>
            </div>
          ))}
        </ul>
        <MusicianSelector />

        <button className="w-24 border border-black" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default GigForm;
