import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-brinda-purple text-white hover:bg-purple-800',
    secondary: 'bg-brinda-gold text-white hover:bg-amber-600',
    outline: 'border-2 border-brinda-purple text-brinda-purple hover:bg-purple-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
