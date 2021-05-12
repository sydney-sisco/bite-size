const fastifyPlugin = require('fastify-plugin')

async function emojiQueries (fastify) {
  const { pg: { query } } = fastify

  fastify.decorate('emojiQuery', {
    addReaction: async (emojiId, recipeId, userId) => {
      return query(`
        INSERT INTO user_emoji_reactions (emoji_id, recipe_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [emojiId, recipeId, userId]
      )
    },
    removeReaction: async (emojiId, recipeId, userId) => {
      return query(`
        DELETE FROM user_emoji_reactions
        WHERE emoji_id = $1
        AND recipe_id = $2
        AND user_id = $3
        `, [emojiId, recipeId, userId]
      )
    }
  })
} 

module.exports = fastifyPlugin(emojiQueries, {
  name: 'emoji-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})
