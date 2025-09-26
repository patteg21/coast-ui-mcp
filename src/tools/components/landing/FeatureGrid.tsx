import React from 'react';
import { FeatureGridProps } from '../types.js';

export const FeatureGrid: React.FC<FeatureGridProps> = ({ title, features }) => {
  return (
    <section className="py-16 bg-gray-50">
      {title && <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{title}</h2>}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {feature.icon && <div className="text-4xl mb-4">{feature.icon}</div>}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};