'use client'

import DateTimePicker from "./DateTimePicker";

const startOrEnd = ["Start Date", "End Date"];

const DateSelector = () => {
  return (
    <div className="mt-8">
      {startOrEnd.map((selection, index) => (
        <label key={`${selection}, ${index} `}>
          {selection}

          <DateTimePicker index={index} />
        </label>
      ))}

      <br></br>
    </div>
  );
};

export default DateSelector;
