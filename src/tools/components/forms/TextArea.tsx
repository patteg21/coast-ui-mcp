import React from 'react';
import { TextAreaProps } from '../types.js';

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  rows = 4,
  name,
  value,
  onChange,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
    />
  );
};