import { PageBuilder } from "./pageBuilder.js";

interface MethodCall {
  name: string;
  params: any[];
}

interface ParsedDSL {
  objectName: string;
  methodChain: MethodCall[];
}

class DSLParser {
  parse(dslString: string): ParsedDSL {
    // Clean the string - remove extra whitespace
    const cleaned = dslString.trim();

    // Extract object name (before first dot)
    const firstDotIndex = cleaned.indexOf('.');
    if (firstDotIndex === -1) {
      throw new Error('Invalid DSL: No methods found');
    }

    const objectName = cleaned.substring(0, firstDotIndex).trim();
    const methodsString = cleaned.substring(firstDotIndex + 1);

    // Parse method chain
    const methodChain = this.parseMethodChain(methodsString);

    return { objectName, methodChain };
  }

  private parseMethodChain(methodsString: string): MethodCall[] {
    const methods: MethodCall[] = [];
    let current = '';
    let depth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < methodsString.length; i++) {
      const char = methodsString[i];

      if ((char === '"' || char === "'") && !inString) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (char === stringChar && inString) {
        inString = false;
        stringChar = '';
        current += char;
      } else if (char === '(' && !inString) {
        depth++;
        current += char;
      } else if (char === ')' && !inString) {
        depth--;
        current += char;

        // If we've closed all parentheses, we've completed a method
        if (depth === 0) {
          const method = this.parseMethod(current);
          methods.push(method);
          current = '';
          // Skip the next dot if it exists
          if (i + 1 < methodsString.length && methodsString[i + 1] === '.') {
            i++;
          }
        }
      } else if (char === '.' && depth === 0 && !inString) {
        // Method without parameters
        if (current.trim()) {
          const method = this.parseMethod(current + '()');
          methods.push(method);
          current = '';
        }
      } else {
        current += char;
      }
    }

    // Handle last method if no parentheses
    if (current.trim() && depth === 0) {
      const method = this.parseMethod(current + '()');
      methods.push(method);
    }

    return methods;
  }

  private parseMethod(methodString: string): MethodCall {
    const parenIndex = methodString.indexOf('(');
    const name = methodString.substring(0, parenIndex).trim();
    const paramsString = methodString.substring(parenIndex + 1, methodString.lastIndexOf(')')).trim();

    const params = paramsString ? this.parseParameters(paramsString) : [];

    return { name, params };
  }

  private parseParameters(paramsString: string): any[] {
    if (!paramsString.trim()) return [];

    try {
      // Wrap in array brackets and use JSON.parse for simple parameter parsing
      const wrapped = `[${paramsString}]`;
      return JSON.parse(wrapped);
    } catch {
      // Fallback for simple string parameters
      return [paramsString.replace(/^['"]|['"]$/g, '')];
    }
  }
}


// ComponentBuilder - for creating reusable components
class ComponentBuilder {
  private componentType: string;
  private children: any[] = [];
  private props: Record<string, any> = {};

  constructor(type: string) {
    this.componentType = type;
  }

  // Add content to this component
  add(content: any): ComponentBuilder {
    this.children.push(content);
    return this;
  }

  // Set properties
  setProp(key: string, value: any): ComponentBuilder {
    this.props[key] = value;
    return this;
  }

  // Build the component configuration
  build(): any {
    return {
      type: this.componentType,
      props: {
        ...this.props,
        children: this.children
      },
      isComponent: true // Flag to identify component objects
    };
  }

  // Common methods for different component types
  setTitle(title: string): ComponentBuilder {
    this.props.title = title;
    return this;
  }

  setColumns(columns: number): ComponentBuilder {
    this.props.columns = columns;
    return this;
  }

  setBrand(brand: string): ComponentBuilder {
    this.props.brand = brand;
    return this;
  }

  setLinks(links: any[]): ComponentBuilder {
    this.props.links = links;
    return this;
  }

  setText(text: string): ComponentBuilder {
    this.props.text = text;
    return this;
  }

  addText(text: string): ComponentBuilder {
    return this.add({ type: 'text', content: text });
  }

  addButton(text: string, href: string): ComponentBuilder {
    return this.add({ type: 'button', text, href });
  }

  addInput(type: string, placeholder: string, name: string): ComponentBuilder {
    return this.add({ type: 'input', inputType: type, placeholder, name });
  }

  addCard(title: string, content: string, footer?: string): ComponentBuilder {
    return this.add({ type: 'card', title, content, footer });
  }

  addComponent(component: any): ComponentBuilder {
    return this.add(component);
  }

  addHeader(text: string, level: number = 1): ComponentBuilder {
    return this.add({ type: 'header', text, level });
  }
}

class BuilderRegistry {
  private builders: Map<string, any> = new Map();
  private objects: Map<string, any> = new Map(); // Store created objects for reuse

  constructor() {
    this.registerBuilder('page', () => new PageBuilder());
    // Register component builders for various types
    this.registerBuilder('grid', () => new ComponentBuilder('grid'));
    this.registerBuilder('section', () => new ComponentBuilder('section'));
    this.registerBuilder('card', () => new ComponentBuilder('card'));
    this.registerBuilder('form', () => new ComponentBuilder('form'));
    this.registerBuilder('hero', () => new ComponentBuilder('hero'));
    this.registerBuilder('navbar', () => new ComponentBuilder('navbar'));
    this.registerBuilder('footer', () => new ComponentBuilder('footer'));
    this.registerBuilder('container', () => new ComponentBuilder('container'));
  }

  registerBuilder(name: string, factory: () => any): void {
    this.builders.set(name, factory);
  }

  createBuilder(name: string): any {
    // Check if we have a stored object first
    if (this.objects.has(name)) {
      return this.objects.get(name);
    }

    // Try to create from registered builders first
    let factory = this.builders.get(name);

    // If not found, check for common builder types based on name patterns
    if (!factory) {
      if (name.startsWith('page') || name === 'page') {
        factory = this.builders.get('page');
      } else if (name.includes('grid') || name.includes('Grid')) {
        factory = this.builders.get('grid');
      } else if (name.includes('section') || name.includes('Section')) {
        factory = this.builders.get('section');
      } else if (name.includes('card') || name.includes('Card')) {
        factory = this.builders.get('card');
      } else if (name.includes('form') || name.includes('Form')) {
        factory = this.builders.get('form');
      } else if (name.includes('hero') || name.includes('Hero')) {
        factory = this.builders.get('hero');
      } else if (name.includes('nav') || name.includes('Nav')) {
        factory = this.builders.get('navbar');
      } else if (name.includes('footer') || name.includes('Footer')) {
        factory = this.builders.get('footer');
      } else {
        // For page-like names, use PageBuilder, otherwise use container
        if (name.toLowerCase().includes('page')) {
          factory = this.builders.get('page');
        } else {
          factory = this.builders.get('container');
        }
      }
    }

    if (!factory) {
      const availableBuilders = Array.from(this.builders.keys()).join(', ');
      throw new Error(`Unable to create builder for "${name}". Available builders: ${availableBuilders}`);
    }

    const builder = factory();
    return builder;
  }

  storeObject(name: string, object: any): void {
    this.objects.set(name, object);
  }

  getObject(name: string): any {
    return this.objects.get(name);
  }

  hasObject(name: string): boolean {
    return this.objects.has(name);
  }

  getAllObjects(): Map<string, any> {
    return new Map(this.objects);
  }
}

export class BuilderDSL {
  private parser = new DSLParser();
  private registry = new BuilderRegistry();

  execute(dslString: string): any {
    try {
      const parsed = this.parser.parse(dslString);
      let builder;

      // Check if we're referencing an existing object
      if (this.registry.hasObject(parsed.objectName)) {
        builder = this.registry.getObject(parsed.objectName);
      } else {
        builder = this.registry.createBuilder(parsed.objectName);
      }

      // Execute method chain
      let result = builder;
      for (const method of parsed.methodChain) {
        if (typeof result[method.name] !== 'function') {
          throw new Error(`Method '${method.name}' not found on ${parsed.objectName}`);
        }

        // Process parameters to handle component references
        const processedParams = method.params.map(param => {
          if (typeof param === 'string' && this.registry.hasObject(param)) {
            // If parameter is a reference to a stored object, get the actual object or its built form
            const obj = this.registry.getObject(param);
            // If it's a component builder, return its built form
            if (obj && typeof obj.build === 'function') {
              return obj.build();
            }
            return obj;
          }
          return param;
        });

        result = result[method.name](...processedParams);
      }

      // If the result is a builder and has changed, store it for reuse
      if (result && result !== builder) {
        this.registry.storeObject(parsed.objectName, result);
      } else if (builder && result === builder) {
        // Store the builder itself for chaining
        this.registry.storeObject(parsed.objectName, builder);
      }

      return result;
    } catch (error) {
      throw new Error(`DSL Execution Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Execute multiple DSL strings and return the registry for object access
  executeMultiple(dslStrings: string[]): { results: any[], registry: BuilderRegistry } {
    const results: any[] = [];
    for (const dslString of dslStrings) {
      results.push(this.execute(dslString));
    }
    return { results, registry: this.registry };
  }

  // Get the registry to access stored objects
  getRegistry(): BuilderRegistry {
    return this.registry;
  }

  // Convenience method for testing
  static test(dslString: string): any {
    const dsl = new BuilderDSL();
    return dsl.execute(dslString);
  }

  // Convenience method for testing multiple DSL strings
  static testMultiple(dslStrings: string[]): { results: any[], registry: BuilderRegistry } {
    const dsl = new BuilderDSL();
    return dsl.executeMultiple(dslStrings);
  }
}