import React from 'react';

export default function FlightPathIcon({ size = 24, ...props }) {
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
      <path d="M2 20l4-4" />
      <path d="M6 16c4-4 8-6 14-8" />
      <path d="M17 5l3 3" />
      <path d="M20 8l2-6-6 2" />
      <circle cx="4" cy="18" r="2" />
    </svg>
  );
}
