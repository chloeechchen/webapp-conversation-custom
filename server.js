const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // 获取 Referer 头部信息
    // const referer = req.headers.referer || req.headers.referrer;

    // if (!referer || !referer.includes(INSPIRE_HUB_URL)) {
    //   res.writeHead(301, { 'Location': INSPIRE_HUB_URL });
    //   res.end();
    //   return;
    // }

    res.setHeader('Content-Security-Policy', `frame-ancestors 'self' ${process.env.INSPIRE_HUB_URL}`);

    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);

  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
