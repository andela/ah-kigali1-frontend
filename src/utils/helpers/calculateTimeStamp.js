export default time => {
  const date = new Date(time);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const timeStamp = `${`${months[month]}  ${day}, ${year}`}`;
  return timeStamp;
};
