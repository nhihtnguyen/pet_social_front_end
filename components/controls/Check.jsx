import { Form } from 'react-bootstrap';
import { FiEye } from 'react-icons/fi';

const Check = ({
  label,
  startIcon,
  endIcon,
  className,
  inputClassName,
  labelClassName,
  style,
  ...props
}) => {
  return (
    <Form.Group className={`${className}`} style={style}>
      <Form.Check className={`${inputClassName} form-check`}>
        <Form.Check.Input
          {...props}
          type={'checkbox'}
          className={`${inputClassName} form-check-input mt-2`}
        />
        {label && (
          <Form.Check.Label className={`${labelClassName} form-check-label`}>
            {label}
          </Form.Check.Label>
        )}
      </Form.Check>
      <div className='invalid-tooltip font-xsss'>Required</div>
    </Form.Group>
  );
};

export default Check;
