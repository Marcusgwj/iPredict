// Convert date object to a UNIX timestamp
export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

// Convert a UNIX timestamp to a Date
export const convertUnixTimestampToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

// Create new date by adding days/weeks/months/years to a given date.
export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
