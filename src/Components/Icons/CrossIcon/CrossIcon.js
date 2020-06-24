import React from 'react';

export const CrossIcon = ({ className = '', ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M9.753 8l5.884-5.886a1.238 1.238 0 1 0-1.753-1.75L8 6.245 2.117.363A1.239 1.239 0 0 0 .363 2.114L6.248 8 .363 13.885a1.236 1.236 0 0 0 0 1.751 1.235 1.235 0 0 0 1.754 0L8 9.753l5.884 5.883a1.235 1.235 0 0 0 1.753 0 1.238 1.238 0 0 0 0-1.751L9.753 8z" />
  </svg>
);
