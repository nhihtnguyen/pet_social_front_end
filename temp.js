const MIN_CONFIDENCE = 0.4;
const A_CONFIDENCE = 0.7;
const STATUS = {
  allowed: 1,
  warning: 2,
  denied: 3,
};
const allowingClass = ['cat', 'dog'];
const warningClass = ['person'];

export const checkImageStatus = (res) => {
  for (let box of res) {
    if (box.confidence < 0.4) {
      continue;
    }
    if (box.confidence >= 0.7) {
      if (allowingClass.includes(box.name)) {
        return STATUS['allowed'];
      }
      if (warningClass.includes(box)) {
        return STATUS['warning'];
      }
    }

    if (allowingClass.includes(box.name)) {
      return STATUS['warning'];
    }
  }
  return ['denied'];
};
