const searchRoute = async (fastify) => {
  const { searchQuery } = fastify
  fastify.get('/preload/search', async (req, reply) => {
    const recipes = await searchQuery.allRecipes()
    // const ingredients = await searchQuery.allIngredients()
    // const tags = await searchQuery.allTags()
    // console.log(recipes, ingredients, tags);
    // console.log(recipes, ingredients, tags);
    reply.send({
      recipes,
      // ingredients,
      // tags
    })
  })
}

module.exports = searchRoute;
