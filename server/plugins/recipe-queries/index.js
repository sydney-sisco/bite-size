const fastifyPlugin = require('fastify-plugin')

async function recipeQueries (fastify) {
  const { pg } = fastify

  fastify.decorate('recipeQuery', {
    getEmojis: async (recipeId) => {
      return pg.query(`
        SELECT e.*, count(u.*) AS count FROM emojis e
        LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id
        AND u.recipe_id = $1
        GROUP BY e.id;
      `, [recipeId])
    },
    getAll: async () => {
      return pg.query(`
        SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
        JOIN users u ON u.id = r.user_id
        JOIN favourites f ON r.id = f.recipe_id
        GROUP BY r.id, u.username
        ORDER BY r.id
      `) 
    },
    postNewRecipe: async (newRecipe) => {
      const {
        title,
        difficulty,
        duration,
        image_url,
        servings,
        description,
        instructionSteps,
        ingredientList,
        unit_of_measure,
        quantity
      } = newRecipe
    
      const { rows: recipe } = await pg.transact(async client => {
        return client.query(`
            INSERT INTO recipes (title, difficulty_id, duration, image_url, servings, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
          `, [title, difficulty, duration, image_url, servings, description]
        )
      })
      console.log(recipe[0]);
      const recipeId = recipe[0].id;

      const instructions = await pg.transact(async client => {
        const newInstructions = []
        for (const [index, step] of instructionSteps.entries()) {
          if (step) {
            const { rows } = await client.query(`
              INSERT INTO instructions (instruction, step, recipe_id)
              VALUES ($1, $2, $3)
              RETURNING *;
            `, [step, (index + 1), recipeId]
            )
            newInstructions.push(rows[0])
          }
        }
        return newInstructions
      })
    
       const ingredients = await pg.transact(async client => {
        const newIngredients = []
        for (const ingredient of ingredientList) {
          if (ingredient) {
            const { rows } = await client.query(`
              INSERT INTO ingredients (name) 
              VALUES ($1)
              RETURNING *;
            `, [ingredient])
    
            const ingredientId = rows[0].id
    
            const { rows: newQuantity } = await client.query(`
              INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) 
              VALUES ($1, $2, $3, $4)
              RETURNING *;
            `, [recipeId, ingredientId, quantity, unit_of_measure])

            newIngredients.push({
              ingredient: rows[0],
              quantityId: newQuantity[0].id,
              quantity: newQuantity.quantity,
              unitOfMeasureId: newQuantity.unit_of_measure_id
            })
          }
        }
        return newIngredients
      })
      return { recipe: recipe[0], instructions, ingredients }
    }
  })
}

module.exports = fastifyPlugin(recipeQueries, {
  name: 'database-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})