import { useState, useEffect } from 'react';

const useForm = (initValues, validateOnchange = false, validate, callback) => {
    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted && Object.values(errors).every(x => x === '')) {
            callback();
        }
        setIsSubmitted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    const handleChange = (name) => (event) => {
        const newValue = event.target.value;
        setValues({ ...values, [name]: newValue });
        if (validateOnchange) {
            const temp = validate({ [name]: newValue })
            setErrors({ ...errors, ...temp })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const temp = validate(values)
        setErrors({ ...errors, ...temp })
        setIsSubmitted(true);
    }

    const resetForm = () => {
        setValues(initValues)
    }

    return { handleChange, values, setValues, errors, setErrors, resetForm, handleSubmit };
};

export default useForm;