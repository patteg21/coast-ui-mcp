import React from 'react';
import { HeroProps } from '../types.js';

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
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryButtonText && (
            <a href={primaryHref} className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center no-underline">
              {primaryButtonText}
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButtonHref} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center no-underline">
              {secondaryButton}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};