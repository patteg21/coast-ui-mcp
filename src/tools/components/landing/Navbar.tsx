import React from 'react';
import { NavbarProps } from '../types.js';

export const Navbar: React.FC<NavbarProps> = ({ brand, links = [] }) => {
  // Convert string arrays to object format for backward compatibility
  const processedLinks = links.map(link =>
    typeof link === 'string' ? { text: link, href: `#${link.toLowerCase()}` } : link
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {brand && <div className="text-xl font-bold text-gray-900">{brand}</div>}
          <div className="flex space-x-8">
            {processedLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};