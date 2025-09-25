import React from 'react';
import { FeatureGridProps } from './types';

export const FeatureGrid: React.FC<FeatureGridProps> = ({ title, features }) => {
  return (
    <section className="feature-grid-section">
      {title && <h2 className="feature-grid-title">{title}</h2>}
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            {feature.icon && <div className="feature-icon">{feature.icon}</div>}
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};