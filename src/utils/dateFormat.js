export const dateFormat = (value) => {
  const dateStr = value.substr(0, 10);
  const year = dateStr.split("-")[0];
  const month = dateStr.split("-")[1];
  const day = dateStr.split("-")[2];

  const date = `${month}월 ${day}일`;

  const timeStr = value.substr(11, 5);
  const hour = timeStr.split(":")[0];
  const minute = timeStr.split(":")[1];
  const time = `${hour}시 ${minute}분`;
  return (
    <span>
      {date}
      <span style={{ color: "gray", fontSize: "14px" }}>({time})</span>
    </span>
  );
};
