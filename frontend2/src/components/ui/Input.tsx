import React, { forwardRef } from "react";

import { InputProps } from "@/types/ui"

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      icon,
      iconPosition = "left",
      className = "",
      disabled = false,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const baseInputClasses = `
      px-4 py-2.5 
      border rounded-lg 
      transition-all duration-200
      focus:outline-none focus:ring-2 
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
      placeholder:text-gray-400
    `;

    const normalClasses = `
      border-gray-300 
      focus:border-blue-500 focus:ring-blue-500/20
      hover:border-gray-400
    `;

    const errorClasses = `
      border-red-500 
      focus:border-red-500 focus:ring-red-500/20
      hover:border-red-600
    `;

    const iconClasses = icon
      ? iconPosition === "left"
        ? "pl-11"
        : "pr-11"
      : "";

    const inputClasses = `
      ${baseInputClasses}
      ${error ? errorClasses : normalClasses}
      ${iconClasses}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `
      .trim()
      .replace(/\s+/g, " ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === "left" && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id}-error`
                : helperText
                  ? `${props.id}-helper`
                  : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {icon && iconPosition === "right" && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-start gap-1"
          >
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
