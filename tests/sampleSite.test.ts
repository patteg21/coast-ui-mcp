import { PageBuilder } from "../src/tools/pageBuilder"
import { BuilderDSL } from '../src/tools/builder.js';
import { describe, it, expect } from "vitest"

describe("PageBuilder", () => {
  it("should create a complete TaskMaster page", () => {
    const page = new PageBuilder()

    const result = page.setTitle("TaskMaster - Todo App")
      .addNavbar({
        "brand": "TaskMaster",
        "links": [
          { text: "Home", href: "/" },
          { text: "Tasks", href: "/tasks" }
        ]
      })
      .addHero({
        "title": "Stay Organized",
        "subtitle": "Manage your tasks efficiently with TaskMaster",
        "buttonText": "Get Started",
        "buttonHref": "/signup"
      })
      .addCard("Quick Add Task", "Add new tasks quickly", "Start now")
      .build()

    expect(result).toBeDefined()
    expect(result).toContain("TaskMaster - Todo App")
    expect(result).toContain("Stay Organized")
    expect(result).toContain("Quick Add Task")
    expect(result).toContain("<!DOCTYPE html>")
    expect(result).toContain("</html>")
  })

  it("should build and write HTML file to output directory", () => {
    const page = new PageBuilder()

    const filepath = page.setTitle("Test Page")
      .addHero({
        "title": "Test Hero",
        "subtitle": "Test subtitle"
      })
      .buildAndWrite()

    expect(filepath).toBeDefined()
    expect(filepath).toContain("output")
    expect(filepath).toContain(".html")
  })

  it("should create components with arbitrary names", () => {
    const dsl = new BuilderDSL();

    // Test various naming patterns
    const commands = [
      'part1.setTitle("Section 1").build()',
      'hero2.setTitle("Welcome").setText("Hello World").build()',
      'myGrid.setColumns(3).build()',
      'navbar1.setBrand("MyApp").build()'
    ];

    const { results } = dsl.executeMultiple(commands);

    // All should execute without errors
    expect(results).toHaveLength(4);
    results.forEach(result => {
      expect(result).toBeDefined();
      expect(result.isComponent).toBe(true);
    });
  });

  it("should support component reuse through object references", () => {
    const dsl = new BuilderDSL();

    // Create a card component
    dsl.execute('card1.setTitle("My Card").addText("Card content").build()');

    // Create a grid and reference the card
    const grid = dsl.execute('grid1.setColumns(2).addComponent("card1").addComponent("card1").build()');

    expect(grid.isComponent).toBe(true);
    expect(grid.props.children).toHaveLength(2);
  });

  it("should allow components to be passed into other components", () => {
    const dsl = new BuilderDSL();

    const commands = [
      // Create individual components
      'card1.setTitle("Card 1").addText("First card").build()',
      'card2.setTitle("Card 2").addText("Second card").build()',
      'hero1.setTitle("Welcome").setText("Hero section").build()',

      // Create a grid with cards
      'grid1.setColumns(2).addComponent("card1").addComponent("card2").build()',

      // Create a section with hero and grid
      'section1.setTitle("Features").addComponent("hero1").addComponent("grid1").build()',

      // Create main page with section
      'page.setTitle("Composed Page").addComponent("section1").build()'
    ];

    const { results } = dsl.executeMultiple(commands);
    const finalPage = results[results.length - 1];

    expect(finalPage).toContain('<title>Composed Page</title>');
    expect(finalPage).toContain('Welcome'); // From hero
    expect(finalPage).toContain('Card 1'); // From first card
    expect(finalPage).toContain('Card 2'); // From second card
  });

  it("should support nested component composition", () => {
    const dsl = new BuilderDSL();

    const commands = [
      // Create deeply nested structure
      'innerCard.setTitle("Inner").addText("Deep content").build()',
      'innerGrid.setColumns(1).addComponent("innerCard").build()',
      'middleSection.setTitle("Middle").addComponent("innerGrid").build()',
      'outerContainer.addComponent("middleSection").build()',
      'page.setTitle("Nested Page").addComponent("outerContainer").build()'
    ];

    const { results } = dsl.executeMultiple(commands);
    const finalPage = results[results.length - 1];

    expect(finalPage).toContain('Deep content');
    expect(finalPage).toContain('Middle');
    expect(finalPage).toContain('<title>Nested Page</title>');
  });

  it("should handle form with multiple components inside grid", () => {
    const dsl = new BuilderDSL();

    const commands = [
      // Create form components
      'nameInput.addInput("text", "Your Name", "name").build()',
      'emailInput.addInput("email", "Your Email", "email").build()',
      'submitBtn.addButton("Submit", "/submit").build()',

      // Create form with grid layout
      'formGrid.setColumns(2).addComponent("nameInput").addComponent("emailInput").build()',
      'mainForm.addComponent("formGrid").addComponent("submitBtn").build()',

      // Add to page
      'contactPage.setTitle("Contact Us").addHeader("Get in Touch", 1).addComponent("mainForm").build()'
    ];

    const { results } = dsl.executeMultiple(commands);
    const finalPage = results[results.length - 1];

    expect(finalPage).toContain('<title>Contact Us</title>');
    expect(finalPage).toContain('placeholder="Your Name"');
    expect(finalPage).toContain('placeholder="Your Email"');
    expect(finalPage).toContain('Submit');
  });

  it("should support landing page with mixed component types", () => {
    const dsl = new BuilderDSL();

    const commands = [
      // Create navigation
      'mainNav.setBrand("TechCorp").setLinks([{"text": "Home", "href": "/"}, {"text": "About", "href": "/about"}]).build()',

      // Create hero section
      'heroSection.setTitle("Innovation Starts Here").setText("Build the future with our tools").addButton("Get Started", "/signup").build()',

      // Create feature cards
      'feature1.setTitle("Fast").addText("Lightning quick performance").build()',
      'feature2.setTitle("Secure").addText("Enterprise-grade security").build()',
      'feature3.setTitle("Scalable").addText("Grows with your business").build()',

      // Create feature grid
      'featureGrid.setColumns(3).addComponent("feature1").addComponent("feature2").addComponent("feature3").build()',

      // Create feature section
      'featureSection.setTitle("Why Choose Us").addComponent("featureGrid").build()',

      // Create footer
      'mainFooter.setText("© 2024 TechCorp").setLinks([{"text": "Privacy", "href": "/privacy"}]).build()',

      // Assemble page
      'landingPage.setTitle("TechCorp - Innovation").addComponent("mainNav").addComponent("heroSection").addComponent("featureSection").addComponent("mainFooter").build()'
    ];

    const { results } = dsl.executeMultiple(commands);
    const finalPage = results[results.length - 1];

    expect(finalPage).toContain('<title>TechCorp - Innovation</title>');
    expect(finalPage).toContain('TechCorp'); // Brand name
    expect(finalPage).toContain('Innovation Starts Here'); // Hero title
    expect(finalPage).toContain('Fast'); // Feature 1
    expect(finalPage).toContain('Secure'); // Feature 2
    expect(finalPage).toContain('Scalable'); // Feature 3
    expect(finalPage).toContain('© 2024 TechCorp'); // Footer
  });

  it("should store and retrieve objects correctly", () => {
    const dsl = new BuilderDSL();
    const registry = dsl.getRegistry();

    // Create an object
    dsl.execute('testObj.setTitle("Test").build()');

    // Check if object is stored
    expect(registry.hasObject('testObj')).toBe(true);

    // Retrieve the object
    const obj = registry.getObject('testObj');
    expect(obj).toBeDefined();
    expect(obj.isComponent).toBe(true);
  });

  it("should allow object reuse across multiple operations", () => {
    const dsl = new BuilderDSL();

    // Create reusable components
    const commands = [
      'reusableCard.setTitle("Reusable").addText("Can be used multiple times").build()',
      'grid1.setColumns(2).addComponent("reusableCard").addComponent("reusableCard").build()',
      'grid2.setColumns(1).addComponent("reusableCard").build()',
      'page1.setTitle("Page 1").addComponent("grid1").build()',
      'page2.setTitle("Page 2").addComponent("grid2").build()'
    ];

    const { results } = dsl.executeMultiple(commands);

    // Both pages should contain the reusable card content
    const page1 = results[3];
    const page2 = results[4];

    expect(page1).toContain('Can be used multiple times');
    expect(page2).toContain('Can be used multiple times');
    expect(page1).toContain('<title>Page 1</title>');
    expect(page2).toContain('<title>Page 2</title>');
  });
})