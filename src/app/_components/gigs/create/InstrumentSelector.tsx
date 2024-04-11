"use client";

import type { Instrument } from "@prisma/client";

import { useDispatch } from "react-redux";
import { setGigForm } from "~/lib/features/gig/gigSlice";
import { useGigForm } from "~/lib/features/gig/gigSlice";

type GigFormProps = {
  instruments: Instrument[];
};

const InstrumentSelector = ({ instruments }: GigFormProps) => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();

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
