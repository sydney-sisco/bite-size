const { getRecipeDetails, getRecipes, deleteSpecificRecipe } = require('../../src/db/recipe_queries');
const   { addEmojiReaction, removeEmojiReaction } = require('../../src/db/emoji_queries');


const recipesRoutes = async (fastify) => {
  const { recipeQuery } = fastify

  fastify.get('/recipes', async (req, reply) => {
    const rows = await getRecipes(fastify);
    reply.send(rows);
  })

  fastify.get('/recipes/:id', async (request, reply) => {

    const auth = request.headers.authorization;
    let decoded;
    if (auth && auth !== 'null') {
      const token = auth.split(' ')[1]
      decoded = fastify.jwt.verify(token);
      // console.log('decoded token:', decoded);
    }

    const recipeDetails = await getRecipeDetails(fastify, request.params.id, decoded && decoded.id);

    // console.log(recipeDetails);
    reply.send(recipeDetails);
  })

  fastify.post('/recipes', async (req, reply) => {
    const { body } = req
    console.log("Body:",body)
    console.log("RQ:", recipeQuery);
    const newRecipe = await recipeQuery.postNewRecipe(body)
    console.log(newRecipe);
    reply.send(newRecipe)
  })
               
  fastify.delete('/recipes/:id', async (req, reply) => {
    const deleteRecipe = await deleteSpecificRecipe(fastify, req.params.id);
    // const deleteRecipe = await dbQuery.deleteRecipe(req.params.id);

    reply.send(deleteRecipe);
  })

  fastify.post('/recipes/:recipe_id/emojis', async (request, reply) => {

    const auth = request.headers.authorization;
    // console.log('auth:', auth);

    let decoded;
    if (auth === 'null') {
      reply.code(403);
    }
    const token = auth.split(' ')[1]
    decoded = fastify.jwt.verify(token);
    
    // emoji_id, recipe_id, user_id
    const addEmoji = await addEmojiReaction(fastify, JSON.parse(request.body).emoji_id, request.params.recipe_id, decoded.id);

    reply.code(204);
  });

  fastify.delete('/recipes/:recipe_id/emojis/:emoji_id', async (request, reply) => {
    const auth = request.headers.authorization;
    // console.log('auth:', auth);

    let decoded;
    if (auth === 'null') {
      reply.code(403);
    }
    const token = auth.split(' ')[1]
    decoded = fastify.jwt.verify(token);
    
    // emoji_id, recipe_id, user_id
    const addEmoji = await removeEmojiReaction(fastify, request.params.emoji_id, request.params.recipe_id, decoded.id);
    reply.code(204);
  });
}

module.exports = recipesRoutes
