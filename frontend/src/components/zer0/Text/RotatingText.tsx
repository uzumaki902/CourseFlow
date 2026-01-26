import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  words: string[];
  interval?: number;
  variant?: 'default' | 'blue' | 'purple' | 'green' | 'red';
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 2000,
  variant = 'default',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = {
    default: 'text-gray-900',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    red: 'text-red-600',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block font-semibold ${colors[variant]} transition-all duration-200 ease-out ${
        isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
      } ${className}`}
    >
      {words[currentIndex]}
    </span>
  );
};
