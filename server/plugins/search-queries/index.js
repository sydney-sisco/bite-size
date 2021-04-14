const fastifyPlugin = require('fastify-plugin')

async function searchQueries (fastify) {
  const { pg } = fastify

  fastify.decorate('searchQuery', {
    allRecipes: async () => {
      const { rows } = await pg.query(`
        SELECT *
        FROM recipes
        RETURNING *;
      `)
      // const { id, title, description } = rows
      // return { id, title, description }
      return rows
    },
    allIngredients: async () => {
      const { rows } = await pg.query(`
        SELECT *
        FROM ingredients
        RETURNING *;
      `)
      return rows
    },
    allTags: async () => {
      const { rows } = await pg.query(`
        SELECT *
        FROM tags
        RETURNING *;
      `)
      return rows
    },
  })
}

module.exports = fastifyPlugin(searchQueries, {
  name: 'database-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})