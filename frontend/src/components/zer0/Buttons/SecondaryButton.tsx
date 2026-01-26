import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`border border-gray-300 text-gray-900 rounded-md hover:bg-gray-300 active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out font-medium px-4 py-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
