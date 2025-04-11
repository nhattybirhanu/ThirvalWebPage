const functions = require('firebase-functions');
const express = require('express');
const { join } = require('path');
const { existsSync } = require('fs');
const { pathToFileURL } = require('url');

const app = express();

// ✅ Adjust paths correctly
const distFolder = join(__dirname, '../../dist/thrival-web-page/browser');
// const serverMainPath = pathToFileURL(join(__dirname, '../../dist/thrival-web-page/server/main.server.mjs')).href;

// ✅ Use `index.original.html` if it exists, otherwise fallback
const indexHtml = existsSync(join(distFolder, 'index.csr.html'))
  ? 'index.csr.html'
  : 'index.html'; // fallback just in case
async function bootstrap() {
  const { ngExpressEngine } = await import('@nguniversal/express-engine');
  const { AppServerModule } = await import('../../dist/thrival-web-page/server/main');
  const { APP_BASE_HREF } = await import('@angular/common');

  app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
  app.set('view engine', 'html');
  app.set('views', distFolder);

  app.get('*.*', express.static(distFolder, { maxAge: '1y' }));

  app.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  exports.ssr = functions.https.onRequest(app);
}

bootstrap().catch((err) => {
  console.error('❌ SSR Bootstrap failed:', err);
});
