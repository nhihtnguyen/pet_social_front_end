import bad_words_dic from 'bad_words.json';

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
  console.log('in temp', res);
  let allowed = 0;
  let warning = 0;
  for (let box of res) {
    if (box.confidence < 0.4) {
      continue;
    }
    if (box.confidence >= 0.7) {
      if (allowingClass.includes(box.name)) {
        allowed += 1;
        continue;
      }
      if (warningClass.includes(box.name)) {
        warning += 1;
        continue;
      }
    }

    if (allowingClass.includes(box.name)) {
      warning += 1;
      continue;
    }
    if (warningClass.includes(box.name)) {
      warning += 1;
      continue;
    }
  }

  if (allowed > 0) {
    return STATUS['allowed'];
  }
  if (warning > 0) {
    return STATUS['warning'];
  }
  return STATUS['denied'];
};

export const checkCaptionStatus = (caption) => {
  console.log('object', caption);
  if (caption === null || caption === undefined) {
    return '';
  }
  const word_list = caption?.split(' ');
  for (let word of word_list) {
    if (bad_words_dic[word.toLowerCase()]) {
      return STATUS['denied'];
    }
  }
  return STATUS['allowed'];
};
