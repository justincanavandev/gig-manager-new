"use client";

import type { GigForm } from "~/server/types/gigTypes";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";
import VenueSelector from "./VenueSelector";
import MusicianSelector from "./MusicianSelector";
import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { api } from "~/trpc/react";
import { useEffect, type ChangeEvent, useState } from "react";
import type { GigById } from "~/server/types/gigTypes";

type GigFormProps = {
  gig?: GigById;
};

const GigForm = ({ gig }: GigFormProps) => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();
  const [instName, setInstName] = useState<string>("");

  const { refetch: getInstByName } = api.instrument.getByName.useQuery(
    { name: instName },
    {
      enabled: !!instName,
    },
  );

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
          instrumentation: instrumentation.map((inst) => inst.instrument.name),
          musicianIds: musicians.map((mus) => mus.musicianId),
        }),
      );
    }
  }, [dispatch, gig]);

  const { mutate: createGig } = api.gig.create.useMutation();
  const { mutate: updateGig } = api.gig.update.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, startTime, endTime, venueId, musicianIds, instrumentation } =
      gigForm;

    if (gig) {
      updateGig({
        id: gig.id,
        name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venueId,
        musicianIds,
        instrumentation,
      });
    } else {
      createGig({
        name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venueId,
        musicianIds,
        instrumentation,
      });
    }
  };

  const selectInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
    const { instrumentation } = gigForm;
    return dispatch(
      setGigForm({
        ...gigForm,
        instrumentation: [...instrumentation, e.target.value],
      }),
    );
  };

  const deleteInstrument = async (inst: string) => {

    setInstName(inst);
    const instByName = await getInstByName();

    const musicianIdsForInst = instByName.data?.musicians.map(
      (mus) => mus.musicianId,
    );

    const { instrumentation, musicianIds } = gigForm;

    const filteredMusicianIds = musicianIds.filter((id) =>
      !musicianIdsForInst?.includes(id),
    );

    const filteredInsts = instrumentation.filter(
      (instrument) => instrument !== inst,
    );

    dispatch(
      setGigForm({
        ...gigForm,
        instrumentation: filteredInsts,
        musicianIds: filteredMusicianIds,
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
        <InstrumentSelector action={selectInstrument} nameOrId="name" />
        <VenueSelector />
        <ul className="flex gap-2">
          {gigForm.instrumentation.map((inst, index) => (
            <>
              <li key={`gigForm-${inst}-${index}`}>{inst}</li>
              <span onClick={() => deleteInstrument(inst)}>x</span>
            </>
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
