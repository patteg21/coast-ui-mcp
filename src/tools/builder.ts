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
    // Clean the string - remove comments and extra whitespace
    const cleaned = this.removeComments(dslString).trim();

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

  removeComments(input: string): string {
    const lines = input.split('\n');
    const cleanedLines: string[] = [];

    for (const line of lines) {
      // Remove single-line comments (// ...) but preserve content inside strings
      let cleaned = '';
      let inString = false;
      let stringChar = '';
      let i = 0;

      while (i < line.length) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (!inString && (char === '"' || char === "'")) {
          // Entering a string
          inString = true;
          stringChar = char;
          cleaned += char;
        } else if (inString && char === stringChar && line[i - 1] !== '\\') {
          // Exiting a string (not escaped)
          inString = false;
          stringChar = '';
          cleaned += char;
        } else if (!inString && char === '/' && nextChar === '/') {
          // Found comment outside of string, ignore rest of line
          break;
        } else {
          cleaned += char;
        }
        i++;
      }

      // Only add non-empty lines after trimming
      const trimmedLine = cleaned.trim();
      if (trimmedLine) {
        cleanedLines.push(trimmedLine);
      }
    }

    return cleanedLines.join('\n');
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

  setContent(content: string): ComponentBuilder {
    this.props.content = content;
    return this;
  }

  setSubtitle(subtitle: string): ComponentBuilder {
    this.props.subtitle = subtitle;
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

  addSection(title?: string): ComponentBuilder {
    return this.add({ type: 'section', title });
  }

  addBreak(): ComponentBuilder {
    return this.add({ type: 'break' });
  }

  addSpacer(): ComponentBuilder {
    return this.add({ type: 'spacer' });
  }

  addDivider(): ComponentBuilder {
    return this.add({ type: 'divider' });
  }

  addGrid(columns: number): ComponentBuilder {
    return this.add({ type: 'grid', columns, children: [] });
  }

  addContent(content: string): ComponentBuilder {
    return this.add({ type: 'content', content });
  }

  addNavbar(config: any): ComponentBuilder {
    // If this is already a navbar component, set properties directly
    if (this.componentType === 'navbar') {
      this.props.brand = config.brand;
      this.props.links = config.links;
      return this;
    }
    return this.add({ type: 'navbar', brand: config.brand, links: config.links });
  }

  addHero(config: any): ComponentBuilder {
    // If this is already a hero component, set properties directly
    if (this.componentType === 'hero') {
      this.props.title = config.title;
      this.props.subtitle = config.subtitle;
      this.props.primaryButton = config.primaryButton;
      this.props.buttonText = config.buttonText;
      return this;
    }
    return this.add({ type: 'hero', title: config.title, subtitle: config.subtitle, primaryButton: config.primaryButton, buttonText: config.buttonText });
  }

  addFeatureGrid(config: any): ComponentBuilder {
    // If this is already a featureGrid component, set properties directly
    if (this.componentType === 'featureGrid') {
      this.props.title = config.title;
      this.props.features = config.features;
      return this;
    }
    return this.add({ type: 'featureGrid', title: config.title, features: config.features });
  }

  addPricingTable(config: any): ComponentBuilder {
    return this.add({ type: 'pricingTable', ...config });
  }

  addCodeBlock(config: any): ComponentBuilder {
    return this.add({ type: 'codeBlock', ...config });
  }

  addFooter(config: any): ComponentBuilder {
    return this.add({ type: 'footer', ...config });
  }

  addSelect(options: Array<{value: string; text: string}>, name?: string, placeholder?: string): ComponentBuilder {
    return this.add({ type: 'select', options, name, placeholder });
  }

  addTextArea(placeholder?: string, rows?: number, name?: string): ComponentBuilder {
    return this.add({ type: 'textarea', placeholder, rows, name });
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
      // Check if the input contains multiple DSL commands
      const commands = this.splitDSLCommands(dslString);

      if (commands.length === 1) {
        // Single command - existing logic
        return this.executeSingle(commands[0]);
      } else {
        // Multiple commands - execute all and return the last result
        let lastResult;
        for (const command of commands) {
          lastResult = this.executeSingle(command);
        }
        return lastResult;
      }
    } catch (error) {
      throw new Error(`DSL Execution Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private splitDSLCommands(dslString: string): string[] {
    // Remove comments first
    const cleaned = this.parser.removeComments(dslString);

    // Split into individual commands (each should end with .build() or similar)
    const lines = cleaned.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const commands: string[] = [];
    let currentCommand = '';

    for (const line of lines) {
      currentCommand += ' ' + line;

      // Check if this line completes a command (ends with .build() or similar terminating method)
      if (line.includes('.build()') || line.includes('.end()')) {
        commands.push(currentCommand.trim());
        currentCommand = '';
      }
    }

    // Add any remaining command
    if (currentCommand.trim()) {
      commands.push(currentCommand.trim());
    }

    return commands;
  }

  private executeSingle(dslCommand: string): any {
    const parsed = this.parser.parse(dslCommand);
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