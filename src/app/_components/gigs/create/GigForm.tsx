'use client'

import type { GigForm } from "~/server/types/gigTypes";
import type { Instrument } from "@prisma/client";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";

type GigFormProps = {
  instruments: Instrument[];
};

const GigForm = ({ instruments }: GigFormProps) => {

  return (
    <>
      <form onSubmit={(e)=> console.log('e', e)}>
      <DateSelector />
      <InstrumentSelector instruments={instruments} />
      </form>
    </>
  );
};

export default GigForm;
