import React, { useState, useRef, useEffect } from "react";

interface PopperButtonProps {
  children: React.ReactNode;
  popoverContent: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const PopperButton: React.FC<PopperButtonProps> = ({
  children,
  popoverContent,
  onClick,
  disabled = false,
  className = "",
  position = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getPopoverPosition = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2";
      case "bottom":
        return "top-full mt-2";
      case "left":
        return "right-full mr-2";
      case "right":
        return "left-full ml-2";
      default:
        return "top-full mt-2";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className={`bg-gray-100 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-200 active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out font-medium px-4 py-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        onClick={handleClick}
        disabled={disabled}
        aria-label={typeof children === "string" ? children : undefined}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 ${getPopoverPosition()} bg-white border border-gray-200 rounded-md shadow-lg p-4 min-w-48`}
        >
          {popoverContent}
        </div>
      )}
    </div>
  );
};
