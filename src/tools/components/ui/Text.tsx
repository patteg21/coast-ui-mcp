import React from 'react';
import { TextProps } from '../types.js';

export const Text: React.FC<TextProps> = ({
  children,
}) => {
  return (
    <p className="text-gray-700">
      {children}
    </p>
  );
};