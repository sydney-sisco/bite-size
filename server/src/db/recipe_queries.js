const getRecipes = async (fastify) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT * FROM recipes'
  )
  client.release()
  return rows;
};

// const getUser = async (fastify, id) => {
//   const client = await fastify.pg.connect()
//     const { rows } = await client.query(
//       'SELECT * FROM users WHERE id=$1', [id]
//     )
//     client.release()
//     return rows;
// };

module.exports = {
  getRecipes,
  // getUser
}
