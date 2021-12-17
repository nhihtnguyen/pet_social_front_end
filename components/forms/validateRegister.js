const validateRegister = (values) => {
  const errors = {};

  if ('first_name' in values) {
    if (!values.first_name.trim()) {
      errors.first_name = 'First name required';
    } else {
      errors.first_name = '';
    }
  }
  if ('last_name' in values) {
    if (!values.last_name.trim()) {
      errors.last_name = 'Last name required';
    } else {
      errors.last_name = '';
    }
  }
  if ('email' in values) {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!values.email.trim()) {
      errors.email = 'Email required';
    } else if (!re.test(values.email)) {
      errors.email = 'Email address is invalid';
    } else {
      errors.email = '';
    }
  }
  if ('password' in values) {
    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 6) {
      errors.password = 'Password need less than 6 characters';
    } else {
      errors.password = '';
    }
  }

  return errors;
};

export default validateRegister;
