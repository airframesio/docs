import React from 'react';

export default function MessageTerminalIcon({ size = 24, ...props }) {
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
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="7" x2="22" y2="7" />
      <path d="M6 11l3 3-3 3" />
      <line x1="12" y1="17" x2="18" y2="17" />
    </svg>
  );
}
