import { describe, it, expect } from 'vitest';
import { BuilderDSL } from '../src/tools/builder.js';

describe('Mobile Page Builder DSL', () => {

  describe('Basic Page Building', () => {
    it('should create a simple page with title and content', () => {
      const dsl = `page.setTitle("Test Page").addHeader("Hello World").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<title>Test Page</title>');
      expect(result).toContain('<h1 class="mobile-header">Hello World</h1>');
    });

    it('should create a page with navbar', () => {
      const dsl = `page.setTitle("Nav Test")
        .addNavbar({"brand": "MyApp", "links": [{"text": "Home", "href": "/"}]})
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="mobile-navbar"');
      expect(result).toContain('MyApp');
      expect(result).toContain('href="/"');
    });
  });

  describe('Content Elements', () => {
    it('should add text with different sizes and weights', () => {
      const dsl = `page.addText("Normal text")
        .addText("Small text", "small")
        .addText("Large bold text", "large", "bold")
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="mobile-text text-normal text-normal"');
      expect(result).toContain('class="mobile-text text-small text-normal"');
      expect(result).toContain('class="mobile-text text-large text-bold"');
    });

    it('should add buttons with different types', () => {
      const dsl = `page.addButton("Primary", "/primary", "primary")
        .addButton("Secondary", "/secondary", "secondary")
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('mobile-button-primary');
      expect(result).toContain('mobile-button-secondary');
    });

    it('should add lists', () => {
      const dsl = `page.addList(["Item 1", "Item 2", "Item 3"], false)
        .addList(["First", "Second"], true)
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('<ul class="mobile-list">');
      expect(result).toContain('<ol class="mobile-list">');
      expect(result).toContain('<li>Item 1</li>');
    });
  });

  describe('Form Elements', () => {
    it('should add input fields', () => {
      const dsl = `page.addInput("text", "Enter name", "username")
        .addInput("email", "Enter email", "email")
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('type="text"');
      expect(result).toContain('type="email"');
      expect(result).toContain('placeholder="Enter name"');
      expect(result).toContain('name="username"');
    });

    it('should add textarea', () => {
      const dsl = `page.addTextArea("Enter message", 5, "message").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="mobile-textarea"');
      expect(result).toContain('rows="5"');
      expect(result).toContain('placeholder="Enter message"');
    });

    it('should add select dropdown', () => {
      const dsl = `page.addSelect([{"value": "option1", "text": "Option 1"}], "selection", "Choose").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="mobile-select"');
      expect(result).toContain('value="option1"');
      expect(result).toContain('>Option 1</option>');
    });
  });

  describe('Media Elements', () => {
    it('should add images', () => {
      const dsl = `page.addImage("test.jpg", "Test image", "300px", "200px").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('src="test.jpg"');
      expect(result).toContain('alt="Test image"');
      expect(result).toContain('width="300px"');
      expect(result).toContain('height="200px"');
    });

    it('should add videos', () => {
      const dsl = `page.addVideo("video.mp4", "poster.jpg", true).build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('src="video.mp4"');
      expect(result).toContain('poster="poster.jpg"');
      expect(result).toContain('controls');
    });
  });

  describe('Layout Elements', () => {
    it('should add breaks and spacers', () => {
      const dsl = `page.addBreak("small")
        .addBreak("medium")
        .addBreak("large")
        .addSpacer("50px")
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="break break-small"');
      expect(result).toContain('class="break break-medium"');
      expect(result).toContain('class="break break-large"');
      expect(result).toContain('style="height: 50px;"');
    });

    it('should add dividers', () => {
      const dsl = `page.addDivider("solid")
        .addDivider("dashed")
        .addDivider("dotted")
        .build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="divider divider-solid"');
      expect(result).toContain('class="divider divider-dashed"');
      expect(result).toContain('class="divider divider-dotted"');
    });

    it('should add cards', () => {
      const dsl = `page.addCard("Card Title", "Card content", "Footer text").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain('class="mobile-card"');
      expect(result).toContain('class="card-header">Card Title</div>');
      expect(result).toContain('class="card-content">Card content</div>');
      expect(result).toContain('class="card-footer">Footer text</div>');
    });
  });

  describe('Raw HTML', () => {
    it('should insert raw HTML', () => {
      const dsl = `page.addRawHTML("<div class='custom'>Custom HTML</div>").build()`;
      const result = BuilderDSL.test(dsl);

      expect(result).toContain("<div class='custom'>Custom HTML</div>");
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid method names', () => {
      const dsl = `page.invalidMethod("test").build()`;

      expect(() => {
        BuilderDSL.test(dsl);
      }).toThrow(/Method 'invalidMethod' not found/);
    });

    it('should handle invalid object names', () => {
      const dsl = `unknownObject.build()`;

      expect(() => {
        BuilderDSL.test(dsl);
      }).toThrow(/Unknown builder: unknownObject/);
    });

    it('should handle malformed DSL syntax', () => {
      const dsl = `page.setTitle("unclosed method"`;

      expect(() => {
        BuilderDSL.test(dsl);
      }).toThrow(/DSL Execution Error/);
    });
  });

  describe('Method Chaining', () => {
    it('should handle complex method chains', () => {
      const dsl = `page.setTitle("Complex Page")
        .addNavbar({"brand": "Test"})
        .addHeader("Main Title")
        .addText("Some content")
        .addButton("Click me", "/action")
        .addBreak("medium")
        .addInput("text", "Enter text")
        .addCard("Info", "Card content")
        .build()`;

      const result = BuilderDSL.test(dsl);

      expect(result).toContain('<title>Complex Page</title>');
      expect(result).toContain('class="mobile-navbar"');
      expect(result).toContain('<h1 class="mobile-header">Main Title</h1>');
      expect(result).toContain('Some content');
      expect(result).toContain('mobile-button');
      expect(result).toContain('break break-medium');
      expect(result).toContain('mobile-input');
      expect(result).toContain('mobile-card');
    });
  });
});