import { useState, useEffect } from 'react';

const useForm = (
  initValues,
  validateOnchange = false,
  validate,
  callback,
  validateFields = []
) => {
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setValues(initValues);
  }, [initValues]);

  useEffect(() => {
    console.log(errors);
    if (isSubmitted && Object.values(errors).every((x) => x === '')) {
      callback(values, setErrors, errors);
    }
    setIsSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleChange = (name) => (event) => {
    const newValue = event.target.value;
    setValues({ ...values, [name]: newValue });
    if (validateOnchange) {
      const temp = validate({ [name]: newValue });
      setErrors({ ...errors, ...temp });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filtered = values;
    if (
      validateFields &&
      validateFields !== undefined &&
      validateFields.length > 0
    ) {
      filtered = Object.keys(filtered)
        .filter((key) => validateFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = filtered[key];
          return obj;
        }, {});
    }
    const temp = validate(filtered);
    setErrors({ ...errors, ...temp });
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setValues(initValues);
  };

  return {
    handleChange,
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleSubmit,
  };
};

export default useForm;
