#!/usr/bin/env tsx

/**
 * Simple script to run DSL examples and generate HTML files
 * Usage: tsx tests/run-examples.ts
 */

import { BuilderDSL } from '../src/tools/builder.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'test-output');

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('🚀 Running Mobile Page Builder Examples...\n');

// Example 1: Simple Landing Page
console.log('📄 Generating Landing Page...');
try {
  const landingPageDSL = `
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
      .addText("Our revolutionary platform helps you streamline operations and drive growth.", "large")
      .addBreak("large")
      .addButton("Get Started Free", "/signup", "primary")
      .addButton("Watch Demo", "/demo", "secondary")
      .addBreak("large")
      .addDivider("solid")
      .addHeader("Why Choose MyApp?", 2)
      .addCard("Fast Setup", "Get up and running in minutes with our intuitive interface.", "⚡ Lightning fast")
      .addCard("Secure & Reliable", "Enterprise-grade security with 99.9% uptime guarantee.", "🔒 Bank-level security")
      .addCard("24/7 Support", "Our expert team is here to help you succeed around the clock.", "📞 Always available")
      .build()
  `;

  const landingHTML = BuilderDSL.test(landingPageDSL);
  writeFileSync(path.join(outputDir, 'landing-page.html'), landingHTML);
  console.log('✅ Landing page generated successfully');
} catch (error) {
  console.log('❌ Landing page failed:', error);
}

// Example 2: Contact Form
console.log('\n📝 Generating Contact Form...');
try {
  const contactFormDSL = `
    page.setTitle("Contact Us - MyApp")
      .addNavbar({"brand": "MyApp", "links": [{"text": "Home", "href": "/"}]})
      .addHeader("Get In Touch")
      .addText("Have a question or need support? We're here to help!")
      .addBreak("medium")
      .addInput("text", "Your Full Name", "fullName")
      .addInput("email", "Email Address", "email")
      .addSelect([
        {"value": "general", "text": "General Inquiry"},
        {"value": "support", "text": "Technical Support"},
        {"value": "billing", "text": "Billing Question"}
      ], "inquiryType", "How can we help?")
      .addTextArea("Tell us more about your inquiry...", 6, "message")
      .addBreak("small")
      .addButton("Send Message", "/contact/submit", "primary")
      .addDivider("dashed")
      .addText("Or reach us directly at support@myapp.com", "small")
      .build()
  `;

  const contactHTML = BuilderDSL.test(contactFormDSL);
  writeFileSync(path.join(outputDir, 'contact-form.html'), contactHTML);
  console.log('✅ Contact form generated successfully');
} catch (error) {
  console.log('❌ Contact form failed:', error);
}

// Example 3: Dashboard
console.log('\n📊 Generating Dashboard...');
try {
  const dashboardDSL = `
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
      .addText("Here's what's happening with your account today.")
      .addBreak("medium")
      .addCard("Account Status", "Your account is active and all systems are running smoothly.", "✅ All systems operational")
      .addCard("Usage This Month", "API Calls: 1,247 / 10,000<br>Storage: 2.3 GB / 100 GB", "📊 View analytics")
      .addCard("Recent Activity", "• Project updated<br>• Team member invited<br>• Backup completed", "🕐 Updated 2 hours ago")
      .addBreak("large")
      .addHeader("Quick Actions", 2)
      .addButton("Create Project", "/projects/new", "primary")
      .addButton("Invite Member", "/team/invite", "secondary")
      .addBreak("medium")
      .addList([
        "Website Redesign (In Progress)",
        "Mobile App Update (Completed)",
        "Database Migration (Planning)"
      ])
      .build()
  `;

  const dashboardHTML = BuilderDSL.test(dashboardDSL);
  writeFileSync(path.join(outputDir, 'dashboard.html'), dashboardHTML);
  console.log('✅ Dashboard generated successfully');
} catch (error) {
  console.log('❌ Dashboard failed:', error);
}

// Example 4: Blog Post
console.log('\n📝 Generating Blog Post...');
try {
  const blogPostDSL = `
    page.setTitle("Mobile Development Tips - MyApp Blog")
      .addNavbar({
        "brand": "MyApp Blog",
        "links": [
          {"text": "Home", "href": "/"},
          {"text": "Blog", "href": "/blog"}
        ]
      })
      .addHeader("10 Tips for Better Mobile Apps")
      .addText("Published on March 15, 2024 • 5 min read", "small")
      .addBreak("medium")
      .addImage("https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Mobile+Development", "Mobile Development", "100%")
      .addBreak("large")
      .addText("Mobile app development has evolved dramatically. Here are our top tips for building better apps in 2024.")
      .addBreak("medium")
      .addHeader("Essential Tips", 2)
      .addList([
        "Focus on user experience and intuitive design",
        "Optimize for performance and battery life",
        "Implement robust offline functionality",
        "Ensure accessibility for all users",
        "Plan for multiple screen sizes"
      ], true)
      .addBreak("medium")
      .addCard("Performance First", "Users expect apps to load quickly and respond instantly.", "💡 Pro tip: Use lazy loading")
      .addCard("Design for Touch", "Mobile interfaces should be finger-friendly.", "📱 44px minimum touch targets")
      .addBreak("large")
      .addDivider("solid")
      .addText("Found this helpful? Share it with your team!", "normal", "bold")
      .addButton("Read More Articles", "/blog", "primary")
      .build()
  `;

  const blogHTML = BuilderDSL.test(blogPostDSL);
  writeFileSync(path.join(outputDir, 'blog-post.html'), blogHTML);
  console.log('✅ Blog post generated successfully');
} catch (error) {
  console.log('❌ Blog post failed:', error);
}

// Example 5: Custom HTML Integration
console.log('\n🎨 Generating Custom HTML Example...');
try {
  const customDSL = `
    page.setTitle("Custom Elements Demo")
      .addHeader("Custom HTML Integration")
      .addText("This page demonstrates how to mix DSL components with raw HTML:")
      .addBreak("medium")
      .addRawHTML('<div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 20px; border-radius: 10px; color: white; text-align: center; margin: 10px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><h3 style="margin: 0;">Custom Gradient Box</h3><p style="margin: 10px 0 0 0;">This was created with addRawHTML()</p></div>')
      .addText("You can seamlessly mix custom HTML with builder components.")
      .addButton("Regular Button", "#", "primary")
      .addRawHTML('<button style="background: #ff6b6b; color: white; border: none; padding: 12px 24px; border-radius: 6px; margin: 10px 0; cursor: pointer; font-weight: bold;">Custom Styled Button</button>')
      .addBreak("medium")
      .addCard("Pro Tip", "Use addRawHTML() for complex custom components that need specific styling or JavaScript.", "💡 Flexible integration")
      .build()
  `;

  const customHTML = BuilderDSL.test(customDSL);
  writeFileSync(path.join(outputDir, 'custom-html-demo.html'), customHTML);
  console.log('✅ Custom HTML demo generated successfully');
} catch (error) {
  console.log('❌ Custom HTML demo failed:', error);
}

console.log(`\n🎉 All examples generated! Check the files in: ${outputDir}`);
console.log('\nGenerated files:');
console.log('- landing-page.html');
console.log('- contact-form.html');
console.log('- dashboard.html');
console.log('- blog-post.html');
console.log('- custom-html-demo.html');
console.log('\nOpen any of these files in your browser to see the results!');