"use client";
import { BUTTON_VARIANTS, BUTTON_SIZES } from "@/constants";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2";

  const classes = `${baseClasses} ${BUTTON_VARIANTS[variant]} ${
    BUTTON_SIZES[size]
  } ${disabled ? "cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
