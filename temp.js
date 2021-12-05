const MIN_CONFIDENCE = 0.55;
const A_CONFIDENCE = 0.7;
const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};

export const checkImageStatus = (res) => {
  for (let box of res) {
    if (box.name === 'cat' || box.name === 'dog') {
      if (box.confidence >= MIN_CONFIDENCE) {
        return STATUS['allowed'];
      }
    }
  }
  return ['denied'];
};
