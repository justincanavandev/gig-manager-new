"use client";

import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { useInstruments } from "~/lib/features/instrument/instrumentSlice";


const InstrumentSelector = () => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();
  const instruments = useInstruments()

  return (
    <>
      <label>
        Instrumentation:
        <select
          className="border border-black"
          name="instrumentation"
          onChange={(e) => {
            const { instrumentation } = gigForm;
            return dispatch(
              setGigForm({
                ...gigForm,
                instrumentation: [...instrumentation, e.target.value],
              }),
            );
          }}
        >
          <option value="">Select an instrument</option>
          {instruments?.map((instrument) => (
            <option key={`${instrument.name}-select`} value={instrument.name}>
              {instrument.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default InstrumentSelector;
