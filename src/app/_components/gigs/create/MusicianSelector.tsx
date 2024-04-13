"use client";

import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { useMusicians } from "~/lib/features/musicians/musicianSlice";

const MusicianSelector = () => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();
  const musicians = useMusicians();

  const handleAddMusician = (e: React.ChangeEvent<HTMLSelectElement>) => {

    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */

    const addedMusicianId = e.target.value;
    const currentMusicianIds = [...gigForm.musicianIds];
    return dispatch(
      setGigForm({
        ...gigForm,
        musicianIds: [...currentMusicianIds, addedMusicianId]
      }),
    );
  };

  return (
    <>
      {gigForm.instrumentation.map((instrument, instIndex) => (
        <div key={`gigForm, ${instrument}, ${instIndex}`}>
          <label>Add {instrument}</label>
          <select
            className="border border-black"
            onChange={(e) => handleAddMusician(e)}
          >
            {" "}
            <option>Select {instrument}</option>
            {musicians.map(
              (musician, index) =>
                musician.instruments[0]?.instrument.name === instrument && (
                  <option key={index} value={musician.id}>
                    {musician.name}
                  </option>
                ),
            )}
          </select>
        </div>
      ))}
    </>
  );
};

export default MusicianSelector;
