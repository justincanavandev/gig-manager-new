import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { compareTimes } from "~/server/utils/helpers";
import type { GigForm } from "~/server/types/gigTypes";

type DateTimeProps = {
  index?: number;
  setForm: (state: GigForm) => void;
  form: GigForm
};

const DateTimePicker: React.FC<DateTimeProps> = ({ index, setForm, form}) => {


  const handleDateChange = (date: Date) => {
    if (index === 0) {
      setForm({
        ...form,
        startTime: date.toISOString(),
      });
    } else {
      setForm({
        ...form,
        endTime: date.toISOString(),
      });

    }
  };

  return (
    <div>
      <ReactDatePicker
        className={
          compareTimes(new Date(form.startTime), new Date(form.endTime))
            ? "border border-green-500"
            : "border border-red-500"
        }
        minDate={index === 0 ? new Date() : new Date(form.startTime)}
        showIcon
        showTimeSelect
        timeIntervals={15}
        dateFormat="MM/dd/yyyy h:mm aa"
        selected={
          index === 0 ? new Date(form.startTime) : new Date(form.endTime)
        }
        onChange={(date) => {
          date instanceof Date && handleDateChange(date);
        }}
      />
    </div>
  );
};

export default DateTimePicker;
