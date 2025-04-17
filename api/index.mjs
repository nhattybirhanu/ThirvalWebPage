import bootstrap from '../dist/thrival-web-page/server/server.mjs';

const server = await bootstrap();

export default function handler(request, response) {
  return server.handler(request, response);
}
