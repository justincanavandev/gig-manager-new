"use client";

import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type { ChangeEvent } from "react";

type InstrumentSelectProps = {
  action: (e: ChangeEvent<HTMLSelectElement>) => void;
  nameOrId: "name" | "id";
};

const InstrumentSelector = ({ action, nameOrId }: InstrumentSelectProps) => {
  const instruments = useInstruments();

  return (
    <>
      <label>
        Instrumentation:
        <select
          className="border border-black"
          name="instrumentation"
          onChange={(e) => action(e)}
        >
          <option value="">Select an instrument</option>
          {instruments?.map((instrument) => (
            <option
              key={`${instrument.name}-select`}
              value={nameOrId === "name" ? instrument.name : instrument.id}
            >
              {instrument.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default InstrumentSelector;
