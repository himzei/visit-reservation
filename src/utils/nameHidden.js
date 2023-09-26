export const nameHidden = (value) => {
  const first = value[0];
  const third = value[2];

  const name = `${first}*${third}`;
  return name;
};
