"use client";

import DateTimePicker from "./DateTimePicker";
import type { GigForm } from "~/server/types/gigTypes";

const startOrEnd = ["Start Date", "End Date"];

type DateSelectorProps = {
  startTime: Date;
  endTime: Date;
  changeDate: <Value>(key: keyof GigForm, value: Value) => void;
};

const DateSelector = ({
  changeDate,
  startTime,
  endTime,
}: DateSelectorProps) => {

  // Variable used to see if the user has changed the any dates from the default value
  const currentEndTime = endTime

  return (
    <div className="flex flex-col gap-8">
      {startOrEnd.map((selection, index) => (
        <div
          key={`${selection}, ${index}`}
          
        >
          <div className="min-w-[14rem] max-w-full flex flex-col gap-4 rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg"> 
          <label className="text-[.7rem] uppercase">
            <span className="pb-0.5 pl-1">{selection}</span>

            <DateTimePicker
              startTime={startTime}
              endTime={endTime}
              changeDate={changeDate}
              index={index}
              currentEndTime={currentEndTime}
            />
          </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
