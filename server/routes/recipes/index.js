const recipesRoutes = async (fastify) => {
  const { recipeQuery } = fastify

  fastify.get('/recipes', async (req, reply) => {
    const allRecipes = await recipeQuery.getRecipes();
    const recipesWithTags = []
    for (recipe of allRecipes) {
      recipe.tag = await recipeQuery.getTags(recipe.id)
      recipesWithTags.push(recipe)
    }
    reply.send(recipesWithTags);
  })

  fastify.get('/recipes/:id', async (request, reply) => {

    const auth = request.headers.authorization;
    let decoded;
    if (auth && auth !== 'null') {
      const token = auth.split(' ')[1]
      decoded = fastify.jwt.verify(token);
    }

    const recipeDetails = await recipeQuery.getRecipeDetails(fastify, request.params.id, decoded && decoded.id);

    reply.send(recipeDetails);
  })

  fastify.post('/recipes', async (req, reply) => {
    const { body } = req
    const newRecipe = await recipeQuery.postNewRecipe(body)
    reply.send(newRecipe)
  })
               
  fastify.patch('/recipes/:id', async (req, reply) => {
    const { body } = req
    const editRecipe = await recipeQuery.editRecipe(body, req.params.id);
    console.log('editRecipe', editRecipe);
    const recipeDetails = await getRecipeDetails(fastify, req.params.id);
    reply.send(recipeDetails);
  })

  fastify.delete('/recipes/:id', async (req, reply) => {
    const deleteRecipe = await deleteSpecificRecipe(fastify, req.params.id);

    reply.send(deleteRecipe);
  })

  fastify.post('/recipes/:recipe_id/emojis', async (request, reply) => {

    const auth = request.headers.authorization;
  
    let decoded;
    if (auth === 'null') {
      reply.code(403);
    }
    const token = auth.split(' ')[1]
    decoded = fastify.jwt.verify(token);

    const addEmoji = await addEmojiReaction(fastify, JSON.parse(request.body).emoji_id, request.params.recipe_id, decoded.id);

    reply.code(204);
  });

  fastify.delete('/recipes/:recipe_id/emojis/:emoji_id', async (request, reply) => {
    const auth = request.headers.authorization;

    let decoded;
    if (auth === 'null') {
      reply.code(403);
    }
    const token = auth.split(' ')[1]
    decoded = fastify.jwt.verify(token);
    
    const addEmoji = await removeEmojiReaction(fastify, request.params.emoji_id, request.params.recipe_id, decoded.id);
    reply.code(204);
  });
}

module.exports = recipesRoutes
