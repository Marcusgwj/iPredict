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
  // Will give eg "06/01/2022"
  const dateString = date.toLocaleDateString();
  return `${dateString.slice(6)}-${dateString.slice(3, 5)}-${dateString.slice(
    0,
    2
  )}`;
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
