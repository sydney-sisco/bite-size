const fastifyPlugin = require('fastify-plugin')

async function userQueries (fastify) {
  const { pg: { query } } = fastify

  fastify.decorate('userQuery', {
    getAll: async () => {
      return query(`
      SELECT * FROM users
      `
      )
    },
    getUser: async (id) => {
      return query(`
      SELECT * FROM users WHERE id=$1
      `, [id]
      )
    },
    getUserByEmail: async (email) => {
      return query(`
      SELECT * FROM users WHERE email_address=$1
      `, [email])
    }
  })

}

module.exports = fastifyPlugin(userQueries, {
  name: 'user-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})
