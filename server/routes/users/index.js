const usersRoute = async (fastify) => {
  fastify.get('/users', async (req, reply) => {
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
      'SELECT * FROM users'
    )
    client.release()
    reply.send(rows)
  })

  fastify.get('/users/:id', async (req, reply) => {
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
      'SELECT * FROM users WHERE id=$1', [req.params.id]
    )
    client.release()
    reply.send(rows)
  })
}

module.exports = usersRoute
