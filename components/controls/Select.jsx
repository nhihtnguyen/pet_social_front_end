import Select from 'react-select';
import styles from './Controls.module.scss';
import { components } from 'react-select';
import Image from 'next/image';
import { Form } from 'react-bootstrap';
const { Option, MultiValue } = components;

const IconOption = ({ data, ...props }) => (
  <Option {...props} className='d-flex align-items-center'>
    {data?.hasIcon && (
      <Image
        className='rounded-circle'
        src={data?.image || `https://via.placeholder.com/30`}
        height='30px'
        width='30px'
        alt='label'
      />
    )}
    <h6 className='font-xxxs ms-1'>{data?.label}</h6>
  </Option>
);

const IconMultiValue = ({ data, ...props }) => (
  <MultiValue {...props} className='rounded-xxl d-flex align-items-center'>
    <Image
      alt='label'
      src={data?.image || 'https://via.placeholder.com/30'}
      height='30px'
      width='30px'
      className='rounded-circle'
    />
  </MultiValue>
);

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

const MySelect = ({
  onChange,
  label,
  multiple,
  name,
  invalidTooltip,
  className = '',
  style = '',
  inputStyle,
  menuStyle,
  singleStyle,
  ...props
}) => {
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      border: '3px solid #f1f1f1',
      borderWidth: '3px',
      borderColor: '#f1f1f1 !important',
      borderRadius: 16,
      ...menuStyle,
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: 'none',
      border: '3px solid #f1f1f1',
      borderWidth: '3px',
      borderColor: '#f1f1f1 !important',
      borderRadius: 16,
      ...inputStyle,
      // You can also use state.isFocused to conditionally style based on the focus state
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        borderRadius: 8,
      };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition, ...singleStyle };
    },
  };
  return (
    <Form.Group className={`${className} form-group`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        isMulti={multiple || false}
        styles={customStyles}
        components={{ MultiValue: IconMultiValue, Option: IconOption }}
        onChange={(e) => onChange(convertToDefEventPara(name, e))}
        name={name}
        className={'myselect'}
        classNamePrefix='myselect'
        {...props}
      />
      {
        <div
          className={`invalid-tooltip font-xsss ${
            invalidTooltip ? 'd-block' : 'd-none'
          }`}
        >
          {invalidTooltip}
        </div>
      }
    </Form.Group>
  );
};

export default MySelect;
