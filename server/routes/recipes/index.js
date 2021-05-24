const recipesRoutes = async (fastify) => {
  const { recipeQuery, emojiQuery } = fastify

  fastify.get('/recipes', async (req, reply) => {
    const { rows } = await recipeQuery.getRecipes()
    const recipesWithTags = []
    for (const recipe of rows) {
      const { rows } = await recipeQuery.getTags(recipe.id)
      recipe.tag = rows
      recipesWithTags.push(recipe)
    }
    reply.send(recipesWithTags)
  })

  fastify.get('/recipes/:id', async (req, reply) => {
    const { headers: { authorization }, params: { id } } = req
    let decoded
    if (authorization && authorization !== 'null') {
      const token = authorization.split(' ')[1]
      decoded = fastify.jwt.verify(token)
    }

    const recipeDetails = await recipeQuery.getRecipeDetails(id, decoded && decoded.id)

    reply.send(recipeDetails)
  })

  fastify.post('/recipes', async (req, reply) => {
    const { body } = req
    const { rows } = await recipeQuery.postNewRecipe(body)
    reply.send(rows)
  })
  
  // TODO: fix the double query nonsense
  fastify.patch('/recipes/:id', async (req, reply) => {
    const { body, params: { id } } = req
    await recipeQuery.editRecipe(body , id)
    const { rows } = await recipeQuery.getRecipeDetails(id)
    reply.send(rows)
  })

  fastify.delete('/recipes/:id', async (req, reply) => {
    const { params: { id } } = req
    const { rows } = await recipeQuery.deleteSpecificRecipe(id)
    reply.send(rows)
  })

  fastify.post('/recipes/:recipeId/emojis', async (req, reply) => {
    const {
      headers: { authorization },
      params: { recipeId },
      body
    } = req
    
    if (authorization === 'null') {
      reply.code(403)
    }
    const token = auth.split(' ')[1]
    const decoded = fastify.jwt.verify(token)

    await emojiQuery.addReaction(JSON.parse(body).emoji_id, recipeId, decoded.id)

    //  TODO: respond with something more useful
    reply.code(204)
  })

  fastify.delete('/recipes/:recipeId/emojis/:emojiId', async (req, reply) => {
    const { headers: { authorization }, params: { recipeId, emojiId } } = req

    if (authorization === 'null') {
      reply.code(403)
    }

    const token = auth.split(' ')[1]
    const decoded = fastify.jwt.verify(token)

    await emojiQuery.removeReaction(emojiId, recipeId, decoded.id)

    reply.code(204)
  })
}

module.exports = recipesRoutes
