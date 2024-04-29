"use client";

import DateTimePicker from "./DateTimePicker";
import type { GigForm } from "~/server/types/gigTypes";

const startOrEnd = ["Start Date", "End Date"];

type DateSelectorProps = {
  setForm: (state: GigForm) => void
  form: GigForm
};

const DateSelector = ({ setForm, form }: DateSelectorProps) => {
  return (
    <div className="mt-8">
      {startOrEnd.map((selection, index) => (
        <label key={`${selection}, ${index} `}>
          {selection}

          <DateTimePicker form={form} setForm={setForm} index={index} />
        </label>
      ))}

      <br></br>
    </div>
  );
};

export default DateSelector;
