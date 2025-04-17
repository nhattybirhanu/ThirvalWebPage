// api/index.mjs
import bootstrap from '../dist/thrival-web-page/server/server.mjs';

export default async function handler(req, res) {
  const { handler } = await bootstrap(); // Bootstrap SSR
  return handler(req, res); // Delegate request to Angular SSR
}
