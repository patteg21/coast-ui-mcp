import React from 'react';
import { FooterProps } from './types';

export const Footer: React.FC<FooterProps> = ({
  text,
  links = [],
  backgroundColor,
  textColor
}) => {
  const style = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor })
  };

  return (
    <footer className="page-footer" style={style}>
      <div className="footer-content">
        <div className="footer-text">{text}</div>
        {links.length > 0 && (
          <div className="footer-links">
            {links.map((link, index) => (
              <a key={index} href={link.href} className="footer-link">
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};