const favouritesRoutes = async (fastify) => {
  const { favouriteQuery, recipeQuery } = fastify

  fastify.get('/users/:userId/favourites', async (req, reply) => {
    const { params: { userId} } = req
    const { rows } = await favouriteQuery.getUserFavourites(userId)
    const favourites = []

    for (const recipe of rows) {
      const { rows } = await recipeQuery.getTags(recipe.id)
      recipe.tag = rows[0]
      favourites.push(recipe)
    }

    reply.send({ favourites })
  })

  fastify.post('/users/:userId/favourites', async (req, reply) => {
    const { body: { recipe_id }, params: { userId } } = req

    await favouriteQuery.addUserFavourite(userId, recipe_id)
    // SHOULD NOT RETURN 204 As its a 'nothing' response. Always send 'something' response to catch errors 
    reply.code(204)
  })

  fastify.delete('/users/:userId/favourites/:recipeId', async (req, reply) => {
    const { params: { userId, recipeId } } = req

    const { rows } = await favouriteQuery.deleteUserFvourite(userId, recipeId)
    
    reply.send(rows)
  })

}

module.exports = favouritesRoutes