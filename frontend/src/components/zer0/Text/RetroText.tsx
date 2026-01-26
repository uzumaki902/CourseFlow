import React from 'react';

interface RetroTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'colorful' | 'neon' | 'sunset';
  className?: string;
}

export const RetroText: React.FC<RetroTextProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const colors = {
    default: {
      main: 'text-gray-900',
      layer1: 'text-gray-400',
      layer2: 'text-gray-500',
      layer3: 'text-gray-600',
    },
    colorful: {
      main: 'text-white',
      layer1: 'text-cyan-500',
      layer2: 'text-pink-500',
      layer3: 'text-yellow-500',
    },
    neon: {
      main: 'text-white',
      layer1: 'text-purple-500',
      layer2: 'text-blue-500',
      layer3: 'text-pink-500',
    },
    sunset: {
      main: 'text-white',
      layer1: 'text-orange-500',
      layer2: 'text-red-500',
      layer3: 'text-purple-500',
    },
  };

  const colorScheme = colors[variant];

  return (
    <div className={`relative inline-block transition-all duration-200 ease-out ${className}`}>
      <span className={`relative z-10 font-semibold text-4xl ${colorScheme.main}`}>
        {children}
      </span>
      <span className={`absolute top-[2px] left-[2px] font-semibold text-4xl ${colorScheme.layer1} opacity-60`}>
        {children}
      </span>
      <span className={`absolute top-[4px] left-[4px] font-semibold text-4xl ${colorScheme.layer2} opacity-40`}>
        {children}
      </span>
      <span className={`absolute top-[6px] left-[6px] font-semibold text-4xl ${colorScheme.layer3} opacity-20`}>
        {children}
      </span>
    </div>
  );
};
