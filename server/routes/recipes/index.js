const { getRecipeDetails, getRecipes, deleteSpecificRecipe } = require('../../src/db/recipe_queries');


const recipesRoute = async (fastify) => {
  fastify.get('/recipes', async (req, reply) => {
    const rows = await getRecipes(fastify);
    reply.send(rows);
  })

  fastify.get('/recipes/:id', async (req, reply) => {
    const recipeDetails = await getRecipeDetails(fastify, req.params.id);

    // console.log(recipeDetails);
    reply.send(recipeDetails);
  })

  fastify.delete('/recipes/:id', async (req, reply) => {
    const deleteRecipe = await deleteSpecificRecipe(fastify, req.params.id);

    reply.send(deleteRecipe);
  })
}

module.exports = recipesRoute
