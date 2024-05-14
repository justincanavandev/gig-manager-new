"use client";

import DateTimePicker from "./DateTimePicker";
import type { GigForm } from "~/server/types/gigTypes";

const startOrEnd = ["Start Date", "End Date"];

type DateSelectorProps = {
  startTime: Date
  endTime: Date
  changeDate: <Value>(
    key: keyof GigForm,
    value: Value
  ) => void
};

const DateSelector = ({ changeDate, startTime, endTime }: DateSelectorProps) => {
  return (
    <div className="mt-8">
      {startOrEnd.map((selection, index) => (
        <label key={`${selection}, ${index} `}>
          {selection}

          <DateTimePicker startTime={startTime} endTime={endTime} changeDate={changeDate} index={index} />
        </label>
      ))}

      <br></br>
    </div>
  );
};

export default DateSelector;
