import React from 'react';

export default function AntennaIcon({ size = 24, ...props }) {
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
      <line x1="12" y1="10" x2="12" y2="22" />
      <path d="M12 10l-4 4" />
      <path d="M12 10l4 4" />
      <path d="M6 6a8.5 8.5 0 0 1 12 0" />
      <path d="M3 3a14 14 0 0 1 18 0" />
    </svg>
  );
}
