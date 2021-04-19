const { favsForFeatured, getRecipeTags } = require('../../src/db/recipe_queries');

const homepageRoute = async (fastify) => {
  fastify.get('/', async (req, reply) => {
    const rows = await favsForFeatured(fastify);
    const recipesWithTags = []
    for (recipe of rows) {
      recipe.tag = await getRecipeTags(fastify, recipe.id)
      recipesWithTags.push(recipe)
    }
    reply.send(recipesWithTags);
    // reply.send(rows);
  })
}

module.exports = homepageRoute;