// generate-prerender-routes.mjs
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

// Derive __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const API_BASE_URL = "https://admin.api.getthrival.app/admin/api/v1/public";
const PUBLIC_DOMAIN = "https://www.getthrival.app"; // ✅ your actual live domain
const ROUTES_OUTPUT_FILE = path.join(__dirname, 'src', 'prerender-routes.txt');
const SITEMAP_OUTPUT_FILE = path.join(__dirname, 'public', 'sitemap.xml'); // Output location
const STATIC_ROUTES = [
  '/',
  '/about',
  '/login',
  '/explore',
]; // Add other static routes here
// --- End Configuration ---

async function fetchChallengeSlugs() {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/slugs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge slugs: ${response.status} ${response.statusText}`);
    }
    const slugs = await response.json();
    if (!Array.isArray(slugs)) throw new Error('API did not return an array of slugs');
    return slugs.filter(slug => typeof slug === 'string' && slug.length > 0);
  } catch (error) {
    console.error("Error fetching challenge slugs:", error);
    return [];
  }
}

async function fetchExploreSlugs() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge category slugs: ${response.status} ${response.statusText}`);
    }
    const slugsData = await response.json(); // This is ChallengeCategory[]

    if (!Array.isArray(slugsData)) {
      throw new Error('API did not return an array');
    }

// Extract slug strings from ChallengeCategory[]
    return slugsData
      .map(cat => cat.slug)
      .filter(slug => typeof slug === 'string' && slug.length > 0);
  } catch (error) {
    console.error("Error fetching challenge category slugs:", error);
    return [];
  }
}
function generateSitemapXml(routes) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(route => {
      const fullUrl = `${PUBLIC_DOMAIN}${route}`;
      return `  <url><loc>${fullUrl}</loc></url>`;
    }),
    '</urlset>',
  ];
  return lines.join('\n');
}

async function generateFiles() {
  console.log('Fetching challenge slugs...');
  const challengeSlugs = await fetchChallengeSlugs();
  const explorer = await fetchExploreSlugs()
  const dynamicRoutes = challengeSlugs.map(slug => `/challenges/${slug}`);
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes,...explorer.map(value => `/explore/${value}`)];
  const uniqueRoutes = [...new Set(allRoutes)];

  // Write prerender-routes.txt
  await fs.writeFile(ROUTES_OUTPUT_FILE, uniqueRoutes.join('\n'));
  console.log(`✅ Wrote ${uniqueRoutes.length} routes to prerender-routes.txt`);

  // Write sitemap.xml
  const sitemapContent = generateSitemapXml(uniqueRoutes);
  await fs.writeFile(SITEMAP_OUTPUT_FILE, sitemapContent);
  console.log(`✅ Wrote sitemap.xml to public/`);
}

generateFiles().catch(err => {
  console.error("❌ Failed to generate files:", err);
  process.exit(1);
});
