import React from 'react';
import { PricingTableProps } from './types';

export const PricingTable: React.FC<PricingTableProps> = ({ title, plans }) => {
  return (
    <section className="pricing-section">
      {title && <h2 className="pricing-title">{title}</h2>}
      <div className="pricing-table">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-plan${plan.featured ? ' pricing-plan-featured' : ''}`}
          >
            <div className="pricing-plan-header">
              <h3 className="pricing-plan-name">{plan.name}</h3>
              <div className="pricing-plan-price">
                <span className="price">{plan.price}</span>
                {plan.period && <span className="period">{plan.period}</span>}
              </div>
            </div>
            <ul className="pricing-plan-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <a
              href={plan.buttonHref || '#'}
              className="mobile-button mobile-button-primary pricing-plan-button"
            >
              {plan.button}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};