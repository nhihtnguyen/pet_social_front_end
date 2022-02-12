import { ProgressBar, Form, Row, Col } from 'react-bootstrap';
import Select from 'components/controls/Select';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';
import styles from './Forms.module.scss';
import useForm from 'hooks/useForm';
import validateAddEvent from './validateAddEvent';
import { useState, useEffect } from 'react';
import Editor from 'components/controls/Editor';
import { getFormatDate } from 'helpers';

const AddPetForm = ({ onSubmit, validated, loaded, values }) => {
  const typeOptions = [
    {
      value: true,
      label: 'Image Voting',
      image: '/',
    },
    {
      value: false,
      label: '...',
      image: '/',
    },
  ];
  const [initValues, setInitValues] = useState({
    name: values?.name || '',
    description: values?.description || '',
    start: values?.start
      ? getFormatDate(new Date(values?.start), 'yyyy-mm-dd')
      : '',
    end: values?.end ? getFormatDate(new Date(values?.end), 'yyyy-mm-dd') : '',
  });

  useEffect(() => {
    if (values) {
      setInitValues({
        name: values?.name || '',
        description: values?.description || '',
        start: values?.start
          ? getFormatDate(new Date(values?.start), 'yyyy-mm-dd')
          : '',
        end: values?.end
          ? getFormatDate(new Date(values?.end), 'yyyy-mm-dd')
          : '',
      });
    }
  }, [values]);
  console.log(initValues);

  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(initValues, true, validateAddEvent, onSubmit, ['name']);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col lg={6} className='mb-3'>
          <Input
            name='name'
            value={info.name}
            onChange={onChange('name')}
            invalidTooltip={errors['name']}
            label={<label className='mont-font fw-600 font-xsss'>Name</label>}
            type='text'
            inputClassName={`${styles['textarea']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>

        <Col lg={6} className='mb-3'>
          <Select
            name='type'
            value={typeOptions[0]}
            onChange={() => {}}
            disabled
            label={<label className='mont-font fw-600 font-xsss'>Type</label>}
            placeholder={''}
            inputStyle={{ borderRadius: 8 }}
            singleStyle={{ fontWeight: 600, fontSize: 14 }}
            aria-label='type'
            options={typeOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6} className='mb-3'>
          <Input
            type='date'
            name='start'
            value={info.start}
            onChange={onChange('start')}
            label={<label className='mont-font fw-600 font-xsss'>Start</label>}
            invalidTooltip={errors['start']}
            inputClassName={`${styles['textarea']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>
        <Col lg={6} className='mb-3'>
          <Input
            type='date'
            name='end'
            value={info.end}
            onChange={onChange('end')}
            label={<label className='mont-font fw-600 font-xsss'>End</label>}
            invalidTooltip={errors['end']}
            inputClassName={`${styles['textarea']} rounded-xxxl`}
            className='position-relative'
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12} className='mb-3'>
          <Editor
            value={info.description}
            onChange={onChange('description')}
            name='description'
            label={
              <label className='mont-font fw-600 font-xsss'>Description</label>
            }
            as={'textarea'}
            name='description'
            editorClassName={`mb-0 p-3 h100 lh-16 border-0 bg-dark-color text-dark`}
            toolbarClassName={`mb-0 border-0 theme-dark-bg`}
            wrapperClassName={`${styles['textarea']} rounded-xxxl`}
            placeholder='Write your description...'
            className='position-relative'
          />
        </Col>

        <div className='col-lg-12'>
          {loaded > 0 ? (
            <ProgressBar animated now={loaded} />
          ) : (
            <Button onClick={handleSubmit}>Add</Button>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default AddPetForm;
