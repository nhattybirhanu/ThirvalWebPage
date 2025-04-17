import handler from '../dist/thrival-web-page/server/server.mjs';

export default async function (req, res) {
  const response = await handler(req); // response is of type Response
  res.status(response.status);
  for (const [key, value] of response.headers) {
    res.setHeader(key, value);
  }
  res.send(await response.text());
}
