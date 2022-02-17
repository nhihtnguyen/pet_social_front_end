import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

const Input = ({
    type,
    placeholder,
    startIcon,
    style,
    name
}) => {
    return (
        <div className={`form-group mb-0 ${startIcon ? 'icon-input' : ''}`}>
            {startIcon && <span className="font-sm text-grey-400">{startIcon}</span>}
            <input
                name={name}
                id={name}
                type={type}
                style={style}
                placeholder={placeholder}
                className={`bg-grey 
                border-0 
                lh-32 
                pt-2 
                pb-2 
                ps-5 
                pe-3 
                font-xssss 
                fw-500 
                rounded-xl 
                w350 
                theme-dark-bg`}
            />
        </div>
    )
};

export default Input;
