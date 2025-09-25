import { DesignSystem } from './components/types';

interface ComponentConfig {
  type: string;
  props: Record<string, any>;
}

export class PageBuilder {
  private title: string = 'Mobile Page';
  private components: ComponentConfig[] = [];
  private navbarConfig: any = null;
  private designSystem: DesignSystem = {};
  private customCSS: string = '';

  setTitle(title: string): PageBuilder {
    this.title = title;
    return this;
  }

  setDesign(design: DesignSystem): PageBuilder {
    this.designSystem = design;
    return this;
  }

  setCustomCSS(css: string): PageBuilder {
    this.customCSS = css;
    return this;
  }

  addNavbar(config: { brand?: string; links?: Array<string | {text: string; href: string}> }): PageBuilder {
    this.navbarConfig = config;
    return this;
  }

  addContent(content: string, className: string = ''): PageBuilder {
    this.components.push({
      type: 'div',
      props: {
        className: className || undefined,
        children: content
      }
    });
    return this;
  }

  addHeader(text: string, level: number = 1): PageBuilder {
    this.components.push({
      type: `h${level}`,
      props: {
        className: 'mobile-header',
        children: text
      }
    });
    return this;
  }

  addButton(text: string, href: string, type: string = 'primary'): PageBuilder {
    this.components.push({
      type: 'a',
      props: {
        href,
        className: `mobile-button mobile-button-${type}`,
        children: text
      }
    });
    return this;
  }

  addBreak(size: 'small' | 'medium' | 'large' = 'medium'): PageBuilder {
    this.components.push({
      type: 'div',
      props: {
        className: `break break-${size}`
      }
    });
    return this;
  }

  addSpacer(height: string = '1rem'): PageBuilder {
    this.components.push({
      type: 'div',
      props: {
        className: 'spacer',
        style: { height }
      }
    });
    return this;
  }

  addDivider(style: 'solid' | 'dashed' | 'dotted' = 'solid'): PageBuilder {
    this.components.push({
      type: 'hr',
      props: {
        className: `divider divider-${style}`
      }
    });
    return this;
  }

  addText(text: string, size: 'small' | 'normal' | 'large' = 'normal', weight: 'normal' | 'bold' = 'normal'): PageBuilder {
    this.components.push({
      type: 'p',
      props: {
        className: `mobile-text text-${size} text-${weight}`,
        children: text
      }
    });
    return this;
  }

  addList(items: string[], ordered: boolean = false): PageBuilder {
    this.components.push({
      type: ordered ? 'ol' : 'ul',
      props: {
        className: 'mobile-list',
        children: items.map(item => ({ type: 'li', props: { children: item } }))
      }
    });
    return this;
  }

  addCard(title: string, content: string, footer?: string): PageBuilder {
    const cardChildren = [
      { type: 'div', props: { className: 'card-header', children: title } },
      { type: 'div', props: { className: 'card-content', children: content } }
    ];

    if (footer) {
      cardChildren.push({ type: 'div', props: { className: 'card-footer', children: footer } });
    }

    this.components.push({
      type: 'div',
      props: {
        className: 'mobile-card',
        children: cardChildren
      }
    });
    return this;
  }

  addCards(cards: Array<{title: string; description: string; icon?: string; footer?: string}>): PageBuilder {
    this.components.push({
      type: 'Cards',
      props: { cards }
    });
    return this;
  }

  addHero(config: {
    title: string;
    subtitle?: string;
    primaryButton?: string;
    primaryButtonHref?: string;
    secondaryButton?: string;
    secondaryButtonHref?: string;
    buttonText?: string;
    buttonHref?: string;
  }): PageBuilder {
    this.components.push({
      type: 'Hero',
      props: config
    });
    return this;
  }

  addFeatureGrid(config: {
    title?: string;
    features: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  }): PageBuilder {
    this.components.push({
      type: 'FeatureGrid',
      props: config
    });
    return this;
  }

  addCodeBlock(config: {
    title?: string;
    subtitle?: string;
    code: string;
    language?: string;
  }): PageBuilder {
    this.components.push({
      type: 'CodeBlock',
      props: config
    });
    return this;
  }

  addPricingTable(config: {
    title?: string;
    plans: Array<{
      name: string;
      price: string;
      period?: string;
      features: string[];
      button: string;
      buttonHref?: string;
      featured?: boolean;
    }>;
  }): PageBuilder {
    this.components.push({
      type: 'PricingTable',
      props: config
    });
    return this;
  }

  addFooter(config: {
    text: string;
    links?: Array<{text: string; href: string}>;
    backgroundColor?: string;
    textColor?: string;
  }): PageBuilder {
    this.components.push({
      type: 'Footer',
      props: config
    });
    return this;
  }

  addImage(src: string, alt: string = '', width?: string, height?: string): PageBuilder {
    this.components.push({
      type: 'img',
      props: {
        src,
        alt,
        width,
        height,
        className: 'mobile-image'
      }
    });
    return this;
  }

  addRawHTML(html: string): PageBuilder {
    this.components.push({
      type: 'div',
      props: {
        dangerouslySetInnerHTML: { __html: html }
      }
    });
    return this;
  }

  private getThemePreset(theme: string): DesignSystem {
    const themes: Record<string, DesignSystem> = {
      default: {
        colors: {
          primary: '#2563eb',
          secondary: '#64748b',
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b',
          textSecondary: '#64748b',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          navbar: '#2563eb',
          navbarText: '#ffffff'
        }
      },
      dark: {
        colors: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          textSecondary: '#94a3b8',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          navbar: '#1e293b',
          navbarText: '#f1f5f9'
        }
      },
      // ... other themes
    };

    return themes[theme] || themes.default;
  }

  private getResolvedDesign(): DesignSystem {
    const themePreset = this.getThemePreset(this.designSystem.theme || 'default');
    return {
      colors: { ...themePreset.colors, ...this.designSystem.colors },
      typography: { ...themePreset.typography, ...this.designSystem.typography },
      spacing: { ...themePreset.spacing, ...this.designSystem.spacing },
      borderRadius: this.designSystem.borderRadius || themePreset.borderRadius || 'normal',
      shadows: this.designSystem.shadows !== undefined ? this.designSystem.shadows : true
    };
  }

  private renderComponent(config: ComponentConfig, index: number): string {
    const { type, props } = config;

    // Handle React components
    if (['Hero', 'FeatureGrid', 'CodeBlock', 'PricingTable', 'Cards', 'Footer', 'Navbar'].includes(type)) {
      const propsString = Object.entries(props)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (typeof value === 'object') {
            return `${key}={${JSON.stringify(value)}}`;
          }
          return `${key}={${JSON.stringify(value)}}`;
        })
        .join(' ');

      return `<${type} ${propsString} />`;
    }

    // Handle regular HTML elements
    const attributes = Object.entries(props)
      .filter(([key, _]) => key !== 'children' && key !== 'dangerouslySetInnerHTML')
      .map(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
          const styleString = Object.entries(value)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
          return `style="${styleString}"`;
        }
        return `${key}="${value}"`;
      })
      .join(' ');

    if (props.dangerouslySetInnerHTML) {
      return `<${type} ${attributes}>${props.dangerouslySetInnerHTML.__html}</${type}>`;
    }

    if (props.children) {
      if (Array.isArray(props.children)) {
        const childrenHtml = props.children.map((child: any, i: number) =>
          typeof child === 'string' ? child : this.renderComponent(child, i)
        ).join('');
        return `<${type} ${attributes}>${childrenHtml}</${type}>`;
      }
      return `<${type} ${attributes}>${props.children}</${type}>`;
    }

    // Self-closing tags
    if (['img', 'hr', 'input', 'br'].includes(type)) {
      return `<${type} ${attributes} />`;
    }

    return `<${type} ${attributes}></${type}>`;
  }

  private generateCSS(): string {
    const design = this.getResolvedDesign();
    const colors = design.colors || {};
    const typography = design.typography || {};
    const spacing = design.spacing || {};

    const getBorderRadius = () => {
      const radiusMap = {
        none: '0',
        small: '0.25rem',
        normal: '0.5rem',
        large: '0.75rem',
        full: '9999px'
      };
      return radiusMap[design.borderRadius as keyof typeof radiusMap] || radiusMap.normal;
    };

    const getSpacingScale = () => {
      const scaleMap = {
        compact: { base: '0.5rem', large: '1rem', xl: '1.5rem' },
        normal: { base: '1rem', large: '2rem', xl: '3rem' },
        spacious: { base: '1.5rem', large: '3rem', xl: '4rem' }
      };
      return scaleMap[spacing.scale as keyof typeof scaleMap] || scaleMap.normal;
    };

    const spacingScale = getSpacingScale();
    const borderRadius = getBorderRadius();
    const shadows = design.shadows ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none';

    return `
/* Design System Variables */
:root {
  --color-primary: ${colors.primary || '#2563eb'};
  --color-secondary: ${colors.secondary || '#64748b'};
  --color-background: ${colors.background || '#f8fafc'};
  --color-surface: ${colors.surface || '#ffffff'};
  --color-text: ${colors.text || '#1e293b'};
  --color-text-secondary: ${colors.textSecondary || '#64748b'};
  --color-success: ${colors.success || '#10b981'};
  --color-warning: ${colors.warning || '#f59e0b'};
  --color-error: ${colors.error || '#ef4444'};
  --color-navbar: ${colors.navbar || colors.primary || '#2563eb'};
  --color-navbar-text: ${colors.navbarText || '#ffffff'};

  --font-family: ${typography.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};
  --line-height: ${typography.lineHeight || 1.6};

  --spacing-base: ${spacingScale.base};
  --spacing-large: ${spacingScale.large};
  --spacing-xl: ${spacingScale.xl};

  --border-radius: ${borderRadius};
  --shadow: ${shadows};
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  line-height: var(--line-height);
  color: var(--color-text);
  background-color: var(--color-background);
  font-size: ${typography.fontSize === 'small' ? '14px' : typography.fontSize === 'large' ? '18px' : '16px'};
  font-weight: ${typography.fontWeight || 'normal'};
}

/* Navigation */
.mobile-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-base);
  background-color: var(--color-navbar);
  color: var(--color-navbar-text);
  box-shadow: var(--shadow);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  gap: var(--spacing-base);
}

.navbar-link {
  color: inherit;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
}

.navbar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Page content */
.page-content {
  padding: var(--spacing-base);
}

/* Headers */
.mobile-header {
  margin: var(--spacing-base) 0;
  color: var(--color-text);
}

/* Buttons */
.mobile-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 0;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s;
  min-height: 44px;
  line-height: 1.4;
  box-shadow: var(--shadow);
  border: none;
  cursor: pointer;
}

.mobile-button-primary {
  background-color: var(--color-primary);
  color: white;
}

.mobile-button-primary:hover {
  filter: brightness(0.9);
}

.mobile-button-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.mobile-button-secondary:hover {
  filter: brightness(0.9);
}

/* Layout elements */
.break-small { height: 0.5rem; }
.break-medium { height: 1rem; }
.break-large { height: 2rem; }
.spacer { width: 100%; }

.divider {
  border: none;
  height: 1px;
  background-color: var(--color-text-secondary);
  margin: 1rem 0;
  opacity: 0.3;
}

.divider-dashed {
  border-top: 1px dashed var(--color-text-secondary);
  background: none;
  opacity: 0.3;
}

.divider-dotted {
  border-top: 1px dotted var(--color-text-secondary);
  background: none;
  opacity: 0.3;
}

/* Text elements */
.mobile-text {
  margin: 0.5rem 0;
}

.text-small { font-size: 0.875rem; }
.text-normal { font-size: 1rem; }
.text-large { font-size: 1.125rem; }

.text-normal { font-weight: normal; }
.text-bold { font-weight: bold; }

/* Lists */
.mobile-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.mobile-list li {
  margin: 0.25rem 0;
}

/* Cards */
.mobile-card {
  background: var(--color-surface);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin: 1rem 0;
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  background-color: var(--color-background);
  font-weight: bold;
  border-bottom: 1px solid var(--color-text-secondary);
  opacity: 0.8;
}

.card-content {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-text-secondary);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  opacity: 0.8;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-base);
  display: block;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-large);
  margin: var(--spacing-large) 0;
}

.cards-grid-item {
  text-align: center;
}

/* Hero section */
.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: var(--spacing-xl) var(--spacing-base);
  text-align: center;
  margin: 0;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: var(--spacing-base);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-large);
  opacity: 0.9;
  line-height: 1.5;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-base);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-button {
  margin: 0;
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Feature grid */
.feature-grid-section {
  padding: var(--spacing-xl) var(--spacing-base);
  text-align: center;
}

.feature-grid-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: var(--spacing-large);
  color: var(--color-text);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-large);
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  background: var(--color-surface);
  padding: var(--spacing-large);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-base);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: var(--spacing-base);
  color: var(--color-text);
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Code block */
.code-block-section {
  padding: var(--spacing-xl) var(--spacing-base);
  background: var(--color-surface);
}

.code-block-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: var(--spacing-base);
  text-align: center;
  color: var(--color-text);
}

.code-block-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-large);
  font-size: 1.1rem;
}

.code-block-container {
  max-width: 800px;
  margin: 0 auto;
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: var(--spacing-large);
  border-radius: var(--border-radius);
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Pricing table */
.pricing-section {
  padding: var(--spacing-xl) var(--spacing-base);
  background: var(--color-background);
}

.pricing-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: var(--spacing-large);
  color: var(--color-text);
}

.pricing-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-large);
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-plan {
  background: var(--color-surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-large);
  box-shadow: var(--shadow);
  text-align: center;
  position: relative;
}

.pricing-plan-featured {
  border: 2px solid var(--color-primary);
  transform: scale(1.05);
}

.pricing-plan-featured::before {
  content: 'Most Popular';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: bold;
}

.pricing-plan-header {
  margin-bottom: var(--spacing-large);
}

.pricing-plan-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: var(--spacing-base);
  color: var(--color-text);
}

.pricing-plan-price .price {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-primary);
}

.pricing-plan-price .period {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.pricing-plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-large) 0;
}

.pricing-plan-features li {
  padding: 0.5rem 0;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-text-secondary);
  opacity: 0.2;
}

.pricing-plan-features li:last-child {
  border-bottom: none;
}

.pricing-plan-button {
  width: 100%;
  margin: 0;
}

/* Footer */
.page-footer {
  background-color: var(--color-navbar);
  color: var(--color-navbar-text);
  padding: var(--spacing-large) var(--spacing-base);
  margin-top: var(--spacing-xl);
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-text {
  margin-bottom: var(--spacing-base);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-base);
  flex-wrap: wrap;
}

.footer-link {
  color: inherit;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
}

.footer-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .navbar-menu {
    gap: 0.5rem;
  }

  .navbar-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
  }

  .mobile-button {
    display: block;
    width: 100%;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .hero-button {
    width: 100%;
    max-width: 300px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-base);
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-base);
  }

  .pricing-table {
    grid-template-columns: 1fr;
    gap: var(--spacing-base);
  }

  .pricing-plan-featured {
    transform: none;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-content {
    padding: 0.5rem;
  }
}

${this.customCSS}
`;
  }

  private renderComponentAsHTML(config: ComponentConfig): string {
    const { type, props } = config;

    // Handle custom React components by rendering them as HTML
    switch (type) {
      case 'Hero':
        const { title, subtitle, primaryButton, primaryButtonHref = '#', secondaryButton, secondaryButtonHref = '#', buttonText, buttonHref = '#' } = props;
        const primaryButtonText = primaryButton || buttonText;
        const primaryHref = primaryButtonHref || buttonHref;

        const subtitleHtml = subtitle ? `<p class="hero-subtitle">${subtitle}</p>` : '';
        const primaryButtonHtml = primaryButtonText ? `<a href="${primaryHref}" class="mobile-button mobile-button-primary hero-button">${primaryButtonText}</a>` : '';
        const secondaryButtonHtml = secondaryButton ? `<a href="${secondaryButtonHref}" class="mobile-button mobile-button-secondary hero-button">${secondaryButton}</a>` : '';

        return `
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="hero-title">${title}</h1>
              ${subtitleHtml}
              <div class="hero-buttons">
                ${primaryButtonHtml}
                ${secondaryButtonHtml}
              </div>
            </div>
          </section>
        `;

      case 'FeatureGrid':
        const { title: gridTitle, features } = props;
        const titleHtml = gridTitle ? `<h2 class="feature-grid-title">${gridTitle}</h2>` : '';
        const featuresHtml = features.map((feature: any) => `
          <div class="feature-item">
            ${feature.icon ? `<div class="feature-icon">${feature.icon}</div>` : ''}
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
          </div>
        `).join('');

        return `
          <section class="feature-grid-section">
            ${titleHtml}
            <div class="feature-grid">
              ${featuresHtml}
            </div>
          </section>
        `;

      case 'Cards':
        const cardsHtml = props.cards.map((card: any) => {
          const iconHtml = card.icon ? `<div class="card-icon">${card.icon}</div>` : '';
          const footerHtml = card.footer ? `<div class="card-footer">${card.footer}</div>` : '';

          return `
            <div class="mobile-card cards-grid-item">
              ${iconHtml}
              <div class="card-header">${card.title}</div>
              <div class="card-content">${card.description}</div>
              ${footerHtml}
            </div>
          `;
        }).join('');

        return `<div class="cards-grid">${cardsHtml}</div>`;

      case 'Footer':
        const { text, links = [], backgroundColor, textColor } = props;
        const linksHtml = links.length > 0 ? `
          <div class="footer-links">
            ${links.map((link: any) => `<a href="${link.href}" class="footer-link">${link.text}</a>`).join('')}
          </div>
        ` : '';

        const style = backgroundColor || textColor ?
          ` style="${backgroundColor ? `background-color: ${backgroundColor};` : ''}${textColor ? `color: ${textColor};` : ''}"` : '';

        return `
          <footer class="page-footer"${style}>
            <div class="footer-content">
              <div class="footer-text">${text}</div>
              ${linksHtml}
            </div>
          </footer>
        `;

      case 'CodeBlock':
        const { title: codeTitle, subtitle: codeSubtitle, code, language = 'bash' } = props;
        const codeTitleHtml = codeTitle ? `<h2 class="code-block-title">${codeTitle}</h2>` : '';
        const codeSubtitleHtml = codeSubtitle ? `<p class="code-block-subtitle">${codeSubtitle}</p>` : '';

        return `
          <section class="code-block-section">
            ${codeTitleHtml}
            ${codeSubtitleHtml}
            <div class="code-block-container">
              <pre class="code-block"><code class="language-${language}">${code}</code></pre>
            </div>
          </section>
        `;

      case 'PricingTable':
        const { title: pricingTitle, plans } = props;
        const pricingTitleHtml = pricingTitle ? `<h2 class="pricing-title">${pricingTitle}</h2>` : '';
        const plansHtml = plans.map((plan: any) => {
          const featuresHtml = plan.features.map((feature: string) => `<li>${feature}</li>`).join('');
          const featuredClass = plan.featured ? ' pricing-plan-featured' : '';

          return `
            <div class="pricing-plan${featuredClass}">
              <div class="pricing-plan-header">
                <h3 class="pricing-plan-name">${plan.name}</h3>
                <div class="pricing-plan-price">
                  <span class="price">${plan.price}</span>
                  ${plan.period ? `<span class="period">${plan.period}</span>` : ''}
                </div>
              </div>
              <ul class="pricing-plan-features">
                ${featuresHtml}
              </ul>
              <a href="${plan.buttonHref || '#'}" class="mobile-button mobile-button-primary pricing-plan-button">${plan.button}</a>
            </div>
          `;
        }).join('');

        return `
          <section class="pricing-section">
            ${pricingTitleHtml}
            <div class="pricing-table">
              ${plansHtml}
            </div>
          </section>
        `;

      default:
        // Handle regular HTML elements
        return this.renderComponent(config, 0);
    }
  }

  private renderNavbarAsHTML(config: any): string {
    // Convert string arrays to object format for backward compatibility
    const links = (config.links || []).map((link: any) =>
      typeof link === 'string' ? { text: link, href: `#${link.toLowerCase()}` } : link
    );

    return `
    <nav class="mobile-navbar">
      <div class="navbar-container">
        ${config.brand ? `<div class="navbar-brand">${config.brand}</div>` : ''}
        <div class="navbar-menu">
          ${links.map((link: any) => `<a href="${link.href}" class="navbar-link">${link.text}</a>`).join('')}
        </div>
      </div>
    </nav>`;
  }

  build(): string {
    const viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    const css = this.generateCSS();

    let bodyContent = '';

    // Add navbar if configured
    if (this.navbarConfig) {
      bodyContent += this.renderNavbarAsHTML(this.navbarConfig);
    }

    // Add content blocks
    const componentsHTML = this.components.map(comp => this.renderComponentAsHTML(comp)).join('\n');
    bodyContent += `<div class="page-content">${componentsHTML}</div>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    ${viewport}
    <title>${this.title}</title>
    <style>${css}</style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;
  }
}