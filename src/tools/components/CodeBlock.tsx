import React from 'react';
import { CodeBlockProps } from './types';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  title,
  subtitle,
  code,
  language = 'bash'
}) => {
  return (
    <section className="code-block-section">
      {title && <h2 className="code-block-title">{title}</h2>}
      {subtitle && <p className="code-block-subtitle">{subtitle}</p>}
      <div className="code-block-container">
        <pre className="code-block">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </section>
  );
};