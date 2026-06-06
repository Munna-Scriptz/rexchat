import React from 'react';

const Button = ({
    children,
    variant = '',
    size = '',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}) => {

    // 1. Base styles that never change
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    // 2. Color variants (The "Vibe")
    const variants = {
        primary: "bg-gradient-to-r from-brand via-brand-light to-accent text-white shadow-brand hover:shadow-lg hover:shadow-brand/50 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 duration-300",
        secondary: "bg-surface border border-border text-text-primary hover:bg-muted hover:border-border-hover transition-all duration-300",
        ghost: "border-2 border-border text-brand font-bold text-sm hover:bg-white",
        danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400",
        success: "bg-green-500/20 text-green-400",
    };

    // 3. Size variants (The "Scale")
    const sizes = {
        sm: "text-xs px-3 py-1.5 rounded-md",
        md: "text-sm px-5 py-2.5 rounded-lg",
        lg: "text-base px-8 py-3.5 rounded-xl",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer select-none`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Show loading spinner if isLoading is true */}
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}

            {/* Render icons only if they exist and we aren't loading */}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {isLoading ? 'Loading...' : children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default Button;