// Convert date object to a UNIX timestamp
export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

// Convert a UNIX timestamp to a Date
export const convertUnixTimestampToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

export const convertUnixToShortDate = (unixTimestamp) => {
  const fullDate = convertUnixTimestampToDate(unixTimestamp);
  return fullDate.slice(0, 6) + fullDate.slice(8);
};

// Create new date by adding days/weeks/months/years to a given date.
export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

// Convert date format from date object to eg 2022-06-01.
export const convertDateFormat = (date) => {
  const offset = date.getTimezoneOffset();
  const offsetDate = new Date(date.getTime() - offset * 60 * 1000);
  return offsetDate.toISOString().split("T")[0];
};

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const convertNumbertoMonth = (num) => {
  return month[num];
};
