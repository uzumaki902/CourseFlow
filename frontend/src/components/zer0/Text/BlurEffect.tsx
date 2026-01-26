import React from 'react';

interface BlurEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const BlurEffect: React.FC<BlurEffectProps> = ({
  children,
  className = '',
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <style>
        {`
          @keyframes wave {
            0% { background-position: 0 0; }
            25% { background-position: 0 8px; }
            50% { background-position: 0 20px; }
            75% { background-position: 0 12px; }
            100% { background-position: 0 0; }
          }
          
          @keyframes pulse-glow {
            0%, 100% { filter: blur(0.3px) brightness(1) contrast(1.2) drop-shadow(0 0 15px rgba(0, 200, 100, 0.5)); }
            50% { filter: blur(0.3px) brightness(1.1) contrast(1.3) drop-shadow(0 0 25px rgba(0, 200, 100, 0.7)); }
          }
        `}
      </style>
      
      {/* Main text with scanline effect */}
      <span
        className="relative inline-block font-extrabold uppercase tracking-[0.05em] text-transparent bg-clip-text"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, #00c864 0px, #00c864 1.5px, #008844 1.5px, #008844 3px)',
          animation: 'wave 2s ease-in-out infinite, pulse-glow 3s ease-in-out infinite',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </span>
      
      {/* Outer glow layer */}
      <span
        className="absolute left-0 top-0 font-extrabold uppercase tracking-[0.05em] text-[#00c864]/25 blur-[15px] -z-10"
        aria-hidden="true"
      >
        {children}
      </span>
      
      {/* Inner glow layer */}
      <span
        className="absolute left-0 top-0 font-extrabold uppercase tracking-[0.05em] text-[#00c864]/50 blur-[8px] -z-10"
        aria-hidden="true"
      >
        {children}
      </span>
      
      {/* Dark outline for definition */}
      <span
        className="absolute left-0 top-0 font-extrabold uppercase tracking-[0.05em] text-gray-900/10 blur-[1px] -z-10"
        style={{ transform: 'translate(0.5px, 0.5px)' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};
