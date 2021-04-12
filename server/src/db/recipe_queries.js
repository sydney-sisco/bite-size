const format = require('pg-format')

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
    `SELECT r.*, d.name AS difficulty FROM recipes r
    JOIN difficulties d on d.id = r.difficulty_id
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

const getRecipeIngredients = async (fastify, id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `select * from recipe_ingredients ri
    join ingredients i on i.id = ri.ingredient_id
    join units_of_measure u on u.id = ri.unit_of_measure_id
    where ri.recipe_id = $1;`, [id]
  )
  client.release()

  return rows;
}

const getRecipeDetails = async (fastify, id) => {

  const recipe = await getRecipe(fastify, id);
  const instructions = await getRecipeInstructions(fastify, id);
  const ingredients = await getRecipeIngredients(fastify, id); // recipe_ingredients table or something 

  return {recipe, instructions, ingredients};
};

const postNewRecipe = async (fastify, body) => {
  const {
    title,
    difficulty,
    duration,
    image_url,
    servings,
    description,
    instructionSteps,
  } = body

  const recipe = await fastify.pg.transact(async client => {
    const { rows } = await client.query(
        `INSERT INTO recipes (title, duration, image_url, servings, description) VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
        `, [title, duration, image_url, servings, description]
      )
    return rows;
  })

  const recipeId = recipe[0].id

  const stepsWithoutBlanks = instructionSteps.map((step, index) => {
    if (step) {
      return [step, (index + 1), recipeId]
    }
  })
  
  const formattedQuery = format('INSERT INTO instructions (instruction, step, recipe_id) VALUES %L', stepsWithoutBlanks)

  console.log(formattedQuery);

  const instructions = await fastify.pg.transact(async client => {
    // will resolve to an id, or reject with an error
    const { rows } = await client.query(formattedQuery, [stepsWithoutBlanks])
    return rows;
  })
  
  console.log(instructions);
  
  // return recipe;
 

};

module.exports = {
  getRecipes,
  getRecipeDetails,
  postNewRecipe
}
