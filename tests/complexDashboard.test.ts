import { BuilderDSL } from '../src/tools/builder.js';
import { describe, it, expect } from "vitest";

describe("Complex Dashboard DSL", () => {
  it("should build a complete ProjectFlow dashboard with all components", () => {
    const dsl = new BuilderDSL();

    const complexDSL = `
// Create navigation component
navbar.addNavbar({
  "brand": "ProjectFlow Dashboard",
  "links": [
    {"text": "Dashboard", "href": "/dashboard"},
    {"text": "Projects", "href": "/projects"},
    {"text": "Analytics", "href": "/analytics"},
    {"text": "Team", "href": "/team"},
    {"text": "Settings", "href": "/settings"}
  ]
}).build()

// Create hero section with key metrics
heroMetrics.addHero({
  "title": "Welcome back, Sarah",
  "subtitle": "Here's what's happening with your projects today",
  "primaryButton": "New Project",
  "buttonText": "View Reports"
}).build()

// Create individual metric cards
activeCard.setTitle("Active Projects").setContent("24").setSubtitle("↗️ +12% from last month").build()
completedCard.setTitle("Completed Tasks").setContent("156").setSubtitle("↗️ +8% this week").build()
teamCard.setTitle("Team Members").setContent("18").setSubtitle("→ No change").build()
revenueCard.setTitle("Revenue").setContent("$45,200").setSubtitle("↗️ +15% this quarter").build()

// Create metrics grid
metricsGrid.setColumns(4)
  .addComponent("activeCard")
  .addComponent("completedCard")
  .addComponent("teamCard")
  .addComponent("revenueCard")
  .build()

// Create feature grid for main dashboard sections
mainFeatures.addFeatureGrid({
  "title": "Quick Actions",
  "features": [
    {"icon": "📊", "title": "Analytics", "description": "View detailed project analytics and performance metrics"},
    {"icon": "👥", "title": "Team Management", "description": "Manage team members, roles, and permissions"},
    {"icon": "📝", "title": "Task Tracking", "description": "Create, assign, and track project tasks"},
    {"icon": "💰", "title": "Budget Overview", "description": "Monitor project budgets and expenses"},
    {"icon": "📅", "title": "Timeline View", "description": "Visualize project timelines and milestones"},
    {"icon": "🔔", "title": "Notifications", "description": "Stay updated with real-time project notifications"}
  ]
}).build()

// Create project status table
projectTable.setTitle("Recent Projects")
  .addContent(\`
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Website Redesign</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-blue-600 h-2.5 rounded-full" style="width: 75%"></div></div></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 15, 2024</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 members</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mobile App Launch</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Review</span></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-yellow-600 h-2.5 rounded-full" style="width: 90%"></div></div></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 8, 2025</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 members</td>
          </tr>
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Migration</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Delayed</span></td>
            <td class="px-6 py-4 whitespace-nowrap"><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-red-600 h-2.5 rounded-full" style="width: 45%"></div></div></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nov 30, 2024</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 members</td>
          </tr>
        </tbody>
      </table>
    </div>
  \`)
  .build()

// Create pricing table for subscription tiers
pricingSection.addPricingTable({
  "title": "Upgrade Your Plan",
  "plans": [
    {
      "name": "Starter",
      "price": "$29",
      "features": ["Up to 5 projects", "10 team members", "Basic analytics", "Email support"],
      "button": "Current Plan"
    },
    {
      "name": "Professional",
      "price": "$79",
      "features": ["Unlimited projects", "50 team members", "Advanced analytics", "Priority support", "Custom integrations"],
      "button": "Upgrade Now"
    },
    {
      "name": "Enterprise",
      "price": "$199",
      "features": ["Everything in Pro", "Unlimited team members", "Custom workflows", "Dedicated support", "On-premise option"],
      "button": "Contact Sales"
    }
  ]
}).build()

// Create quick action form
actionForm.setTitle("Quick Task Creation")
  .addGrid(2)
  .addInput("text", "Task Title", "title")
  .addSelect([
    {"value": "high", "text": "High Priority"},
    {"value": "medium", "text": "Medium Priority"},
    {"value": "low", "text": "Low Priority"}
  ], "priority", "Select Priority")
  .addInput("date", "Due Date", "dueDate")
  .addSelect([
    {"value": "design", "text": "Design Team"},
    {"value": "dev", "text": "Development Team"},
    {"value": "marketing", "text": "Marketing Team"}
  ], "team", "Assign to Team")
  .addTextArea("Task Description", 4, "description")
  .addButton("Create Task", "/create-task")
  .build()

// Create notification cards
notification1.setTitle("🔔 New Comment").setContent("John Smith commented on Website Redesign project").setSubtitle("2 minutes ago").build()
notification2.setTitle("⚠️ Deadline Approaching").setContent("Mobile App Launch due in 3 days").setSubtitle("1 hour ago").build()
notification3.setTitle("✅ Task Completed").setContent("Database optimization completed by Sarah").setSubtitle("4 hours ago").build()

notificationGrid.setColumns(3)
  .addComponent("notification1")
  .addComponent("notification2")
  .addComponent("notification3")
  .build()

// Create code example section
codeExample.addCodeBlock({
  "title": "API Integration",
  "subtitle": "Connect your dashboard with our REST API",
  "code": \`curl -X GET "https://api.projectflow.com/v1/projects" \\\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\\
  -H "Content-Type: application/json"

// Response
{
  "projects": [
    {
      "id": "proj_123",
      "name": "Website Redesign",
      "status": "active",
      "progress": 75,
      "team_size": 5
    }
  ]
}\`,
  "language": "bash"
}).build()

// Create footer
footerSection.addFooter({
  "text": "© 2024 ProjectFlow Dashboard. All rights reserved.",
  "links": [
    {"text": "Privacy Policy", "href": "/privacy"},
    {"text": "Terms of Service", "href": "/terms"},
    {"text": "API Documentation", "href": "/api-docs"},
    {"text": "Support", "href": "/support"}
  ]
}).build()

// Assemble the complete dashboard
page.setTitle("ProjectFlow - Advanced Dashboard")
  .addComponent("navbar")
  .addComponent("heroMetrics")
  .addBreak()
  .addComponent("metricsGrid")
  .addSpacer()
  .addComponent("mainFeatures")
  .addDivider()
  .addComponent("projectTable")
  .addBreak()
  .addGrid(2)
  .addComponent("actionForm")
  .addSection("Recent Activity")
  .addComponent("notificationGrid")
  .addSpacer()
  .addComponent("pricingSection")
  .addBreak()
  .addComponent("codeExample")
  .addComponent("footerSection")
  .build()
`;

    const result = dsl.execute(complexDSL);

    // Test that the DSL executed successfully
    expect(result).toBeDefined();
    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('</html>');

    // Test page title
    expect(result).toContain('<title>ProjectFlow - Advanced Dashboard</title>');

    // Test navigation
    expect(result).toContain('ProjectFlow Dashboard');
    expect(result).toContain('Dashboard');
    expect(result).toContain('Projects');
    expect(result).toContain('Analytics');

    // Test hero section
    expect(result).toContain('Welcome back, Sarah');
    expect(result).toContain('Here\'s what\'s happening with your projects today');

    // Test metric cards
    expect(result).toContain('Active Projects');
    expect(result).toContain('24');
    expect(result).toContain('Completed Tasks');
    expect(result).toContain('156');
    expect(result).toContain('Team Members');
    expect(result).toContain('18');
    expect(result).toContain('Revenue');
    expect(result).toContain('$45,200');

    // Test feature grid
    expect(result).toContain('Quick Actions');
    expect(result).toContain('Analytics');
    expect(result).toContain('Team Management');
    expect(result).toContain('Task Tracking');
    expect(result).toContain('Budget Overview');
    expect(result).toContain('Timeline View');
    expect(result).toContain('Notifications');

    // Test project table
    expect(result).toContain('Recent Projects');
    expect(result).toContain('Website Redesign');
    expect(result).toContain('Mobile App Launch');
    expect(result).toContain('Data Migration');
    expect(result).toContain('Active');
    expect(result).toContain('Review');
    expect(result).toContain('Delayed');

    // Test pricing section
    expect(result).toContain('Upgrade Your Plan');
    expect(result).toContain('Starter');
    expect(result).toContain('Professional');
    expect(result).toContain('Enterprise');
    expect(result).toContain('$29');
    expect(result).toContain('$79');
    expect(result).toContain('$199');

    // Test form
    expect(result).toContain('Quick Task Creation');
    expect(result).toContain('Task Title');
    expect(result).toContain('High Priority');
    expect(result).toContain('Design Team');

    // Test notifications
    expect(result).toContain('New Comment');
    expect(result).toContain('Deadline Approaching');
    expect(result).toContain('Task Completed');
    expect(result).toContain('John Smith commented');
    expect(result).toContain('Mobile App Launch due in 3 days');
    expect(result).toContain('Database optimization completed');

    // Test code block
    expect(result).toContain('API Integration');
    expect(result).toContain('curl -X GET');
    expect(result).toContain('https://api.projectflow.com');

    // Test footer
    expect(result).toContain('© 2024 ProjectFlow Dashboard');
    expect(result).toContain('Privacy Policy');
    expect(result).toContain('Terms of Service');
    expect(result).toContain('API Documentation');

    // Test that comments were properly removed and didn't affect parsing
    expect(result).not.toContain('// Create navigation component');
    expect(result).not.toContain('// Create hero section');
    expect(result).not.toContain('// Create individual metric cards');

    // Test that URLs with // were preserved
    expect(result).toContain('https://api.projectflow.com');
  });

  it("should handle component reuse in the dashboard", () => {
    const dsl = new BuilderDSL();

    const reuseDSL = `
// Create reusable card template
cardTemplate.setTitle("Template Card").setContent("Reusable content").build()

// Create two grids that use the same card
grid1.setColumns(2).addComponent("cardTemplate").addComponent("cardTemplate").build()
grid2.setColumns(1).addComponent("cardTemplate").build()

// Create pages that use both grids
page1.setTitle("Page 1").addComponent("grid1").build()
page2.setTitle("Page 2").addComponent("grid2").build()
`;

    const result = dsl.execute(reuseDSL);

    expect(result).toBeDefined();
    expect(result).toContain('<title>Page 2</title>');
    expect(result).toContain('Template Card');
    expect(result).toContain('Reusable content');

    // Verify the template card appears multiple times due to reuse
    const cardCount = (result.match(/Template Card/g) || []).length;
    expect(cardCount).toBeGreaterThan(1);
  });

  it("should properly handle mixed component types in complex layouts", () => {
    const dsl = new BuilderDSL();

    const mixedDSL = `
// Create mixed component layout
header1.setTitle("Main Header").build()
text1.addText("Some descriptive text").build()
button1.addButton("Action Button", "/action").build()

// Create a section containing all mixed types
mixedSection.setTitle("Mixed Components")
  .addComponent("header1")
  .addComponent("text1")
  .addComponent("button1")
  .build()

// Create final page
dashboard.setTitle("Mixed Dashboard")
  .addComponent("mixedSection")
  .addSpacer()
  .addDivider()
  .build()
`;

    const result = dsl.execute(mixedDSL);

    expect(result).toBeDefined();
    expect(result).toContain('<title>Mixed Dashboard</title>');
    expect(result).toContain('Mixed Components');
    expect(result).toContain('Main Header');
    expect(result).toContain('Some descriptive text');
    expect(result).toContain('Action Button');
    expect(result).toContain('href="/action"');
  });
});