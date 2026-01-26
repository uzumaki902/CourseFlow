import React from 'react';

interface OutlineTextProps {
  children: React.ReactNode;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
}

export const OutlineText: React.FC<OutlineTextProps> = ({
  children,
  strokeColor = '#111827',
  fillColor = 'transparent',
  className = '',
}) => {
  return (
    <span
      className={`font-semibold text-5xl transition-all duration-200 ease-out ${className}`}
      style={{
        WebkitTextStroke: `2px ${strokeColor}`,
        WebkitTextFillColor: fillColor,
        color: fillColor,
      }}
    >
      {children}
    </span>
  );
};
