const { favsForFeatured } = require('../../src/db/recipe_queries');

const homepageRoute = async (fastify) => {
  fastify.get('/', async (req, reply) => {
    const rows = await favsForFeatured(fastify);
    reply.send(rows);
  })
}

module.exports = homepageRoute;