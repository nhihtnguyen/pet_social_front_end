import image from 'next/image';

const validateAddPet = (values) => {
  const errors = {};

  if ('name' in values) {
    if (!values.name.trim()) {
      errors.name = 'Name required';
    } else {
      errors.name = '';
    }
  }
  if ('age' in values) {
    if (!values.age) {
      errors.age = 'Age required';
    } else if (typeof values.age == 'number') {
      errors.age = 'Invalid value';
    } else {
      errors.age = '';
    }
  }

  if ('type' in values) {
    if (!values.type.trim()) {
      errors.type = 'Breed required';
    } else {
      errors.type = '';
    }
  }
  if ('gender' in values) {
    if (values.gender === '') {
      errors.gender = 'Gender required';
    } else {
      errors.gender = '';
    }
  }

  return errors;
};

export default validateAddPet;
