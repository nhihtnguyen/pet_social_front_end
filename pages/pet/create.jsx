import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import DragAndDrop from 'components/draganddrop/DragAndDrop';
import { useState } from 'react';
import styles from './AddPetCard.module.scss';
import Button from 'components/controls/Button';
import Layout from 'components/Layout';

const AddPetCard = () => {
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');

  const handleChange = (e) => {
    let file = e.target.files[0];
    setFile(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleDrop = (file) => {
    console.log('sds', file);

    setFile(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  const handleClose = () => {
    setImage('');
  };
  return (
    <div
      className={`${styles['add-pet-card']} card w-100 border-0 bg-white shadow-xs p-0 mb-4 rounded-xxl`}
    >
      <div className='card-body p-lg-5 p-4 w-100 border-0 '>
        <div className='row justify-content-center'>
          <div className='text-center d-block'>
            <DragAndDrop handleDrop={handleDrop} htmlFor='avatar-file'>
              <div
                className={`${styles['image-upload']} d-flex rounded-xxxl position-relative justify-content-center align-items-center text-align-center`}
              >
                {image ? (
                  <>
                    <div className='image-container'>
                      <Image
                        layout='fill'
                        className='image rounded-xxxxl'
                        src={image}
                        alt='image'
                      />
                    </div>
                    <FiX
                      onClick={handleClose}
                      className={`${styles['btn-close']} rounded-circle position-absolute`}
                    />
                  </>
                ) : (
                  <div
                    className={`${styles['browse-file-container']}  d-flex flex-column justify-content-center align-items-center`}
                  >
                    <div
                      className={`${styles['upload-button']} mb-3 d-flex justify-content-center align-items-center position-relative rounded-circle`}
                    >
                      <input
                        id='avatar-file'
                        type='file'
                        onChange={handleChange}
                      />
                      <FaArrowUp />
                    </div>
                    <h6>Drag and drop or click to upload</h6>
                  </div>
                )}
              </div>
            </DragAndDrop>
            <h2 className='fw-700 font-sm text-grey-900 mt-3'>Avatar</h2>
          </div>
        </div>

        <form action='#'>
          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>Name</label>
                <input
                  type='text'
                  className={`${styles['input']} form-control rounded-xxxl`}
                />
              </div>
            </div>

            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>
                  Gender
                </label>
                <input
                  type='text'
                  className={`${styles['input']} form-control rounded-xxxl`}
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>Type</label>
                <input
                  type='text'
                  className={`${styles['input']} form-control rounded-xxxl`}
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12 mb-3'>
              <label className='mont-font fw-600 font-xsss mb-2 text-dark'>
                Description
              </label>
              <textarea
                className={`${styles['textarea']} form-control mb-0 p-3 h100 lh-16 rounded-xxxl`}
                rows='5'
                placeholder='Write your description...'
              ></textarea>
            </div>

            <div className='col-lg-12'>
              <Button>Add</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Account = () => {
  return (
    <Layout>
      <div className='middle-wrap'>
        <AddPetCard />
      </div>
    </Layout>
  );
};

export default Account;
