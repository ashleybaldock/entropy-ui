import React from 'react';

// Font Awesome Free 5.2.0 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
//
export const StopIcon = ({ className = '', ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
  >
    <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" />
  </svg>
);
