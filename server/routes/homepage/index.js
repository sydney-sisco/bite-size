
const homepageRoute = async (fastify) => {
  const { recipeQuery } = fastify;
  fastify.get('/', async (req, reply) => {
    const { rows } = await recipeQuery.favsForFeatured();
    const recipesWithTags = []
    for (recipe of rows) {
      recipe.tag = await recipeQuery.getTags(fastify, recipe.id)
      recipesWithTags.push(recipe)
    }
    reply.send(recipesWithTags);
    // reply.send(rows);
  })
}

module.exports = homepageRoute;