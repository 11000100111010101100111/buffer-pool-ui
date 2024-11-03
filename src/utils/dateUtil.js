
function dateToTimestamp(dateStr) {
  const date = new Date(dateStr);
  return date.getTime();
}

function timeDifference(timestampLeft, timestampRight) {
  const dateString = "2024-9-28 13:03:00.000";
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = targetDate - currentDate;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
}
