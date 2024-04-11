import type { GigForm } from "~/server/types/gigTypes";
import type { Instrument } from "@prisma/client";
import InstrumentSelector from "./InstrumentSelector";
import DateSelector from "./DateSelector";

type GigFormProps = {
  instruments: Instrument[];
};

const GigForm = ({ instruments }: GigFormProps) => {
  //   console.log('gigForm', gigForm)

  return (
    <>
      {/* <label>
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
      </label> */}
      <DateSelector />
      <InstrumentSelector instruments={instruments} />
    </>
  );
};

export default GigForm;
