const getRecipes = async (fastify) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT * FROM recipes'
  )
  client.release()
  return rows;
};

const getRecipe = async (fastify, id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `SELECT * FROM recipes r
    WHERE r.id=$1`, [id]
  )
  client.release()

  return rows;
}

const getRecipeInstructions = async (fastify, id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `SELECT * FROM instructions
    WHERE recipe_id = $1
    ORDER BY step`, [id]
  )
  client.release()

  return rows;
}

// const getRecipeIngredients = async (fastify, id) => {
//   const client = await fastify.pg.connect()
    
//   const { rows } = await client.query(
//     `SELECT * FROM ingredients
//     WHERE recipe_id = $1`, [id]
//   )
//   client.release()

//   return rows;
// }

const getRecipeDetails = async (fastify, id) => {

  const recipe = await getRecipe(fastify, id);
  const instructions = await getRecipeInstructions(fastify, id);
  // const ingredients = await getRecipeIngredients(fastify, id); // recipe_ingredients table or something 

  return {recipe, instructions};
};

module.exports = {
  getRecipes,
  getRecipeDetails
}
