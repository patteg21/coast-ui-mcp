import React from 'react';
import { SectionProps } from '../types.js';

export const Section: React.FC<SectionProps> = ({
  title,
  children,
}) => {
  return (
    <section className="py-12">
      {title && <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{title}</h2>}
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};