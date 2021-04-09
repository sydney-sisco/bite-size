const exampleRoute = async (fastify) => {
  fastify.get('/example', async (req, reply) => {
    reply.send({
      hello: 'world'
    })
  })
}

module.exports = exampleRoute
