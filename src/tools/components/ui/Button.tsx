import React from 'react';
import { ButtonProps } from '../types.js';

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  disabled = false,
}) => {

  if (href) {
    return (
      <a
        href={href}
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center no-underline cursor-pointer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
};