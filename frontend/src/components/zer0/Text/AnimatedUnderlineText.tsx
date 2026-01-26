import React from 'react';

interface AnimatedUnderlineTextProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
}

export const AnimatedUnderlineText: React.FC<AnimatedUnderlineTextProps> = ({
  children,
  className = '',
  underlineColor = 'bg-gray-900',
}) => {
  return (
    <span className={`relative inline-block group cursor-pointer text-gray-900 transition-all duration-200 ease-out ${className}`}>
      {children}
      <span
        className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-200 ease-out group-hover:w-full`}
      ></span>
    </span>
  );
};
