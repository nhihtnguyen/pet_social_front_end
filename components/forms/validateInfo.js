const validateInfo = (values) => {
  const errors = {};

  if ('name' in values) {
    if (!values.name.trim()) {
      errors.name = 'Name required';
    } else {
      errors.name = '';
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

export default validateInfo;
