import React from 'react';

interface ShadowTextProps {
  children: React.ReactNode;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export const ShadowText: React.FC<ShadowTextProps> = ({
  children,
  shadowIntensity = 'medium',
  className = '',
}) => {
  const shadowStyles = {
    light: 'drop-shadow-[2px_2px_3px_rgba(0,0,0,0.2)]',
    medium: 'drop-shadow-[3px_3px_6px_rgba(0,0,0,0.3)]',
    heavy: 'drop-shadow-[4px_4px_8px_rgba(0,0,0,0.4)]',
  };

  return (
    <span className={`font-semibold text-gray-900 transition-all duration-200 ease-out ${shadowStyles[shadowIntensity]} ${className}`}>
      {children}
    </span>
  );
};
