import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const GhostButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`text-gray-700 rounded-sm hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out font-medium px-3 py-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
