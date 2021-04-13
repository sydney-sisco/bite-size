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

  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })

  fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
}
