import React from 'react';
import { HeroProps } from './types';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButton,
  primaryButtonHref = '#',
  secondaryButton,
  secondaryButtonHref = '#',
  buttonText,
  buttonHref = '#'
}) => {
  // Support both old and new button format
  const primaryButtonText = primaryButton || buttonText;
  const primaryHref = primaryButtonHref || buttonHref;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        <div className="hero-buttons">
          {primaryButtonText && (
            <a href={primaryHref} className="mobile-button mobile-button-primary hero-button">
              {primaryButtonText}
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButtonHref} className="mobile-button mobile-button-secondary hero-button">
              {secondaryButton}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};