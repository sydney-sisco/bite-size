const fastifyPlugin = require('fastify-plugin')

const devCors = async (fastify) => {
  if (process.env.NODE_ENV !== 'development') return
  const cors = require('fastify-cors')
  fastify.register(cors, {
    origin: process.env.CLIENT_DOMAIN
  })
}

module.exports = fastifyPlugin(devCors)
