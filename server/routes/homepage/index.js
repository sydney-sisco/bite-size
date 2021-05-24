const homepageRoute = async (fastify) => {
  const { recipeQuery } = fastify

  fastify.get('/', async (req, reply) => {
    const { rows } = await recipeQuery.favsForFeatured()
    
    const recipesWithTags = []
    for (const recipe of rows) {
      const { rows } = await recipeQuery.getTags(recipe.id)
      recipe.tag = rows
      recipesWithTags.push(recipe)
    }

    reply.send(recipesWithTags)
  })
}

module.exports = homepageRoute