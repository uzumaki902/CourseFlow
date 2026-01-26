import React from 'react';

interface WavyTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const WavyText: React.FC<WavyTextProps> = ({
  children,
  className = '',
  delay = 0.1,
}) => {
  return (
    <span className={`inline-flex text-gray-900 font-semibold ${className}`}>
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-200 ease-out"
          style={{
            animation: 'wave 1.5s ease-in-out infinite',
            animationDelay: `${index * delay}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
