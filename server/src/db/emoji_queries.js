const addEmojiReaction = async (fastify, emoji_id, recipe_id, user_id) => {
  const client = await fastify.pg.connect()

  console.log('adding emoji reactions with:', emoji_id, recipe_id, user_id)
  
  const { rows } = await client.query(
    `INSERT INTO user_emoji_reactions (emoji_id, recipe_id, user_id) VALUES ($1, $2, $3)
      RETURNING *;`, [emoji_id, recipe_id, user_id]
  )
  client.release();
  return rows;
};

const removeEmojiReaction = async (fastify, emoji_id, recipe_id, user_id) => {
  const client = await fastify.pg.connect()
    
  await client.query(
    `DELETE FROM user_emoji_reactions
    WHERE emoji_id = $1
    AND recipe_id = $2
    AND user_id = $3`, [emoji_id, recipe_id, user_id]
  )
  client.release()

  return;
};

module.exports = {
  addEmojiReaction,
  removeEmojiReaction
}
