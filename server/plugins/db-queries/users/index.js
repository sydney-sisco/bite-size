

const getUsers = async (fastify) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT * FROM users'
  )
  client.release()
  return rows;
};

const getUser = async (fastify, id) => {
  const client = await fastify.pg.connect()
    const { rows } = await client.query(
      'SELECT * FROM users WHERE id=$1', [id]
    )
    client.release()
    return rows;
};

const getUserByEmail = async (fastify, email) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT * FROM users WHERE email_address=$1', [email]
  )
  client.release()
  return rows;
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail
}
