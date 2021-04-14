const searchRoute = async (fastify) => {
  const { searchQuery } = fastify
  fastify.get('/preload/search', async (req, reply) => {
    const recipes = searchQuery.allRecipes()
    const ingredients = searchQuery.allIngredients()
    const tags = searchQuery.allTags()
    reply.send({
      recipes,
      ingredients,
      tags
    })
  })
}

module.exports = searchRoute;