export const timeStart = () => {
  const now = new Date();
  const utc = now.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);

  const date = korNow.toISOString();
  const temp = date.substring(0, 10);
  return `${temp}T00:00:00Z`;
};

export const timeEnd = () => {
  const now = new Date();
  const utc = now.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);

  const date = korNow.toISOString();
  const temp = date.substring(0, 10);
  return `${temp}T23:59:59Z`;
};

export const monthThreeStart = () => {
  const now = new Date();
  const utc = now.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const threeMonthDuration = 1000 * 60 * 60 * 24 * 90;
  const korNow = new Date(utc + koreaTimeDiff - threeMonthDuration);

  const date = korNow.toISOString();
  const temp = date.substring(0, 10);
  return `${temp}T00:00:00Z`;
};

export const monthThreeEnd = () => {
  const now = new Date();
  const utc = now.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const threeMonthDuration = 1000 * 60 * 60 * 24 * 90;
  const korNow = new Date(utc + koreaTimeDiff + threeMonthDuration);

  const date = korNow.toISOString();
  const temp = date.substring(0, 10);
  return `${temp}T23:59:59Z`;
};
