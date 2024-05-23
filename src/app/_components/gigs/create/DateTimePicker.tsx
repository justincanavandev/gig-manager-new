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
  currentEndTime: Date;
};

const DateTimePicker: React.FC<DateTimeProps> = ({
  index,
  changeDate,
  startTime,
  endTime,
  currentEndTime,
}) => {
  const handleDateChange = (date: Date) => {
    if (index === 0) {
      changeDate("startTime", date);
    } else {
      changeDate("endTime", date);
    }
  };

  const hasUserChangedDate = () => {
    const startTimeStr = startTime.toISOString();
    const endTimeStr = currentEndTime.toISOString();

    return startTimeStr !== endTimeStr;

  };

  return (
    <div className="relative">
      <ReactDatePicker
        className={`min-w-[13rem] rounded-[4px] text-[.9rem] text-black focus-visible:outline-none
      
        `}
        minDate={index === 0 ? new Date() : startTime}
        showIcon
        showTimeSelect
        timeIntervals={15}
        popperClassName="w-[21rem]"
        dateFormat="MM/dd/yyyy h:mm aa"
        selected={index === 0 ? startTime : endTime}
        onChange={(date) => {
          date instanceof Date && handleDateChange(date);
        }}
      />
      {hasUserChangedDate() ? (
        compareTimes(startTime, endTime) ? (
          <CheckIcon className="absolute bottom-[6px] right-[5px] h-5 w-5 text-green-500" />
        ) : (
          <>
            {index === 1 && (
              <>
                <XMarkIcon className="absolute bottom-[6px] right-[5px] h-5 w-5 text-red-500" />

                <span className="absolute left-0 top-12 text-[.61rem]">
                  End Time must be later than Start Time!
                </span>
              </>
            )}
          </>
        )
      ) : null}
    </div>
  );
};

export default DateTimePicker;
