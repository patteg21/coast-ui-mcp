import React from 'react';
import { InputProps } from '../types.js';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
    />
  );
};