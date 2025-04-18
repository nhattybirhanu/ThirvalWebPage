// generate-prerender-routes.mjs
import fs from 'fs/promises';
// If using Node < 18 or preferring node-fetch:
// import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
// Make sure this matches your actual environment setup
const API_BASE_URL = "https://thrival-admin-api-2b543076ce26.herokuapp.com/admin/api/v1/public";// e.g., http://localhost:3000/api or environment.BASE_URL
const ROUTES_OUTPUT_FILE = path.join(__dirname, 'src', 'prerender-routes.txt'); // Output file path
const STATIC_ROUTES = [ // Add other non-dynamic routes you want to prerender
  '/',
  '/about'
  // ... other static paths
];
// --- End Configuration ---

async function fetchChallengeSlugs() {
  try {
    // Adjust the endpoint '/challenges/slugs' if needed
    const response = await fetch(`${API_BASE_URL}/challenges/slugs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge slugs: ${response.status} ${response.statusText}`);
    }
    const slugs = await response.json(); // Assuming the API returns an array of strings like ['slug1', 'slug2']

    if (!Array.isArray(slugs)) {
      throw new Error('API did not return an array of slugs');
    }
    // Make sure slugs are valid strings
    return slugs.filter(slug => typeof slug === 'string' && slug.length > 0);

  } catch (error) {
    console.error("Error fetching challenge slugs:", error);
    return []; // Return empty array on error to avoid build failure, or re-throw to fail the build
  }
}

async function generateRoutesFile() {
  console.log('Fetching dynamic routes for prerendering...');
  const challengeSlugs = await fetchChallengeSlugs();
  const dynamicChallengeRoutes = challengeSlugs.map(slug => `/challenges/${slug}`);

  const allRoutes = [...STATIC_ROUTES, ...dynamicChallengeRoutes];
  const uniqueRoutes = [...new Set(allRoutes)]; // Ensure uniqueness

  console.log(`Writing ${uniqueRoutes.length} routes to ${ROUTES_OUTPUT_FILE}...`);
  // Write one route per line, as expected by routesFile .txt format
  await fs.writeFile(ROUTES_OUTPUT_FILE, uniqueRoutes.join('\n'));
  console.log('Successfully generated routes file.');
}

generateRoutesFile().catch(err => {
  console.error("Failed to generate routes file:", err);
  process.exit(1); // Exit with error code
});
