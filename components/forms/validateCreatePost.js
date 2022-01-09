import image from 'next/image';

const validateRegister = (values) => {
  const errors = {};

  if ('name' in values) {
    if (!values.name.trim()) {
      errors.name = 'Name required';
    } else {
      errors.name = '';
    }
  }
  if ('price' in values) {
    if (!values.price) {
      errors.price = 'Price required';
    } else if (typeof values.price == 'number') {
      errors.price = 'Invalid value';
    } else {
      errors.price = '';
    }
  }
  if ('image' in values) {
    if (!values.image.file && !values.image.image) {
      errors.image = { type: 'invalid', text: 'Image required' };
    } else {
      errors.image = '';
    }
  }
  if ('caption' in values) {
    if (!values.caption.trim()) {
      errors.caption = 'Story required';
    } else {
      errors.caption = '';
    }
  }
  if ('mentions' in values) {
    if (!values.mentions || values.mentions.length < 1) {
      errors.mentions = 'Least one pet is mentioned';
    } else {
      errors.mentions = '';
    }
  }

  return errors;
};

export default validateRegister;
