import { ProgressBar, Form, Row, Col } from 'react-bootstrap';
import Select from 'components/controls/Select';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';
import styles from './Forms.module.scss';
import useForm from 'hooks/useForm';
import validateInfo from './validateInfo';
import { useState, useEffect } from 'react';

const EditProfileForm = ({ onSubmit, validated, loaded, values }) => {
  const genderOptions = [
    {
      value: true,
      label: 'Male',
      image: '/',
    },
    {
      value: false,
      label: 'Female',
      image: '/',
    },
  ];
  const [initValues, setInitValues] = useState({
    first_name: values?.first_name || '',
    age: values?.age || '',
    last_name: values?.last_name || '',
    gender: values
      ? genderOptions.find((elm) => elm.value === values.gender)
      : genderOptions[0],
    description: values?.description || '',
  });

  useEffect(() => {
    if (values) {
      setInitValues({
        first_name: values?.first_name || '',
        age: values?.age || '',
        last_name: values?.last_name || '',
        gender: values
          ? genderOptions.find((elm) => elm.value === values.gender)
          : genderOptions[0],
        description: values?.description || '',
      });
    }
  }, [values]);

  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(initValues, true, validateInfo, onSubmit, [
    'first_name, last_name',
  ]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col lg={6} className='mb-3'>
          <Input
            name='First Name'
            value={info.first_name}
            onChange={onChange('first_name')}
            invalidTooltip={errors['first_name']}
            label={
              <label className='mont-font fw-600 font-xsss'>First Name</label>
            }
            type='text'
            inputClassName={`${styles['textarea']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>
        <Col lg={6} className='mb-3'>
          <Input
            name='last_name'
            value={info.last_name}
            onChange={onChange('last_name')}
            invalidTooltip={errors['last_name']}
            label={
              <label className='mont-font fw-600 font-xsss'>Last Name</label>
            }
            type='text'
            inputClassName={`${styles['textarea']} ${styles['typing-box']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>
      </Row>

      {/* <Row>
        <Col lg={6} className='mb-3'>
          <Select
            name='gender'
            value={info.gender}
            onChange={onChange('gender')}
            invalidTooltip={errors['gender']}
            label={<label className='mont-font fw-600 font-xsss'>Gender</label>}
            placeholder={''}
            inputStyle={{ borderRadius: 8 }}
            singleStyle={{ fontWeight: 600, fontSize: 14 }}
            aria-label='gender'
            options={genderOptions}
          />
        </Col>

        <Col lg={6} className='mb-3'>
          <Input
            name='age'
            value={info.age}
            onChange={onChange('age')}
            invalidTooltip={errors['age']}
            label={<label className='mont-font fw-600 font-xsss'>Age</label>}
            type='number'
            inputClassName={`${styles['textarea']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>
      </Row> */}

      <Row>
        <Col lg={12} className='mb-3'>
          <Input
            name='description'
            value={info.description}
            onChange={onChange('description')}
            label={
              <label className='mont-font fw-600 font-xsss'>Description</label>
            }
            as={'textarea'}
            name='description'
            inputClassName={`${styles['textarea']} mb-0 p-3 h100 lh-16 rounded-xxxl`}
            rows={5}
            placeholder='Write your description...'
            className='position-relative'
          />
        </Col>

        <div className='col-lg-12'>
          {loaded > 0 ? (
            <ProgressBar animated now={loaded} />
          ) : (
            <Button onClick={handleSubmit}>Update</Button>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default EditProfileForm;
