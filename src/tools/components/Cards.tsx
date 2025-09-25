import React from 'react';
import { CardsProps } from './types';

export const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="cards-grid">
      {cards.map((card, index) => (
        <div key={index} className="mobile-card cards-grid-item">
          {card.icon && <div className="card-icon">{card.icon}</div>}
          <div className="card-header">{card.title}</div>
          <div className="card-content">{card.description}</div>
          {card.footer && <div className="card-footer">{card.footer}</div>}
        </div>
      ))}
    </div>
  );
};