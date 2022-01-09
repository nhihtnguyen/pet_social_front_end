import Select from 'react-select';
import styles from './Controls.module.scss';
import { components } from 'react-select';
import Image from 'next/image';
import { Form } from 'react-bootstrap';
const { Option, MultiValue } = components;

const options = [
  {
    value: 'chocolate',
    label: 'Chocolate',
    image: 'https://picsum.photos/200/300',
  },
  {
    value: 'strawberry',
    label: 'Strawberry',
    image: 'https://picsum.photos/200/300',
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
    image: 'https://picsum.photos/200/300',
  },
];

const IconOption = (props) => (
  <Option {...props} className='d-flex align-items-center'>
    <Image
      className='rounded-circle'
      src={`https://picsum.photos/200/300`}
      height='30px'
      width='30px'
      alt='label'
    />
    <h6 className='font-xxxs ms-1'>{props.data.label}</h6>
  </Option>
);

const IconMultiValue = (props) => (
  <MultiValue {...props} className='rounded-xxl d-flex align-items-center'>
    <Image
      alt='label'
      src={'https://picsum.photos/200/300'}
      height='30px'
      width='30px'
      className='rounded-circle'
    />
  </MultiValue>
);

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 16,
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    border: '3px solid #f1f1f1',
    borderWidth: '3px',
    borderColor: '#f1f1f1 !important',
    borderRadius: 16,
    // You can also use state.isFocused to conditionally style based on the focus state
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      borderRadius: 8,
    };
  },
};

const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});

const MySelect = ({
  onChange,
  label,
  name,
  invalidTooltip,
  className = '',
  style = '',
  ...props
}) => (
  <Form.Group className={`${className} form-group`}>
    {label && <Form.Label>{label}</Form.Label>}
    <Select
      isMulti
      options={options}
      styles={customStyles}
      components={{ MultiValue: IconMultiValue, Option: IconOption }}
      onChange={(e) => onChange(convertToDefEventPara(name, e))}
      name={name}
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

export default MySelect;
