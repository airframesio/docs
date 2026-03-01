import React from 'react';

export default function SignalWavesIcon({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 1 7 0" />
      <path d="M15.5 15.5a5 5 0 0 1-7 0" />
      <path d="M5.6 5.6a10 10 0 0 1 12.8 0" />
      <path d="M18.4 18.4a10 10 0 0 1-12.8 0" />
    </svg>
  );
}
