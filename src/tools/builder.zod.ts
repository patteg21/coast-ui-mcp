import { z } from "zod";

export const DSL_DOCUMENTATION = `
Build mobile-optimized HTML pages using flexible DSL syntax with any object name and component composition

=% CRITICAL FEATURES:
Flexible Object Naming: You can use ANY object name (page, part1, section1, hero2, etc.) - not just 'page'
 Component Composition: Components can be passed into other components (grids can contain cards, sections can contain grids, etc.)
 Object Registry: Created objects are stored and can be reused across multiple DSL calls
 Cross-Component References: Objects can reference other stored objects as parameters

BASIC STRUCTURE:
- ANY_NAME.setTitle("Page Title") - Set the HTML page title (use any object name)
- ANY_NAME.build() - Generate final HTML (ALWAYS call this last, REQUIRED)

FLEXIBLE NAMING EXAMPLES:
 CORRECT: page.setTitle("My App").addHeader("Welcome").build()
 CORRECT: hero1.setTitle("Welcome").addSubtitle("Get started").build()
 CORRECT: section2.addHeader("Features").build()
 CORRECT: card1.setTitle("My Card").setContent("Content").build()

NAVIGATION:
- addNavbar({"brand": "Brand Name", "links": [{"text": "Home", "href": "/"}]}) - Add navigation bar

CONTENT ELEMENTS:
- addHeader("Text", level) - Add header (level: 1-3, default: 1)
- addText("Text") - Add text
- addContent("HTML content") - Add content
- addButton("Text", "href") - Add button
- addList(["Item 1", "Item 2"], ordered) - Add list (ordered: true for <ol>, false for <ul>)
- addCard("Title", "Content", "Footer") - Add card component

LAYOUT & SPACING:
- addBreak() - Add spacing
- addSpacer() - Add spacer
- addDivider() - Add divider line
- addGrid(columns) - Create responsive grid layout (1-6 columns)
- addContainer() - Add container wrapper
- addSection("title") - Add section with optional title

COMPONENT COMPOSITION:
- addComponent("componentName") - Add a previously built component by name
- setColumns(number) - Set number of columns for grid layouts
- setTitle("Title") - Set title for various components
- setContent("Content") - Set content for components
- setSubtitle("Subtitle") - Set subtitle for components

FORM ELEMENTS:
- addInput("type", "placeholder", "name") - Add input field (type: "text"|"email"|"tel"|"password", etc.)
- addTextArea("placeholder", rows, "name") - Add textarea (rows: number, e.g., 4)
- addSelect([{"value": "val", "text": "Text"}], "name", "placeholder") - Add dropdown select
- addForm("action", "method") - Create form wrapper

MEDIA:
- addImage("src", "alt", "width", "height") - Add image (width/height optional)
- addVideo("src", "poster", controls) - Add video (poster optional, controls: boolean)

LANDING PAGE COMPONENTS:
- addHero({"title": "Main Title", "subtitle": "Subtitle", "primaryButton": "Get Started", "buttonText": "Action"}) - Hero section
- addFeatureGrid({"title": "Features", "features": [{"icon": "=�", "title": "Fast", "description": "Description"}]}) - Feature grid with multiple items
- addCodeBlock({"title": "Example", "subtitle": "Code example", "code": "curl -X GET...", "language": "bash"}) - Code block with syntax highlighting
- addPricingTable({"title": "Pricing", "plans": [{"name": "Free", "price": "$0", "features": ["Feature 1"], "button": "Start"}]}) - Pricing table with multiple plans
- addCards([{"title": "Title", "description": "Description", "icon": "=%", "footer": "Optional footer"}]) - Card grid with multiple cards
- addFooter({"text": "� 2024 MyApp", "links": [{"text": "Privacy", "href": "/privacy"}]}) - Page footer

ADVANCED COMPOSITION:
- addRawHTML("<div>Custom HTML</div>") - Insert raw HTML directly

COMPONENT COMPOSITION PATTERNS:

" Reusable Components: Create components with any name
  card1.setTitle("My Card").build()
  hero2.setTitle("Welcome").build()
  section1.setTitle("Features").build()

" Pass Components into Other Components:
  grid1.setColumns(2).addComponent("card1").addComponent("card1").build()
  section1.addComponent("hero2").addComponent("grid1").build()
  page.addComponent("section1").build()

" Complex Nested Composition:
  innerCard.setTitle("Inner").build()
  innerGrid.addComponent("innerCard").build()
  section.addComponent("innerGrid").build()
  page.addComponent("section").build()

" Multiple Subcomponents: Most components support arrays for multiple items
  - addFeatureGrid() supports multiple features in the features array
  - addCards() supports multiple cards in the cards array
  - addPricingTable() supports multiple plans in the plans array
  - addNavbar() supports multiple links in the links array

EXAMPLE CHAINS:

Simple Page: page.setTitle("My App").addHeader("Welcome").addText("Hello world").addButton("Start", "/start").build()

Modular Landing Page with Component Composition:
  // Create reusable components
  navComponent.addNavbar({"brand": "DevAPI", "links": [{"text": "Docs", "href": "/docs"}]}).build()

  heroSection.addHero({"title": "Build faster with our API", "subtitle": "Simple and powerful", "primaryButton": "Get Started"}).build()

  feature1.setTitle("Fast").setContent("Sub-100ms responses").build()
  feature2.setTitle("Secure").setContent("Enterprise-grade security").build()

  featureGrid.setColumns(2).addComponent("feature1").addComponent("feature2").build()

  mainSection.setTitle("Features").addComponent("featureGrid").build()

  // Compose final page
  page.setTitle("DevAPI - REST API")
    .addComponent("navComponent")
    .addComponent("heroSection")
    .addComponent("mainSection")
    .build()

Multi-Section Form with Nested Components:
  // Create form sections
  personalInfo.setTitle("Personal Information")
    .addGrid(2)
    .addInput("text", "First Name", "firstName")
    .addInput("text", "Last Name", "lastName")
    .build()

  contactInfo.setTitle("Contact Details")
    .addInput("email", "Email", "email")
    .addInput("tel", "Phone", "phone")
    .build()

  messageSection.setTitle("Message")
    .addTextArea("Your message", 5, "message")
    .build()

  // Compose complete form
  contactForm.setTitle("Contact Us")
    .addComponent("personalInfo")
    .addComponent("contactInfo")
    .addComponent("messageSection")
    .addButton("Send Message", "/submit")
    .build()

  // Final page
  page.setTitle("Contact")
    .addNavbar({"brand": "MyApp", "links": [{"text": "Home", "href": "/"}]})
    .addComponent("contactForm")
    .build()

All methods return the component builder for chaining, except build() which returns HTML string.
Objects are stored in a registry and can be reused across multiple DSL calls.
`;

export const BuilderResponseSchema = z.object({
  html: z.string().describe("Generated HTML content"),
  success: z.boolean().describe("Whether the DSL execution was successful"),
  error: z.string().optional().describe("Error message if execution failed")
});

export type BuilderResponse = z.infer<typeof BuilderResponseSchema>;