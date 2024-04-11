import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { compareTimes } from "../EventCreate/utils/dateTime"
import { useGigForm } from "~/lib/features/gig/gigSlice";
import { setGigForm } from "~/lib/features/gig/gigSlice";
import { compareTimes } from "~/server/utils/helpers";
import { useDispatch } from "react-redux";

type DateTimeProps = {
  index?: number;
};

const DateTimePicker: React.FC<DateTimeProps> = ({ index }) => {
  const gigForm = useGigForm();
  const dispatch = useDispatch();

  console.log("gigForm", gigForm);

  const handleDateChange = (date: Date) => {
    if (index === 0) {
      dispatch(
        setGigForm({
          ...gigForm.gigForm,
          startTime: date,
        }),
      );
    } else {
      dispatch(
        setGigForm({
          ...gigForm.gigForm,
          endTime: date,
        }),
      );
    }
  };

  return (
    <div>
      <ReactDatePicker
        className={
          compareTimes(gigForm.gigForm.startTime, gigForm.gigForm.endTime)
            ? "border border-green-500"
            : "border border-red-500"
        }
        minDate={index === 0 ? new Date() : gigForm.gigForm.startTime}
        showIcon
        showTimeSelect
        timeIntervals={15}
        dateFormat="MM/dd/yyyy h:mm aa"
        selected={
          index === 0 ? gigForm.gigForm.startTime : gigForm.gigForm.endTime
        }
        onChange={(date) => {
          date instanceof Date && handleDateChange(date);
        }}
      />
    </div>
  );
};

export default DateTimePicker;
