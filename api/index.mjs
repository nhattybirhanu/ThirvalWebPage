import handler from '../dist/thrival-web-page/server/server.mjs';

export default async (req, res) => {
  if (req.url === '/.well-known/apple-app-site-association') {
    return;
  }
  return handler(req, res);
};

// api/index.mjs

