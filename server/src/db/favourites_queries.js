const getUserFavourites = async (fastify, user_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT * FROM favourites
    JOIN recipes r ON r.id = r.user_id
    WHERE favourites.user_id = $1;
    `, [user_id]
  )
  client.release()
  return rows;
}

const addUserFavourite = async (fastify, user_id, recipe_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `INSERT INTO favourites (user_id, recipe_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [user_id, recipe_id]
  )
  client.release()
  return rows;
}

const deleteUserFavourite = async (fastify, user_id, recipe_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `DELETE FROM favourites
    WHERE user_id = $1
    AND item_id = $2;
    `, [user_id, recipe_id]
  )
  client.release()
  return rows;
}

module.exports = {
  getUserFavourites,
  addUserFavourite,
  deleteUserFavourite
}