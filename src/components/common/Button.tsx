import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const buttonClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`;

    return (
        <button
            className={buttonClass}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <span className="btn-loader"></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
