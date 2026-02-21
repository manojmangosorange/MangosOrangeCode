// Sitemap Validation Script
// Run: node validate-sitemap.js

import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

console.log('\n🔍 Validating Sitemap Configuration...\n');

// Check if sitemap.xml exists
if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml exists');
  
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  
  // Count URLs
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  console.log(`✅ Found ${urlCount} URLs in sitemap`);
  
  // Check for required elements
  if (content.includes('<priority>')) {
    console.log('✅ Priority tags present');
  } else {
    console.log('❌ Missing priority tags');
  }
  
  if (content.includes('<changefreq>')) {
    console.log('✅ Change frequency tags present');
  } else {
    console.log('❌ Missing change frequency tags');
  }
  
  if (content.includes('<lastmod>')) {
    console.log('✅ Last modified tags present');
  } else {
    console.log('❌ Missing last modified tags');
  }
  
  // Check XML validity
  if (content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.log('✅ Valid XML declaration');
  } else {
    console.log('❌ Invalid XML declaration');
  }
  
  // Check schema
  if (content.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
    console.log('✅ Proper sitemap schema');
  } else {
    console.log('❌ Missing sitemap schema');
  }
  
} else {
  console.log('❌ sitemap.xml NOT FOUND!');
  console.log('   Run: npm run sitemap');
}

console.log('');

// Check robots.txt
if (fs.existsSync(robotsPath)) {
  console.log('✅ robots.txt exists');
  
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  
  if (robotsContent.includes('Sitemap:')) {
    console.log('✅ robots.txt points to sitemap');
  } else {
    console.log('⚠️  robots.txt does not reference sitemap');
  }
} else {
  console.log('❌ robots.txt NOT FOUND');
}

console.log('');

// Check vercel.json
const vercelPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelPath)) {
  console.log('✅ vercel.json exists');
  
  const vercelContent = fs.readFileSync(vercelPath, 'utf-8');
  const vercelConfig = JSON.parse(vercelContent);
  
  if (vercelConfig.rewrites && vercelConfig.rewrites[0].source.includes('sitemap')) {
    console.log('✅ Sitemap excluded from rewrites');
  } else {
    console.log('⚠️  Check vercel.json rewrite rules');
  }
  
  if (vercelConfig.headers) {
    console.log('✅ Custom headers configured');
  }
} else {
  console.log('⚠️  vercel.json not found');
}

console.log('');

// Check for .htaccess
const htaccessPath = path.join(process.cwd(), 'public', '.htaccess');
if (fs.existsSync(htaccessPath)) {
  console.log('✅ .htaccess exists (for Apache hosting)');
} else {
  console.log('ℹ️  .htaccess not found (OK if not using Apache)');
}

// Check for _redirects
const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
if (fs.existsSync(redirectsPath)) {
  console.log('✅ _redirects exists (for Netlify/other platforms)');
} else {
  console.log('ℹ️  _redirects not found (OK if not using Netlify)');
}

console.log('\n📋 Summary:');
console.log('───────────────────────────────────────────');

if (fs.existsSync(sitemapPath)) {
  const stats = fs.statSync(sitemapPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`Sitemap size: ${sizeKB} KB`);
  console.log(`Last modified: ${stats.mtime.toLocaleString()}`);
}

console.log('\n🌐 Test URLs (after deployment):');
console.log('   https://mangosorange.com/sitemap.xml');
console.log('   https://mangosorange.com/robots.txt');
console.log('   https://mangosorange.com/sitemap (HTML version)');

console.log('\n💡 Next Steps:');
console.log('   1. Build: npm run build');
console.log('   2. Deploy to production');
console.log('   3. Test: curl https://mangosorange.com/sitemap.xml');
console.log('   4. Submit to Google Search Console');
console.log('\n');
