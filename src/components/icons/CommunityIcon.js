import React from 'react';

export default function CommunityIcon({ size = 24, ...props }) {
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
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="10" r="2.5" />
      <circle cx="19" cy="10" r="2.5" />
      <path d="M8 14h8a4 4 0 0 1 4 4v1H4v-1a4 4 0 0 1 4-4z" />
      <path d="M2 19v-1a3 3 0 0 1 3-3" />
      <path d="M22 19v-1a3 3 0 0 0-3-3" />
    </svg>
  );
}
