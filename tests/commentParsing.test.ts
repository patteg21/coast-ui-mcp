import { BuilderDSL } from '../src/tools/builder.js';
import { describe, it, expect } from "vitest";

describe("Comment Parsing", () => {
  it("should handle simple comments", () => {
    const dsl = new BuilderDSL();

    const dslString = `
// Create navigation component
navbar.addNavbar({
  "brand": "Test Brand",
  "links": [{"text": "Home", "href": "/"}]
}).build()
`;

    const result = dsl.execute(dslString);
    expect(result).toBeDefined();
    expect(result.isComponent).toBe(true);
  });

  it("should handle multiple components with comments", () => {
    const dsl = new BuilderDSL();

    const dslString = `
// Create hero section
hero1.setTitle("Welcome").setContent("Hello World").build()

// Create card
card1.setTitle("My Card").setContent("Card content").build()

// Create page
page.setTitle("Test Page").addComponent("hero1").addComponent("card1").build()
`;

    const result = dsl.execute(dslString);
    expect(result).toBeDefined();
    expect(result).toContain('<title>Test Page</title>');
    expect(result).toContain('Welcome');
    expect(result).toContain('My Card');
  });

  it("should preserve URLs in strings despite containing //", () => {
    const dsl = new BuilderDSL();

    const dslString = `
// This comment should be removed
navbar.addNavbar({
  "brand": "Test",
  "links": [{"text": "Link", "href": "https://example.com/path"}]
}).build()
`;

    const result = dsl.execute(dslString);
    expect(result).toBeDefined();
    expect(result.isComponent).toBe(true);
    // The URL should be preserved somewhere in the component structure
    const resultString = JSON.stringify(result);
    expect(resultString).toContain("https://example.com/path");
  });
});