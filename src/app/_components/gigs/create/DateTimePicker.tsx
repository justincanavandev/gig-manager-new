import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { compareTimes } from "~/server/utils/helpers";
import type { GigForm } from "~/server/types/gigTypes";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

type DateTimeProps = {
  index?: number;
  startTime: Date;
  endTime: Date;
  changeDate: <Value>(key: keyof GigForm, value: Value) => void;
};

const DateTimePicker: React.FC<DateTimeProps> = ({
  index,
  changeDate,
  startTime,
  endTime,
}) => {
  const handleDateChange = (date: Date) => {
    if (index === 0) {
      changeDate("startTime", date);
    } else {
      changeDate("endTime", date);
    }
  };

  return (
    <div className="relative">
      <ReactDatePicker
        className={`min-w-[13rem] rounded-[4px] text-[.9rem] text-black focus-visible:outline-none
      
        `}
        minDate={index === 0 ? new Date() : new Date(startTime)}
        showIcon
        showTimeSelect
        timeIntervals={15}
        popperClassName="w-[21rem]"
        dateFormat="MM/dd/yyyy h:mm aa"
        selected={index === 0 ? new Date(startTime) : new Date(endTime)}
        onChange={(date) => {
          date instanceof Date && handleDateChange(date);
        }}
      />
      {compareTimes(new Date(startTime), new Date(endTime)) ? (
        <CheckIcon className="absolute bottom-[6px] right-[5px] h-5 w-5 text-green-500" />
      ) : (
        <>

          <XMarkIcon className="absolute bottom-[6px] right-[5px] h-5 w-5 text-red-500" />
          {/* <span>End Time must be later than Start Time!</span> */}
        </>
      )}
    </div>
  );
};

export default DateTimePicker;
