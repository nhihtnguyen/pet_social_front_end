export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getFormatDate = (date) => {
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear()
  );
};

export const calVote = (vote) => {
  if (vote >= 1000000) {
    return `${vote / 1000000}m`;
  } else if (vote >= 1000) {
    return `${vote / 1000}k`;
  } else {
    return `${vote}`;
  }
};
