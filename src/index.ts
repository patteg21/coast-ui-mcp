import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { BuilderDSL } from "./tools/builder.js";
import { DSL_DOCUMENTATION } from "./tools/builder.zod.js";

// Create an MCP server
const server = new McpServer({
  name: "coast-ui-server",
  version: "1.0.0"
});

// Webapp page builder DSL tool
server.registerTool("webapp-page-builder",
  {
    title: "WebApp Page Builder",
    description: DSL_DOCUMENTATION,
    inputSchema: {
      dsl: z.string().describe("DSL string for building UI components"),
      screenSize: z.enum(["phone", "tablet", "desktop"]).optional().default("desktop"),
    }
  },
  async ({ dsl }) => {
    try {
      const builderDSL = new BuilderDSL();
      const result = builderDSL.execute(dsl);

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
  "Prefer To Use Tools Over Generation",
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