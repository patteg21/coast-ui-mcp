import { describe, it, expect, beforeAll } from 'vitest';
import { BuilderDSL } from '../src/tools/builder.js';
import { writeFileSync } from 'fs';
import path from 'path';

describe('Complete WebApp Examples', () => {
  const outputDir = path.join(process.cwd(), 'test-output');

  beforeAll(() => {
    // Create output directory for generated HTML files
    try {
      const fs = require('fs');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
    } catch (error) {
      console.log('Output directory creation failed, continuing without file output');
    }
  });

  describe('Landing Page Example', () => {
    it('should generate a complete landing page', () => {
      const dsl = `
        page.setTitle("Welcome to MyApp")
          .addNavbar({
            "brand": "MyApp",
            "links": [
              {"text": "Features", "href": "#features"},
              {"text": "Pricing", "href": "#pricing"},
              {"text": "Contact", "href": "#contact"}
            ]
          })
          .addHeader("Transform Your Business Today")
          .addText("Our revolutionary platform helps you streamline operations, boost productivity, and drive growth.", "large", "normal")
          .addBreak("large")
          .addButton("Get Started Free", "/signup", "primary")
          .addButton("Watch Demo", "/demo", "secondary")
          .addBreak("large")
          .addDivider("solid")
          .addHeader("Why Choose MyApp?", 2)
          .addCard("Fast Setup", "Get up and running in minutes, not hours. Our intuitive interface makes onboarding a breeze.", "⚡ Lightning fast")
          .addCard("Secure & Reliable", "Enterprise-grade security with 99.9% uptime guarantee. Your data is safe with us.", "🔒 Bank-level security")
          .addCard("24/7 Support", "Our expert team is here to help you succeed. Get support whenever you need it.", "📞 Always available")
          .addBreak("large")
          .addText("Ready to get started? Join thousands of satisfied customers.", "normal", "bold")
          .addButton("Start Your Free Trial", "/trial", "primary")
          .build()
      `;

      const result = BuilderDSL.test(dsl);

      // Verify essential elements
      expect(result).toContain('Welcome to MyApp');
      expect(result).toContain('Transform Your Business Today');
      expect(result).toContain('Get Started Free');
      expect(result).toContain('Fast Setup');
      expect(result).toContain('mobile-card');
      expect(result).toContain('mobile-navbar');

      // Save to file for manual inspection
      try {
        writeFileSync(path.join(outputDir, 'landing-page.html'), result);
      } catch (error) {
        // Continue without file output
      }
    });
  });

  describe('Contact Form Example', () => {
    it('should generate a complete contact form', () => {
      const dsl = `
        page.setTitle("Contact Us - MyApp")
          .addNavbar({"brand": "MyApp", "links": [{"text": "Home", "href": "/"}]})
          .addHeader("Get In Touch")
          .addText("Have a question or need support? We're here to help!")
          .addBreak("medium")
          .addInput("text", "Your Full Name", "fullName")
          .addInput("email", "Email Address", "email")
          .addInput("tel", "Phone Number (Optional)", "phone")
          .addSelect([
            {"value": "general", "text": "General Inquiry"},
            {"value": "support", "text": "Technical Support"},
            {"value": "billing", "text": "Billing Question"},
            {"value": "partnership", "text": "Partnership Opportunity"}
          ], "inquiryType", "What can we help you with?")
          .addTextArea("Tell us more about your inquiry...", 6, "message")
          .addBreak("small")
          .addText("We'll get back to you within 24 hours.", "small", "normal")
          .addButton("Send Message", "/contact/submit", "primary")
          .addDivider("dashed")
          .addHeader("Other Ways to Reach Us", 3)
          .addText("📧 Email: support@myapp.com")
          .addText("📞 Phone: (555) 123-4567")
          .addText("💬 Live Chat: Available 9 AM - 6 PM EST")
          .build()
      `;

      const result = BuilderDSL.test(dsl);

      expect(result).toContain('Contact Us - MyApp');
      expect(result).toContain('mobile-input');
      expect(result).toContain('mobile-textarea');
      expect(result).toContain('mobile-select');
      expect(result).toContain('General Inquiry');
      expect(result).toContain('Send Message');

      try {
        writeFileSync(path.join(outputDir, 'contact-form.html'), result);
      } catch (error) {
        // Continue without file output
      }
    });
  });

  describe('Dashboard Example', () => {
    it('should generate a user dashboard', () => {
      const dsl = `
        page.setTitle("Dashboard - MyApp")
          .addNavbar({
            "brand": "MyApp Dashboard",
            "links": [
              {"text": "Profile", "href": "/profile"},
              {"text": "Settings", "href": "/settings"},
              {"text": "Logout", "href": "/logout"}
            ]
          })
          .addHeader("Welcome back, John!")
          .addText("Here's what's happening with your account today.", "normal", "normal")
          .addBreak("medium")
          .addCard("Account Status", "Your account is active and all systems are running smoothly.", "✅ All systems operational")
          .addCard("Usage This Month", "API Calls: 1,247 / 10,000<br>Storage Used: 2.3 GB / 100 GB<br>Bandwidth: 45.2 GB / 500 GB", "📊 View detailed analytics")
          .addCard("Recent Activity", "• Project 'Website Redesign' updated<br>• New team member invited<br>• Backup completed successfully", "🕐 Last updated 2 hours ago")
          .addBreak("large")
          .addHeader("Quick Actions", 2)
          .addButton("Create New Project", "/projects/new", "primary")
          .addButton("Invite Team Member", "/team/invite", "secondary")
          .addButton("View Reports", "/reports", "secondary")
          .addBreak("medium")
          .addDivider("solid")
          .addHeader("Recent Projects", 3)
          .addList([
            "Website Redesign (In Progress)",
            "Mobile App Update (Completed)",
            "Database Migration (Planning)",
            "Security Audit (Scheduled)"
          ], false)
          .addText("Need help getting started? Check out our documentation.", "small", "normal")
          .build()
      `;

      const result = BuilderDSL.test(dsl);

      expect(result).toContain('Dashboard - MyApp');
      expect(result).toContain('Welcome back, John!');
      expect(result).toContain('Account Status');
      expect(result).toContain('Quick Actions');
      expect(result).toContain('Create New Project');
      expect(result).toContain('Website Redesign');

      try {
        writeFileSync(path.join(outputDir, 'dashboard.html'), result);
      } catch (error) {
        // Continue without file output
      }
    });
  });

  describe('Product Showcase Example', () => {
    it('should generate a product showcase page', () => {
      const dsl = `
        page.setTitle("Our Products - MyApp")
          .addNavbar({
            "brand": "MyApp",
            "links": [
              {"text": "Home", "href": "/"},
              {"text": "Products", "href": "/products"},
              {"text": "About", "href": "/about"}
            ]
          })
          .addHeader("Our Product Suite")
          .addText("Powerful tools designed to help your business thrive in the digital age.", "large", "normal")
          .addBreak("large")
          .addImage("https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Product+Hero+Image", "Product Hero", "100%")
          .addBreak("medium")
          .addHeader("Core Features", 2)
          .addCard("Analytics Dashboard", "Real-time insights into your business performance with customizable charts and reports.", "Starting at $29/month")
          .addCard("Team Collaboration", "Built-in chat, file sharing, and project management tools to keep your team connected.", "Starting at $19/month")
          .addCard("API Integration", "Connect with over 100+ popular services through our robust API and webhook system.", "Starting at $49/month")
          .addBreak("large")
          .addDivider("solid")
          .addHeader("Pricing Plans", 2)
          .addText("Choose the plan that's right for your business:")
          .addBreak("small")
          .addRawHTML('<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;"><div style="flex: 1; min-width: 250px; background: white; border: 2px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; text-align: center;"><h3>Starter</h3><p style="font-size: 2rem; font-weight: bold; color: #2563eb;">$29<span style="font-size: 1rem; color: #64748b;">/month</span></p><ul style="text-align: left; padding-left: 1.5rem;"><li>Up to 5 users</li><li>10GB storage</li><li>Basic support</li></ul></div><div style="flex: 1; min-width: 250px; background: white; border: 2px solid #2563eb; border-radius: 0.5rem; padding: 1.5rem; text-align: center;"><h3>Professional</h3><p style="font-size: 2rem; font-weight: bold; color: #2563eb;">$79<span style="font-size: 1rem; color: #64748b;">/month</span></p><ul style="text-align: left; padding-left: 1.5rem;"><li>Up to 25 users</li><li>100GB storage</li><li>Priority support</li><li>API access</li></ul></div></div>')
          .addBreak("large")
          .addButton("Start Free Trial", "/trial", "primary")
          .addButton("Contact Sales", "/contact", "secondary")
          .addBreak("medium")
          .addText("30-day money-back guarantee • Cancel anytime • No setup fees", "small", "normal")
          .build()
      `;

      const result = BuilderDSL.test(dsl);

      expect(result).toContain('Our Products - MyApp');
      expect(result).toContain('Product Suite');
      expect(result).toContain('Analytics Dashboard');
      expect(result).toContain('Pricing Plans');
      expect(result).toContain('Start Free Trial');
      expect(result).toContain('$29/month');

      try {
        writeFileSync(path.join(outputDir, 'product-showcase.html'), result);
      } catch (error) {
        // Continue without file output
      }
    });
  });

  describe('Blog Post Example', () => {
    it('should generate a blog post page', () => {
      const dsl = `
        page.setTitle("How to Build Better Mobile Apps - MyApp Blog")
          .addNavbar({
            "brand": "MyApp Blog",
            "links": [
              {"text": "Home", "href": "/"},
              {"text": "Blog", "href": "/blog"},
              {"text": "Subscribe", "href": "/subscribe"}
            ]
          })
          .addHeader("How to Build Better Mobile Apps in 2024")
          .addText("Published on March 15, 2024 • 8 min read • By Sarah Johnson", "small", "normal")
          .addBreak("medium")
          .addImage("https://via.placeholder.com/800x400/059669/FFFFFF?text=Mobile+Development", "Mobile Development", "100%")
          .addBreak("large")
          .addText("Mobile app development has evolved dramatically over the past few years. With new frameworks, better tools, and changing user expectations, developers need to stay ahead of the curve.", "normal", "normal")
          .addBreak("medium")
          .addHeader("Key Principles for Modern Mobile Apps", 2)
          .addList([
            "Focus on user experience and intuitive design",
            "Optimize for performance and battery life",
            "Implement robust offline functionality",
            "Ensure accessibility for all users",
            "Plan for multiple screen sizes and orientations"
          ], true)
          .addBreak("medium")
          .addHeader("Best Practices", 2)
          .addCard("Performance First", "Users expect apps to load quickly and respond instantly. Optimize your code, compress images, and minimize API calls.", "💡 Pro tip: Use lazy loading")
          .addCard("Design for Touch", "Mobile interfaces should be finger-friendly with appropriate touch targets and gestures.", "📱 44px minimum touch targets")
          .addCard("Test Early and Often", "Regular testing on real devices helps catch issues before they reach users.", "🧪 Automated testing is key")
          .addBreak("large")
          .addDivider("solid")
          .addHeader("Conclusion", 2)
          .addText("Building great mobile apps requires attention to detail, user empathy, and continuous learning. The mobile landscape will continue to evolve, so stay curious and keep experimenting with new approaches.", "normal", "normal")
          .addBreak("large")
          .addText("Found this article helpful? Share it with your team!", "normal", "bold")
          .addButton("Share on Twitter", "https://twitter.com/intent/tweet?text=Great article on mobile development", "secondary")
          .addButton("Read More Articles", "/blog", "primary")
          .build()
      `;

      const result = BuilderDSL.test(dsl);

      expect(result).toContain('How to Build Better Mobile Apps');
      expect(result).toContain('Sarah Johnson');
      expect(result).toContain('Key Principles');
      expect(result).toContain('Performance First');
      expect(result).toContain('Share on Twitter');

      try {
        writeFileSync(path.join(outputDir, 'blog-post.html'), result);
      } catch (error) {
        // Continue without file output
      }
    });
  });

  describe('Generated HTML Validation', () => {
    it('should generate valid HTML structure', () => {
      const dsl = `page.setTitle("Test").addHeader("Test").build()`;
      const result = BuilderDSL.test(dsl);

      // Check HTML5 structure
      expect(result).toMatch(/^<!DOCTYPE html>/);
      expect(result).toContain('<html lang="en">');
      expect(result).toContain('<head>');
      expect(result).toContain('<meta charset="UTF-8">');
      expect(result).toContain('<meta name="viewport"');
      expect(result).toContain('</head>');
      expect(result).toContain('<body>');
      expect(result).toContain('</body>');
      expect(result).toContain('</html>');
    });

    it('should include mobile-optimized viewport', () => {
      const result = BuilderDSL.test('page.build()');
      expect(result).toContain('width=device-width, initial-scale=1.0');
    });

    it('should include comprehensive CSS styles', () => {
      const result = BuilderDSL.test('page.build()');
      expect(result).toContain('<style>');
      expect(result).toContain('mobile-navbar');
      expect(result).toContain('mobile-button');
      expect(result).toContain('mobile-input');
      expect(result).toContain('@media (max-width: 640px)');
    });
  });
});