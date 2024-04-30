import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { compareTimes } from "~/server/utils/helpers";
import type { GigForm } from "~/server/types/gigTypes";

type DateTimeProps = {
  index?: number;
  startTime: string;
  endTime: string;
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
    <div>
      <ReactDatePicker
        className={
          compareTimes(new Date(startTime), new Date(endTime))
            ? "border border-green-500"
            : "border border-red-500"
        }
        minDate={index === 0 ? new Date() : new Date(startTime)}
        showIcon
        showTimeSelect
        timeIntervals={15}
        dateFormat="MM/dd/yyyy h:mm aa"
        selected={index === 0 ? new Date(startTime) : new Date(endTime)}
        onChange={(date) => {
          date instanceof Date && handleDateChange(date);
        }}
      />
    </div>
  );
};

export default DateTimePicker;
