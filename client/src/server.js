import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = new sessionFileStore(session);

const { createProxyMiddleware } = require('http-proxy-middleware');

const { PORT, NODE_ENV, API_PORT } = process.env;
const dev = NODE_ENV === 'development';


polka()
	.use(
    json(),
    session({
      secret: 'SomeSecretStringThatIsNotInGithub', //TODO: this should also pull from .env
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: `.sessions`
      })
    }),
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
		sapper.middleware({
      session: (req, res) => {
        return ({
          // if you need more key/value pairs in the session, add them here
          token: req.session.token,
          user: req.session.user
        })
      }
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
