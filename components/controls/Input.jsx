import styles from './styles.scss';

const Input = ({
    type,
    placeholder,
    icon
}) => {
    return (
        <div className="form-group mb-0 icon-input">
            {icon}
            <input
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
};

export default Input;
