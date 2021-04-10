import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const { createProxyMiddleware } = require('http-proxy-middleware');

const { PORT, NODE_ENV, API_PORT } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
    createProxyMiddleware('/api', {
      changeOrigin: true,
      logLevel: 'debug',
      target: `http://localhost:${5001}`, // TODO: This should pull from .env
      pathRewrite: {
        '^/api': ''
      }
    })
  )
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
