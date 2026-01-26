import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`bg-gray-900 text-white rounded-md hover:bg-gray-700 active:scale-[0.97] cursor-pointer transition-all duration-500 ease-out font-semibold px-4 py-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
