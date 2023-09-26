export const mobileFormat = (value) => {
  const fir = value.substr(0, 3);
  //   const sec = value.substr(3, 4);
  const thi = value.substr(7, 4);
  const format = `${fir}-****-${thi}`;
  return format;
};
