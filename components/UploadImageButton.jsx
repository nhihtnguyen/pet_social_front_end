import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FiCamera } from 'react-icons/fi';
import axiosClient from 'axiosSetup';
import { useSWRConfig } from 'swr';

const UploadImageButton = ({
  id,
  url,
  className,
  style,
  mutateKey,
  ...props
}) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const handleUploadImage = async (e) => {
    try {
      setLoading(true);
      let file = e.target.files[0];

      const data = new FormData();
      data.append('image', file);
      let result;
      result = await axiosClient.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (result) {
        const ret = await mutate(mutateKey);
        console.log(mutate, ret);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <label
      htmlFor={id}
      className={`d-flex justify-content-center align-items-center font-md cursor-pointer border-0 bg-greylight btn-round-lg text-grey-700 ${
        className || ''
      }`}
      style={style}
    >
      {loading ? (
        <Spinner animation='border' />
      ) : (
        <>
          <FiCamera />
          <input
            id={id}
            className='d-none'
            type='file'
            onChange={handleUploadImage}
          />
        </>
      )}
    </label>
  );
};

export default UploadImageButton;
