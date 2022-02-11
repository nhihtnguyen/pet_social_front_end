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

  // if ('description' in values) {
  //   if (!values.type.trim()) {
  //     errors.type = 'Description required';
  //   } else {
  //     errors.type = '';
  //   }
  // }

  return errors;
};

export default validateAddPet;
