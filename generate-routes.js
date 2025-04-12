const fs = require('fs');
const path = require('path');

const API_URL = 'https://your-api.com/api/ssr-routes'; // <- Your API endpoint
const outputPath = path.join(__dirname, 'src/app/app.routes.server.ts');

async function generateRoutes() {
  try {
    // const response = await axios.get<string[]>(API_URL); // expecting an array of route strings
    const routes=
      ['67b8bd74ae77626856a4293b','67b8bcf7ac772338afdb7e26','67c168bac2575b17e6b47f07']

    const importsStatement = `import { RenderMode, ServerRoute } from '@angular/ssr';\n\n`;
    const exportStart = `export const serverRoutes: ServerRoute[] = [\n`;

    const routeEntries = routes
      .filter(route => route.trim().length > 0)
      .map(route => `  { path: 'challenge-pack/${route}', renderMode: RenderMode.Prerender },`)
      .join('\n');

    const fallback = `  { path: '**', renderMode: RenderMode.Server }\n];\n`;

    const finalOutput = `${importsStatement}${exportStart}${routeEntries}\n${fallback}`;

    fs.writeFileSync(outputPath, finalOutput);

    console.log(`✅ Generated ${routes.length} routes + SSR fallback`);
  } catch (error) {
    console.error('❌ Failed to fetch or generate server routes:', error);
  }
}

generateRoutes();
