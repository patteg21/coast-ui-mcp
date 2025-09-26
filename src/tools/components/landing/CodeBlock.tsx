import React from 'react';
import { CodeBlockProps } from '../types.js';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  title,
  subtitle,
  code,
  language = 'bash'
}) => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">{title}</h2>}
        {subtitle && <p className="text-xl text-center mb-8 text-gray-600">{subtitle}</p>}
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <pre className="p-6 overflow-x-auto">
            <code className={`language-${language} text-green-400 text-sm`}>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};