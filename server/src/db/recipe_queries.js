
const getUserEmojiReactionsForRecipe = async (fastify, user_id, recipe_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT e.id,
    CASE 
      WHEN u.id IS NULL THEN 0
      ELSE 1
    END AS selected
    FROM emojis e
    LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id AND u.user_id = $1 AND u.recipe_id = $2
    ORDER BY e.id;`, [user_id, recipe_id]
  )
  client.release()
  return rows;
}

const getUserEmojiReactions = async (fastify, recipe_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT e.*, count(u.*) AS count FROM emojis e
    LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id
      AND u.recipe_id = $1
    GROUP BY e.id
    ORDER BY e.id;`, [recipe_id]
  )
  client.release()
  return rows;
}

const getRecipes = async (fastify) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
    JOIN users u ON u.id = r.user_id
    JOIN favourites f ON r.id = f.recipe_id
    GROUP BY r.id, u.username
    ORDER BY r.id`
  )
  client.release()

  // const userEmojiReactions = getUserEmojiReactions(fastify)

  return rows;
};

const getRecipe = async (fastify, id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `SELECT r.*, d.name AS difficulty, COUNT(f.*) as favourite_count FROM recipes r
    LEFT JOIN difficulties d ON d.id = r.difficulty_id
    LEFT JOIN favourites f ON f.recipe_id = r.id
    WHERE r.id=$1
    GROUP BY r.id, d.name`, [id]
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
    `SELECT * FROM recipe_ingredients ri
    LEFT JOIN ingredients i ON i.id = ri.ingredient_id
    LEFT JOIN units_of_measure u ON u.id = ri.unit_of_measure_id
    WHERE ri.recipe_id = $1;`, [id]
  )
  client.release()

  return rows;
}

const getRecipeDetails = async (fastify, recipe_id, user_id) => {
  
  const recipeDetails = {};

  recipeDetails.recipe = await getRecipe(fastify, recipe_id);
  recipeDetails.instructions = await getRecipeInstructions(fastify, recipe_id);
  recipeDetails.ingredients = await getRecipeIngredients(fastify, recipe_id);
  recipeDetails.emojiReactions = await getUserEmojiReactions(fastify, recipe_id);

  // console.log(recipeDetails.emojiReactions);

  // if a user_id was passed in, get user-specific information about the recipe
  // has the user favourited this recipe (not yet implemented)
  // has the user added emoji reactions to the recipe
  if (user_id) {
    console.log('found user_id:', user_id);

    recipeDetails.recipe[0].userFavourite = await hasUserFavourited(fastify, user_id, recipe_id);
    console.log(recipeDetails.recipe[0].userFavourite);

    const userEmojiReactions = await getUserEmojiReactionsForRecipe(fastify, user_id, recipe_id);
    // console.log('userEmojiReactions:', userEmojiReactions);

    // map the user-specific emoji reaction data onto the recipe-specific reaction object
    recipeDetails.emojiReactions.map((emojiReaction, index) => {
      emojiReaction.selected = userEmojiReactions[index].selected;
      return emojiReaction;
    })
    // console.log(recipeDetails.emojiReactions);
  }

  console.log('recipeDetails', recipeDetails)
  return recipeDetails;
};

const hasUserFavourited = async (fastify, user_id, recipe_id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `SELECT * FROM favourites    
    WHERE user_id = $1
    AND recipe_id = $2;`, [user_id, recipe_id]
  )
  client.release()

  return rows.length !== 0;
}

const postNewRecipe = async (fastify, body) => {
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
  } = body

  const recipe = await fastify.pg.transact(async client => {
    const { rows } = await client.query(`
        INSERT INTO recipes (title, difficulty_id, duration, image_url, servings, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `, [title, difficulty, duration, image_url, servings, description]
    )
    return rows;
  })

  const recipeId = recipe[0].id

  await fastify.pg.transact(async client => {
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

  await fastify.pg.transact(async client => {
    for (const ingredient of ingredientList) {
      if (ingredient) {
        const { rows } = await client.query(`
          INSERT INTO ingredients (name) 
          VALUES ($1)
          RETURNING id;
        `, [ingredient])

        const ingredientId = rows[0].id

        await client.query(`
          INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) 
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `, [recipeId, ingredientId, quantity, unit_of_measure])
      }
    }
  })
}

const deleteSpecificRecipe = async (fastify, id) => {
  const client = await fastify.pg.connect()
    
  const { rows } = await client.query(
    `DELETE FROM recipes
    WHERE id=$1`, [id]
  )
  client.release()

  return rows;
}

const getRecipesForUser = async (fastify, userID) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    `SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
    JOIN users u ON u.id = r.user_id
    JOIN favourites f ON r.id = f.recipe_id
    WHERE r.user_id = $1
    GROUP BY r.id, u.username
    ORDER BY r.id`, [userID]
  )
  client.release()

  const userEmojiReactions = getUserEmojiReactions(fastify)

  return rows;
};

module.exports = {
  getRecipes,
  getRecipeDetails,
  deleteSpecificRecipe,
  getRecipesForUser,
  postNewRecipe,
}
