import { ProgressBar, Form, Row, Col } from 'react-bootstrap';
import Select from 'components/controls/Select';
import ImagePicker from 'components/controls/ImagePicker';
import Check from 'components/controls/Check';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';
import { FiAtSign, FiHash } from 'react-icons/fi';
import styles from './Forms.module.scss';
import useForm from 'hooks/useForm';
import validateCreatePost from './validateCreatePost';
import useSWR from 'swr';
import axiosClient from 'axiosSetup';
import { useState, useEffect } from 'react';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const RegisterEventForm = ({ onSubmit, validated, loaded, values }) => {
  const { data: mentionOptions, error: loadMentionOptionsError } = useSWR(
    `/pets/owner`,
    fetcher
  );

  const [initValues, setInitValues] = useState({
    image: {
      file: '',
      image: values?.media_url || '',
    },
    caption: values?.caption || '',
    pet: { value: values?.pet_id },
  });

  useEffect(() => {
    if (values) {
      setInitValues({
        image: {
          file: '',
          image: values?.media_url || '',
        },
        caption: values?.caption || '',
        pet: { value: values?.pet_id },
      });
    }
  }, [values]);

  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(initValues, true, validateCreatePost, onSubmit, [
    'image',
    'caption',
  ]);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className='w-100'
    >
      <Row className='w-100 p-0'>
        <Col sm={6} xs={12} className=''>
          <ImagePicker
            name='image'
            value={info.image.image}
            onChange={onChange('image')}
            invalidTooltip={
              errors['image']?.type === 'invalid'
                ? errors['image']?.text
                : undefined
            }
            validTooltip={
              errors['image']?.type === 'valid'
                ? errors['image']?.text
                : undefined
            }
            warningTooltip={
              errors['image']?.type === 'warning'
                ? errors['image']?.text
                : undefined
            }
          />
        </Col>
        <Col sm={6} xs={12}>
          <div className={`position-relative w-100 ms-3`}>
            <Select
              value={info.pet}
              onChange={onChange('pet')}
              invalidTooltip={errors['pet']}
              name='pet'
              className={`mb-2 rounded-xxl ${styles['typing-box']}`}
              isLoading={!mentionOptions && !loadMentionOptionsError}
              label={<h3>Choose pets</h3>}
              multiple={false}
              required
              options={mentionOptions?.map((pet) => {
                return {
                  value: pet?.id,
                  label: pet?.name,
                  image: pet?.avatar || 'https://via.placeholder.com/30',
                  hasIcon: true,
                };
              })}
            />

            <div className={`rounded-xxl ${styles['typing-box']} mb-2`}>
              <Input
                value={info.caption}
                onChange={onChange('caption')}
                invalidTooltip={errors['caption']}
                name='caption'
                as='textarea'
                rows={5}
                label={<h3>Tell your story</h3>}
                style={{
                  borderBottom: '30px solid #F1F1F1 !important',
                }}
                inputClassName={`rounded-xxl ${styles['textarea']}`}
              />
            </div>
            {loaded > 0 ? (
              <ProgressBar
                animated
                now={loaded}
                label={loaded > 50 ? 'Stage 1' : 'Stage 2'}
              />
            ) : (
              <div className={`mt-3`}>
                <Button className='bg-current' onClick={handleSubmit}>
                  Post
                </Button>{' '}
                <Button className='bg-secondary' onClick={resetForm}>
                  Reset
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterEventForm;
