import React from 'react';
import { CardProps } from '../types.js';

export const Card: React.FC<CardProps> = ({
  title,
  content,
  footer,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b font-semibold text-gray-900">{title}</div>
      <div className="px-6 py-4 text-gray-700">{content}</div>
      {footer && <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-600">{footer}</div>}
    </div>
  );
};