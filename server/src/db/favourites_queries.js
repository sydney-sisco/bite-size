const getUserFavourites = async (fastify, user_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
    JOIN users u ON u.id = r.user_id
    JOIN favourites f ON r.id = f.recipe_id
    WHERE f.user_id = $1
    GROUP BY r.id, u.username
    ORDER BY r.id`, [user_id]
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
    AND recipe_id = $2;
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