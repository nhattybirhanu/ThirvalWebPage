import handler from '../dist/thrival-web-page/server/server.mjs';
import('../dist/thrival-web-page/server/main.js')
.then(module => module.app)
  .catch(error => {
    console.error('Failed to load server module:', error);
    throw error;
  });
export default async (req, res) => {
  const { app } = await import('../dist/thrival-web-page/server/main.js');
  return app(req, res);
};
