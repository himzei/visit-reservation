export const mobileDash = (value) => {
  var formattedNumber = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  return formattedNumber;
};
