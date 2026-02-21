import fs from "fs";

const baseUrl = "https://mangosorange.com";

// Define routes with SEO priority and change frequency
const routes = [
  // High priority pages (Homepage, Core Services)
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/about", priority: "0.9", changefreq: "monthly" },
  { url: "/contact", priority: "0.9", changefreq: "monthly" },
  { url: "/careers", priority: "0.9", changefreq: "daily" },
  
  // IT Services - High priority
  { url: "/it-services", priority: "0.9", changefreq: "weekly" },
  { url: "/web-development", priority: "0.8", changefreq: "weekly" },
  { url: "/app-development", priority: "0.8", changefreq: "weekly" },
  { url: "/custom-software", priority: "0.8", changefreq: "weekly" },
  { url: "/ecommerce", priority: "0.8", changefreq: "weekly" },
  { url: "/open-source", priority: "0.7", changefreq: "weekly" },
  { url: "/hmis", priority: "0.7", changefreq: "weekly" },
  
  // Cloud Services - High priority
  { url: "/cloud-strategy", priority: "0.8", changefreq: "weekly" },
  { url: "/data-migration", priority: "0.8", changefreq: "weekly" },
  { url: "/managed-services", priority: "0.8", changefreq: "weekly" },
  { url: "/cloud/aws", priority: "0.7", changefreq: "weekly" },
  { url: "/cloud/azure", priority: "0.7", changefreq: "weekly" },
  { url: "/cloud/gcp", priority: "0.7", changefreq: "weekly" },
  { url: "/cloud/multi-cloud", priority: "0.7", changefreq: "weekly" },
  { url: "/cloud/infrastructure-assessment", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/legacy-modernization", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/security", priority: "0.7", changefreq: "weekly" },
  { url: "/cloud/backup", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/disaster-recovery", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/compliance", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/cicd-pipelines", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/infrastructure-as-code", priority: "0.6", changefreq: "monthly" },
  { url: "/cloud/24-7-support", priority: "0.6", changefreq: "monthly" },
  
  // Staffing Services
  { url: "/staffing", priority: "0.8", changefreq: "weekly" },
  { url: "/staffing/offshore-staffing", priority: "0.7", changefreq: "weekly" },
  { url: "/staffing/on-premise-staffing", priority: "0.7", changefreq: "weekly" },
  { url: "/staffing/contract-solutions", priority: "0.7", changefreq: "weekly" },
  { url: "/staffing/payroll-outsourcing", priority: "0.7", changefreq: "weekly" },
  { url: "/staffing/management-consulting", priority: "0.7", changefreq: "weekly" },
  { url: "/staffing/staffing-solutions", priority: "0.7", changefreq: "weekly" },
  
  // Other Services
  { url: "/hardware-services", priority: "0.6", changefreq: "monthly" },
  { url: "/it-consulting", priority: "0.7", changefreq: "weekly" },
  { url: "/system-integration", priority: "0.6", changefreq: "monthly" },
  { url: "/technical-support", priority: "0.6", changefreq: "monthly" },
  
  // Informational Pages
  { url: "/blog", priority: "0.7", changefreq: "weekly" },
  { url: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
  { url: "/sitemap", priority: "0.5", changefreq: "monthly" },
];

const lastmod = new Date().toISOString().split("T")[0];

// Generate XML sitemap with proper formatting
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(r => `  <url>
    <loc>${baseUrl}${r.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", xml);
console.log("✅ sitemap.xml generated successfully with", routes.length, "URLs");
console.log("📍 Location: public/sitemap.xml");
console.log("🌐 Accessible at:", baseUrl + "/sitemap.xml");
