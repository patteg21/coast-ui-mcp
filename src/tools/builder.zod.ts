import { z } from "zod";

const DSL_DOCUMENTATION = `
Mobile Page Builder DSL - Comprehensive Method Reference:

🔥 CRITICAL: DSL MUST start with 'page.' (not 'createPage()' or anything else)
✅ CORRECT: page.setTitle("My App").addHeader("Welcome").build()
❌ WRONG: createPage().setTitle("My App").build()

BASIC STRUCTURE (REQUIRED):
- page.setTitle("Page Title") - Set the HTML page title
- page.build() - Generate final HTML (ALWAYS call this last, REQUIRED)

NAVIGATION:
- addNavbar({"brand": "Brand Name", "links": [{"text": "Home", "href": "/"}]}) - Add navigation bar

CONTENT ELEMENTS:
- addHeader("Text", level) - Add header (level: 1-3, default: 1)
- addText("Text", size, weight) - Add text (size: "small"|"normal"|"large", weight: "normal"|"bold")
- addContent("HTML content", "css-class") - Add content with optional CSS class
- addButton("Text", "href", "type") - Add button (type: "primary"|"secondary")
- addList(["Item 1", "Item 2"], ordered) - Add list (ordered: true for <ol>, false for <ul>)
- addCard("Title", "Content", "Footer") - Add card component

LAYOUT & SPACING:
- addBreak("size") - Add spacing (size: "small"|"medium"|"large")
- addSpacer("height") - Add custom height spacer (e.g., "2rem", "50px")
- addDivider("style") - Add divider line (style: "solid"|"dashed"|"dotted")

FORM ELEMENTS:
- addInput("type", "placeholder", "name") - Add input field (type: "text"|"email"|"tel"|"password", etc.)
- addTextArea("placeholder", rows, "name") - Add textarea (rows: number, e.g., 4)
- addSelect([{"value": "val", "text": "Text"}], "name", "placeholder") - Add dropdown select

MEDIA:
- addImage("src", "alt", "width", "height") - Add image (width/height optional)
- addVideo("src", "poster", controls) - Add video (poster optional, controls: boolean)

LANDING PAGE COMPONENTS:
- addHero({"title": "Main Title", "subtitle": "Subtitle", "primaryButton": "Get Started", "buttonText": "Action"}) - Hero section
- addFeatureGrid({"title": "Features", "features": [{"icon": "🚀", "title": "Fast", "description": "Description"}]}) - Feature grid
- addCodeBlock({"title": "Example", "subtitle": "Code example", "code": "curl -X GET...", "language": "bash"}) - Code block
- addPricingTable({"title": "Pricing", "plans": [{"name": "Free", "price": "$0", "features": ["Feature 1"], "button": "Start"}]}) - Pricing table
- addCards([{"title": "Title", "description": "Description", "icon": "🔥", "footer": "Optional footer"}]) - Card grid
- addFooter({"text": "© 2024 MyApp", "links": [{"text": "Privacy", "href": "/privacy"}]}) - Page footer

ADVANCED:
- addRawHTML("<div>Custom HTML</div>") - Insert raw HTML directly

BUILDER PATTERNS (Advanced):
- addGrid(columns).addItem("content").addItem("content").end() - Create grid layout
- addContainer("css-class").addContent("content").end() - Create container
- addSection("title", "css-class").addContent("content").end() - Create section
- addForm("action", "method").addInput("text", "name").addSubmitButton("Submit").end() - Create form

DESIGN SYSTEM:
The builder supports comprehensive design customization through the 'design' parameter:

THEMES: Pre-built themes that set colors, typography, and spacing
- "default" - Clean blue and gray theme
- "dark" - Dark mode with light text
- "light" - Minimal light theme
- "corporate" - Professional business theme
- "modern" - Contemporary with bold colors
- "playful" - Vibrant and fun theme

CUSTOM COLORS: Override any color in the system
- primary, secondary - Brand colors for buttons and accents
- background, surface - Page and card backgrounds
- text, textSecondary - Text colors
- success, warning, error - State colors
- navbar, navbarText - Navigation colors

TYPOGRAPHY: Control fonts and text styling
- fontFamily - Font stack (e.g., "Inter", "system-ui")
- fontSize - Base size: "small", "normal", "large"
- fontWeight - Base weight: "light", "normal", "medium", "bold"
- lineHeight - Line height multiplier (1.4, 1.6, etc.)

SPACING: Control layout and spacing
- scale - Overall density: "compact", "normal", "spacious"
- containerPadding - Container padding
- elementSpacing - Space between elements

STYLING: Visual appearance options
- borderRadius - Corner style: "none", "small", "normal", "large", "full"
- shadows - Enable/disable drop shadows

EXAMPLE CHAINS:
Simple: page.setTitle("My App").addHeader("Welcome").addText("Hello world").addButton("Start", "/start").build()

Landing Page: page.setTitle("DevAPI - REST API")
  .addNavbar({"brand": "DevAPI", "links": ["Docs", "Pricing", "Support"]})
  .addHero({"title": "Build faster with our API", "subtitle": "Simple and powerful", "primaryButton": "Get Started"})
  .addFeatureGrid({"title": "Features", "features": [{"icon": "🚀", "title": "Fast", "description": "Sub-100ms responses"}]})
  .addPricingTable({"title": "Pricing", "plans": [{"name": "Free", "price": "$0", "features": ["1,000 requests"], "button": "Start"}]})
  .build()

With Design: Use 'design' parameter to apply themes and custom styling
- theme: "dark" for dark mode
- colors: {primary: "#ff6b6b", background: "#1a1a1a"}
- typography: {fontFamily: "Inter", fontSize: "large"}

Contact Form: page.setTitle("Contact")
  .addNavbar({"brand": "MyApp", "links": [{"text": "Home", "href": "/"}]})
  .addHeader("Contact Us")
  .addInput("text", "Your Name", "name")
  .addInput("email", "Email", "email")
  .addTextArea("Message", 5, "message")
  .addButton("Send", "/submit")
  .build()

All methods return the page builder for chaining, except build() which returns HTML string.
`;

export const ColorSchemeSchema = z.object({
  primary: z.string().optional().describe("Primary brand color (hex, rgb, or css color name)"),
  secondary: z.string().optional().describe("Secondary accent color"),
  background: z.string().optional().describe("Page background color"),
  surface: z.string().optional().describe("Card/container background color"),
  text: z.string().optional().describe("Primary text color"),
  textSecondary: z.string().optional().describe("Secondary/muted text color"),
  success: z.string().optional().describe("Success state color (green)"),
  warning: z.string().optional().describe("Warning state color (yellow/orange)"),
  error: z.string().optional().describe("Error state color (red)"),
  navbar: z.string().optional().describe("Navigation bar background color"),
  navbarText: z.string().optional().describe("Navigation bar text color")
});

export const TypographySchema = z.object({
  fontFamily: z.string().optional().describe("Font family (e.g., 'Inter', 'Roboto', 'system-ui')"),
  fontSize: z.enum(["small", "normal", "large"]).optional().default("normal").describe("Base font size"),
  fontWeight: z.enum(["light", "normal", "medium", "bold"]).optional().default("normal").describe("Base font weight"),
  lineHeight: z.number().optional().describe("Line height multiplier (e.g., 1.5, 1.6)")
});

export const SpacingSchema = z.object({
  scale: z.enum(["compact", "normal", "spacious"]).optional().default("normal").describe("Overall spacing scale"),
  containerPadding: z.string().optional().describe("Container padding (e.g., '1rem', '20px')"),
  elementSpacing: z.string().optional().describe("Space between elements (e.g., '1rem', '16px')")
});

export const DesignSystemSchema = z.object({
  theme: z.enum(["default", "dark", "light", "corporate", "modern", "playful"]).optional().default("default").describe("Pre-built design theme"),
  colors: ColorSchemeSchema.optional().describe("Custom color scheme (overrides theme colors)"),
  typography: TypographySchema.optional().describe("Typography settings"),
  spacing: SpacingSchema.optional().describe("Spacing and layout settings"),
  borderRadius: z.enum(["none", "small", "normal", "large", "full"]).optional().default("normal").describe("Border radius style"),
  shadows: z.boolean().optional().default(true).describe("Enable drop shadows on cards and buttons")
});

export const BuilderInputSchema = z.object({
  dsl: z.string().describe(`DSL string for building mobile-optimized UI components. ${DSL_DOCUMENTATION}`),
  screenSize: z.enum(["phone", "tablet", "desktop"]).optional().default("phone").describe("Target screen size for responsive design"),
  design: DesignSystemSchema.optional().describe("Design system configuration including colors, typography, spacing, and theme")
});

export type BuilderInput = z.infer<typeof BuilderInputSchema>;

export const BuilderResponseSchema = z.object({
  html: z.string().describe("Generated HTML content"),
  success: z.boolean().describe("Whether the DSL execution was successful"),
  error: z.string().optional().describe("Error message if execution failed")
});

export type BuilderResponse = z.infer<typeof BuilderResponseSchema>;