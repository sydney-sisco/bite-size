const fastifyPlugin = require('fastify-plugin')

const fastifyAuthenticate = async (fastify) => {
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

module.exports = fastifyPlugin(fastifyAuthenticate)