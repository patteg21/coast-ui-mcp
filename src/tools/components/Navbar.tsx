import React from 'react';
import { NavbarProps } from './types';

export const Navbar: React.FC<NavbarProps> = ({ brand, links = [] }) => {
  // Convert string arrays to object format for backward compatibility
  const processedLinks = links.map(link =>
    typeof link === 'string' ? { text: link, href: `#${link.toLowerCase()}` } : link
  );

  return (
    <nav className="mobile-navbar">
      <div className="navbar-container">
        {brand && <div className="navbar-brand">{brand}</div>}
        <div className="navbar-menu">
          {processedLinks.map((link, index) => (
            <a key={index} href={link.href} className="navbar-link">
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};