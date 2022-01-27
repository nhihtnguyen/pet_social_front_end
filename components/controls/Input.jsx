import { Form } from 'react-bootstrap';
import styles from './Controls.module.scss';

const Input = ({
  label,
  startIcon,
  endIcon,
  className = '',
  inputClassName,
  iconClassName,
  type,
  style,
  invalidTooltip,
  ...props
}) => {
  const icon = startIcon ? 'icon-input' : endIcon ? 'icon-right-input' : '';
  return (
    <Form.Group
      className={`${className || ''} ${icon} form-group`}
      style={style}
    >
      {label && <Form.Label>{label}</Form.Label>}
      {icon && (
        <span className='font-sm text-grey-500 pe-0 z-index-1'>
          {startIcon}
        </span>
      )}
      <Form.Control
        type={type}
        className={`${inputClassName} ${styles['typing-box']} font-xsss fw-600`}
        {...props}
      />
      <div
        className={`invalid-tooltip font-xsss ${
          invalidTooltip ? 'd-block' : 'd-none'
        }`}
      >
        {invalidTooltip}
      </div>
    </Form.Group>
  );
};

export default Input;
