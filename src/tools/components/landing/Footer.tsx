import React from 'react';
import { FooterProps } from '../types.js';

export const Footer: React.FC<FooterProps> = ({
  text,
  links = [],
}) => {

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">{text}</div>
          {links.length > 0 && (
            <div className="flex space-x-6">
              {links.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-300 hover:text-white transition-colors no-underline">
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};