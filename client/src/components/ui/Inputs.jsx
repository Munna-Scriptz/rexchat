import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Inputs = ({
    labelIcon,
    label,
    error,
    helperText,
    leftIcon,
    type = 'text',
    id,
    variant = 'primary',
    defaultValue,
    size = 'md',
    className = '',
    labelClassName,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

    // 1. Base styles
    const baseStyles = "w-full transition-all outline-none flex items-center";
    const errorBase = `w-full border border-red-500 outline-none flex items-center`;


    // 2. Variants (Synced with your Button colors!)
    const variants = {
        primary: "bg-muted/50 border border-border text-text-primary placeholder:text-text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent/20 focus:bg-surface",
        secondary: "bg-emerald-500/5 border-emerald-500/20 text-emerald-900 focus:border-emerald-600 focus:bg-white",
        ghost: "bg-transparent border-transparent border-b-slate-700 text-slate-300 focus:text-white focus:border-b-white",
        danger: "bg-rose-500/5 border-rose-500/20 text-rose-900 focus:border-rose-600 focus:bg-white",
        success: "bg-green-500/10 border-green-500/20 text-green-400 focus:border-green-500",
    };

    // 3. Sizes
    const sizes = {
        sm: "text-xs px-3 py-2 rounded-md",
        medium: "text-xs px-3 py-2.5 rounded-md",
        md: "text-sm px-3 py-3.5 rounded-lg",
        lg: "text-base px-8 py-3.5 rounded-xl",
    };

    return (
        <div className="flex flex-col gap-1.5 w-full group">
            {label && (
                <label
                    htmlFor={id}
                    className={`text-xs font-bold uppercase tracking-widest duration-300 ${labelIcon && "flex items-center gap-2"} ${error ? 'text-red-500 animate-pulse' : labelClassName || 'text-slate-500'}`}
                >
                    {labelIcon}
                    {/* If there's an error, show it here; otherwise show the label */}
                    {error ? (
                        <span className="flex items-center gap-1.5">
                            <span className="h-1 w-1 bg-red-500 rounded-full shadow-[0_0_8px_#f43f5e]"></span>
                            {error}
                        </span>
                    ) : label}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-4 text-slate-500 group-focus-within:text-brand transition-colors" >
                        {leftIcon}
                    </div>
                )}

                <input
                    id={id}
                    type={currentType}
                    className={`${baseStyles} ${error ? errorBase : `${variants[variant]}`}  ${sizes[size]} ${leftIcon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''} ${className}`}
                    defaultValue={defaultValue}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-white text-lg transition-colors focus:outline-none cursor-pointer"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                )}
            </div>

            {helperText ? (
                <p className="text-xs text-slate-500">{helperText}</p>
            ) : null}
        </div>
    );
};

export default Inputs;