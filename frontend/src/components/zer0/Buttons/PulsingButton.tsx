import React from "react";

interface PulsingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const PulsingButton: React.FC<PulsingButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`bg-gray-900 text-white rounded-md cursor-pointer font-semibold px-4 py-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-transform duration-200 animate-pulse ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};
