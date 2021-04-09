const fastifyPostgres = require('fastify-postgres')

fastifyPostgres.autoConfig = {
  connectionString: process.env.DATABASE_URL
}

module.exports = fastifyPostgres
