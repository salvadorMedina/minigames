import React from 'react';
import { theme } from '../../../constants/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-colors font-medium focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: `bg-primary hover:bg-primary/80 text-white`,
    secondary: `bg-secondary hover:bg-secondary/80 text-white`,
    danger: `bg-danger hover:bg-danger/80 text-white`,
    success: `bg-success hover:bg-success/80 text-white`
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 