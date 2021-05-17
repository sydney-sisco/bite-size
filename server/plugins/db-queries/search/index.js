const fastifyPlugin = require('fastify-plugin')

async function searchQueries (fastify) {
  const { pg: { query } } = fastify

  fastify.decorate('searchQuery', {
    allRecipes: async () => {
      return query(`
        select r.*, string_agg(i.name, ',') as ingredients, string_agg(t.name, ',') as tags from recipes r
        left join recipe_ingredients ri on ri.recipe_id = r.id
        left join ingredients i on i.id = ri.ingredient_id
        left join recipe_tags rt on rt.recipe_id = r.id
        left join tags t on rt.tag = t.id
        group by r.id
      `)
    },
    allIngredients: async () => {
      return query(`
        SELECT *
        FROM ingredients;
      `)
    },
    allTags: async () => {
      return query(`
        SELECT *
        FROM tags;
      `)
    }
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