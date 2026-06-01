import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 32, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={cn("select-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14B8A6" />
          <stop offset="100%" stop-color="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Elegant minimal double wave representing ocean & breathing */}
      <path
        d="M7 16 C 10 11, 13 11, 16 16 C 19 21, 22 21, 25 16"
        stroke="url(#logo-wave-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 21 C 10 16, 13 16, 16 21 C 19 26, 22 26, 25 21"
        stroke="url(#logo-wave-grad)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
