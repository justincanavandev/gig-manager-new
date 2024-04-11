'use client'

import type { Instrument } from "@prisma/client";
import { GigForm } from "~/server/types/gigTypes";
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
            return dispatch(
              setGigForm({
                ...gigForm.gigForm,
                instrumentation: [
                  ...gigForm.gigForm.instrumentation,
                  e.target.value,
                ],
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
