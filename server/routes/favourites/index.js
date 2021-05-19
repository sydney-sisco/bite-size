const favouritesRoutes = async (fastify) => {
  fastify.get('/users/:user_id/favourites', async (req, reply) => {
    const rows = await favouriteQuery.getUserFavourites(fastify, req.params.user_id);
    const recipesWithTags = []
    for (recipe of rows) {
      recipe.tag = await getRecipeTags(fastify, recipe.id)
      recipesWithTags.push(recipe)
    }
    reply.send({favourites: recipesWithTags});
  })

  fastify.post('/users/:user_id/favourites', async (req, reply) => {
    const { body } = req
    console.log('post body', body)
    await favouriteQuery.addUserFavourite(fastify, req.params.user_id, body.recipe_id)
    reply.code(204)
  })

  fastify.delete('/users/:user_id/favourites/:recipe_id', async (req, reply) => {
    const { body } = req
    console.log('delete body', body)
    const deleteFavourite = await favouriteQuery.deleteUserFvourite(fastify, req.params.user_id, req.params.recipe_id);
    reply.send(deleteFavourite);
  })

}

module.exports = favouritesRoutes