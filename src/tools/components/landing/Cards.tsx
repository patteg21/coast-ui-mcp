import React from 'react';
import { CardsProps } from '../types.js';

export const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          {card.icon && <div className="text-2xl mb-4">{card.icon}</div>}
          <div className="text-xl font-semibold mb-2 text-gray-900">{card.title}</div>
          <div className="text-gray-600 mb-4">{card.description}</div>
          {card.footer && <div className="text-sm text-gray-500 border-t pt-4">{card.footer}</div>}
        </div>
      ))}
    </div>
  );
};