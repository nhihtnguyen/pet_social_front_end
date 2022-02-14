import DragAndDrop from 'components/DragAndDrop';
import { FiX } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Controls.module.scss';
import { useEffect, useState } from 'react';

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

const ImagePicker = ({
  value,
  onChange,
  validTooltip,
  warningTooltip,
  invalidTooltip,
  className = '',
  name,
  ...props
}) => {
  const [image, setImage] = useState(value);
  const [validate, setValidate] = useState('');
  const [file, setFile] = useState('');

  const handleDrop = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setImage(reader.result);
      onChange(convertToDefEventPara(name, { file, image: reader.result }));
      return reader.result;
    };
  };

  const handleClose = () => {
    setImage('');
    setFile('');
    onChange(convertToDefEventPara(name, { file: '', image: '' }));

    setValidate('');
  };

  const handleChange = async (e) => {
    let file = e.target.files[0];
    setFile(file);
    handleDrop(file);
  };

  useEffect(() => {
    setImage(value);
  }, [value]);
  const tooltipStyles =
    validTooltip && validTooltip !== ''
      ? styles['isAllowed']
      : warningTooltip && warningTooltip !== ''
      ? styles['isWarning']
      : invalidTooltip && invalidTooltip !== ''
      ? styles['isDenied']
      : '';

  const tooltip = validTooltip
    ? validTooltip
    : warningTooltip
    ? warningTooltip
    : invalidTooltip
    ? invalidTooltip
    : '';
  return (
    <DragAndDrop handleDrop={handleDrop}>
      <div
        className={`${className} ${styles['image-picker']} ${tooltipStyles} cursor-pointer d-flex rounded-xxxl position-relative justify-content-center align-items-center text-align-center`}
      >
        {image ? (
          <div className='image-container'>
            <Image
              layout='fill'
              className='image rounded-xxxxl '
              src={image}
              alt='image'
            />
            <FiX
              onClick={handleClose}
              className={`${styles['btn-close']} bg-white border-0 cursor-pointer rounded-circle position-absolute`}
            />
          </div>
        ) : (
          <div
            className={`${styles['browse-file-container']} d-flex flex-column justify-content-center align-items-center`}
          >
            <div
              className={`${styles['upload-button']} text-white p-2 bg-current mb-3 d-flex justify-content-center align-items-center position-relative rounded-circle`}
            >
              <input
                className='form-control'
                type='file'
                onChange={handleChange}
                {...props}
              />
              <FaArrowUp />
            </div>
            <span className='text-black'>Drag and drop or click to upload</span>
          </div>
        )}
        <label
          className={`${styles['tooltip']} top-0 invalid-tooltip color-inherit border-0 rounded text-white p-1 position-absolute`}
        >
          {tooltip}
        </label>
      </div>
    </DragAndDrop>
  );
};

export default ImagePicker;
