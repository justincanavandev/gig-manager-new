"use client";

import type { GigForm } from "~/server/types/gigTypes";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";
import { useInstruments } from "~/lib/features/instrument/instrumentSlice";


const GigForm = () => {

  const instruments = useInstruments()

  console.log('instruments', instruments)

  return (
    <>
      <form onSubmit={(e) => console.log("e", e)}>
        <DateSelector />
        <InstrumentSelector />
      </form>
    </>
  );
};

export default GigForm;
