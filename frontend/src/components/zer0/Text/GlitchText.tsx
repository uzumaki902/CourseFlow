import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'cyan' | 'purple' | 'green' | 'red';
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const colors = {
    default: {
      main: 'text-gray-900',
      glitch1: 'text-gray-400',
      glitch2: 'text-gray-600',
    },
    cyan: {
      main: 'text-gray-900',
      glitch1: 'text-cyan-500',
      glitch2: 'text-blue-500',
    },
    purple: {
      main: 'text-gray-900',
      glitch1: 'text-purple-500',
      glitch2: 'text-pink-500',
    },
    green: {
      main: 'text-gray-900',
      glitch1: 'text-green-500',
      glitch2: 'text-emerald-500',
    },
    red: {
      main: 'text-gray-900',
      glitch1: 'text-red-500',
      glitch2: 'text-orange-500',
    },
  };

  const colorScheme = colors[variant];

  return (
    <div className={`relative inline-block ${className}`}>
      <style>{`
        @keyframes glitch {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-1px, 1px);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(1px, -1px);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
            transform: translate(-1px, 1px);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(1px, -1px);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
            transform: translate(-1px, 1px);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
            transform: translate(0);
          }
        }
      `}</style>
      <span className={`relative font-semibold ${colorScheme.main} text-4xl`}>
        {children}
        <span
          className={`absolute top-0 left-0 ${colorScheme.glitch1} opacity-70`}
          style={{ animation: 'glitch 0.3s infinite' }}
        >
          {children}
        </span>
        <span
          className={`absolute top-0 left-0 ${colorScheme.glitch2} opacity-70`}
          style={{ animation: 'glitch 0.4s infinite reverse' }}
        >
          {children}
        </span>
      </span>
    </div>
  );
};
