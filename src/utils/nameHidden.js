export const nameHidden = (value) => {
  if (!value) {
    return;
  } else {
    const first = value[0];
    const third = value[2];

    const name = `${first}*${third}`;
    return name;
  }
};
