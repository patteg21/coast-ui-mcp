import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { BuilderDSL } from "./tools/builder.js";
import { BuilderInputSchema } from "./tools/builder.zod.js";

// Create an MCP server
const server = new McpServer({
  name: "coast-ui-server",
  version: "1.0.0"
});

// Add mobile page builder DSL tool
server.registerTool("build-mobile-page",
  {
    title: "WebApp Page Builder",
    description: "Build mobile-optimized HTML pages using DSL syntax like 'page.setTitle(\"My App\").addNavbar({\"brand\": \"MyApp\"}).build()'",
    inputSchema: {
      dsl: z.string().describe("DSL string for building UI components"),
      screenSize: z.enum(["phone", "tablet", "desktop"]).optional().default("phone"),
      design: z.object({
        theme: z.enum(["default", "dark", "light", "corporate", "modern", "playful"]).optional(),
        colors: z.object({
          primary: z.string().optional(),
          secondary: z.string().optional(),
          background: z.string().optional(),
          surface: z.string().optional(),
          text: z.string().optional(),
          textSecondary: z.string().optional(),
          navbar: z.string().optional(),
          navbarText: z.string().optional()
        }).optional(),
        typography: z.object({
          fontFamily: z.string().optional(),
          fontSize: z.enum(["small", "normal", "large"]).optional(),
          fontWeight: z.enum(["light", "normal", "medium", "bold"]).optional()
        }).optional(),
        borderRadius: z.enum(["none", "small", "normal", "large", "full"]).optional(),
        shadows: z.boolean().optional()
      }).optional().describe("Design system configuration including colors, typography, and theme")
    }
  },
  async ({ dsl, design }) => {
    try {
      const builderDSL = new BuilderDSL();

      // If design is provided, inject setDesign call at the start
      let modifiedDSL = dsl;
      if (design) {
        const designJSON = JSON.stringify(design);
        // Insert setDesign call after the page object
        modifiedDSL = dsl.replace(/^(\s*page)/, `$1.setDesign(${designJSON})`);
      }

      const result = builderDSL.execute(modifiedDSL);

      return {
        content: [{
          type: "text",
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }]
      };
    }
  }
);


// Add a dynamic greeting resource
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  { 
    title: "Coast UI Builder",      // Display name for UI
    description: "Dynamic UI Builder for Application"
  },
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);