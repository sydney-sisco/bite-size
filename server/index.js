const autoload = require('fastify-autoload')
const { join } = require('path')
const fs = require('fs')
const path = require('path')

module.exports = async function (fastify, options) {
  fastify.register(autoload, {
    dir: join(__dirname, 'plugins'),
    maxDepth: 1
  })

  fastify.register(autoload, {
    dir: join(__dirname, 'routes'),
    maxDepth: 1,
    dirNameRoutePrefix: false
  })

  fastify.register(require('fastify-secure-session'), {
    // the name of the session cookie, defaults to 'session'
    cookieName: 'my-session-cookie',
    // adapt this to point to the directory where secret-key is located
    key: fs.readFileSync(path.join(__dirname, 'secret-key')),
    cookie: {
      path: '/'
      // options for setCookie, see https://github.com/fastify/fastify-cookie
    }
  })
}
