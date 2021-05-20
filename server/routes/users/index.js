const usersRoute = async (fastify) => {
  const { userQuery, recipeQuery } = fastify;

  fastify.get('/users', async (req, reply) => {
    const rows = await userQuery.getAll(fastify);
    reply.send(rows);
  })

  fastify.get('/users/:id', async (req, reply) => {
    const rows = await userQuery.getUser(fastify, req.params.id);
    reply.send(rows);
  })

  fastify.post('/login', async (req, reply) => {
    const user = await userQuery.getUserByEmail(fastify, req.body.email);

    if (user.length === 0) {
      reply.send({error: 'Invalid email.'});
      return;
    }

    if (user[0].password !== req.body.password) { // TODO: hash the passwords at the very least
      reply.send({error: 'Invalid Password.'});
      return;
    }

    const token = fastify.jwt.sign({ ...user[0], password: null })
    reply.send({
      token,
      user: {...user[0], password: null}
    })
  })

  fastify.get('/users/:id/recipes', async (request, reply) => {
    
    const rows = await recipeQuery.getRecipesForUser(fastify, request.params.id);
    const recipesWithTags = []
    for (recipe of rows) {
      recipe.tag = await recipeQuery.getRecipeTags(fastify, recipe.id)
      recipesWithTags.push(recipe)
    }

    reply.send({recipes: recipesWithTags})
  })
}

module.exports = usersRoute
