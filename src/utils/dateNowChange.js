export const dateNowChange = (value) => {
  var currentDate = new Date(value);
  var year = currentDate.getFullYear();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅합니다.
  var day = currentDate.getDate().toString().padStart(2, "0"); // 일도 두 자리로 포맷팅합니다.

  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};
