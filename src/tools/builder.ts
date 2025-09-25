import { PageBuilder } from "./pageBuilder";

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

    const objectName = cleaned.substring(0, firstDotIndex);
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


class BuilderRegistry {
  private builders: Map<string, any> = new Map();

  constructor() {
    this.registerBuilder('page', () => new PageBuilder());
  }

  registerBuilder(name: string, factory: () => any): void {
    this.builders.set(name, factory);
  }

  createBuilder(name: string): any {
    const factory = this.builders.get(name);
    if (!factory) {
      const availableBuilders = Array.from(this.builders.keys()).join(', ');
      throw new Error(`Unknown builder: "${name}". Available builders: ${availableBuilders}.

🔥 CRITICAL: DSL MUST start with 'page.' (not 'createPage()' or '${name}')
✅ CORRECT: page.setTitle("My App").build()
❌ WRONG: ${name}.setTitle("My App").build()`);
    }
    return factory();
  }
}

export class BuilderDSL {
  private parser = new DSLParser();
  private registry = new BuilderRegistry();

  execute(dslString: string): any {
    try {
      const parsed = this.parser.parse(dslString);
      const builder = this.registry.createBuilder(parsed.objectName);

      // Execute method chain
      let result = builder;
      for (const method of parsed.methodChain) {
        if (typeof result[method.name] !== 'function') {
          throw new Error(`Method '${method.name}' not found on ${parsed.objectName}`);
        }
        result = result[method.name](...method.params);
      }

      return result;
    } catch (error) {
      throw new Error(`DSL Execution Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Convenience method for testing
  static test(dslString: string): any {
    const dsl = new BuilderDSL();
    return dsl.execute(dslString);
  }
}