import React from "react";

interface SprayBlurTextProps {
  children: React.ReactNode;
  className?: string;
}

export const SprayBlurText: React.FC<SprayBlurTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <style>
        {`
          .halftone-grungy-text {
            position: relative;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 1;
            background-image: 
              radial-gradient(circle, black 45%, transparent 45%),
              radial-gradient(circle, black 35%, transparent 35%),
              radial-gradient(circle, black 40%, transparent 40%),
              radial-gradient(circle, black 38%, transparent 38%),
              radial-gradient(circle, black 42%, transparent 42%),
              radial-gradient(circle, black 37%, transparent 37%),
              radial-gradient(circle, black 43%, transparent 43%),
              radial-gradient(circle, black 36%, transparent 36%);
            background-size: 
              6px 6px,
              7px 7px,
              8px 8px,
              6px 6px,
              7px 7px,
              9px 9px,
              8px 8px,
              7px 7px;
            background-position: 
              0 0,
              3px 3px,
              6px 6px,
              2px 8px,
              9px 2px,
              4px 10px,
              11px 5px,
              7px 9px;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: contrast(1.1) brightness(0.95);
          }

          /* Add noise/grain texture for grunge */
          .halftone-grungy-text::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 1;
            background-image: 
              radial-gradient(circle at 20% 30%, transparent 0%, rgba(0,0,0,0.3) 1px, transparent 1px),
              radial-gradient(circle at 60% 70%, transparent 0%, rgba(0,0,0,0.25) 1px, transparent 1px),
              radial-gradient(circle at 40% 50%, transparent 0%, rgba(0,0,0,0.2) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, transparent 0%, rgba(0,0,0,0.3) 1px, transparent 1px),
              radial-gradient(circle at 10% 80%, transparent 0%, rgba(0,0,0,0.25) 1px, transparent 1px);
            background-size: 15px 15px, 20px 20px, 18px 18px, 22px 22px, 16px 16px;
            background-position: 0 0, 10px 5px, 5px 10px, 15px 2px, 3px 12px;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            opacity: 0.4;
            pointer-events: none;
          }
        `}
      </style>

      <span 
        className="halftone-grungy-text"
        data-text={typeof children === 'string' ? children : String(children)}
      >
        {children}
      </span>
    </span>
  );
};
