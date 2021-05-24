const searchRoute = async (fastify) => {
  const { searchQuery } = fastify
  fastify.get('/preload/search', async (req, reply) => {
    const { rows: recipes } = await searchQuery.allRecipes()
    const { rows: tags } = await searchQuery.allTags()
    reply.send({ recipes, tags })
  })
}

module.exports = searchRoute;
