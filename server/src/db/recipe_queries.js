const getUserEmojiReactions = async (fastify, recipe_id) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    // `select e.name, count(uer.*) as count FROM emojis e
    // JOIN user_emoji_reactions uer ON e.id = uer.emoji_id
    // WHERE uer.recipe_id = 1
    // GROUP BY e.id`

    `select e.name, e.emoji, count(uer.*) from emojis e left join user_emoji_reactions uer on uer.emoji_id = e.id where (uer.recipe_id = 1 or uer.recipe_id is null) group by e.id`
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

  const userEmojiReactions = getUserEmojiReactions(fastify)

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
  const emojiReactions = await getUserEmojiReactions(fastify, id); // recipe_ingredients table or something 

  return {recipe, instructions, ingredients, emojiReactions};
};

module.exports = {
  getRecipes,
  getRecipeDetails
}
