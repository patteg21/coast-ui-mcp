import React from 'react';
import { DividerProps } from '../types.js';

export const Divider: React.FC<DividerProps> = () => {
  return <hr className="border-t border-gray-300 my-6" />;
};