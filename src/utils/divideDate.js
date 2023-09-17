export const divideDate = (date, time) => {
  const dateStr = date;
  const timeStr = time;
  const dateObj = new Date(dateStr);

  const timeParts = timeStr.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const timezoneOffsetHours = 9;
  dateObj.setHours(hours + timezoneOffsetHours, minutes, 0, 0);
  const reservationDate = dateObj.toISOString();
  return reservationDate;
};
