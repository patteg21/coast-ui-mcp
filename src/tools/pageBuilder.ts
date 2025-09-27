import React from 'react';
import { renderToString } from 'react-dom/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { NavbarProps } from './components/types.js';
import { Hero, FeatureGrid, Cards, Footer, CodeBlock, PricingTable, Navbar, Input, TextArea, Select, Form, Container, Grid, Section, Image, Video, Button, Text, List, Card, Divider, Spacer, Break } from './components/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ComponentConfig {
  type: string;
  props: Record<string, any>;
  component?: React.ComponentType<any>;
}

export class PageBuilder {
  private title: string = 'Mobile Page';
  private components: ComponentConfig[] = [];
  private navbarConfig: { props: NavbarProps; component: React.ComponentType<NavbarProps> } | null = null;

  setTitle(title: string): PageBuilder {
    this.title = title;
    return this;
  }


  addNavbar(config: { brand?: string; links?: Array<string | {text: string; href: string}> }): PageBuilder {
    this.navbarConfig = {
      props: config,
      component: Navbar
    };
    return this;
  }

  addContent(content: string): PageBuilder {
    this.components.push({
      type: 'div',
      props: {
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

  addButton(text: string, href: string): PageBuilder {
    this.components.push({
      type: 'Button',
      props: {
        href,
        children: text
      },
      component: Button
    });
    return this;
  }

  addBreak(): PageBuilder {
    this.components.push({
      type: 'Break',
      props: {},
      component: Break
    });
    return this;
  }

  addSpacer(): PageBuilder {
    this.components.push({
      type: 'Spacer',
      props: {},
      component: Spacer
    });
    return this;
  }

  addDivider(): PageBuilder {
    this.components.push({
      type: 'Divider',
      props: {},
      component: Divider
    });
    return this;
  }

  addText(text: string): PageBuilder {
    this.components.push({
      type: 'Text',
      props: {
        children: text
      },
      component: Text
    });
    return this;
  }

  addList(items: string[], ordered: boolean = false): PageBuilder {
    this.components.push({
      type: 'List',
      props: {
        items,
        ordered
      },
      component: List
    });
    return this;
  }

  addCard(title: string, content: string, footer?: string): PageBuilder {
    this.components.push({
      type: 'Card',
      props: {
        title,
        content,
        footer
      },
      component: Card
    });
    return this;
  }

  addCards(cards: Array<{title: string; description: string; icon?: string; footer?: string}>): PageBuilder {
    this.components.push({
      type: 'Cards',
      props: { cards },
      component: Cards
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
      props: config,
      component: Hero
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
      props: config,
      component: FeatureGrid
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
      props: config,
      component: CodeBlock
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
      props: config,
      component: PricingTable
    });
    return this;
  }

  addFooter(config: {
    text: string;
    links?: Array<{text: string; href: string}>;
  }): PageBuilder {
    this.components.push({
      type: 'Footer',
      props: config,
      component: Footer
    });
    return this;
  }

  addImage(src: string, alt: string = '', width?: string, height?: string): PageBuilder {
    this.components.push({
      type: 'Image',
      props: {
        src,
        alt,
        width,
        height
      },
      component: Image
    });
    return this;
  }

  addInput(type: string = 'text', placeholder?: string, name?: string): PageBuilder {
    this.components.push({
      type: 'Input',
      props: {
        type,
        placeholder,
        name
      },
      component: Input
    });
    return this;
  }

  addTextArea(placeholder?: string, rows: number = 4, name?: string): PageBuilder {
    this.components.push({
      type: 'TextArea',
      props: {
        placeholder,
        rows,
        name
      },
      component: TextArea
    });
    return this;
  }

  addSelect(options: Array<{value: string; text: string}>, name?: string, placeholder?: string): PageBuilder {
    this.components.push({
      type: 'Select',
      props: {
        options,
        name,
        placeholder
      },
      component: Select
    });
    return this;
  }

  addVideo(src: string, poster?: string, controls: boolean = true): PageBuilder {
    this.components.push({
      type: 'Video',
      props: {
        src,
        poster,
        controls
      },
      component: Video
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

  addSection(title?: string): PageBuilder {
    this.components.push({
      type: 'Section',
      props: {
        title,
        children: [] // Will be populated by content added after
      },
      component: Section
    });
    return this;
  }

  addContainer(): PageBuilder {
    this.components.push({
      type: 'Container',
      props: {
        children: [] // Will be populated by content added after
      },
      component: Container
    });
    return this;
  }

  addGrid(columns: number = 2): PageBuilder {
    this.components.push({
      type: 'Grid',
      props: {
        columns,
        children: [] // Will be populated by grid items
      },
      component: Grid
    });
    return this;
  }

  // Add a component object (from ComponentBuilder)
  addComponent(componentObj: any): PageBuilder {
    if (componentObj && componentObj.isComponent) {
      // Handle component objects created by ComponentBuilder
      this.components.push({
        type: componentObj.type,
        props: componentObj.props,
        component: this.getComponentMap()[componentObj.type] || null
      });
    } else if (componentObj && typeof componentObj === 'object') {
      // Handle raw component configurations
      this.components.push(componentObj);
    } else {
      // Handle strings or other content
      this.addContent(String(componentObj));
    }
    return this;
  }

  addForm(action?: string, method: string = 'post'): PageBuilder {
    this.components.push({
      type: 'Form',
      props: {
        action,
        method,
        children: [] // Will be populated by form elements
      },
      component: Form
    });
    return this;
  }

  // Advanced builder methods for nested content
  addGridItem(content: string): PageBuilder {
    // Find the last Grid component and add this as a child
    const lastComponent = this.components[this.components.length - 1];
    if (lastComponent && lastComponent.type === 'Grid') {
      if (!Array.isArray(lastComponent.props.children)) {
        lastComponent.props.children = [];
      }
      lastComponent.props.children.push({
        type: 'div',
        props: {
          className: 'grid-item',
          children: content
        }
      });
    } else {
      // Fallback: just add as regular content
      this.addContent(content);
    }
    return this;
  }

  addFormSubmitButton(text: string): PageBuilder {
    this.components.push({
      type: 'Button',
      props: {
        children: text,
        type: 'submit'
      },
      component: Button
    });
    return this;
  }

  // Method to close/end containers (for chaining)
  end(): PageBuilder {
    return this;
  }

  private writeToOutputFile(html: string): string {
    try {
      // Create output directory if it doesn't exist
      const outputDir = join(__dirname, '../../output');
      mkdirSync(outputDir, { recursive: true });

      // Generate timestamp filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${timestamp}.html`;
      const filepath = join(outputDir, filename);

      // Write HTML to file
      writeFileSync(filepath, html, 'utf8');

      console.log(`HTML output written to: ${filepath}`);
      return filepath;
    } catch (error) {
      console.error('Error writing HTML file:', error);
      return '';
    }
  }
  
  private getComponentMap(): Record<string, React.ComponentType<any>> {
    return {
      Hero,
      FeatureGrid,
      CodeBlock,
      PricingTable,
      Cards,
      Footer,
      Navbar,
      Input,
      TextArea,
      Select,
      Form,
      Container,
      Grid,
      Section,
      Image,
      Video,
      Button,
      Text,
      List,
      Card,
      Divider,
      Spacer,
      Break
    };
  }

  private renderReactComponent(config: ComponentConfig): string {
    const { type, props, component } = config;
    const componentMap = this.getComponentMap();

    // Get the React component
    const Component = component || componentMap[type];

    if (Component) {
      try {
        // Create React element and render to HTML string
        const element = React.createElement(Component, props);
        return renderToString(element);
      } catch (error) {
        console.error(`Error rendering React component ${type}:`, error);
        // Fallback to manual rendering
        return this.renderComponentManually(config);
      }
    }

    return this.renderComponentManually(config);
  }

  private renderComponentManually(config: ComponentConfig): string {
    const { type, props } = config;

    // Handle special component types
    if (type === 'Hero' || type === 'hero') {
      return this.renderHero(props);
    }
    if (type === 'Card' || type === 'card') {
      return this.renderCard(props);
    }
    if (type === 'Navbar' || type === 'navbar') {
      return this.renderNavbar(props);
    }
    if (type === 'grid' || type === 'Grid') {
      return this.renderGrid(props);
    }
    if (type === 'section' || type === 'Section') {
      return this.renderSection(props);
    }
    if (type === 'container' || type === 'Container') {
      return this.renderContainer(props);
    }
    if (type === 'text' || type === 'Text') {
      return this.renderText(props);
    }
    if (type === 'footer' || type === 'Footer') {
      return this.renderFooter(props);
    }
    if (type === 'form' || type === 'Form') {
      return this.renderForm(props);
    }
    if (type === 'featureGrid' || type === 'FeatureGrid') {
      return this.renderFeatureGrid(props);
    }
    if (type === 'pricingTable' || type === 'PricingTable') {
      return this.renderPricingTable(props);
    }
    if (type === 'codeBlock' || type === 'CodeBlock') {
      return this.renderCodeBlock(props);
    }
    if (type === 'break' || type === 'Break') {
      return `<div class="my-4"></div>`;
    }
    if (type === 'spacer' || type === 'Spacer') {
      return `<div class="my-8"></div>`;
    }
    if (type === 'divider' || type === 'Divider') {
      return `<hr class="my-6 border-gray-300" />`;
    }

    // Handle regular HTML elements
    const attributes = Object.entries(props)
      .filter(([key, value]) => key !== 'children' && key !== 'dangerouslySetInnerHTML' && value !== undefined && value !== null)
      .map(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
          const styleString = Object.entries(value)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ');
          return `style="${styleString};"`;
        }
        // Convert React className to HTML class
        const htmlKey = key === 'className' ? 'class' : key;
        return `${htmlKey}="${value}"`;
      })
      .join(' ');

    const attributesStr = attributes ? ` ${attributes}` : '';

    if (props.dangerouslySetInnerHTML) {
      return `<${type}${attributesStr}>${props.dangerouslySetInnerHTML.__html}</${type}>`;
    }

    if (props.children) {
      if (Array.isArray(props.children)) {
        const childrenHtml = props.children.map((child: any) =>
          this.renderChildComponent(child)
        ).join('');
        return `<${type}${attributesStr}>${childrenHtml}</${type}>`;
      }
      return `<${type}${attributesStr}>${props.children}</${type}>`;
    }

    // Self-closing tags
    if (['img', 'hr', 'input', 'br'].includes(type)) {
      return `<${type}${attributesStr} />`;
    }

    return `<${type}${attributesStr}></${type}>`;
  }

  private renderChildComponent(child: any): string {
    if (typeof child === 'string') {
      return child;
    }

    if (child && typeof child === 'object') {
      // Handle component objects from ComponentBuilder
      if (child.isComponent || child.type) {
        // For simple content objects like {type: "text", content: "..."}, extract the content
        let props;
        if (child.props) {
          props = child.props;
        } else {
          // Create props by copying all properties except 'type' and 'isComponent'
          props = { ...child };
          delete props.type;
          delete props.isComponent;
        }

        return this.renderComponent({
          type: child.type,
          props: props,
          component: child.component || this.getComponentMap()[child.type] || null
        });
      }

      // Handle simple content objects
      if (child.type === 'text') {
        const content = child.content || child.text || child.children || '';
        return `<p class="mb-4">${content}</p>`;
      }
      if (child.type === 'button') {
        return `<a href="${child.href || '#'}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">${child.text}</a>`;
      }
      if (child.type === 'input') {
        return `<input type="${child.inputType || 'text'}" placeholder="${child.placeholder || ''}" name="${child.name || ''}" class="border rounded px-3 py-2 w-full" />`;
      }
      if (child.type === 'select') {
        const optionsHtml = (child.options || []).map((opt: any) =>
          `<option value="${opt.value}">${opt.text}</option>`
        ).join('');
        return `<select name="${child.name || ''}" class="border rounded px-3 py-2 w-full">${child.placeholder ? `<option value="">${child.placeholder}</option>` : ''}${optionsHtml}</select>`;
      }
      if (child.type === 'textarea') {
        return `<textarea placeholder="${child.placeholder || ''}" name="${child.name || ''}" rows="${child.rows || 4}" class="border rounded px-3 py-2 w-full">${child.value || ''}</textarea>`;
      }
      if (child.type === 'card') {
        return this.renderCard(child);
      }
      if (child.type === 'header') {
        return `<h${child.level || 1} class="mobile-header">${child.text}</h${child.level || 1}>`;
      }
      if (child.type === 'content') {
        return `<div>${child.content || ''}</div>`;
      }
      if (child.type === 'break') {
        return `<div class="my-4"></div>`;
      }
      if (child.type === 'spacer') {
        return `<div class="my-8"></div>`;
      }
      if (child.type === 'divider') {
        return `<hr class="my-6 border-gray-300" />`;
      }

      // Handle built component objects that need special rendering
      if (child.type && typeof child.type === 'string') {
        // For built components, render them properly
        if (child.type === 'grid') {
          return this.renderGrid(child.props || child);
        }
        if (child.type === 'section') {
          return this.renderSection(child.props || child);
        }
        if (child.type === 'container') {
          return this.renderContainer(child.props || child);
        }
        if (child.type === 'hero') {
          return this.renderHero(child.props || child);
        }
        if (child.type === 'navbar') {
          return this.renderNavbar(child.props || child);
        }
        if (child.type === 'footer') {
          return this.renderFooter(child.props || child);
        }
        if (child.type === 'form') {
          return this.renderForm(child.props || child);
        }
        if (child.type === 'featureGrid') {
          return this.renderFeatureGrid(child.props || child);
        }
        if (child.type === 'pricingTable') {
          return this.renderPricingTable(child.props || child);
        }
        if (child.type === 'codeBlock') {
          return this.renderCodeBlock(child.props || child);
        }

        // Handle generic component types that might be component objects
        const componentMap = this.getComponentMap();
        if (componentMap[child.type] || child.type === 'text') {
          return this.renderComponent({
            type: child.type,
            props: child.props || child,
            component: componentMap[child.type]
          });
        }
      }

      // Handle as component config
      return this.renderComponent(child);
    }

    return String(child);
  }

  private renderGrid(props: any): string {
    const columns = props.columns || 2;
    const childrenHtml = Array.isArray(props.children)
      ? props.children.map((child: any) => this.renderChildComponent(child)).join('')
      : '';

    return `
      <div class="grid grid-cols-${columns} gap-4 mb-6">
        ${childrenHtml}
      </div>
    `;
  }

  private renderSection(props: any): string {
    const title = props.title ? `<h2 class="text-2xl font-bold mb-4">${props.title}</h2>` : '';
    const childrenHtml = Array.isArray(props.children)
      ? props.children.map((child: any) => this.renderChildComponent(child)).join('')
      : '';

    return `
      <section class="mb-8">
        ${title}
        ${childrenHtml}
      </section>
    `;
  }

  private renderContainer(props: any): string {
    const title = props.title ? `<h3 class="text-lg font-semibold mb-2">${props.title}</h3>` : '';
    const childrenHtml = Array.isArray(props.children)
      ? props.children.map((child: any) => this.renderChildComponent(child)).join('')
      : '';

    return `
      <div class="container mx-auto px-4">
        ${title}
        ${childrenHtml}
      </div>
    `;
  }

  private renderFooter(props: any): string {
    const linksHtml = props.links ? props.links.map((link: any) => {
      return `<a href="${link.href}" class="text-gray-600 hover:text-gray-800">${link.text}</a>`;
    }).join(' | ') : '';

    return `
      <footer class="bg-gray-100 py-8 mt-12">
        <div class="container mx-auto px-4 text-center">
          <p class="text-gray-600 mb-4">${props.text}</p>
          ${linksHtml ? `<div class="text-sm">${linksHtml}</div>` : ''}
        </div>
      </footer>
    `;
  }

  private renderForm(props: any): string {
    const title = props.title ? `<h3 class="text-lg font-semibold mb-4">${props.title}</h3>` : '';
    const childrenHtml = Array.isArray(props.children)
      ? props.children.map((child: any) => this.renderChildComponent(child)).join('')
      : '';

    return `
      <div class="form-container">
        ${title}
        <form action="${props.action || ''}" method="${props.method || 'post'}" class="space-y-4">
          ${childrenHtml}
        </form>
      </div>
    `;
  }

  private renderText(props: any): string {
    // Handle text content from various possible properties
    const textContent = props.content || props.text || props.children || '';
    if (Array.isArray(textContent)) {
      return textContent.map(child => this.renderChildComponent(child)).join('');
    }
    return `<p class="mb-4">${textContent}</p>`;
  }

  private renderFeatureGrid(props: any): string {
    const title = props.title ? `<h2 class="text-3xl font-bold text-center mb-12 text-gray-900">${props.title}</h2>` : '';
    const features = props.features || [];

    const featuresHtml = features.map((feature: any) => `
      <div class="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        ${feature.icon ? `<div class="text-4xl mb-4">${feature.icon}</div>` : ''}
        <h3 class="text-xl font-semibold mb-3 text-gray-900">${feature.title}</h3>
        <p class="text-gray-600">${feature.description}</p>
      </div>
    `).join('');

    return `
      <section class="py-16 bg-gray-50">
        ${title}
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            ${featuresHtml}
          </div>
        </div>
      </section>
    `;
  }

  private renderPricingTable(props: any): string {
    const title = props.title ? `<h2 class="text-3xl font-bold text-center mb-12 text-gray-900">${props.title}</h2>` : '';
    const plans = props.plans || [];

    const plansHtml = plans.map((plan: any) => `
      <div class="bg-white rounded-lg shadow-md p-8 ${plan.featured ? 'ring-2 ring-blue-500' : ''}">
        <h3 class="text-2xl font-bold mb-4">${plan.name}</h3>
        <div class="text-4xl font-bold mb-6">${plan.price}<span class="text-lg text-gray-600">/month</span></div>
        <ul class="space-y-3 mb-8">
          ${plan.features.map((feature: string) => `<li class="flex items-center"><span class="text-green-500 mr-2">✓</span>${feature}</li>`).join('')}
        </ul>
        <button class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          ${plan.button}
        </button>
      </div>
    `).join('');

    return `
      <section class="py-16">
        ${title}
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            ${plansHtml}
          </div>
        </div>
      </section>
    `;
  }

  private renderCodeBlock(props: any): string {
    const title = props.title ? `<h2 class="text-2xl font-bold mb-4">${props.title}</h2>` : '';
    const subtitle = props.subtitle ? `<p class="text-gray-600 mb-6">${props.subtitle}</p>` : '';

    return `
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4">
          ${title}
          ${subtitle}
          <div class="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre class="text-green-400 text-sm"><code>${props.code || ''}</code></pre>
          </div>
        </div>
      </section>
    `;
  }

  private renderHero(props: any): string {
    return `
      <section class="bg-blue-600 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">${props.title}</h1>
          ${props.subtitle ? `<p class="text-xl mb-8">${props.subtitle}</p>` : ''}
          ${props.buttonText ? `<a href="${props.buttonHref || '#'}" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">${props.buttonText}</a>` : ''}
        </div>
      </section>
    `;
  }

  private renderCard(props: any): string {
    // Handle nested content if it exists
    const content = props.content || '';
    const children = props.children;

    let childrenHtml = '';
    if (Array.isArray(children)) {
      childrenHtml = children.map((child: any) => this.renderChildComponent(child)).join('');
    }

    return `
      <div class="bg-white rounded-lg shadow-md p-6 mb-4">
        <h3 class="text-xl font-semibold mb-3">${props.title || ''}</h3>
        <div class="text-gray-600 mb-4">${content}${childrenHtml}</div>
        ${props.footer ? `<div class="text-sm text-gray-500">${props.footer}</div>` : ''}
      </div>
    `;
  }

  private renderNavbar(props: any): string {
    const linksHtml = props.links ? props.links.map((link: any) => {
      if (typeof link === 'string') {
        return `<a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2">${link}</a>`;
      }
      return `<a href="${link.href}" class="text-gray-700 hover:text-blue-600 px-3 py-2">${link.text}</a>`;
    }).join('') : '';

    return `
      <nav class="bg-white shadow-md">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center py-4">
            ${props.brand ? `<div class="text-xl font-bold text-gray-800">${props.brand}</div>` : ''}
            <div class="flex space-x-1">
              ${linksHtml}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  private renderComponent(config: ComponentConfig): string {
    // Always use manual rendering for better HTML output
    return this.renderComponentManually(config);
  }

  private generateComponentJSX(config: ComponentConfig): string {
    const { type, props, component } = config;

    if (component) {
      // Handle React components - keep className as is for JSX
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

    // For HTML elements in JSX, convert class to className
    const jsxProps = { ...props };
    if (jsxProps.class) {
      jsxProps.className = jsxProps.class;
      delete jsxProps.class;
    }

    const propsString = Object.entries(jsxProps)
      .filter(([key, _]) => key !== 'children' && key !== 'dangerouslySetInnerHTML')
      .map(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
          return `style={${JSON.stringify(value)}}`;
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    if (jsxProps.dangerouslySetInnerHTML) {
      return `<${type} ${propsString} dangerouslySetInnerHTML={${JSON.stringify(jsxProps.dangerouslySetInnerHTML)}} />`;
    }

    if (jsxProps.children) {
      if (Array.isArray(jsxProps.children)) {
        const childrenJSX = jsxProps.children.map((child: any) =>
          typeof child === 'string' ? child : this.generateComponentJSX(child)
        ).join('');
        return `<${type} ${propsString}>${childrenJSX}</${type}>`;
      }
      return `<${type} ${propsString}>${jsxProps.children}</${type}>`;
    }

    if (['img', 'hr', 'input', 'br'].includes(type)) {
      return `<${type} ${propsString} />`;
    }

    return `<${type} ${propsString}></${type}>`;
  }

  build(): string {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .mobile-header { margin: 1rem 0; font-weight: bold; }
        .page-content { padding: 1rem; }
    </style>
</head>
<body>
`;

    // Add navbar if configured
    if (this.navbarConfig) {
      html += this.renderComponent({
        type: 'Navbar',
        props: this.navbarConfig.props,
        component: this.navbarConfig.component
      });
    }

    // Add main content wrapper
    html += '<main class="page-content">';

    // Render all components
    for (const component of this.components) {
      html += this.renderComponent(component);
    }

    html += '</main>';
    html += '\n</body>\n</html>';

    return html;
  }

  buildJSXString(): string {
    const imports: string[] = [
      "import React from 'react';",
      "import './styles.css';"
    ];

    const usedComponents = new Set<string>();
    const jsxComponents: string[] = [];

    // Add navbar if configured
    if (this.navbarConfig) {
      usedComponents.add('Navbar');
      jsxComponents.push(this.generateComponentJSX({
        type: 'Navbar',
        props: this.navbarConfig.props,
        component: this.navbarConfig.component
      }));
    }

    // Add content wrapper with components
    const componentJSX = this.components
      .map(comp => {
        if (comp.component) {
          usedComponents.add(comp.type);
        }
        return this.generateComponentJSX(comp);
      })
      .join('\n      ');

    if (componentJSX) {
      jsxComponents.push(`<div className="page-content">\n      ${componentJSX}\n    </div>`);
    }

    // Add component imports
    if (usedComponents.size > 0) {
      imports.push(`import { ${Array.from(usedComponents).join(', ')} } from './components';`);
    }

    return `${imports.join('\n')}

export const ${this.title.replace(/\s+/g, '')}App = () => {
  return (
    <>
      ${jsxComponents.join('\n      ')}
    </>
  );
};`;
  }

  buildAndWrite(): string {
    const html = this.build();
    const filepath = this.writeToOutputFile(html);
    return filepath;
  }
}