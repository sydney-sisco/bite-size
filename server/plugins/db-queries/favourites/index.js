const fastifyPlugin = require('fastify-plugin')

async function favouritesQueries (fastify) {
  const { pg: { query } } = fastify

  fastify.decorate('favouriteQuery', {
    getUserFavourites: async (userId) => {
      return query(`
        SELECT r.*, u.username, totfav.tf AS favourites FROM recipes r
        JOIN users u ON u.id = r.user_id
        LEFT JOIN favourites f ON r.id = f.recipe_id
        JOIN (select recipe_id, count(user_id) tf from favourites group by recipe_id) totfav ON r.id = totfav.recipe_id
        WHERE f.user_id = $1
        GROUP BY r.id, u.username, totfav.tf
        ORDER BY r.id
        `, [userId]
      )
    },
    addUserFavourite: async (userId, recipeId) => {
      return query(`
        INSERT INTO favourites (user_id, recipe_id)
        VALUES ($1, $2)
        RETURNING *;
      `, [userId, recipeId]
      )
    },
    deleteUserFavourite: async (userId, recipeId) => {
      return query(`
        DELETE FROM favourites
        WHERE user_id = $1
        AND recipe_id = $2;
      `, [userId, recipeId] )
    }
  })
}

module.exports = fastifyPlugin(favouritesQueries, {
  name: 'favourites-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})