'use client';
import React, { useRef, useCallback } from "react";
import style from "./styles/button.module.css";

export enum ButtonVariant {
    Primary = "primary",
    Rounded = "rounded",
    Bordered = "bordered",
    White = "white",
    Black = "black",
    Gray = "gray",
}

export enum ColorVariant {
    Default = "default",
    Blue = "blue",
    Red = "red",
}

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: ButtonVariant | string;
    color?: ColorVariant | string;
}

export default function Button({
    children,
    variant = ButtonVariant.Primary,
    className = "",
    onClick,
    type = "button",
    disabled = false,
    color,
}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement("span");
        ripple.className = style.ripple;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
    }, []);

    const defaultClassName = 'cursor-pointer py-2 px-4 min-w-[100px] relative overflow-hidden';

    return (
        <button
            ref={buttonRef}
            type={type}
            className={`${buttonStyles[variant as ButtonVariant] || buttonStyles[ButtonVariant.Primary]} ${colorStyles[color as ColorVariant] || colorStyles[ColorVariant.Default]} ${className} ${defaultClassName}`}
            onClick={(e) => {
                handleRipple(e);
                if (onClick) onClick();
            }}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
}

const colorStyles = {
    [ColorVariant.Default]: "bg-[#3DBD94]",
    [ColorVariant.Blue]: "bg-[#567EEB]",
    [ColorVariant.Red]: "bg-[#F07979]",
};

const buttonStyles = {
    [ButtonVariant.Primary]: "text-white rounded-[8px]",
    [ButtonVariant.Rounded]: "text-white rounded-full",
    [ButtonVariant.Bordered]: "rounded-full bg-transparent border border-black/10 text-[#282828]",
    [ButtonVariant.White]: "text-[#282828] bg-white rounded-[8px] border border-black/10",
    [ButtonVariant.Black]: "text-white bg-black/90 rounded-[8px]",
    [ButtonVariant.Gray]: "text-black/50 bg-black/10 rounded-[8px] border border-black/10",
};