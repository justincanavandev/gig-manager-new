import { DateTime } from "luxon";

const addZeroToHour = (hour: number) => {
  if (hour < 10) {
    return `0${hour}`;
  } else {
    return hour;
  }
};

const parseHour = (hour: number) => {
  if (hour > 12) {
    hour = hour - 12;
    const isThereZero = addZeroToHour(hour);
    return isThereZero;
  } else {
    if (hour === 0) {
      return "12";
    }
    const isThereZero = addZeroToHour(hour);
    return isThereZero;
  }
};

const parseMinute = (minute: number) => {
  if (minute < 10) {
    return `0${minute}`;
  } else {
    return minute;
  }
};

const getAmOrPm = (hour: number) => {
  if (hour <= 11) {
    return "AM";
  } else {
    return "PM";
  }
};

export const parseDate = (date: Date) => {
  const luxonDateTime = DateTime.fromJSDate(date);
  const dateTimeCST = luxonDateTime.setZone("America/Chicago");
  const dayOfWeek = dateTimeCST.weekdayShort;
  const hour = dateTimeCST.hour;
  const minute = dateTimeCST.minute;
  const timeZone = dateTimeCST.offsetNameShort;
  const year = dateTimeCST.year;
  const month = dateTimeCST.month;
  const day = dateTimeCST.day;

  const amOrPm = getAmOrPm(hour);

  const parsedTime =
    parseHour(hour) +
    ":" +
    parseMinute(minute) +
    " " +
    amOrPm +
    ", " +
    timeZone;

  const parsedDate = dayOfWeek + ", " + dateTimeCST.toLocaleString();

  const parsedTimeForCal = parseHour(hour) + ":" + parseMinute(minute);
  const parsedDateForCal = `${year}-${parseMinute(month)}-${parseMinute(day)}`;

  return { parsedDate, parsedTime, parsedTimeForCal, parsedDateForCal };
};

export const compareTimes = (startTime: Date, endTime: Date) => {
  return startTime < endTime;
};

export const hasDateHappened = (date: Date) => {
  return date < new Date();
};
