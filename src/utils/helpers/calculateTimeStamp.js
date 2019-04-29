export default time => {
  const date = new Date(time);
  return date.toDateString();
};
