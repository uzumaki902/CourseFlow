import React from "react";
import type { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 active:scale-[0.93] cursor-pointer transition-all duration-150 ease-out font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Icon className="text-xl" />
    </button>
  );
};
