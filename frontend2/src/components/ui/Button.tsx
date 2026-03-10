import React, { forwardRef } from 'react';
import { ButtonProps } from '@/types/ui';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // ──────────────────────────────────────────
    // BASE STYLES (Always applied)
    // ──────────────────────────────────────────
    const baseClasses = `
      inline-flex items-center justify-center
      font-medium rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-60
    `;

    // ──────────────────────────────────────────
    // VARIANT STYLES (Colors & States)
    // ──────────────────────────────────────────
    const variantClasses = {
      primary: `
        bg-blue-600 text-white
        hover:bg-blue-700 active:bg-blue-800
        focus:ring-blue-500
        shadow-md hover:shadow-lg
      `,
      secondary: `
        bg-gray-600 text-white
        hover:bg-gray-700 active:bg-gray-800
        focus:ring-gray-500
        shadow-md hover:shadow-lg
      `,
      outline: `
        bg-transparent border-2 border-gray-300 text-gray-700
        hover:bg-gray-50 hover:border-gray-400
        focus:ring-gray-500
      `,
      ghost: `
        bg-transparent text-gray-700
        hover:bg-gray-100 active:bg-gray-200
        focus:ring-gray-500
      `,
      link: `
        bg-transparent text-blue-600
        hover:text-blue-700 hover:underline
        focus:ring-blue-500
      `,
      danger: `
        bg-red-600 text-white
        hover:bg-red-700 active:bg-red-800
        focus:ring-red-500
        shadow-md hover:shadow-lg
      `,
      success: `
        bg-green-600 text-white
        hover:bg-green-700 active:bg-green-800
        focus:ring-green-500
        shadow-md hover:shadow-lg
      `,
      warning: `
        bg-yellow-500 text-white
        hover:bg-yellow-600 active:bg-yellow-700
        focus:ring-yellow-500
        shadow-md hover:shadow-lg
      `,
      info: `
        bg-cyan-600 text-white
        hover:bg-cyan-700 active:bg-cyan-800
        focus:ring-cyan-500
        shadow-md hover:shadow-lg
      `,
      light: `
        bg-gray-100 text-gray-900
        hover:bg-gray-200 active:bg-gray-300
        focus:ring-gray-500
      `,
      dark: `
        bg-gray-900 text-white
        hover:bg-gray-800 active:bg-gray-700
        focus:ring-gray-500
        shadow-md hover:shadow-lg
      `,
    };

    // ──────────────────────────────────────────
    // SIZE STYLES (Padding & Text)
    // ──────────────────────────────────────────
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    // ──────────────────────────────────────────
    // WIDTH CLASSES
    // ──────────────────────────────────────────
    const widthClasses = fullWidth ? 'w-full' : '';

    // ──────────────────────────────────────────
    // ICON POSITIONING
    // ──────────────────────────────────────────
    const iconSpacing = {
      left: 'flex-row gap-2',
      right: 'flex-row-reverse gap-2',
      top: 'flex-col gap-1',
      bottom: 'flex-col-reverse gap-1',
    };

    // ──────────────────────────────────────────
    // COMBINE ALL CLASSES
    // ──────────────────────────────────────────
    const buttonClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${widthClasses}
      ${icon ? iconSpacing[iconPosition] : ''}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    // ──────────────────────────────────────────
    // LOADING SPINNER COMPONENT
    // ──────────────────────────────────────────
    const LoadingSpinner = () => (
      <svg
        className={`animate-spin ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // ──────────────────────────────────────────
    // RENDER
    // ──────────────────────────────────────────
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={buttonClasses}
        {...props}
      >
        {/* Show spinner when loading, otherwise show icon */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          icon && iconPosition !== 'right' && iconPosition !== 'bottom' && icon
        )}

        {/* Button text/children */}
        {children}

        {/* Icon on right/bottom */}
        {!isLoading && (iconPosition === 'right' || iconPosition === 'bottom') && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;