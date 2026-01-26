import React from 'react';

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'gray' | 'blue' | 'red' | 'green';
  className?: string;
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  color = 'gray',
  className = '',
}) => {
  const colorClasses = {
    gray: 'text-gray-300 drop-shadow-[0_0_8px_rgba(156,163,175,0.7)] drop-shadow-[0_0_15px_rgba(156,163,175,0.5)]',
    blue: 'text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.7)] drop-shadow-[0_0_15px_rgba(147,197,253,0.5)]',
    red: 'text-red-300 drop-shadow-[0_0_8px_rgba(252,165,165,0.7)] drop-shadow-[0_0_15px_rgba(252,165,165,0.5)]',
    green: 'text-green-300 drop-shadow-[0_0_8px_rgba(134,239,172,0.7)] drop-shadow-[0_0_15px_rgba(134,239,172,0.5)]',
  };

  return (
    <span
      className={`font-semibold tracking-wide transition-all duration-200 ease-out ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
};
