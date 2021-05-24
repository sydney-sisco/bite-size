const usersRoute = async (fastify) => {
  const { userQuery, recipeQuery } = fastify

  fastify.get('/users', async (req, reply) => {
    const { rows } = await userQuery.getAll()
    reply.send(rows)
  })

  fastify.get('/users/:id', async (req, reply) => {
    const { params: { id } } = req
    const { rows } = await userQuery.getUser(id)
    reply.send(rows)
  })

  fastify.post('/login', async (req, reply) => {
    const { body: { email, password } } = req
    const { rows } = await userQuery.getUserByEmail(email)

    if (rows.length < 1) {
      reply.send({error: 'Invalid email.'})
    }

    // TODO: hash the passwords at the very least
    if (rows[0].password !== password) { 
      reply.send({error: 'Invalid password.'})
    }

    const token = fastify.jwt.sign({ ...rows[0], password: null })
    reply.send({
      token,
      user: {...rows[0], password: null}
    })
  })

  fastify.get('/users/:id/recipes', async (req, reply) => {
    const { params: { id } } = req
    const { rows } = await recipeQuery.getRecipesForUser(id)
    const recipes = []
    for (const recipe of rows) {
      const { rows } = await recipeQuery.getRecipeTags(recipe.id)
      recipe.tag = rows
      recipes.push(recipe)
    }

    reply.send({ recipes })
  })
}

module.exports = usersRoute
