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
import { FiPlusCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

const CreatePostForm = ({
  onSubmit,
  validated,
  loaded,
  values,
  isMint = false,
  setIsMint,
}) => {
  const { data: mentionOptions, error: loadMentionOptionsError } = useSWR(
    `/pets/owner`,
    fetcher
  );

  const options = mentionOptions?.map((pet) => {
    return {
      value: pet?.id,
      label: pet?.name,
      image: pet?.avatar || 'http://placehold.jp/30x30.png',
      hasIcon: true,
    };
  });

  const router = useRouter();

  const linkToAddPet = () => {
    router.push('/pet/create');
  };

  const [initValues, setInitValues] = useState({
    name: values?.name || '',
    price: values?.price || '',
    image: {
      file: '',
      image: values?.media_url || '',
    },
    caption: values?.caption || '',
    mentions: [],
  });

  useEffect(() => {
    if (values) {
      setInitValues({
        name: values?.name || '',
        price: values?.price || '',
        image: {
          file: '',
          image: values?.media_url || '',
        },
        caption: values?.caption || '',
        mentions: values?.mentions.map((pet) => {
          return { value: pet.pet_id };
        }),
      });
    }
  }, [values]);

  const {
    handleChange: onChange,
    values: info,
    errors,
    handleSubmit,
    resetForm,
  } = useForm(
    initValues,
    true,
    validateCreatePost,
    onSubmit,
    isMint ? ['name', 'image', 'caption'] : ['image', 'caption', 'mentions']
  );

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
            {isMint && (
              <Input
                value={info.name}
                onChange={onChange('name')}
                invalidTooltip={errors['name']}
                name='name'
                inputClassName={`rounded-xxl ${styles['textarea']}`}
                label={<h3>Name</h3>}
              />
            )}

            {!isMint && (
              <Select
                value={info.mentions}
                onChange={onChange('mentions')}
                invalidTooltip={errors['mentions']}
                name='mentions'
                className={`mb-2 rounded-xxl ${styles['typing-box']}`}
                isLoading={!mentionOptions && !loadMentionOptionsError}
                label={
                  <h3>
                    Choose pets{' '}
                    <span onClick={linkToAddPet} className='cursor-pointer'>
                      <FiPlusCircle />
                    </span>
                  </h3>
                }
                multiple={true}
                required
                options={options}
              />
            )}

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

              <div
                className={`${styles['action-button']} position-absolute w-100 left-0 bottom-0`}
              >
                <FiHash /> Tag
                <FiAtSign /> Mention
              </div>
            </div>
            <Check
              checked={isMint}
              onChange={() => setIsMint(!isMint)}
              label='Create as a token'
            />
            {loaded > 0 ? (
              <ProgressBar
                animated
                now={loaded}
                label={loaded > 50 ? 'Stage 1' : 'Stage 2'}
              />
            ) : (
              <div className={`mt-3`}>
                <Button className='bg-current' onClick={handleSubmit}>
                  {isMint ? 'Create token' : 'Post'}
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

export default CreatePostForm;
