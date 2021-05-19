
const usersRoute = async (fastify) => {
  fastify.get('/users', async (req, reply) => {
    const rows = await getUsers(fastify);
    reply.send(rows);
  })

  fastify.get('/users/:id', async (req, reply) => {

    // getUser(fastify, req.params.id)
    // .then((rows) => {
    //   reply.send(rows);
    // })

    const rows = await getUser(fastify, req.params.id);
    reply.send(rows);
  })

  fastify.post('/login', async (req, reply) => {
    const user = await getUserByEmail(fastify, req.body.email);

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
    
    // const auth = request.headers.authorization;
    // const token = auth.split(' ')[1]

    // // console.log('auth:', auth);
    // // console.log('token', token);

    // const decoded = fastify.jwt.verify(token);
    // console.log('decoded token:', decoded);

    // if (request.params.id !== decoded.id) {
    //   // TODO: handle unathorized requests
    //   console.log('redirect to login?');
    // }

    // console.log('req param:', request.params.id)
    // console.log('from token:', decoded.id)

    const rows = await getRecipesForUser(fastify, request.params.id);
    const recipesWithTags = []
    for (recipe of rows) {
      recipe.tag = await getRecipeTags(fastify, recipe.id)
      recipesWithTags.push(recipe)
    }

    reply.send({recipes: recipesWithTags})
  })
}

module.exports = usersRoute
