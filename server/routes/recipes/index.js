const { getRecipeDetails, getRecipes , postNewRecipe } = require('../../src/db/recipe_queries');


const recipesRoutes = async (fastify) => {
  fastify.get('/recipes', async (req, reply) => {
    const rows = await getRecipes(fastify);
    reply.send(rows);
  })

  fastify.get('/recipes/:id', async (req, reply) => {
    const recipeDetails = await getRecipeDetails(fastify, req.params.id);

    // console.log(recipeDetails);
    reply.send(recipeDetails);
  })

  fastify.post('/recipes', async (req, reply) => {
    const { body } = req
    await postNewRecipe(fastify, body)
    reply.code(204)
  })
}

module.exports = recipesRoutes
