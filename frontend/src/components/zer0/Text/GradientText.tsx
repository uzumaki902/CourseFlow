import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'purple' | 'green' | 'red';
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const gradients = {
    default: 'from-gray-900 via-gray-600 to-gray-400',
    blue: 'from-blue-600 via-blue-500 to-blue-400',
    purple: 'from-purple-600 via-purple-500 to-pink-500',
    green: 'from-green-600 via-green-500 to-emerald-400',
    red: 'from-red-600 via-red-500 to-orange-500',
  };

  return (
    <span
      className={`bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent font-semibold transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  );
};
