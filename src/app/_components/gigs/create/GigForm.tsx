"use client";

import type { GigForm } from "~/server/types/gigTypes";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";
import VenueSelector from "./VenueSelector";


const GigForm = () => {


  return (
    <>
      <form onSubmit={(e) => console.log("e", e)}>
        <DateSelector />
        <InstrumentSelector />
        <VenueSelector/>
      </form>
    </>
  );
};

export default GigForm;
