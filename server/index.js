const autoload = require('fastify-autoload')
const { join } = require('path')

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
}
