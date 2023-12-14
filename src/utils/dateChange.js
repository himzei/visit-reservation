export const dateChangeStart = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리 숫자로 포맷
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T00:00:00Z`;

  return formattedDate;
};

export const dateChangeEnd = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리 숫자로 포맷
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T23:59:59Z`;

  return formattedDate;
};
