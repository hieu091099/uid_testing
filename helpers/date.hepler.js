function formatDate(date) {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toISOString();
  return formattedDate;
}

module.exports = {
  formatDate,
};
