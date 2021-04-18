const fastifyPlugin = require('fastify-plugin')

async function searchQueries (fastify) {
  const { pg } = fastify

  fastify.decorate('searchQuery', {
    allRecipes: async () => {
      const { rows } = await pg.query(
      //   `SELECT *
      //   FROM recipes;
      // `
      `select r.*, string_agg(i.name, ',') as ingredients, string_agg(t.name, ',') as tags from recipes r
      join recipe_ingredients ri on ri.recipe_id = r.id
      join ingredients i on i.id = ri.ingredient_id
      join recipe_tags rt on rt.recipe_id = r.id
      join tags t on rt.tag = t.id
      group by r.id`
      )
      // const { id, title, description } = rows
      // return { id, title, description }
      return rows
    },
    allIngredients: async () => {
      const { rows } = await pg.query(`
        SELECT *
        FROM ingredients;
      `)
      return rows
    },
    allTags: async () => {
      const { rows } = await pg.query(`
        SELECT *
        FROM tags;
      `)
      return rows
    },
  })
}

module.exports = fastifyPlugin(searchQueries, {
  name: 'search-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})