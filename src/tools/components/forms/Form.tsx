import React from 'react';
import { FormProps } from '../types.js';

export const Form: React.FC<FormProps> = ({
  action,
  method = 'post',
  children,
}) => {
  return (
    <form action={action} method={method} className="space-y-4">
      {children}
    </form>
  );
};